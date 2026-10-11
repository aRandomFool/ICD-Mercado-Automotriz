# utils/limpieza.py
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import pandas as pd

TASA_CUP_USD = 710.0

def to_usd(precio_orig, moneda):
    try:
        p = pd.to_numeric(precio_orig, errors='coerce')
        m = str(moneda).upper()
        if pd.isna(p): return float('nan')
        if 'CUP' in m: return p / TASA_CUP_USD
        return p
    except: return float('nan')

def clean_marca(m):
    if pd.isna(m): return 'no identificada'
    s = str(m).strip().lower()
    if s=='' or s=='nan': return 'no identificada'
    return s
