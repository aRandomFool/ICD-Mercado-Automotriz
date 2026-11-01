#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Validación de calidad del dataset de anuncios Revolico.

Comprueba: nulos por columna, duplicados (id/url/hash de campos clave),
precios imposibles, años fuera de rango, cobertura por fuente y provincia.

Uso:
    .venv/bin/python src/validar_calidad_anuncios.py [--csv RUTA]

Salidas:
    reports/tablas/calidad_resumen.csv     — indicadores (valor, umbral, ok)
    reports/tablas/calidad_nulos.csv       — % nulo por columna
    reports/tablas/calidad_cobertura.csv   — cobertura por provincia/marca
    reports/tablas/calidad_outliers.csv    — precios/años sospechosos (muestras)
    stdout                                 — resumen legible
"""
import argparse
import collections
import csv
import os
import re
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from utils.marcas import _sin_acentos  # noqa: E402

RUTA_DEFECTO = os.path.join("data", "raw", "clasificados", "revolico", "anuncios.csv")
DIR_TABLAS = os.path.join("reports", "tablas")

PRECIO_MIN_USD = 1.0        # por debajo: probable "en miles" o simbólico
PRECIO_MAX_USD = 500_000    # por encima: revisar (BMW X6 real llegó a 250k)
ANIO_MIN, ANIO_MAX = 1950, 2026
COBERTURA_MINIMA = 0.60     # 60% de filas con precio (indicador global)


def hash_fila(f):
    import hashlib
    limpia = _sin_acentos(str(f.get("descripcion") or "").lower())
    limpia = re.sub(r"\s+", " ", limpia).strip()
    clave = "|".join(str(x) for x in [
        f.get("fuente", ""), f.get("marca", ""), f.get("modelo", ""),
        f.get("anio", ""), f.get("precio_original", ""),
        f.get("provincia", "") or f.get("ubicacion", ""), limpia,
    ])
    return hashlib.sha1(clave.encode("utf-8")).hexdigest()


def escribir(ruta, filas, campos):
    os.makedirs(os.path.dirname(ruta), exist_ok=True)
    with open(ruta, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=campos)
        w.writeheader()
        w.writerows(filas)
    print(f"  -> {ruta}")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", default=RUTA_DEFECTO)
    args = ap.parse_args()

    with open(args.csv, encoding="utf-8-sig", newline="") as f:
        filas = list(csv.DictReader(f))
    n = len(filas)
    print(f"== Validación de calidad: {args.csv} ({n} filas) ==")
    if n == 0:
        print("[ERROR] dataset vacío")
        return 1

    indicadores = []   # nombre, valor, umbral/estado, ok

    # --- nulos por columna ---
    nulos = []
    for c in filas[0].keys():
        vacios = sum(1 for r in filas if str(r.get(c, "")).strip() in ("", "None", "nan"))
        nulos.append({"columna": c, "vacias": vacios,
                      "pct": round(100 * vacios / n, 1)})

    # --- duplicados ---
    ids = [str(r.get("anuncio_id", "")) for r in filas]
    urls = [str(r.get("url", "")).rstrip("/").lower() for r in filas]
    hashes = [hash_fila(r) for r in filas]
    dup_id = n - len(set(ids))
    dup_url = n - len(set(urls))
    dup_hash = n - len(set(hashes))
    indicadores += [
        {"indicador": "filas_totales", "valor": n, "umbral": "meta 2000-5000 o universo", "ok": "info"},
        {"indicador": "duplicados_por_id", "valor": dup_id, "umbral": "0", "ok": "ok" if dup_id == 0 else "REVISAR"},
        {"indicador": "duplicados_por_url", "valor": dup_url, "umbral": "0", "ok": "ok" if dup_url == 0 else "REVISAR"},
        {"indicador": "duplicados_por_hash_camposclave", "valor": dup_hash, "umbral": "0", "ok": "ok" if dup_hash == 0 else "REVISAR"},
    ]

    # --- precios ---
    precios = []
    precios_vacios = 0
    bajos = []
    altos = []
    negativos = 0
    for r in filas:
        v = str(r.get("precio_usd", "")).strip()
        if not v:
            precios_vacios += 1
            continue
        try:
            p = float(v)
        except ValueError:
            bajos.append({**{k: r.get(k, "") for k in ("anuncio_id", "marca", "precio_original", "moneda", "precio_usd", "url")}, "motivo": "no numérico"})
            continue
        if p < 0:
            negativos += 1
        precios.append(p)
        if p < PRECIO_MIN_USD:
            bajos.append({**{k: r.get(k, "") for k in ("anuncio_id", "marca", "precio_original", "moneda", "precio_usd", "url")}, "motivo": f"< {PRECIO_MIN_USD} USD (¿'en miles'?)"})
        elif p > PRECIO_MAX_USD:
            altos.append({**{k: r.get(k, "") for k in ("anuncio_id", "marca", "precio_original", "moneda", "precio_usd", "url")}, "motivo": f"> {PRECIO_MAX_USD} USD"})

    pct_con_precio = round(100 * (n - precios_vacios) / n, 1)
    indicadores += [
        {"indicador": "pct_con_precio_usd", "valor": pct_con_precio, "umbral": f">= {COBERTURA_MINIMA*100:.0f}%", "ok": "ok" if pct_con_precio >= COBERTURA_MINIMA * 100 else "BAJO"},
        {"indicador": "precios_negativos", "valor": negativos, "umbral": "0", "ok": "ok" if negativos == 0 else "REVISAR"},
        {"indicador": "precios_imposibles_bajos", "valor": len(bajos), "umbral": "0 (se marcan, no se borran)", "ok": "info" if bajos else "ok"},
        {"indicador": "precios_imposibles_altos", "valor": len(altos), "umbral": "0 (se marcan, no se borran)", "ok": "info" if altos else "ok"},
    ]

    # --- años ---
    anios = []
    anio_fuera = []
    anio_vacio = 0
    for r in filas:
        v = str(r.get("anio", "")).strip()
        if not v or v == "0":
            anio_vacio += 1
            continue
        try:
            a = int(float(v))
        except ValueError:
            anio_fuera.append({"anuncio_id": r.get("anuncio_id", ""), "anio": v, "url": r.get("url", ""), "motivo": "no entero"})
            continue
        anios.append(a)
        if not (ANIO_MIN <= a <= ANIO_MAX):
            anio_fuera.append({"anuncio_id": r.get("anuncio_id", ""), "anio": a, "url": r.get("url", ""), "motivo": f"fuera de [{ANIO_MIN},{ANIO_MAX}]"})
    indicadores += [
        {"indicador": "pct_con_anio", "valor": round(100 * (n - anio_vacio) / n, 1), "umbral": "info", "ok": "info"},
        {"indicador": "anios_fuera_de_rango", "valor": len(anio_fuera), "umbral": "0", "ok": "ok" if not anio_fuera else "REVISAR"},
    ]

    # --- cobertura ---
    por_prov = collections.Counter(str(r.get("provincia", "")).strip() or "(sin provincia)" for r in filas)
    por_fuente = collections.Counter(str(r.get("fuente", "")).strip() for r in filas)
    por_moneda = collections.Counter(str(r.get("moneda", "")).strip() or "(vacía)" for r in filas)
    marcas = collections.Counter(str(r.get("marca", "")).strip() or "(sin marca)" for r in filas)
    sin_marca = marcas.get("(sin marca)", 0)
    indicadores += [
        {"indicador": "provincias_cubiertas", "valor": len([k for k in por_prov if k != "(sin provincia)"]), "umbral": "16 (catálogo Cuba)", "ok": "ok" if len([k for k in por_prov if k != "(sin provincia)"]) >= 15 else "PARCIAL"},
        {"indicador": "pct_sin_marca", "valor": round(100 * sin_marca / n, 1), "umbral": "<= 40% (dato intrínseco de Revolico)", "ok": "ok" if sin_marca / n <= 0.40 else "REVISAR"},
        {"indicador": "marcas_distintas", "valor": len([k for k in marcas if k != "(sin marca)"]), "umbral": "info", "ok": "info"},
        {"indicador": "fuentes_distintas", "valor": len(por_fuente), "umbral": ">= 1", "ok": "ok" if por_fuente else "REVISAR"},
    ]

    # --- verificación en vivo (si existe) ---
    estado_ver = collections.Counter(str(r.get("estado_verificacion", "")).strip() or "(vacío)" for r in filas)
    indicadores.append({"indicador": "anuncios_verificados_activos",
                        "valor": estado_ver.get("activo", 0),
                        "umbral": "se completa con verificar_anuncios_revolico.py",
                        "ok": "info"})

    # ---------------- salidas ----------------
    print("\n-- Indicadores --")
    for i in indicadores:
        print(f"  {i['indicador']:34s} {str(i['valor']):>8s}  [{i['umbral']}] -> {i['ok']}")

    print("\n-- Nulos por columna (solo con vacíos) --")
    for x in nulos:
        if x["vacias"]:
            print(f"  {x['columna']:24s} {x['vacias']:>5d}  ({x['pct']}%)")

    print("\n-- Cobertura por provincia (top 20) --")
    for prov, cnt in por_prov.most_common(20):
        print(f"  {prov:24s} {cnt:>5d}")

    print("\n-- Monedas --", dict(por_moneda))
    print("-- Estados de verificación --", dict(estado_ver))

    escribir(os.path.join(DIR_TABLAS, "calidad_resumen.csv"), indicadores,
             ["indicador", "valor", "umbral", "ok"])
    escribir(os.path.join(DIR_TABLAS, "calidad_nulos.csv"), nulos,
             ["columna", "vacias", "pct"])
    escribir(os.path.join(DIR_TABLAS, "calidad_cobertura.csv"),
             [{"tipo": "provincia", "valor": k, "n": v} for k, v in por_prov.most_common()] +
             [{"tipo": "marca", "valor": k, "n": v} for k, v in marcas.most_common()] +
             [{"tipo": "moneda", "valor": k, "n": v} for k, v in por_moneda.most_common()],
             ["tipo", "valor", "n"])
    escribir(os.path.join(DIR_TABLAS, "calidad_outliers.csv"),
             bajos + altos + anio_fuera,
             ["anuncio_id", "marca", "precio_original", "moneda", "precio_usd",
              "anio", "url", "motivo"] if (bajos or altos or anio_fuera) else ["anuncio_id"])

    revisar = [i for i in indicadores if i["ok"] == "REVISAR"]
    print(f"\n== Resultado: {len(revisar)} indicadores en REVISAR ==")
    return 0


if __name__ == "__main__":
    sys.exit(main())
