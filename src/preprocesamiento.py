#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
src/preprocesamiento.py

Etapa 02: Preprocesamiento de anuncios Revolico (nativo, coherente con lo validado).
- Lee datos crudos reorganizados en data/raw/clasificados/revolico/anuncios.csv
- Filtra anuncios no disponibles según estado_verificacion (solo ACTIVOS)
- Aplica conversiones monetarias (TASA_CUP_USD=710), manejo de anio==0
- Genera data/interim/anuncios_limpios.csv

Decisiones: no re-ejecutar a ciegas si ya existe mercado_havana.csv (no romper validado).
"""
import os
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import pandas as pd
import unicodedata
from utils.limpieza import filtrar_activos

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

TASA_CUP_USD = 710.0
RAW_PATH = os.path.join('data', 'raw', 'clasificados', 'revolico', 'anuncios.csv')
INTERIM_PATH = os.path.join('data', 'interim', 'anuncios_limpios.csv')

def limpiar_marca(m):
    if pd.isna(m): return 'no identificada'
    s = str(m).strip().lower()
    if s == '' or s == 'nan': return 'no identificada'
    return s

def main():
    if not os.path.exists(RAW_PATH):
        print(f"[ERROR] No existe {RAW_PATH}. Revisa reestructura.")
        sys.exit(1)
    df = pd.read_csv(RAW_PATH, encoding='utf-8-sig')
    # filtro por disponibilidad en vivo (solo anuncios activos)
    df = filtrar_activos(df)
    # conversion
    df['precio_original'] = pd.to_numeric(df.get('precio_original', df.get('precio', 0)), errors='coerce')
    df['moneda'] = df.get('moneda', 'USD').astype(str).str.upper()
    mask_cup = df['moneda'].str.contains('CUP')
    df['precio_usd'] = df['precio_original'].copy()
    df.loc[mask_cup, 'precio_usd'] = df.loc[mask_cup, 'precio_original'] / TASA_CUP_USD
    df['anio'] = pd.to_numeric(df.get('anio'), errors='coerce').fillna(0).astype(int)
    df['marca'] = df.get('marca', '').apply(limpiar_marca)
    df['municipio'] = df.get('municipio', df.get('ubicacion', '')).fillna('')
    # asegurar tipo_fuente/mercado
    df['tipo_fuente'] = 'clasificados'
    df['mercado'] = 'informal'
    os.makedirs(os.path.dirname(INTERIM_PATH), exist_ok=True)
    df.to_csv(INTERIM_PATH, index=False, encoding='utf-8-sig')
    print(f"[OK] Guardado {INTERIM_PATH} ({len(df)} filas)")

if __name__ == '__main__':
    main()
