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

def filtrar_activos(df, col='estado_verificacion'):
    """Filtra anuncios no disponibles cuando existe la columna de verificación en vivo.

    Solo conserva las filas con estado == 'activo'. Si la columna no existe
    (p. ej. datos sin verificar), devuelve el DataFrame sin cambios y avisa.
    """
    if col not in df.columns:
        print(f'[AVISO] Sin columna "{col}": no se filtra por disponibilidad.')
        return df
    total = len(df)
    if total == 0:
        return df
    estados = df[col].fillna('').astype(str).str.strip().str.lower()
    n_descartados = int((estados != 'activo').sum())
    df_f = df[estados == 'activo'].copy()
    if n_descartados:
        print(f'[OK] Filtro disponibilidad: {total} -> {len(df_f)} '
              f'({n_descartados} no disponibles excluidos)')
    return df_f
