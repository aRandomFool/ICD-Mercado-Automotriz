"""Sondeo temporal: inspecciona la respuesta de la ruta de datos de Revolico."""
import json
import requests

URL = "https://www.revolico.com/_next/data/V4Lr5ZaSXHnX-lt_cBZHd/search.json?q=carros"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
}

r = requests.get(URL, headers=HEADERS, timeout=30)
print("STATUS:", r.status_code)
print("CONTENT-TYPE:", r.headers.get("content-type"))
print("LEN:", len(r.text))
print("=" * 60)
print("PRIMEROS 800 CARACTERES:")
print(r.text[:800])
print("=" * 60)

# ¿Es JSON? ¿Qué estructura tiene?
try:
    data = r.json()
    print("ES JSON. Claves de nivel superior:", list(data.keys()))
    props = data.get("pageProps", {})
    if isinstance(props, dict):
        print("Claves en pageProps:", list(props.keys())[:40])
except Exception as e:
    print("NO es JSON:", e)