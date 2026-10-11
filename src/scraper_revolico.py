"""Scraper de anuncios de Carros en La Habana (Revolico).

Fuente: API GraphQL pública de Revolico (https://graphql-api.revolico.app/),
descubierta analizando los bundles JS del sitio (ver src/exploracion/).

Uso:
    py src/scraper_revolico.py

Genera:
    data/raw/clasificados/revolico/anuncios.csv              -> anuncios con las columnas del esquema
    data/raw/clasificados/revolico/revolico_paginas/*.json   -> respaldo crudo de cada página

Buenas prácticas: pausa entre páginas, pocas páginas, uso académico.
No se guardan teléfonos ni datos de contacto de los vendedores.
"""
import csv
import json
import os
import re
import sys
import time
from datetime import date

import requests

# Consola de Windows: evitar errores con caracteres no-ASCII (emojis, tildes)
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

# ---------------------------------------------------------------- configuración
GRAPHQL = "https://graphql-api.revolico.app/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

SUB_CAT_CARROS_SLUG = "vehiculos-carros"   # Vehículos -> Carros
PROVINCIA_SLUG = "la-habana"               # La Habana
PAGE_LENGTH = 50                 # anuncios por página (máx 50)
MIN_ANUNCIOS = 600              # meta mínima de anuncios únicos (ampliación Fase 5)
MAX_PAGES = 16                   # tope de páginas para no abusar
PAUSA_SEG = 4                    # pausa entre peticiones (respetar el sitio)

BASE_URL = "https://www.revolico.com"
HOY = date.today().isoformat()

RUTA_CSV = os.path.join("data", "raw", "anuncios.csv")
RUTA_CRUDO = os.path.join("data", "raw", "revolico_paginas")   # JSON por página, organizados

# Municipios de La Habana (id -> nombre), obtenidos de la API
MUNICIPIOS = {
    "34": "Arroyo Naranjo", "35": "Boyeros", "36": "Centro Habana",
    "37": "Cerro", "38": "Cotorro", "39": "Diez de Octubre",
    "40": "Guanabacoa", "41": "Habana del Este", "42": "Habana Vieja",
    "43": "La Lisa", "44": "Marianao", "45": "Playa", "46": "Plaza",
    "47": "Regla", "48": "San Miguel del Padrón",
}

# Marcas típicas del mercado cubano -> nombre normalizado
MARCAS = {
    "lada": "lada", "vaz": "lada", "moskvich": "moskvich", "gaz": "gaz",
    "uaz": "uaz", "toyota": "toyota", "hyundai": "hyundai", "kia": "kia",
    "geely": "geely", "peugeot": "peugeot", "renault": "renault",
    "citroen": "citroen", "citroën": "citroen", "mercedes": "mercedes-benz",
    "mercedes-benz": "mercedes-benz", "bmw": "bmw", "audi": "audi",
    "chevrolet": "chevrolet", "ford": "ford", "nissan": "nissan",
    "mitsubishi": "mitsubishi", "suzuki": "suzuki", "volkswagen": "volkswagen",
    "vw ": "volkswagen", "skoda": "skoda", "seat": "seat", "fiat": "fiat",
    "dodge": "dodge", "jeep": "jeep", "honda": "honda", "dacia": "dacia",
    "byd": "byd", "chery": "chery", "great wall": "great wall", "mini": "mini",
    "lexus": "lexus", "mazda": "mazda", "opel": "opel", "volvo": "volvo",
    "subaru": "subaru", "lincoln": "lincoln", "cadillac": "cadillac",
    "chrysler": "chrysler", "land rover": "land rover", "jaguar": "jaguar",
    "porsche": "porsche", "tesla": "tesla", "jac": "jac", "daewoo": "daewoo",
    "baic": "baic", "ssangyong": "ssangyong", "chana": "chana", "lifan": "lifan",
    "confianza": "confianza", "daihatsu": "daihatsu", "isuzu": "isuzu",
    "foton": "foton", "dongfeng": "dongfeng", "wanli": "wanli",
    "willy": "willy", "willys": "willy", "pontiac": "pontiac",
    "oldsmobile": "oldsmobile", "buick": "buick", "plymouth": "plymouth",
    "peugeot 404": "peugeot", "chevy": "chevrolet", "gmc": "gmc",
}

# Palabras genéricas que sobran al extraer el modelo del título
PALABRAS_BASURA = {
    "venta", "en", "de", "la", "el", "los", "las", "carro", "carros", "auto",
    "autos", "moderno", "modernos", "nuevo", "nuevos", "importado",
    "importados", "0", "km", "usd", "cup", "mlc", "euro", "se", "vende",
    "año", "ano", "original", "nacional", "clásico", "clasico", "cuba",
    "habana", "garantía", "garantia", "precio", "a", "con", "y", "para",
    "por", "o", "solo", "x", "automatico", "automatica", "mecanico",
}

QUERY_ADS = """
query AdsSearch(
  $category: ID
  $subcategory: ID
  $contains: String
  $categorySlug: String
  $subcategorySlug: String
  $page: Int
  $provinceSlug: String
  $municipalitySlug: String
  $pageLength: Int
) {
  adsPerPage(
    category: $category
    subcategory: $subcategory
    contains: $contains
    categorySlug: $categorySlug
    subcategorySlug: $subcategorySlug
    page: $page
    provinceSlug: $provinceSlug
    municipalitySlug: $municipalitySlug
    pageLength: $pageLength
  ) {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
      pageCount
    }
    edges {
      node {
        id
        title
        price
        currency
        permalink
        imagesCount
        updatedOnToOrder
        isPromoted
        provinceId
        municipalityId
        mainImage {
          gcsKey
        }
        viewCount
      }
    }
    meta {
      total
    }
  }
}
"""


# ---------------------------------------------------------------- parsing
def parse_marca_modelo_anio(titulo: str):
    """Extrae marca, modelo y año aproximados del título del anuncio."""
    t = titulo.lower()
    anio = None
    m = re.search(r"\b(19[5-9]\d|20[0-3]\d)\b", t)
    if m:
        anio = int(m.group(1))

    marca = ""
    for nombre, norm in MARCAS.items():
        if re.search(r"(^|[^a-záéíóúñ])" + re.escape(nombre) + r"($|[^a-záéíóúñ])", t):
            marca = norm
            break

    # Quitar marca, año y basura para quedarnos con un modelo aproximado
    resto = t
    if marca:
        resto = re.sub(re.escape(marca), " ", resto)
    if anio:
        resto = re.sub(str(anio), " ", resto)
    resto = re.sub(r"[^a-z0-9áéíóúñ ]+", " ", resto)
    palabras = [p for p in resto.split() if p not in PALABRAS_BASURA]
    modelo = " ".join(palabras[:3]).strip()
    return marca, modelo, anio


def node_a_fila(node: dict, total_pagina: int, pagina: int) -> dict:
    """Convierte un anuncio (node de GraphQL) en una fila del esquema."""
    titulo = (node.get("title") or "").strip()
    marca, modelo, anio = parse_marca_modelo_anio(titulo)

    precio = node.get("price")
    moneda = node.get("currency")
    precio_usd = precio if moneda == "USD" else ""

    municipio = MUNICIPIOS.get(str(node.get("municipalityId") or ""), "")

    return {
        "fuente": "anuncio",
        "fecha": HOY,
        "ubicacion": f"La Habana, {municipio}".rstrip(", "),
        "marca": marca,
        "modelo": modelo,
        "anio": anio if anio else "",
        "precio_original": precio if precio is not None else "",
        "moneda": moneda or "",
        "precio_usd": precio_usd,
        "combustible": "",
        "transmision": "",
        "estado": "",
        "color": "",
        "notas": "",
        "km": "",
        "descripcion": titulo,
        "url": BASE_URL + (node.get("permalink") or ""),
        # columnas extra útiles para el EDA
        "anuncio_id": node.get("id"),
        "vistas": node.get("viewCount"),
        "imagenes": node.get("imagesCount"),
        "es_destacado": node.get("isPromoted"),
        "actualizado_el": node.get("updatedOnToOrder"),
        "pagina": pagina,
        "total_pagina": total_pagina,
    }


# ---------------------------------------------------------------- peticiones
def pedir_pagina(pagina: int, pausa_anterior=True):
    """Una página de anuncios con pausa respetuosa entre peticiones."""
    if pausa_anterior:
        print(f"  (pausa de {PAUSA_SEG} s...)", flush=True)
        time.sleep(PAUSA_SEG)
    payload = {
        "query": QUERY_ADS,
        "variables": {
            "subcategorySlug": SUB_CAT_CARROS_SLUG,
            "provinceSlug": PROVINCIA_SLUG,
            "page": pagina,
            "pageLength": PAGE_LENGTH,
        },
    }
    r = requests.post(GRAPHQL, headers=HEADERS, json=payload, timeout=30)
    r.raise_for_status()
    body = r.json()
    if body.get("errors"):
        raise RuntimeError(f"GraphQL errors: {body['errors'][:2]}")
    return body["data"]["adsPerPage"]


# ---------------------------------------------------------------- guardado
def guardar_crudos(respuestas):
    for i, data in enumerate(respuestas, start=1):
        archivo = os.path.join(RUTA_CRUDO, f"revolico_pagina_{i}.json")
        with open(archivo, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False)
    print(f"Respaldo crudo: {len(respuestas)} archivo(s) en {RUTA_CRUDO}")


COLUMNAS = [
    "fuente", "fecha", "ubicacion", "marca", "modelo", "anio",
    "precio_original", "moneda", "precio_usd", "combustible", "transmision",
    "estado", "color", "notas", "km", "descripcion", "url",
    "anuncio_id", "vistas", "imagenes", "es_destacado", "actualizado_el",
    "pagina", "total_pagina",
]


def guardar_csv(filas):
    os.makedirs(os.path.dirname(RUTA_CSV), exist_ok=True)
    with open(RUTA_CSV, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=COLUMNAS)
        writer.writeheader()
        writer.writerows(filas)
    print(f"CSV guardado: {RUTA_CSV} ({len(filas)} filas)")


# ---------------------------------------------------------------- principal
def main():
    filas = []
    vistos = set()
    respuestas = []
    total_general = None

    for pagina in range(1, MAX_PAGES + 1):
        print(f"--- Página {pagina} ---", flush=True)
        try:
            data = pedir_pagina(pagina, pausa_anterior=pagina > 1)
        except Exception as e:
            print(f"  Error en página {pagina}: {e}")
            break

        respuestas.append(data)
        total_general = data["meta"]["total"]
        page_info = data["pageInfo"]
        nodos = [e["node"] for e in data["edges"]]
        nuevas = 0
        for node in nodos:
            aid = node.get("id")
            if aid in vistos:
                continue
            vistos.add(aid)
            filas.append(node_a_fila(node, len(nodos), pagina))
            nuevas += 1
        print(f"  Obtenidos {len(nodos)} | nuevos únicos: {nuevas} "
              f"| acumulado: {len(filas)}")

        if not page_info.get("hasNextPage"):
            print("  No hay más páginas.")
            break
        if len(filas) >= MIN_ANUNCIOS:
            print(f"  Meta alcanzada ({MIN_ANUNCIOS} anuncios únicos).")
            break
        if pagina >= MAX_PAGES:
            print(f"  Se llegó al tope de {MAX_PAGES} páginas por cortesía.")

    print("=" * 60)
    print(f"TOTAL de anuncios DE CARROS en La Habana según Revolico: {total_general}")
    print(f"Anuncios únicos guardados: {len(filas)}")

    # Resumen rápido por marcas
    marcas = {}
    for f in filas:
        marcas[f["marca"] or "(sin marca)"] = marcas.get(f["marca"] or "(sin marca)", 0) + 1
    print("Marcas más frecuentes en la muestra:")
    for m, c in sorted(marcas.items(), key=lambda x: -x[1])[:10]:
        print(f"   {m:<16} {c}")

    guardar_crudos(respuestas)
    guardar_csv(filas)
    return 0


if __name__ == "__main__":
    sys.exit(main())