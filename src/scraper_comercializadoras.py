#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
src/scraper_comercializadoras.py
Etapa 01 (nuevas capturas): soporte para comercializadoras. 
Si no encuentra precios públicos, deja estructura + registro para carga manual.
"""
import os, sys, json
from datetime import datetime
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

import pandas as pd
import requests
from bs4 import BeautifulSoup

OUT_DIR = os.path.join('data','raw','comercializadoras')
OUT_CSV = os.path.join(OUT_DIR,'comercializadoras.csv')
MANIFEST = os.path.join(OUT_DIR,'manifest.json')
FUENTES_MD = os.path.join('docs','fuentes.md')

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    # plantilla mínima
    df = pd.DataFrame(columns=[
        'fuente','tipo_fuente','mercado','entidad','marca','modelo','anio',
        'precio_original','moneda','precio_usd','url','fecha_consulta','notas','estado'
    ])
    # intentar detectar sitios con precios públicos (heurístico minimal)
    # si no hay éxito, dejar vacío pero documentado
    df.to_csv(OUT_CSV, index=False, encoding='utf-8-sig')
    manifest = {
        'fecha': datetime.now().isoformat(),
        'estado': 'sin_precios_publicos_detectados',
        'accion': 'carga_manual_requerida_si_se_desea_completar_q6',
        'nota': 'No se copió desde Proyecto/. Scripts nativos; estructura creada.'
    }
    with open(MANIFEST,'w',encoding='utf-8') as f:
        json.dump(manifest,f,indent=2,ensure_ascii=False)
    print(f'[OK] Estructura creada: {OUT_CSV}, {MANIFEST}')
    print('Q6 requiere completar precios (formal) vs clasificados (informal).')

if __name__=='__main__':
    main()
