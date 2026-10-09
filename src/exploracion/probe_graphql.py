"""Descubre las consultas GraphQL de Revolico: (1) de los bundles JS, (2) por introspección."""
import glob
import os
import re

import requests

GRAPHQL = "https://graphql-api.revolico.app/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Content-Type": "application/json",
}
TMP = r"C:\Users\Manu-Dany\AppData\Local\Temp\opencode\revolico_chunks"

print("=" * 70)
print("1) CONSULTAS GRAPHQL EN LOS BUNDLES JS")
print("=" * 70)
pat_query = re.compile(r'query\s+([A-Za-z_][A-Za-z0-9_]*)|query\s*\{', re.S)
seen = set()
for path in sorted(glob.glob(os.path.join(TMP, "*.js"))):
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        code = f.read()
    for m in pat_query.finditer(code):
        name = m.group(1) or "<anónima>"
        if name in seen:
            continue
        seen.add(name)
        ctx = code[m.start():m.start() + 250].replace("\n", " ")
        print(f"[{os.path.basename(path)}] query {name}:")
        print("   ", ctx[:250])
        print()

print("=" * 70)
print("2) PRUEBA DE INTROSPECCIÓN GRAPHQL")
print("=" * 70)
try:
    q = """
    {
      __schema {
        queryType { name }
        types { name kind }
      }
    }
    """
    r = requests.post(GRAPHQL, headers=HEADERS,
                      json={"query": q}, timeout=30)
    print("STATUS:", r.status_code)
    txt = r.text
    print("RESPONSE (primeros 3000 chars):")
    print(txt[:3000])
except Exception as e:
    print("Error:", e)