#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Scraper ampliado de anuncios de carros en CUBA (nacional) — Revolico.

Ampliación 2026-10-26: de la muestra de 600 (solo La Habana, 12 páginas) al
universo completo de carros publicados en Revolico para todo el país
(~3.945 anuncios, 79 páginas de 50). Fuente única permitida: Revolico.

Fases:
  1. validación + piloto   : --piloto 2   (primeras N páginas, CSV aparte)
  2. escalado controlado   : por defecto recorre todo el universo con pausa
                             y reintentos; log por línea de tiempo
  3. cobertura             : provincia/municipio del catálogo oficial de la
                             API (16 provincias) + diccionario de marcas
                             ampliado (src/utils/marcas.py)

Reglas:
  - Sin teléfonos ni datos de contacto (decisión ética del proyecto).
  - User-agent identificable + pausa entre peticiones (respeto al sitio).
  - Nada de datos inventados: todo sale de la respuesta de la API.
  - Deduplicación por anuncio_id, por url y por hash de campos clave.
  - Merge con el dataset declarado (data/raw/clasificados/revolico/anuncios.csv)
    preservando estado_verificacion/verificado_el de las filas existentes;
    las filas nuevas quedan en estado 'pendiente' hasta ejecutar
    src/verificar_anuncios_revolico.py.

Uso:
    .venv/bin/python src/scraper_revolico_ampliado.py --piloto 2
    .venv/bin/python src/scraper_revolico_ampliado.py
    .venv/bin/python src/scraper_revolico_ampliado.py --max-paginas 40
"""
import argparse
import csv
import hashlib
import json
import os
import re
import sys
import time
from datetime import datetime, timezone

import requests

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from utils.marcas import MARCAS, normalizar_marca, _sin_acentos  # noqa: E402

# --------------------------------------------------------------- configuración
GRAPHQL = "https://graphql-api.revolico.app/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36 "
                  "ProyectoCD/1.0 (trabajo academico; Universidad de La Habana)",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

SUB_CAT_CARROS_SLUG = "vehiculos-carros"
PAGE_LENGTH = 50
PAUSA_SEG = 4.0            # pausa entre peticiones (respeto al sitio)
TIMEOUT_SEG = 45
REINTENTOS = 4
BACKOFF_SEG = 5            # espera base entre reintentos (5, 10, 15, ...)

HOY = datetime.now(timezone.utc).date().isoformat()

DIR_REVOLICO = os.path.join("data", "raw", "clasificados", "revolico")
RUTA_CSV = os.path.join(DIR_REVOLICO, "anuncios.csv")
DIR_RESPALDO = os.path.join(DIR_REVOLICO, "respaldo_ampliado_%s" % HOY)
DIR_CATALOGO = os.path.join(DIR_REVOLICO, "catalogo_geo")
RUTA_LOG = os.path.join(DIR_REVOLICO, "scraping_ampliado_%s.log" % HOY)

# Campos del esquema (declarado en docs/esquema_datos.md) + provincia/municipio.
# provincia/municipio salen del catálogo oficial de la API (no de texto libre).
COLUMNAS = [
    "fuente", "fecha", "ubicacion", "provincia", "municipio",
    "marca", "modelo", "anio",
    "precio_original", "moneda", "precio_usd",
    "combustible", "transmision", "estado", "color", "notas",
    "km", "descripcion", "url",
    "anuncio_id", "vistas", "imagenes", "es_destacado", "actualizado_el",
    "pagina", "total_pagina",
    "estado_verificacion", "verificado_el",
]

# Conversión a USD: SOLO con tasas documentadas en data/tasas_cambio/.
# MLC no tiene tasa documentada en el proyecto -> precio_usd queda vacío.
# (Se respeta "no inventes conversiones".)
TASA_CUP_USD = 710.0        # data/tasas_cambio/tasas_usd.csv (2026-09-24)
TASA_EUR_USD = 1.120529     # data/tasas_cambio/tasas_eur_usd.csv (2026-10-11)

# --------------------------------------------------------------- queries GraphQL
QUERY_PROVINCIAS = """
query ProvincesWithMunicipalities {
  provinces {
    id
    name
    slug
    municipalities { id name slug }
  }
}
"""

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
    pageInfo { startCursor endCursor hasNextPage hasPreviousPage pageCount }
    edges {
      node {
        id title price currency permalink imagesCount
        updatedOnToOrder isPromoted provinceId municipalityId
        viewCount
      }
    }
    meta { total }
  }
}
"""

# ------------------------------------------------------------------- logging
_LOG_FH = None


def log(mensaje: str) -> None:
    linea = "[%s] %s" % (datetime.now().isoformat(timespec="seconds"), mensaje)
    print(linea, flush=True)
    global _LOG_FH
    if _LOG_FH is None:
        os.makedirs(DIR_REVOLICO, exist_ok=True)
        _LOG_FH = open(RUTA_LOG, "a", encoding="utf-8")
    _LOG_FH.write(linea + "\n")
    _LOG_FH.flush()


def post_graphql(query: str, variables: dict) -> dict:
    """POST con reintentos y backoff lineal. Devuelve el JSON completo."""
    ultimo_error = None
    for intento in range(1, REINTENTOS + 1):
        try:
            r = requests.post(GRAPHQL, headers=HEADERS,
                              json={"query": query, "variables": variables},
                              timeout=TIMEOUT_SEG)
            r.raise_for_status()
            body = r.json()
            if body.get("errors"):
                raise RuntimeError("GraphQL errors: %s" % str(body["errors"])[:200])
            return body
        except Exception as e:  # red, 5xx, GraphQL
            ultimo_error = e
            espera = BACKOFF_SEG * intento
            log("  [aviso] intento %d/%d falló (%s); reintento en %ds"
                % (intento, REINTENTOS, type(e).__name__, espera))
            time.sleep(espera)
    raise RuntimeError("agotados %d reintentos: %s" % (REINTENTOS, ultimo_error))


# ------------------------------------------------------- catálogo geográfico
def obtener_catalogo_geo() -> dict:
    """Descarga (y cachea) el catálogo provincias/municipios de la API.

    Devuelve {'provincias': {id: nombre}, 'municipios': {id: (nombre, provincia_id)}}
    """
    os.makedirs(DIR_CATALOGO, exist_ok=True)
    ruta_cache = os.path.join(DIR_CATALOGO, "provincias_municipios.json")
    if os.path.exists(ruta_cache):
        with open(ruta_cache, encoding="utf-8") as f:
            provincias = json.load(f)
        log("catálogo geográfico desde caché: %s" % ruta_cache)
    else:
        body = post_graphql(QUERY_PROVINCIAS, {})
        provincias = body["data"]["provinces"]
        with open(ruta_cache, "w", encoding="utf-8") as f:
            json.dump(provincias, f, ensure_ascii=False, indent=2)
        log("catálogo geográfico descargado: %d provincias -> %s"
            % (len(provincias), ruta_cache))

    prov_ids, mun_ids = {}, {}
    for p in provincias:
        prov_ids[str(p["id"])] = p["name"]
        for m in p.get("municipalities", []):
            mun_ids[str(m["id"])] = (m["name"], str(p["id"]))
    return {"provincias": prov_ids, "municipios": mun_ids}


# ----------------------------------------------------------------- parsing
def parse_anio(titulo: str):
    """Año 1950-2039 si aparece como palabra independiente (no precios)."""
    m = re.search(r"\b(19[5-9]\d|20[0-3]\d)\b", titulo)
    return int(m.group(1)) if m else None


def parse_km(titulo: str):
    """Kilometraje SOLO si el título lo dice explícitamente ('120000 km',
    '0 km' = 0km). Si no está, devuelve '' (no se adivina)."""
    t = titulo.lower()
    m = re.search(r"\b(\d{1,3}(?:[.,]\d{3})+|\d{3,7})\s*(?:kil[oó]metros|km)\b", t)
    if m:
        return int(m.group(1).replace(".", "").replace(",", ""))
    if re.search(r"\b0\s?km\b", t):
        return 0
    return ""


def parse_combustible(titulo: str) -> str:
    t = _sin_acentos(titulo.lower())
    if "electrico" in t or "electric" in t:
        return "electrico"
    if "hibrid" in t:
        return "hibrido"
    if "diesel" in t or "diésel" in t:
        return "diesel"
    if "gasolina" in t or "gas " in t or t.endswith("gas"):
        return "gasolina"
    return ""


def parse_transmision(titulo: str) -> str:
    t = _sin_acentos(titulo.lower())
    if "automatic" in t or "auto " in t:
        return "automatica"
    if "manual" in t:
        return "manual"
    return ""


def parse_modelo(titulo: str, marca: str, anio) -> str:
    """Modelo aproximado: se quitan marca, año y palabras basura del título."""
    t = titulo.lower()
    resto = t
    if marca:
        resto = re.sub(re.escape(marca), " ", resto, count=1)
    if anio:
        resto = resto.replace(str(anio), " ", 1)
    resto = re.sub(r"[^a-z0-9áéíóúñ ]+", " ", resto)
    basura = {
        "venta", "en", "de", "la", "el", "los", "las", "carro", "carros",
        "auto", "autos", "moderno", "modernos", "nuevo", "nuevos",
        "importado", "importados", "km", "usd", "cup", "mlc", "euro",
        "se", "vende", "año", "ano", "original", "nacional", "clasico",
        "cuba", "habana", "garantia", "precio", "a", "con", "y", "para",
        "por", "o", "solo", "x", "automatico", "automatica", "mecanico",
        "interesados", "llamar", "whatsapp", "fotos", "oportunidad",
    }
    palabras = [p for p in resto.split() if p not in basura][:3]
    return " ".join(palabras).strip()


def precio_a_usd(precio, moneda: str):
    """Solo conversiones con tasa documentada. MLC/otro -> '' (pendiente).

    Devuelve (precio_usd, nota_tasa). nota_tasa vacía si no se convierte.
    """
    if precio is None or moneda is None:
        return "", ""
    m = str(moneda).strip().upper()
    if m == "USD":
        return precio, ""
    if m == "CUP":
        return round(precio / TASA_CUP_USD, 2), \
            "CUP/USD=710 (tasas_usd.csv, 2026-09-24)"
    if m == "EUR":
        return round(precio * TASA_EUR_USD, 2), \
            "EUR/USD=1.120529 (tasas_eur_usd.csv, 2026-10-11)"
    return "", "moneda %s sin tasa documentada; precio_usd pendiente" % m


def node_a_fila(node: dict, geo: dict, pagina: int, total_pagina: int) -> dict:
    titulo = (node.get("title") or "").strip()
    marca = normalizar_marca(titulo)
    anio = parse_anio(titulo)
    modelo = parse_modelo(titulo, marca, anio)

    precio = node.get("price")
    moneda = node.get("currency") or ""
    precio_usd, nota_tasa = precio_a_usd(precio, moneda)

    prov_id = str(node.get("provinceId") or "")
    mun_id = str(node.get("municipalityId") or "")
    provincia = geo["provincias"].get(prov_id, "")
    mun_info = geo["municipios"].get(mun_id)
    municipio = mun_info[0] if mun_info else ""

    notas = nota_tasa
    km = parse_km(titulo)
    if km != "":
        notas = (notas + "; " if notas else "") + "km extraído del título"

    return {
        "fuente": "anuncio",
        "fecha": HOY,
        "ubicacion": ", ".join(x for x in (provincia, municipio) if x),
        "provincia": provincia,
        "municipio": municipio,
        "marca": marca,
        "modelo": modelo,
        "anio": anio if anio else "",
        "precio_original": precio if precio is not None else "",
        "moneda": moneda,
        "precio_usd": precio_usd,
        "combustible": parse_combustible(titulo),
        "transmision": parse_transmision(titulo),
        "estado": "",       # no expuesto por la API; no se inventa
        "color": "",        # idem
        "notas": notas,
        "km": km,
        "descripcion": titulo,   # la API no expone texto largo en AdsSearch
        "url": "https://www.revolico.com" + (node.get("permalink") or ""),
        "anuncio_id": str(node.get("id")),
        "vistas": node.get("viewCount") if node.get("viewCount") is not None else "",
        "imagenes": node.get("imagesCount") if node.get("imagesCount") is not None else "",
        "es_destacado": node.get("isPromoted"),
        "actualizado_el": node.get("updatedOnToOrder") or "",
        "pagina": pagina,
        "total_pagina": total_pagina,
        "estado_verificacion": "pendiente",
        "verificado_el": "",
    }


# ------------------------------------------------------------ deduplicación
def hash_fila(f: dict) -> str:
    """Hash de campos clave: fuente+marca+modelo+año+precio+provincia+descripción."""
    limpia = _sin_acentos(str(f.get("descripcion") or "").lower())
    limpia = re.sub(r"\s+", " ", limpia).strip()
    clave = "|".join(str(x) for x in [
        f.get("fuente", ""), f.get("marca", ""), f.get("modelo", ""),
        f.get("anio", ""), f.get("precio_original", ""),
        f.get("provincia", "") or f.get("ubicacion", ""), limpia,
    ])
    return hashlib.sha1(clave.encode("utf-8")).hexdigest()


# ------------------------------------------------------------------ scraping
def paginas_disponibles(max_paginas: int) -> tuple:
    """Consulta la página 1 (sin provincia) para conocer pageCount/total."""
    body = post_graphql(QUERY_ADS, {
        "subcategorySlug": SUB_CAT_CARROS_SLUG,
        "page": 1, "pageLength": PAGE_LENGTH,
    })
    ap = body["data"]["adsPerPage"]
    total = ap["meta"]["total"]
    page_count = ap["pageInfo"]["pageCount"]
    limite = page_count if max_paginas <= 0 else min(page_count, max_paginas)
    return total, page_count, limite, ap


def scrape(piloto_paginas: int, max_paginas: int, desde: int = 1) -> list:
    geo = obtener_catalogo_geo()
    os.makedirs(DIR_RESPALDO, exist_ok=True)

    total, page_count, limite, primera = paginas_disponibles(max_paginas)
    log("universo Revolico (carros, todo el país): total=%s pageCount=%d "
        "a recorrer=%d (tope=%s, desde=%d)" % (total, page_count, limite,
                                               max_paginas or "sin tope", desde))

    filas, ids_vistos = [], set()
    ap = primera if desde == 1 else None   # reanudar: no confiar en la pág. 1
    for pagina in range(desde, limite + 1):
        if ap is None or pagina > desde:
            time.sleep(PAUSA_SEG)
            try:
                body = post_graphql(QUERY_ADS, {
                    "subcategorySlug": SUB_CAT_CARROS_SLUG,
                    "page": pagina, "pageLength": PAGE_LENGTH,
                })
                ap = body["data"]["adsPerPage"]
            except RuntimeError as e:
                log("  [error] página %d: %s — se detiene el recorrido" % (pagina, e))
                break

        nodos = [e["node"] for e in ap["edges"]]
        # respaldo crudo de la página (trazabilidad total)
        with open(os.path.join(DIR_RESPALDO, "pagina_%03d.json" % pagina),
                  "w", encoding="utf-8") as f:
            json.dump(ap, f, ensure_ascii=False, indent=1)

        nuevas = 0
        for node in nodos:
            aid = str(node.get("id"))
            if aid in ids_vistos:
                continue
            ids_vistos.add(aid)
            filas.append(node_a_fila(node, geo, pagina, len(nodos)))
            nuevas += 1
        log("  página %d/%d: %d nodos, %d nuevos (acumulado %d)"
            % (pagina, limite, len(nodos), nuevas, len(filas)))

        if pagina == 1 or pagina % 10 == 0:
            time.sleep(PAUSA_SEG)  # pausa extra cada 10 páginas

    log("recorrido finalizado: %d anuncios únicos" % len(filas))
    return filas


# ------------------------------------------------------------- merge + guardado
def cargar_existente() -> tuple:
    """Carga el dataset declarado actual (600 filas) si existe."""
    if not os.path.exists(RUTA_CSV):
        return [], []
    with open(RUTA_CSV, encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        filas = [dict(r) for r in reader]
        campos = list(reader.fieldnames)
    log("dataset existente cargado: %d filas (%s)" % (len(filas), RUTA_CSV))
    return filas, campos


def merge(existentes: list, nuevas: list) -> tuple:
    """Une preservando verificación de las existentes; dedup triple."""
    ids_exist = {str(f.get("anuncio_id")) for f in existentes}
    urls_exist = {str(f.get("url")).rstrip("/").lower() for f in existentes}
    hashes_exist = {hash_fila(f) for f in existentes}

    anadidas = 0
    for f in nuevas:
        aid = str(f.get("anuncio_id"))
        url = str(f.get("url")).rstrip("/").lower()
        h = hash_fila(f)
        if aid in ids_exist or url in urls_exist or h in hashes_exist:
            continue
        # fila nueva: sin verificación previa
        f["estado_verificacion"] = "pendiente"
        f["verificado_el"] = ""
        nuevas_dict = f
        existentes.append(nuevas_dict)
        ids_exist.add(aid)
        urls_exist.add(url)
        hashes_exist.add(h)
        anadidas += 1

    # rellenar provincia/municipio de las filas viejas (solo La Habana, venían
    # en 'ubicacion' como "La Habana, Municipio")
    for f in existentes:
        if not f.get("provincia"):
            ub = f.get("ubicacion") or ""
            partes = [p.strip() for p in ub.split(",") if p.strip()]
            if partes:
                f["provincia"] = partes[0] if partes[0] != "La Habana" else "La Habana"
                f["municipio"] = partes[-1] if len(partes) > 1 else ""
            f.setdefault("provincia", "")
            f.setdefault("municipio", "")
        for c in COLUMNAS:
            f.setdefault(c, "")

    log("merge: %d existentes + %d nuevas filas añadidas = %d totales"
        % (len(existentes) - anadidas, anadidas, len(existentes)))
    return existentes, anadidas


def guardar_csv(filas: list) -> None:
    tmp = RUTA_CSV + ".tmp"
    with open(tmp, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=COLUMNAS, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(filas)
    os.replace(tmp, RUTA_CSV)   # escritura atómica
    log("CSV guardado: %s (%d filas)" % (RUTA_CSV, len(filas)))


def guardar_piloto(filas: list) -> None:
    ruta = os.path.join(DIR_REVOLICO, "piloto_%s.csv" % HOY)
    with open(ruta, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=COLUMNAS, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(filas)
    log("PILOTO guardado: %s (%d filas) — NO toca anuncios.csv" % (ruta, len(filas)))


# ------------------------------------------------------------------- main
def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--piloto", type=int, default=0, metavar="N",
                    help="fase 1: solo N primeras páginas, CSV aparte (no merge)")
    ap.add_argument("--max-paginas", type=int, default=0, metavar="N",
                    help="fase 2: tope de páginas (0 = universo completo)")
    ap.add_argument("--desde", type=int, default=1, metavar="N",
                    help="reanudación: primera página a recorrer (merge por id evita duplicados)")
    args = ap.parse_args()

    log("=" * 70)
    log("inicio scraper ampliado (piloto=%s max_paginas=%s desde=%d)"
        % (args.piloto or "-", args.max_paginas or "-", args.desde))

    filas = scrape(args.piloto, args.piloto if args.piloto else args.max_paginas,
                   args.desde)

    if args.piloto:
        guardar_piloto(filas)
        return 0

    existentes, campos = cargar_existente()
    merged, anadidas = merge(existentes, filas)
    guardar_csv(merged)
    log("resumen: %d anuncios únicos scrapeados, %d nuevas tras merge, "
        "%d totales en anuncios.csv" % (len(filas), anadidas, len(merged)))
    log("siguiente paso recomendado: .venv/bin/python src/verificar_anuncios_revolico.py")
    return 0


if __name__ == "__main__":
    sys.exit(main())
