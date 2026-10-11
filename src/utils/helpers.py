# utils/helpers.py
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def normalize_text(s):
    if s is None: return ''
    return str(s).strip()

def safe_div(a,b):
    try:
        if b==0: return float('nan')
        return float(a)/float(b)
    except: return float('nan')
