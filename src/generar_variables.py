#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
src/generar_variables.py
Etapa 04: Generar variables para análisis (coherente con lo validado).
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import pandas as pd

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

INTERIM_PATH = os.path.join('data', 'interim', 'anuncios_limpios.csv')
PROC_MERCADO = os.path.join('data', 'processed', 'mercado_havana.csv')
PROC_REG = os.path.join('data', 'processed', 'regresion_dataset.csv')

def main():
    if not os.path.exists(INTERIM_PATH):
        # fallback: usar crudo
        INTERIM_PATH_FALLBACK = os.path.join('data','raw','clasificados','revolico','anuncios.csv')
        if not os.path.exists(INTERIM_PATH_FALLBACK):
            print('[ERROR] faltan datos intermedios/crudos'); sys.exit(1)
        df = pd.read_csv(INTERIM_PATH_FALLBACK, encoding='utf-8-sig')
    else:
        df = pd.read_csv(INTERIM_PATH, encoding='utf-8-sig')
    # asegurar columnas
    if 'precio_usd' not in df.columns:
        TASA=710.0
        df['precio_original'] = pd.to_numeric(df.get('precio_original',0), errors='coerce')
        df['moneda']=df.get('moneda','USD').astype(str).str.upper()
        df['precio_usd']=df['precio_original']; df.loc[df['moneda'].str.contains('CUP'),'precio_usd']=df['precio_original']/TASA
    df['anio']=pd.to_numeric(df.get('anio'),errors='coerce').fillna(0).astype(int)
    df['marca']=df.get('marca','no identificada').fillna('no identificada').astype(str).str.lower()
    df['municipio']=df.get('municipio',df.get('ubicacion','')).fillna('').astype(str)
    df['vistas']=pd.to_numeric(df.get('vistas',0),errors='coerce').fillna(0).astype(int)
    df['imagenes']=pd.to_numeric(df.get('imagenes',0),errors='coerce').fillna(0).astype(int)
    df = df.copy()
    # guardar mercado_havana.csv (coherente con validado: incluye todos con precio válido si existe)
    df_proc = df.copy()
    os.makedirs(os.path.dirname(PROC_MERCADO), exist_ok=True)
    df_proc.to_csv(PROC_MERCADO, index=False, encoding='utf-8-sig')
    # regresion dataset: filas con año>0, marca identificable razonable? y precio_usd válido
    df_reg = df_proc.copy()
    df_reg = df_reg[df_reg['precio_usd'].notna() & (df_reg['precio_usd']>0)]
    df_reg = df_reg[df_reg['anio']>0].copy()
    df_reg['precio_log'] = np_log1p(df_reg['precio_usd'])
    # marca simplificada
    df_reg['marca_g'] = df_reg['marca'].fillna('otra').astype(str)
    cols = ['anio','marca','marca_g','municipio','vistas','imagenes','precio_usd','precio_log']
    for c in cols:
        if c not in df_reg.columns: df_reg[c]=pd.NA
    df_reg[cols].to_csv(PROC_REG, index=False, encoding='utf-8-sig')
    print(f'[OK] {PROC_MERCADO} ({len(df_proc)}), {PROC_REG} ({len(df_reg[cols])})')

def np_log1p(x):
    import numpy as np
    return np.log1p(pd.to_numeric(x, errors='coerce'))
if __name__=='__main__':
    main()
