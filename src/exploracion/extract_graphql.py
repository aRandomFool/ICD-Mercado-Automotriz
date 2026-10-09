"""Extrae las consultas GraphQL COMPLETAS de los bundles JS de Revolico.

Las cadenas minificadas están entre comillas dobles; buscamos segmentos que
empiecen con 'query ', 'fragment ' o 'mutation '.
"""
import glob
import os
import re

TMP = r"C:\Users\Manu-Dany\AppData\Local\Temp\opencode\revolico_chunks"

def looks_graphql(s):
    t = s.strip()
    return bool(re.match(r'^(query|fragment|mutation)\s', t))

def main():
    # Archivos donde vimos queries
    targets = ["3936-c2d5c46ba69b7e16.js", "5284-57c23aac58596f51.js",
               "8426-12cf26947b1b7380.js", "9948-09acd37f8798675c.js",
               "7290-26055d0a2d102434.js"]
    for name in targets:
        path = os.path.join(TMP, name)
        if not os.path.exists(path):
            continue
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            code = f.read()
        # la lista ordenada de segmentos (sin escapar \" por simplicidad)
        parts = re.split(r'"', code)
        print("=" * 70)
        print(f"ARCHIVO: {name}")
        print("=" * 70)
        for seg in parts:
            if looks_graphql(seg):
                print(seg.strip()[:3500])
                print("-" * 50)

if __name__ == "__main__":
    main()