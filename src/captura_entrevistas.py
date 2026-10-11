#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
src/captura_entrevistas.py
Plantilla/validador para entrevistas/encuestas (Q9).
"""
import os, sys, json
from datetime import datetime
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import pandas as pd

OUT_DIR = os.path.join('data','raw','entrevistas')
OUT_ENT = os.path.join(OUT_DIR,'entrevistas_struct.csv')
OUT_ENC = os.path.join(OUT_DIR,'encuestas_struct.csv')
MANIFEST = os.path.join(OUT_DIR,'estructura_entrevistas.json')

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    cols_ent = ['id','tipo','fecha','ubicacion','edad','genero','ocupacion',
                'factores_elec_vs_comb','motivacion_electrico','barreras_electrico',
                'combustible_preferido','precio_importa','autonomia_importa',
                'costo_uso_importa','infraestructura_carga','tipo_fuente','notas']
    cols_enc = cols_ent
    pd.DataFrame(columns=cols_ent).to_csv(OUT_ENT, index=False, encoding='utf-8-sig')
    pd.DataFrame(columns=cols_enc).to_csv(OUT_ENC, index=False, encoding='utf-8-sig')
    manifest = {
        'fecha': datetime.now().isoformat(),
        'objetivo': 'Q9: factores eléctrico vs combustión',
        'archivos': [os.path.basename(OUT_ENT), os.path.basename(OUT_ENC)],
        'nota': 'Plantilla para carga manual. No inventar datos.'
    }
    with open(MANIFEST,'w',encoding='utf-8') as f:
        json.dump(manifest,f,indent=2,ensure_ascii=False)
    print('[OK] Plantillas entrevistas/encuestas creadas.')

if __name__=='__main__':
    main()
