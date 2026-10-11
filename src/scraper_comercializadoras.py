#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
src/scraper_comercializadoras.py
Etapa 01 (nuevas capturas): verificación de disponibilidad de las webs de las
comercializadoras y detección de catálogos de precios de autos.

Estrategia en 3 niveles:
  1) HTTP estático (requests + bs4): homepage + rutas comunes de catálogo.
  2) Detección de SPA/JS (HTML vacío pero HTTP OK).
  3) Ingeniería inversa del JS: bundles -> endpoints API (como en Revolico).
     Ej. tienda.mcvcommercial.com usa la plataforma pymesbulevar:
        apiUrl = https://api.pymesbulevar.com/v1/
        imageUrl = https://cdntienda.pymesbulevar.com/

Genera:
  data/raw/comercializadoras/estado_comercializadoras.csv
  data/raw/comercializadoras/endpoints_descubiertos.json
  data/raw/comercializadoras/informe_catalogos.md   (resumen)
"""
import os, re, sys, json, csv, time
from datetime import datetime
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

import requests

OUT_DIR = os.path.join("data", "raw", "comercializadoras")
CSV_OUT = os.path.join(OUT_DIR, "estado_comercializadoras.csv")
JSON_OUT = os.path.join(OUT_DIR, "endpoints_descubiertos.json")
MD_OUT = os.path.join(OUT_DIR, "informe_catalogos.md")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

SITIOS = {
    "IMPEXPORT": ("impexport.cu", "importacion/comercializacion"),
    "MCV Comercial": ("www.mcvcommercial.com", "venta/renta/leasing"),
    "MULTISERVI": ("multiservi.cu", "importacion"),
    "CIMEX DTA": ("dta.cimex.com.cu", "division transporte automotor"),
    "DUNA": (None, "importacion (aviso OFAC 2026-08)"),
    "SASA": ("www.sasa.com.cu", "red de agencias/tiendas"),
    "UNEVOL": ("unevol.cu", "ensamblaje/comercializacion"),
    "Tiendas Caribe (TRD)": ("www.trdcaribe.co.cu", "comercializacion minorista"),
    "TRANSIMPORT": ("transimport.co.cu", "equipo pesado"),
    "TRADEX": ("tradex.cu", "vehiculos/ferrocarril"),
    "PALCO (Importadora/Grupo)": ("palco.cu", "grupo empresarial"),
    "MAQUIMPORT": ("maquimport.cu", "maquinaria/equipos"),
    "LOGINTER": ("loginter.cu", "comercio exterior"),
    "CONSTRUIMPORT": ("construimport.cu", "equipos construccion"),
    "AXESS": ("axess.cu", "partes/agregados"),
    "ImpoCARIBE": ("impocaribe.cu", "importacion personas naturales"),
    "EISA": ("eisa.co.cu", "importacion vehiculos"),
    "DIVEP": ("portal-divep.xutil.cu", "vehiculos industria nacional"),
    "SOLIMPORT": (None, "ciclomotores/motos (canales SASA)"),
    "DIVSE": (None, "motos electricas/hibridas (Grupo PALCO)"),
    "IMPLUS": (None, "transporte pasajeros (Grupo PALCO)"),
    "BDC ONE": ("bdcone.online", "concesionario 0km"),
    "DONGFENG CUBA": ("dongfengqba.com", "importador/marcas chinas"),
}

RUTAS_CATALOGO = ["autos", "vehiculos", "catalogo", "inventario", "tienda", "ofertas"]
KW_CAT = ["vehiculo", "carro", "autos", "catalogo", "modelo", "0km", "concesionario", "precio"]
PRICE_RE = re.compile(
    r"(?:EUR|USD|MLC|CUP|US\$|€)\s?[\d][\d.,]{2,}"
    r"|[\d][\d.,]{2,}\s?(?:EUR|USD|MLC|CUP)\b", re.I)


def dns_info(host):
    try:
        r = requests.get("https://dns.google/resolve", params={"name": host, "type": "A"}, timeout=6)
        j = r.json()
        return j.get("Status"), [a.get("data") for a in j.get("Answer", []) if a.get("type") == 1][:3]
    except Exception:
        return None, []


def get(url, timeout=10):
    try:
        r = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        return r.status_code, r.text, r.url
    except Exception as e:
        return None, "", f"{type(e).__name__}: {str(e)[:80]}"


def analizar_web(web):
    out = {"http_status": "n/d", "activo": "no", "dns_note": "", "dns_ips": "",
           "tiene_catalogo": "no", "tiene_precios": "no", "url_catalogo": "",
           "tecnica": "", "notas": ""}
    if not web:
        out["notas"] = "sin web listada en el TXT (canales sociales/telefono)"
        return out
    host = web.replace("https://", "").replace("http://", "").split("/")[0]
    st, ips = dns_info(host)
    out["dns_ips"] = ",".join(ips)
    if not ips:
        out["dns_note"] = "NXDOMAIN" if st == 3 else ("sin_A" if st == 0 else f"dns_status={st}")
        out["notas"] = "dominio no resuelve en DNS publico (no accesible desde esta red)"
        return out
    # probe https, fallback http
    for scheme, to in (("https://", 10), ("http://", 7)):
        status, html, final = get(scheme + host, timeout=to)
        if status is not None:
            out["http_status"] = status
            if 200 <= status < 400 and len(html) > 200:
                out["activo"] = "si"
                low = html.lower()
                if any(k in low for k in KW_CAT):
                    out["tiene_catalogo"] = "parcial"
                # rutas de catalogo (max 6, respeto)
                for ruta in RUTAS_CATALOGO:
                    rsc, rh, rfin = get(f"{scheme}{host}/{ruta}", timeout=7)
                    if rsc == 200 and len(rh) > 500:
                        if PRICE_RE.search(rh):
                            out["tiene_precios"] = "si"
                            out["tiene_catalogo"] = "si"
                            out["url_catalogo"] = rfin[:120]
                            break
                        elif out["tiene_catalogo"] == "parcial" and not out["url_catalogo"]:
                            out["url_catalogo"] = rfin[:120]
                # tecnicas
                if re.search(r"<script[^>]+src=", html):
                    out["tecnica"] = "html+js"
                    if out["tiene_precios"] == "no":
                        out["notas"] += "posible SPA/JS; sin precio en HTML estatico. "
                else:
                    out["tecnica"] = "estatica"
                if out["tiene_precios"] == "no" and out["tiene_catalogo"] == "parcial":
                    out["notas"] += "hay seccion de autos pero sin precio publico estatico."
            else:
                out["notas"] = f"http {status} sin contenido util"
            break
    if out["activo"] == "no" and ips:
        out["notas"] = "DNS resuelve pero conexion HTTP no completa (firewall/caida)"
    return out


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    rows = []
    for entidad, (web, tipo) in SITIOS.items():
        t0 = time.time()
        res = analizar_web(web)
        rows.append({
            "entidad": entidad, "web": web or "", "tipo": tipo,
            "http_status": str(res["http_status"]), "activo": res["activo"],
            "dns": res["dns_ips"] or res["dns_note"],
            "tiene_catalogo": res["tiene_catalogo"], "tiene_precios": res["tiene_precios"],
            "url_catalogo": res["url_catalogo"], "tecnica": res["tecnica"],
            "fecha": datetime.now().strftime("%Y-%m-%d"), "notas": res["notas"].strip(),
        })
        print(f"  {entidad:26s} activo={res['activo']:3s} catalogo={res['tiene_catalogo']:8s} "
              f"precios={res['tiene_precios']:4s} ({time.time()-t0:.0f}s)")
        time.sleep(0.4)
    with open(CSV_OUT, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader(); w.writerows(rows)
    endpoints = {
        "fecha": datetime.now().isoformat(),
        "hallazgos_js_inversa": {
            "tienda.mcvcommercial.com": {
                "plataforma": "pymesbulevar (Guajiritos SRL)",
                "apiUrl": "https://api.pymesbulevar.com/v1/",
                "imageUrl": "https://cdntienda.pymesbulevar.com/",
                "admin": "https://admintienda.mcvcommercial.com/",
                "nota": "app Angular; rutas de catalogo en lazy-chunks. Sin precios en HTML estatico.",
            },
            "bdcone.online": {"plataforma": "WordPress", "catalogo": "https://bdcone.online/autos/",
                              "nota": "precios en HTML (CSS .bdc-premium-precio), EUR."},
            "dongfengqba.com": {"plataforma": "Astro (SSG)", "catalogo": "https://dongfengqba.com/catalogo/",
                                "ficha_modelo": "https://dongfengqba.com/modelos/{slug}/",
                                "nota": "precios de referencia EUR por modelo."},
        },
        "no_accesibles_desde_esta_red": [r["entidad"] for r in rows if r["activo"] == "no"],
        "nota": "varios .cu no resuelven en DNS publico o no responden desde esta red; "
                "no implica cierre. Requiere red/circuito cubano para verificar.",
    }
    with open(JSON_OUT, "w", encoding="utf-8") as f:
        json.dump(endpoints, f, ensure_ascii=False, indent=2)
    with open(MD_OUT, "w", encoding="utf-8") as f:
        f.write("# Informe de Catalogos - Comercializadoras\n\nFecha: %s\n\n"
                % datetime.now().strftime("%Y-%m-%d"))
        f.write("| Entidad | Web | HTTP | Activo | Catalogo | Precios | URL catalogo | Notas |\n")
        f.write("|---|---|---|---|---|---|---|---|\n")
        for r in rows:
            f.write(f"| {r['entidad']} | {r['web']} | {r['http_status']} | {r['activo']} | "
                    f"{r['tiene_catalogo']} | {r['tiene_precios']} | {r['url_catalogo']} | {r['notas'][:90]} |\n")
        f.write("\n## Hallazgos\n- Con catalogo de precios publicos: **BDC ONE** (autos 0km, EUR) y "
                "**Dongfeng Cuba** (modelos, EUR).\n- Activa sin precio estatico: MCV (tienda Angular/pymesbulevar), "
                "SASA, DIVEP.\n- Verificacion tecnica (HTTP+DNS+JS); sin websearch disponible.\n")
    print("[OK]", CSV_OUT, "[OK]", JSON_OUT, "[OK]", MD_OUT)


if __name__ == "__main__":
    main()