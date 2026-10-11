#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
src/extraer_catalogo_mcv.py
Etapa 01 (nuevas capturas): extrae el catálogo de precios de la tienda online
de MCV Comercial (https://tienda.mcvcommercial.com), que corre sobre la
plataforma cubana **pymesbulevar** (Guajiritos SRL).

Aplica el mismo patrón de "ingeniería inversa del JS" que en Revolico
(journal 002) y que se dejó documentado como pendiente en el handoff 005:

  1. Descarga el shell HTML de la tienda y localiza el bundle Angular
     `main.<hash>.js`.
  2. Del entorno embebido en el bundle extrae:
       apiUrl        = https://api.pymesbulevar.com/v1/
       tokenBusiness = JWT con { data: { BusinessId, name, email } }
  3. Llama a la API pública con los headers que usa el frontend:
       xxx-ff-id: <tokenBusiness>   (identifica el negocio)
       language:  es
       version:   <app>
  4. Pagina `product` con el filtro `filter[$and][BusinessId]=<id>` usando
     `limit` + `offset` (el parámetro `page` NO funciona: repite la 1ª página).
  5. Traduce CategoryId/BrandId con `category-front` y `brand`.

Genera:
  data/raw/comercializadoras/catalogos/catalogo_mcv.csv

No resuelve captchas ni requiere login: sólo endpoints públicos del catálogo.
Hace pausas entre peticiones para no saturar el servicio.
"""
import os
import re
import sys
import csv
import json
import time
import base64
from datetime import datetime

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

import requests
import urllib3

urllib3.disable_warnings()

TIENDA = "https://tienda.mcvcommercial.com/"
OUT_CSV = os.path.join("data", "raw", "comercializadoras", "catalogos", "catalogo_mcv.csv")
LIMIT = 100          # tamaño de página de la API
PAUSA = 0.5          # s entre peticiones
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0 Safari/537.36")


def _headers(api_url):
    return {
        "User-Agent": UA,
        "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
        "Origin": TIENDA.rstrip("/"),
        "Referer": TIENDA,
        "Accept": "application/json",
    }


def descargar_entorno():
    """Lee el bundle Angular y extrae apiUrl, tokenBusiness y versión."""
    shell = requests.get(TIENDA, headers={"User-Agent": UA}, timeout=25, verify=False).text
    m = re.search(r'(main\.[0-9a-f]+\.js)', shell)
    if not m:
        raise RuntimeError("No se encontró el bundle main.*.js en el shell de la tienda")
    main_name = m.group(1)
    js = requests.get(TIENDA + main_name, headers={"User-Agent": UA}, timeout=30, verify=False).text

    api_url = re.search(r'apiUrl\s*:\s*"([^"]+)"', js)
    token = re.search(r'tokenBusiness\s*:\s*"([^"]+)"', js)
    version = re.search(r'versions\s*:\s*\{\s*app\s*:\s*"([^"]+)"', js)
    if not api_url or not token:
        raise RuntimeError("El bundle no expone apiUrl/tokenBusiness (¿cambió el frontend?)")

    tok = token.group(1)
    business_id = None
    try:
        payload = tok.split(".")[1]
        payload += "=" * (-len(payload) % 4)
        data = json.loads(base64.urlsafe_b64decode(payload))
        business_id = (data.get("data") or {}).get("BusinessId")
    except Exception:
        pass

    return {
        "main": main_name,
        "api_url": api_url.group(1),
        "token": tok,
        "version": version.group(1) if version else "1.0.0",
        "business_id": business_id,
    }


def _get(api_url, path, headers, params=None):
    r = requests.get(api_url + path, headers=headers, params=params, timeout=30, verify=False)
    r.raise_for_status()
    return r.json()


def _nombre(value):
    """name puede venir como {"es","en"} o como string JSON."""
    if isinstance(value, dict):
        return value.get("es") or value.get("en")
    if isinstance(value, str):
        try:
            j = json.loads(value)
            if isinstance(j, dict):
                return j.get("es") or j.get("en")
        except Exception:
            pass
        return value
    return value


def extraer_categorias(api_url, headers):
    cats = {}
    for c in _get(api_url, "category-front", headers).get("data", []):
        cats[c.get("id")] = _nombre(c.get("name"))
    return cats


def extraer_marcas(api_url, headers):
    marcas = {}
    offset = 0
    while True:
        data = _get(api_url, "brand", headers, {"limit": LIMIT, "offset": offset}).get("data", [])
        for b in data:
            marcas[b.get("id")] = _nombre(b.get("name"))
        if len(data) < LIMIT:
            break
        offset += LIMIT
        time.sleep(PAUSA)
    return marcas


def extraer_productos(api_url, headers, business_id):
    vistos = {}
    offset = 0
    while True:
        data = _get(api_url, "product", headers, {
            "limit": LIMIT,
            "offset": offset,
            "filter[$and][BusinessId]": business_id,
        }).get("data", [])
        for p in data:
            vistos[p.get("id")] = p
        print(f"  offset {offset:>4} -> {len(data):>3} (acumulado {len(vistos)})")
        if len(data) < LIMIT:
            break
        offset += LIMIT
        time.sleep(PAUSA)
    return list(vistos.values())


def main():
    env = descargar_entorno()
    print(f"[i] bundle {env['main']} | apiUrl {env['api_url']} | "
          f"BusinessId {env['business_id']} | version {env['version']}")
    headers = _headers(env["api_url"])
    headers["xxx-ff-id"] = env["token"]
    headers["language"] = "es"
    headers["version"] = env["version"]

    cats = extraer_categorias(env["api_url"], headers)
    marcas = extraer_marcas(env["api_url"], headers)
    print(f"[i] categorías {len(cats)} | marcas {len(marcas)}")

    prods = extraer_productos(env["api_url"], headers, env["business_id"])
    print(f"[i] productos únicos: {len(prods)}")

    os.makedirs(os.path.dirname(OUT_CSV), exist_ok=True)
    with open(OUT_CSV, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["id", "nombre", "precio", "moneda", "categoria_id", "categoria",
                    "marca_id", "marca", "codigo", "tipo", "estado",
                    "fecha_consulta", "url"])
        hoy = datetime.now().strftime("%Y-%m-%d")
        for p in prods:
            w.writerow([
                p.get("id"), _nombre(p.get("name")), p.get("price"), p.get("currency"),
                p.get("CategoryId"), cats.get(p.get("CategoryId"), ""),
                p.get("BrandId"), marcas.get(p.get("BrandId"), ""),
                p.get("code"), p.get("type"), p.get("status"), hoy,
                TIENDA + "product/" + str(p.get("id")),
            ])
    print("[OK]", OUT_CSV)


if __name__ == "__main__":
    main()
