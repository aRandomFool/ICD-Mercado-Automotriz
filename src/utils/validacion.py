# utils/validacion.py
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import pandas as pd

def check_validaciones_referenciales(df):
    issues=[]
    if len(df)==0: return issues
    if 'precio_usd' in df.columns and df['precio_usd'].dropna().lt(0).any(): issues.append('precios_negativos')
    if 'anio' in df.columns and df['anio'].dropna().gt(2100).any(): issues.append('anio_futuro')
    if 'anio' in df.columns and df['anio'].dropna().lt(1900).any(): issues.append('anio_muy_antiguo')
    return issues
