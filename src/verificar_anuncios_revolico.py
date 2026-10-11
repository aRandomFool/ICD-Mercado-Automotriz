"""Verificador de estado en vivo de los anuncios de Revolico.

Comprueba cada URL de `data/raw/clasificados/revolico/anuncios.csv` y clasifica
el estado real del anuncio leyendo la respuesta. Revolico **no** responde 404
ante anuncios retirados: devuelve HTTP 200 con una página de estado ("soft")
que se detecta por texto visible y por componentes del detalle:

    ACTIVO        -> el detalle se renderiza (Detail__Content/Details/InfoWrapper)
    DESPUBLICADO  -> "Este anuncio incumple las normas de publicación" (lo bajó Revolico)
    ELIMINADO     -> "El anunciante ha eliminado este anuncio"
    EXPIRADO      -> "Este anuncio expiró" / componente Detail__Expired
    ELIMINADO_404 -> el sitio responde 404 (sin página)
    ERROR         -> fallo de red / otro código HTTP

Headers necesarios (sin ellos el sitio responde 403): User-Agent de Chrome,
Accept-Language es-ES y Referer a https://www.revolico.com/.

Uso:
    py src/verificar_anuncios_revolico.py

Salidas:
    data/raw/clasificados/revolico/verificacion_anuncios.csv  (informe por anuncio)
    data/raw/clasificados/revolico/anuncios.csv               (+ columnas estado_verificacion, verificado_el)

Buenas prácticas: pausa corta entre peticiones, uso académico.
No se guardan teléfonos ni datos de contacto de los vendedores.
"""
import csv
import os
import re
import sys
import time
import html
from datetime import datetime, timezone

import requests

# Consola de Windows: evitar errores con caracteres no-ASCII (emojis, tildes)
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

# ---------------------------------------------------------------- configuración
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
    "Referer": "https://www.revolico.com/",
}

PAUSA_SEG = 0.12          # pausa entre peticiones (respetar el sitio)
TIMEOUT_SEG = 30          # timeout por petición

RUTA_CSV = os.path.join("data", "raw", "clasificados", "revolico", "anuncios.csv")
RUTA_INFORME = os.path.join("data", "raw", "clasificados", "revolico",
                            "verificacion_anuncios.csv")

COLUMNAS_INFORME = [
    "anuncio_id", "url", "estado_verificacion", "codigo_http", "verificado_el",
]


# ---------------------------------------------------------------- detección
def texto_visible(resp: requests.Response) -> str:
    """Texto visible (lower) de la página, sin scripts ni estilos."""
    t = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", resp.text,
               flags=re.S | re.I)
    t = re.sub(r"<[^>]+>", " ", t)
    return re.sub(r"\s+", " ", html.unescape(t)).lower()


def clasificar(resp: requests.Response) -> tuple:
    """Clasifica el estado del anuncio según la respuesta.

    Devuelve (estado, codigo_http). Orden de precedencia:
    despublicado > eliminado (anunciante) > expirado > activo.
    """
    codigo = resp.status_code
    if codigo == 404:
        return "eliminado_404", codigo
    if codigo != 200:
        return "error", codigo

    txt = resp.text
    vis = texto_visible(resp)

    if "anuncio despublicado" in vis or "incumple las normas de publicaci" in vis:
        return "despublicado", codigo
    if "anuncio eliminado" in vis or "el anunciante ha eliminado" in vis:
        return "eliminado", codigo
    if "Detail__Expired" in txt or "este anuncio expir" in vis:
        return "expirado", codigo
    return "activo", codigo


def verificar_url(session: requests.Session, url: str) -> tuple:
    """GET a una URL y clasificación. Captura errores de red como 'error'."""
    try:
        resp = session.get(url, timeout=TIMEOUT_SEG, allow_redirects=True)
        estado, codigo = clasificar(resp)
    except requests.RequestException as e:
        estado, codigo = f"error", f"EXC:{type(e).__name__}"
    except Exception as e:                      # inesperado (p. ej. parseo)
        estado, codigo = "error", f"EXC:{type(e).__name__}"
    return estado, codigo


# ---------------------------------------------------------------- guardado
def guardar_informe(filas: list) -> None:
    os.makedirs(os.path.dirname(RUTA_INFORME), exist_ok=True)
    with open(RUTA_INFORME, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=COLUMNAS_INFORME)
        writer.writeheader()
        writer.writerows(filas)
    print(f"Informe de verificación: {RUTA_INFORME} ({len(filas)} filas)")


def anotar_anuncios_csv(estado: dict, verificado_el: str) -> None:
    """Añade/actualiza columnas estado_verificacion y verificado_el en anuncios.csv."""
    with open(RUTA_CSV, "r", encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))

    extra = ["estado_verificacion", "verificado_el"]
    campo_datos = [c for c in rows[0] if c not in extra]
    tot_a = tot_d = tot_e = tot_x = tot_404 = tot_err = 0
    for r in rows:
        aid = r["anuncio_id"]
        est = estado.get(aid, "error")
        r["estado_verificacion"] = est
        r["verificado_el"] = verificado_el
        if est == "activo":
            tot_a += 1
        elif est == "despublicado":
            tot_d += 1
        elif est == "eliminado":
            tot_e += 1
        elif est == "expirado":
            tot_x += 1
        elif est == "eliminado_404":
            tot_404 += 1
        else:
            tot_err += 1

    # preservar orden de columnas original y añadir las nuevas al final
    cols = list(campo_datos)
    for c in extra:
        if c not in cols:
            cols.append(c)

    with open(RUTA_CSV, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)
    print(f"Anotado: {RUTA_CSV} ({len(rows)} filas)")
    print(f"  activos={tot_a} despublicados={tot_d} eliminados={tot_e} "
          f"expirados={tot_x} 404={tot_404} errores={tot_err}")


# ---------------------------------------------------------------- principal
def main() -> int:
    with open(RUTA_CSV, "r", encoding="utf-8-sig", newline="") as f:
        filas = list(csv.DictReader(f))

    print(f"Verificando {len(filas)} anuncios...", flush=True)
    session = requests.Session()
    session.headers.update(HEADERS)

    verificado_el = datetime.now(timezone.utc).isoformat(timespec="seconds")
    info_filas = []
    estado = {}
    for i, r in enumerate(filas, 1):
        aid, url = r["anuncio_id"], r["url"]
        est, codigo = verificar_url(session, url)
        estado[aid] = est
        info_filas.append({
            "anuncio_id": aid,
            "url": url,
            "estado_verificacion": est,
            "codigo_http": str(codigo),
            "verificado_el": verificado_el,
        })
        if i % 100 == 0 or i == len(filas):
            print(f"  {i}/{len(filas)}", flush=True)
        time.sleep(PAUSA_SEG)

    guardar_informe(info_filas)
    anotar_anuncios_csv(estado, verificado_el)
    print(f"Verificado el: {verificado_el}")
    return 0


if __name__ == "__main__":
    sys.exit(main())