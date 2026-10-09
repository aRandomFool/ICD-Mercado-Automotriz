"""Descubre la API interna de Revolico analizando los bundles JS de la página.

Uso: se descarga el HTML de la búsqueda, se recogen los archivos JS de /_next/static/chunks,
se extraen literales de string que parecen rutas o URLs, y se filtran candidatas de API.
"""
import json
import os
import re
import sys

import requests

PAGE_URL = "https://www.revolico.com/search?q=carros"
BASE = "https://www.revolico.com"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
}
TMP = r"C:\Users\Manu-Dany\AppData\Local\Temp\opencode\revolico_chunks"
os.makedirs(TMP, exist_ok=True)


def get(url):
    r = requests.get(url, headers=HEADERS, timeout=30)
    r.raise_for_status()
    return r.text


def get_bytes(url):
    r = requests.get(url, headers=HEADERS, timeout=60)
    r.raise_for_status()
    return r.content


def main():
    html = get(PAGE_URL)
    print("HTML OK, tamaño:", len(html))

    # Todos los archivos JS de la app (chunks Next.js)
    chunk_urls = sorted(
        set(re.findall(r'(/_next/static/chunks/[a-zA-Z0-9_\-./]+\.js)', html))
    )
    print(f"Chunks encontrados: {len(chunk_urls)}")

    literals = set()
    for cu in chunk_urls:
        name = cu.rsplit("/", 1)[-1]
        local = os.path.join(TMP, name)
        if not os.path.exists(local):
            try:
                data = get_bytes(BASE + cu)
                with open(local, "wb") as f:
                    f.write(data)
                print(f"  descargado {name} ({len(data)//1024} KB)")
            except Exception as e:
                print(f"  error {name}: {e}")
                continue
        else:
            print(f"  ya estaba {name}")
        try:
            with open(local, "r", encoding="utf-8", errors="replace") as f:
                code = f.read()
        except Exception:
            continue

        # Literales de string que parecen rutas o URLs
        for m in re.finditer(r'"((?:https?:\/\/|\/)[^"\\]{2,120})"', code):
            literals.add(m.group(1))
        for m in re.finditer(r"'((?:https?:\/\/|\/)[^'\\]{2,120})'", code):
            literals.add(m.group(1))

    print("=" * 70)
    print(f"Literales tipo-ruta únicos: {len(literals)}")

    def interesting(s):
        low = s.lower()
        return any(k in low for k in ("api", "search", "advert", "/ad", "start", "query",
                                      "listing", "item"))

    candidatas = sorted(s for s in literals if interesting(s))
    for c in candidatas:
        print("  ->", c)


if __name__ == "__main__":
    sys.exit(main())