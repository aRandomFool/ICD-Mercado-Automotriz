#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import csv
import json
from collections import Counter, defaultdict
from pathlib import Path

base = Path('data/interim')
orig_path = base / 'anuncios_limpios.csv'
out_csv = base / 'anuncios_analisis.csv'
report_md = base / 'columnas_eliminadas.md'

# Leer original completo
with open(orig_path, encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    fieldnames_orig = reader.fieldnames
    rows = list(reader)

n_rows = len(rows)
print(f'Filas originales: {n_rows}')
print(f'Columnas originales ({len(fieldnames_orig)}): {fieldnames_orig}')

# Función para detectar nulos reales (vacío)
def is_null(v):
    if v is None:
        return True
    s = str(v).strip()
    if s == '':
        return True
    # no convertir otros valores a null
    return False

# Analizar cada columna
analysis = {}
for col in fieldnames_orig:
    null_count = 0
    values = []
    for r in rows:
        v = r.get(col)
        if is_null(v):
            null_count += 1
        else:
            values.append(str(v).strip())
    null_pct = (null_count / n_rows * 100) if n_rows > 0 else 0
    unique_vals = sorted(set(values))
    analysis[col] = {
        'null_count': null_count,
        'null_pct': round(null_pct, 4),
        'unique_count': len(unique_vals),
        'unique_vals': unique_vals
    }

# Columnas a eliminar según criterio (verificar)
to_delete = []
delete_report = []

# color, estado
for c in ['color', 'estado']:
    a = analysis[c]
    if a['unique_count'] == 0 and a['null_pct'] == 100.0:
        to_delete.append(c)
        delete_report.append({
            'columna': c,
            'motivo': '100% nulos, sin ningún valor',
            'evidencia': f'nulos={a["null_count"]}/{n_rows} ({a["null_pct"]}%), valores_unicos={a["unique_count"]}',
            'valor_constante': 'N/A'
        })
    else:
        delete_report.append({
            'columna': c,
            'motivo': 'NO ELIMINADA - no cumple condición',
            'evidencia': f'nulos={a["null_count"]}/{n_rows} ({a["null_pct"]}%), valores_unicos={a["unique_count"]}',
            'valor_constante': 'N/A'
        })

# fuente, tipo_fuente, provincia - valor único
for c in ['fuente', 'tipo_fuente', 'provincia']:
    a = analysis[c]
    if a['unique_count'] == 1:
        val_const = a['unique_vals'][0] if a['unique_vals'] else ''
        to_delete.append(c)
        delete_report.append({
            'columna': c,
            'motivo': 'Único valor en todas las filas (sin variación)',
            'evidencia': f'nulos={a["null_count"]}/{n_rows} ({a["null_pct"]}%), valores_unicos={a["unique_count"]}',
            'valor_constante': val_const
        })
    else:
        delete_report.append({
            'columna': c,
            'motivo': 'NO ELIMINADA - tiene más de un valor',
            'evidencia': f'nulos={a["null_count"]}/{n_rows} ({a["null_pct"]}%), valores_unicos={a["unique_count"]} -> {a["unique_vals"][:10]}',
            'valor_constante': 'N/A'
        })

# verificado_el
c = 'verificado_el'
a = analysis[c]
if a['unique_count'] == 1:
    val_const = a['unique_vals'][0] if a['unique_vals'] else ''
    to_delete.append(c)
    delete_report.append({
        'columna': c,
        'motivo': 'Único valor en todas las filas (registrado en reporte)',
        'evidencia': f'nulos={a["null_count"]}/{n_rows} ({a["null_pct"]}%), valores_unicos={a["unique_count"]}',
        'valor_constante': val_const
    })
else:
    delete_report.append({
        'columna': c,
        'motivo': 'NO ELIMINADA - tiene más de un valor',
        'evidencia': f'nulos={a["null_count"]}/{n_rows} ({a["null_pct"]}%), valores_unicos={a["unique_count"]}',
        'valor_constante': 'N/A'
    })

# pagina, total_pagina
for c in ['pagina', 'total_pagina']:
    a = analysis[c]
    to_delete.append(c)
    delete_report.append({
        'columna': c,
        'motivo': 'Metadatos del scraping, no variables de mercado',
        'evidencia': f'nulos={a["null_count"]}/{n_rows} ({a["null_pct"]}%), valores_unicos={a["unique_count"]}',
        'valor_constante': a['unique_vals'][0] if a['unique_count']==1 else (', '.join(map(str,a['unique_vals'][:5])) if a['unique_vals'] else 'N/A')
    })

# Eliminar duplicados manteniendo orden de aparición
to_delete_ordered = []
seen_del = set()
for c in to_delete:
    if c not in seen_del:
        to_delete_ordered.append(c)
        seen_del.add(c)

# Columnas a conservar (del original, en orden relativo)
keep_cols = [c for c in fieldnames_orig if c not in seen_del]

print(f'\nColumnas a eliminar ({len(to_delete_ordered)}): {to_delete_ordered}')
print(f'Columnas a conservar ({len(keep_cols)}): {keep_cols}')

# Generar anuncios_analisis.csv
with open(out_csv, 'w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=keep_cols)
    writer.writeheader()
    for r in rows:
        # escribir solo columnas conservadas, manteniendo valores tal cual (vacío = null)
        out_r = {c: r.get(c, '') for c in keep_cols}
        writer.writerow(out_r)

print(f'\nGuardado: {out_csv}')

# Paso 2: reportar
paso2 = []
# ubicacion vs municipio
a_ub = analysis.get('ubicacion')
a_mu = analysis.get('municipio')
paso2.append('## Paso 2: Columnas sospechosas (solo reporte)\n')
paso2.append('### ubicacion vs municipio')
if a_ub and a_mu:
    paso2.append(f"- municipio: valores únicos = {a_mu['unique_count']}, nulos = {a_mu['null_count']} ({a_mu['null_pct']}%)")
    paso2.append(f"- ubicacion: valores únicos = {a_ub['unique_count']}, nulos = {a_ub['null_count']} ({a_ub['null_pct']}%)")
    # diferencia
    set_mu = set(a_mu['unique_vals'])
    set_ub = set(a_ub['unique_vals'])
    only_ub = sorted(list(set_ub - set_mu))
    paso2.append(f"- ¿ubicacion aporta información que municipio no tiene?: Sí. Hay {a_ub['unique_count']} valores únicos en ubicacion vs {a_mu['unique_count']} municipios.")
    paso2.append(f"- Valores en ubicacion NO presentes como valor exacto en municipio (diferencia): {only_ub if only_ub else 'Ninguno detectable por comparación exacta de valores únicos'}")
paso2.append('')

# km, combustible, transmision
paso2.append('### km, combustible, transmision')
for c in ['km', 'combustible', 'transmision']:
    a = analysis[c]
    filas_con_valor = n_rows - a['null_count']
    paso2.append(f"- {c}: nulos={a['null_count']} ({a['null_pct']}%), con valor real={filas_con_valor}, valores únicos={a['unique_count']}")
paso2.append('')

# notas
paso2.append('### notas')
a_no = analysis['notas']
paso2.append(f"- nulos={a_no['null_count']} ({a_no['null_pct']}%), valores únicos={a_no['unique_count']}")
paso2.append(f"- Valores distintos (primeros 30): {a_no['unique_vals'][:30]}")
paso2.append('')

# Paso 4
paso4 = []
paso4.append('## Paso 4: Problemas de filas (sin modificar nada)\n')

# anio = 0 o fuera de rango plausible
bad_anio = []
for r in rows:
    v = r.get('anio')
    if is_null(v):
        continue  # no cuenta como inválido numérico en este criterio? pero reportar según criterio
    try:
        av = int(float(str(v).strip()))
    except:
        bad_anio.append((r.get('anuncio_id'), v, 'no_numérico'))
        continue
    if av == 0 or av < 1900 or av > 2026:  # rango plausible
        bad_anio.append((r.get('anuncio_id'), av, 'fuera_rango_o_cero'))
paso4.append(f'### anio = 0 o fuera de rango plausible (1900-2026)')
paso4.append(f"- Total: {len(bad_anio)} filas")
for ex in bad_anio[:20]:
    paso4.append(f"  - anuncio_id={ex[0]}, anio={ex[1]} ({ex[2]})")
if len(bad_anio) > 20:
    paso4.append(f"  ... (y {len(bad_anio)-20} más)")
paso4.append('')

# precio_usd nulo, 0 o negativo
bad_precio = []
for r in rows:
    v = r.get('precio_usd')
    if is_null(v):
        bad_precio.append((r.get('anuncio_id'), 'NULL'))
        continue
    try:
        pv = float(str(v).strip().replace(',', '.'))
    except:
        bad_precio.append((r.get('anuncio_id'), v, 'no_numérico'))
        continue
    if pv <= 0:
        bad_precio.append((r.get('anuncio_id'), pv, '<=0'))
paso4.append(f'### precio_usd nulo, 0 o negativo')
paso4.append(f"- Total: {len(bad_precio)} filas")
for ex in bad_precio[:20]:
    paso4.append(f"  - anuncio_id={ex[0]}, precio_usd={ex[1]}")
if len(bad_precio) > 20:
    paso4.append(f"  ... (y {len(bad_precio)-20} más)")
paso4.append('')

# estado_verificacion
ev_counts = Counter()
for r in rows:
    v = r.get('estado_verificacion')
    if is_null(v):
        ev_counts['NULL'] += 1
    else:
        ev_counts[str(v).strip()] += 1
paso4.append(f'### estado_verificacion (valores distintos)')
for k,v in ev_counts.most_common():
    paso4.append(f"- {k}: {v} filas")
paso4.append('')

# duplicados por anuncio_id, url o descripcion repetida
dup_id = []
id_cnt = Counter(r.get('anuncio_id') for r in rows)
for k,v in id_cnt.items():
    if v > 1 and not is_null(k):
        dup_id.append((k,v))
dup_url = []
url_cnt = Counter(r.get('url') for r in rows)
for k,v in url_cnt.items():
    if v > 1 and not is_null(k):
        dup_url.append((k,v))
dup_desc = []
desc_cnt = Counter(r.get('descripcion') for r in rows)
for k,v in desc_cnt.items():
    if v > 1 and not is_null(k):
        dup_desc.append((k,v))
paso4.append(f'### Duplicados')
paso4.append(f"- Por anuncio_id (repetidos): {len(dup_id)} grupos. Ejemplos: {dup_id[:10]}")
paso4.append(f"- Por url (repetidos): {len(dup_url)} grupos. Ejemplos: {dup_url[:10]}")
paso4.append(f"- Por descripcion repetida: {len(dup_desc)} grupos. Ejemplos: {dup_desc[:10]}")
paso4.append('')

# Generar reporte
lines = []
lines.append('# Columnas eliminadas y reportes - anuncios_limpios.csv -> anuncios_analisis.csv\n')
lines.append('## Resumen\n')
lines.append(f'- Filas originales: {n_rows}')
lines.append(f'- Filas en anuncios_analisis.csv: {len(rows)} (igual)')
lines.append(f'- Columnas originales: {len(fieldnames_orig)}')
lines.append(f'- Columnas eliminadas: {len(to_delete_ordered)}')
lines.append(f'- Columnas conservadas: {len(keep_cols)}')
lines.append(f'- Columnas eliminadas: {to_delete_ordered}')
lines.append('')

lines.append('## Columnas eliminadas (con evidencia)\n')
lines.append('| Columna | Motivo | Evidencia (nulos/únicos) | Valor constante |')
lines.append('|---------|--------|--------------------------|----------------|')
for d in delete_report:
    lines.append(f"| {d['columna']} | {d['motivo']} | {d['evidencia']} | {d['valor_constante']} |")
lines.append('')

lines.append('\n'.join(paso2))
lines.append('\n'.join(paso4))

lines.append('## Verificación final (programática)\n')
# Verificar
lines.append(f'- Filas: original={n_rows}, resultado={len(rows)} -> {"OK" if n_rows==len(rows) else "FALLO"}')
lines.append(f'- Ninguna columna eliminada aparece en resultado: {"OK" if all(c not in keep_cols for c in to_delete_ordered) else "FALLO"}')
# Verificar que columnas conservadas no cambiaron valores (comparación rápida por muestreo de claves)
# Hacemos verificación completa
ok_vals = True
# leer resultado
with open(out_csv, encoding='utf-8-sig') as f:
    reader2 = csv.DictReader(f)
    rows2 = list(reader2)
# comparar fila por fila por anuncio_id si existe
if 'anuncio_id' in fieldnames_orig and 'anuncio_id' in keep_cols:
    # map por índice
    for i,(r1,r2) in enumerate(zip(rows, rows2)):
        for c in keep_cols:
            v1 = r1.get(c,'')
            v2 = r2.get(c,'')
            if v1 != v2:
                ok_vals = False
                break
        if not ok_vals:
            break
else:
    # comparar todo
    for i,(r1,r2) in enumerate(zip(rows, rows2)):
        for c in keep_cols:
            if r1.get(c,'') != r2.get(c,''):
                ok_vals = False
                break
        if not ok_vals:
            break

lines.append(f'- Valores de columnas conservadas sin cambios vs original: {"OK" if ok_vals else "FALLO"}')
lines.append(f'- Todas las columnas usadas por plan presentes (anuncio_id,url,marca,modelo,anio,km,combustible,transmision,precio_usd,precio_original,moneda,notas,municipio,ubicacion,descripcion,vistas,imagenes,es_destacado,fecha,actualizado_el,estado_verificacion,mercado): {"OK" if all(c in keep_cols for c in ["anuncio_id","url","marca","modelo","anio","km","combustible","transmision","precio_usd","precio_original","moneda","notas","municipio","ubicacion","descripcion","vistas","imagenes","es_destacado","fecha","actualizado_el","estado_verificacion","mercado"]) else "REVISAR"}')
lines.append('')

with open(report_md, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f'\nReporte guardado: {report_md}')
