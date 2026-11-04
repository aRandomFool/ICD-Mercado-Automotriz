#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import json
from pathlib import Path
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Configuración
plt.rcParams['figure.figsize'] = (10, 6)
plt.rcParams['font.size'] = 10
sns.set_style("whitegrid")

# Directorios
Path('reports/figuras').mkdir(parents=True, exist_ok=True)
Path('reports/tablas').mkdir(parents=True, exist_ok=True)

# Cargar datos
df_rev = pd.read_csv('data/interim/anuncios_limpios.csv', encoding='utf-8-sig')
df_form = pd.read_csv('data/processed/comercializadoras.csv', encoding='utf-8-sig')

# Normalizar
df_rev['marca'] = df_rev['marca'].fillna('no identificada').astype(str).str.lower().str.strip()
df_rev['municipio'] = df_rev['municipio'].fillna('sin municipio').astype(str).str.lower().str.strip()
df_rev['precio_usd'] = pd.to_numeric(df_rev['precio_usd'], errors='coerce')
df_rev['anio'] = pd.to_numeric(df_rev['anio'], errors='coerce')

df_form['marca_norm'] = df_form['marca_norm'].fillna(df_form['marca']).fillna('no identificada').astype(str).str.lower().str.strip()
df_form['precio_usd'] = pd.to_numeric(df_form['precio_usd'], errors='coerce')

# Filtrar formal vehiculos
formal_v = df_form[(df_form['tipo_item']=='vehiculo') & (df_form['precio_usd'].notna()) & (df_form['precio_usd']>0)].copy()

# Informal con precio
inf_precio = df_rev[(df_rev['precio_usd'].notna()) & (df_rev['precio_usd']>0)].copy()
# activos si existe
if 'estado_verificacion' in inf_precio.columns:
    inf_activo = inf_precio[inf_precio['estado_verificacion']=='activo'].copy()
else:
    inf_activo = inf_precio.copy()

print(f"Revolico total: {len(df_rev)}, con precio: {len(inf_precio)}, activos con precio: {len(inf_activo)}")
print(f"Formal vehículos con precio: {len(formal_v)}")

# Q1: ¿Cuál es la marca con mayor índice de publicaciones? (proxy: anuncios)
q1 = df_rev['marca'].value_counts().head(15)
plt.figure(figsize=(12,6))
ax = sns.barplot(x=q1.index, y=q1.values, palette='Blues_r')
plt.title('¿Cuál es la marca con mayor índice de publicaciones? (proxy: anuncios de Revolico)', fontsize=12, fontweight='bold')
plt.xlabel('Marca')
plt.ylabel('Número de publicaciones')
plt.xticks(rotation=45, ha='right')
for i, v in enumerate(q1.values):
    ax.text(i, v + 10, str(v), ha='center', va='bottom', fontsize=9)
plt.tight_layout()
plt.savefig('reports/figuras/q1_marca_mayor_indice_publicaciones_barras.png', dpi=150, bbox_inches='tight')
plt.close()
q1.to_csv('reports/tablas/q1_marca_mayor_indice_publicaciones_grafico.csv')

# Q2: ¿Cuál es el promedio de precios por marca? (usar mediana)
dfp = inf_precio.copy()
dfp2 = dfp[(dfp['marca'] != 'no identificada')].copy()
q2_med = dfp2.groupby('marca')['precio_usd'].agg(['count','median','mean']).reset_index()
q2_med = q2_med[q2_med['count'] >= 5].sort_values('median', ascending=False).head(15)
plt.figure(figsize=(12,6))
ax = sns.barplot(data=q2_med, x='marca', y='median', palette='Greens_r')
plt.title('¿Cuál es el promedio de precios por marca? (mediana, n>=5, excluyendo "no identificada")', fontsize=12, fontweight='bold')
plt.xlabel('Marca')
plt.ylabel('Precio mediano (USD)')
plt.xticks(rotation=45, ha='right')
for i, row in enumerate(q2_med.itertuples()):
    ax.text(i, row.median + 200, f'{row.median:.0f}', ha='center', va='bottom', fontsize=9)
plt.tight_layout()
plt.savefig('reports/figuras/q2_mediana_precio_por_marca_barras.png', dpi=150, bbox_inches='tight')
plt.close()
q2_med.to_csv('reports/tablas/q2_mediana_precio_por_marca_grafico.csv', index=False)

# Q3: ¿Existe una relación entre el precio y el año de fabricación?
dfa = dfp[(dfp['anio'].notna()) & (dfp['anio'] > 0) & (dfp['anio'] >= 1950) & (dfp['anio'] <= 2026)].copy()
if len(dfa) > 0:
    corr = dfa[['anio','precio_usd']].corr().iloc[0,1]
    x = dfa['anio']
    y = dfa['precio_usd']
    m,b = np.polyfit(x,y,1)
    plt.figure(figsize=(10,6))
    sample = dfa.sample(n=min(500,len(dfa)), random_state=123)
    sns.scatterplot(data=sample, x='anio', y='precio_usd', alpha=0.4, s=30)
    plt.plot(x, m*x+b, color='darkred', linewidth=2, label=f'y = {m:.1f}x + {b:.1f} (r={corr:.3f})')
    plt.title('¿Existe una relación entre el precio y el año de fabricación?', fontsize=12, fontweight='bold')
    plt.xlabel('Año de fabricación')
    plt.ylabel('Precio (USD)')
    plt.legend()
    plt.tight_layout()
    plt.savefig('reports/figuras/q3_precio_vs_anio_relacion.png', dpi=150, bbox_inches='tight')
    plt.close()
    # también hexbin para mejor visualización
    plt.figure(figsize=(10,6))
    plt.hexbin(dfa['anio'], dfa['precio_usd'], gridsize=25, cmap='Blues', mincnt=1)
    plt.colorbar(label='Cantidad de anuncios')
    plt.plot(x, m*x+b, color='darkred', linewidth=2)
    plt.title('¿Existe una relación entre el precio y el año de fabricación? (densidad)', fontsize=12, fontweight='bold')
    plt.xlabel('Año de fabricación')
    plt.ylabel('Precio (USD)')
    plt.tight_layout()
    plt.savefig('reports/figuras/q3_precio_vs_anio_densidad.png', dpi=150, bbox_inches='tight')
    plt.close()

# Q4: ¿Cuál es la marca con los precios más elevados?
dfp4 = dfp[(dfp['marca'] != 'no identificada')].copy()
q4 = dfp4.groupby('marca')['precio_usd'].agg(['count','median']).reset_index()
q4 = q4[q4['count'] >= 5].sort_values('median', ascending=False).head(15)
plt.figure(figsize=(12,6))
ax = sns.barplot(data=q4, x='marca', y='median', palette='Reds_r')
plt.title('¿Cuál es la marca con los precios más elevados? (mediana, n>=5)', fontsize=12, fontweight='bold')
plt.xlabel('Marca')
plt.ylabel('Precio mediano (USD)')
plt.xticks(rotation=45, ha='right')
for i, row in enumerate(q4.itertuples()):
    ax.text(i, row.median + 200, f'{row.median:.0f}', ha='center', va='bottom', fontsize=9)
plt.tight_layout()
plt.savefig('reports/figuras/q4_marca_precios_mas_elevados_mediana_barras.png', dpi=150, bbox_inches='tight')
plt.close()
q4.to_csv('reports/tablas/q4_marca_precios_mas_elevados_mediana_grafico.csv', index=False)

# Q5: ¿Cuál es la proporción de anuncios de ventas de autos clásicos vs modernos?
dfa5 = df_rev[(df_rev['anio'].notna()) & (df_rev['anio'] > 0)].copy()
dfa5['tipo'] = dfa5['anio'].apply(lambda a: 'clásico (< 2000)' if a < 2000 else 'moderno (>= 2000)')
prop5 = dfa5['tipo'].value_counts()
plt.figure(figsize=(8,8))
colors = ['#6B7280', '#2563EB']
plt.pie(prop5.values, labels=prop5.index, autopct='%1.1f%%', colors=colors, startangle=90)
plt.title('¿Cuál es la proporción de anuncios de ventas de autos clásicos vs modernos?', fontsize=12, fontweight='bold')
plt.tight_layout()
plt.savefig('reports/figuras/q5_clasicos_vs_modernos_proporcion.png', dpi=150, bbox_inches='tight')
plt.close()
# barras
plt.figure(figsize=(8,6))
ax = sns.barplot(x=prop5.index, y=prop5.values, palette=colors)
plt.title('¿Cuál es la proporción de anuncios de ventas de autos clásicos vs modernos? (conteo)', fontsize=12, fontweight='bold')
plt.xlabel('Categoría')
plt.ylabel('Número de anuncios')
for i, v in enumerate(prop5.values):
    ax.text(i, v + 20, f'{v} ({v/prop5.sum()*100:.1f}%)', ha='center', va='bottom', fontsize=10)
plt.tight_layout()
plt.savefig('reports/figuras/q5_clasicos_vs_modernos_conteo.png', dpi=150, bbox_inches='tight')
plt.close()
prop5.to_csv('reports/tablas/q5_clasicos_vs_modernos_grafico.csv')

# Q6: ¿Cuál es la diferencia entre los precios del mercado formal y el mercado informal?
# Comparación general
plt.figure(figsize=(10,6))
data_q6 = [formal_v['precio_usd'].values, inf_activo['precio_usd'].values]
bp = plt.boxplot(data_q6, labels=['Mercado formal\n(comercializadoras)', 'Mercado informal\n(Revolico La Habana)'], showfliers=False)
plt.title('¿Cuál es la diferencia entre los precios del mercado formal y el mercado informal?', fontsize=12, fontweight='bold')
plt.ylabel('Precio (USD)')
plt.tight_layout()
plt.savefig('reports/figuras/q6_formal_vs_informal_boxplot_titulo_pregunta.png', dpi=150, bbox_inches='tight')
plt.close()

# Violin plot
plt.figure(figsize=(10,6))
df_q6 = pd.DataFrame({
    'precio': list(formal_v['precio_usd'].values) + list(inf_activo['precio_usd'].values),
    'mercado': ['Formal']*len(formal_v) + ['Informal']*len(inf_activo)
})
sns.violinplot(data=df_q6, x='mercado', y='precio', palette=['#10B981','#F59E0B'])
plt.title('¿Cuál es la diferencia entre los precios del mercado formal y el mercado informal? (distribución)', fontsize=12, fontweight='bold')
plt.xlabel('Mercado')
plt.ylabel('Precio (USD)')
plt.tight_layout()
plt.savefig('reports/figuras/q6_formal_vs_informal_violin.png', dpi=150, bbox_inches='tight')
plt.close()

# Medianas comparativas
comp_q6 = pd.DataFrame({
    'Mercado': ['Formal (comercializadoras)', 'Informal (Revolico La Habana, activos)'],
    'n': [len(formal_v), len(inf_activo)],
    'Mediana (USD)': [formal_v['precio_usd'].median(), inf_activo['precio_usd'].median()],
    'Media (USD)': [formal_v['precio_usd'].mean(), inf_activo['precio_usd'].mean()],
    'P25': [formal_v['precio_usd'].quantile(0.25), inf_activo['precio_usd'].quantile(0.25)],
    'P75': [formal_v['precio_usd'].quantile(0.75), inf_activo['precio_usd'].quantile(0.75)],
})
plt.figure(figsize=(10,6))
ax = sns.barplot(data=comp_q6, x='Mercado', y='Mediana (USD)', palette=['#10B981','#F59E0B'])
plt.title('¿Cuál es la diferencia entre los precios del mercado formal y el mercado informal? (mediana)', fontsize=12, fontweight='bold')
plt.ylabel('Precio mediano (USD)')
for i, row in enumerate(comp_q6.itertuples()):
    ax.text(i, row._3 + 500, f'{row._3:.0f} USD (n={row.n})', ha='center', va='bottom', fontsize=10)
plt.tight_layout()
plt.savefig('reports/figuras/q6_formal_vs_informal_mediana_barras.png', dpi=150, bbox_inches='tight')
plt.close()
comp_q6.to_csv('reports/tablas/q6_formal_vs_informal_comparacion_grafico.csv', index=False)

# Cruce por marca
inf_norm = inf_activo.copy()
inf_norm['marca_norm'] = inf_norm['marca']
formal_m = formal_v.groupby('marca_norm')['precio_usd'].median().rename('mediana_formal')
informal_mn = inf_norm.groupby('marca_norm')['precio_usd'].median().rename('mediana_informal')
cruce = pd.concat([formal_m, informal_mn], axis=1).dropna()
cruce['diferencia'] = cruce['mediana_formal'] - cruce['mediana_informal']
cruce = cruce.sort_values('mediana_formal', ascending=False).head(12)
cruce_plot = cruce.reset_index()
plt.figure(figsize=(12,6))
x = np.arange(len(cruce_plot))
width = 0.35
plt.bar(x - width/2, cruce_plot['mediana_formal'], width, label='Formal', color='#10B981')
plt.bar(x + width/2, cruce_plot['mediana_informal'], width, label='Informal', color='#F59E0B')
plt.title('¿Cuál es la diferencia entre los precios del mercado formal y el mercado informal? (cruce por marca)', fontsize=12, fontweight='bold')
plt.xlabel('Marca')
plt.ylabel('Precio mediano (USD)')
plt.xticks(x, cruce_plot['marca_norm'], rotation=45, ha='right')
plt.legend()
plt.tight_layout()
plt.savefig('reports/figuras/q6_formal_vs_informal_cruce_marca.png', dpi=150, bbox_inches='tight')
plt.close()

# Q7: ¿Cuál es el municipio con mayor índice de publicaciones?
q7 = df_rev['municipio'].value_counts()
plt.figure(figsize=(12,6))
ax = sns.barplot(x=q7.index, y=q7.values, palette='Purples_r')
plt.title('¿Cuál es el municipio con mayor índice de publicaciones?', fontsize=12, fontweight='bold')
plt.xlabel('Municipio')
plt.ylabel('Número de publicaciones')
plt.xticks(rotation=45, ha='right')
for i, v in enumerate(q7.values):
    ax.text(i, v + 5, str(v), ha='center', va='bottom', fontsize=9)
plt.tight_layout()
plt.savefig('reports/figuras/q7_municipio_mayor_indice_publicaciones_barras.png', dpi=150, bbox_inches='tight')
plt.close()
q7.to_csv('reports/tablas/q7_municipio_mayor_indice_publicaciones_grafico.csv')

# Q8: ¿Existe una relación entre el municipio y el precio de venta?
dfp8 = inf_precio.copy()
q8 = dfp8.groupby('municipio')['precio_usd'].agg(['count','median','mean']).reset_index()
q8 = q8[q8['count'] >= 3].sort_values('median', ascending=False)
plt.figure(figsize=(12,6))
ax = sns.barplot(data=q8, x='municipio', y='median', palette='Oranges_r')
plt.title('¿Existe una relación entre el municipio y el precio de venta? (mediana por municipio, n>=3)', fontsize=12, fontweight='bold')
plt.xlabel('Municipio')
plt.ylabel('Precio mediano (USD)')
plt.xticks(rotation=45, ha='right')
for i, row in enumerate(q8.itertuples()):
    ax.text(i, row.median + 100, f'{row.median:.0f}', ha='center', va='bottom', fontsize=9)
plt.tight_layout()
plt.savefig('reports/figuras/q8_municipio_precio_mediana_barras.png', dpi=150, bbox_inches='tight')
plt.close()
# boxplot por municipio (top municipios por volumen)
top_mun = q7.head(6).index
dfp8_top = dfp8[dfp8['municipio'].isin(top_mun)]
plt.figure(figsize=(12,6))
sns.boxplot(data=dfp8_top, x='municipio', y='precio_usd', order=top_mun, showfliers=False)
plt.title('¿Existe una relación entre el municipio y el precio de venta? (distribución top municipios)', fontsize=12, fontweight='bold')
plt.xlabel('Municipio')
plt.ylabel('Precio (USD)')
plt.xticks(rotation=45, ha='right')
plt.tight_layout()
plt.savefig('reports/figuras/q8_municipio_precio_distribucion_boxplot.png', dpi=150, bbox_inches='tight')
plt.close()
q8.to_csv('reports/tablas/q8_municipio_precio_mediana_grafico.csv', index=False)

# Q9: ¿Cuál es el costo de mantener un auto en la actualidad?
from pathlib import Path
audios = list(Path('data/raw/entrevistas/Audios').glob('*'))
plt.figure(figsize=(10,6))
plt.bar(['Archivos de audio inventariados'], [len(audios)], color='#9CA3AF')
plt.title('¿Cuál es el costo de mantener un auto en la actualidad? (estado: sin datos numéricos)', fontsize=12, fontweight='bold')
plt.ylabel('Cantidad')
for i, v in enumerate([len(audios)]):
    plt.text(i, v + 0.1, f'{v} archivos\n(sin transcripciones)', ha='center', va='bottom', fontsize=10)
plt.tight_layout()
plt.savefig('reports/figuras/q9_costo_mantenimiento_estado.png', dpi=150, bbox_inches='tight')
plt.close()

print("\n¡Gráficos generados en reports/figuras/!")
