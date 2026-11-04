#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
from pathlib import Path
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

plt.rcParams['figure.figsize'] = (10, 6)
plt.rcParams['font.size'] = 10
sns.set_style("whitegrid")

Path('reports/figuras').mkdir(parents=True, exist_ok=True)
Path('reports/tablas').mkdir(parents=True, exist_ok=True)

df_rev = pd.read_csv('data/interim/anuncios_limpios.csv', encoding='utf-8-sig')
df_form = pd.read_csv('data/processed/comercializadoras.csv', encoding='utf-8-sig')

df_rev['marca'] = df_rev['marca'].fillna('no identificada').astype(str).str.lower().str.strip()
df_rev['municipio'] = df_rev['municipio'].fillna('sin municipio').astype(str).str.lower().str.strip()
df_rev['precio_usd'] = pd.to_numeric(df_rev['precio_usd'], errors='coerce')
df_rev['anio'] = pd.to_numeric(df_rev['anio'], errors='coerce')

df_form['marca_norm'] = df_form['marca_norm'].fillna(df_form['marca']).fillna('no identificada').astype(str).str.lower().str.strip()
df_form['precio_usd'] = pd.to_numeric(df_form['precio_usd'], errors='coerce')

formal_v = df_form[(df_form['tipo_item']=='vehiculo') & (df_form['precio_usd'].notna()) & (df_form['precio_uspc]?')].copy()
# better
formal_v = df_form[(df_form['tipo_item']=='vehiculo') & (df_form['precio_usd'].notna()) & (df_form['precio_usd']>0)].copy()

inf_precio = df_rev[(df_rev['precio_usd'].notna()) & (df_rev['precio_usd']>0)].copy()
if 'estado_verificacion' in inf_precio.columns:
    inf_activo = inf_precio[inf_precio['estado_verificacion']=='activo'].copy()
else:
    inf_activo = inf_precio.copy()

# Q6 fix
plt.figure(figsize=(10,6))
data_q6 = [formal_v['precio_usd'].values, inf_activo['precio_usd'].values]
plt.boxplot(data_q6, showfliers=False, tick_labels=['Mercado formal\n(comercializadoras)', 'Mercado informal\n(Revolico La Habana)'])
plt.title('¿Cuál es la diferencia entre los precios del mercado formal y el mercado informal?', fontsize=12, fontweight='bold')
plt.ylabel('Precio (USD)')
plt.tight_layout()
plt.savefig('reports/figuras/q6_formal_vs_informal_boxplot_titulo_pregunta.png', dpi=150, bbox_inches='tight')
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
ax = sns.barplot(data=comp_q6, x='Mercado', y='Mediana (USD)', hue='Mercado', palette=['#10B981','#F59E0B'], legend=False)
plt.title('¿Cuál es la diferencia entre los precios del mercado formal y el mercado informal? (mediana)', fontsize=12, fontweight='bold')
plt.ylabel('Precio mediano (USD)')
for i, row in enumerate(comp_q6.itertuples()):
    ax.text(i, row._3 + 500, f'{row._3:.0f} USD (n={row.n})', ha='center', va='bottom', fontsize=10)
plt.tight_layout()
plt.savefig('reports/figuras/q6_formal_vs_informal_mediana_barras.png', dpi=150, bbox_inches='tight')
plt.close()
comp_q6.to_csv('reports/tablas/q6_formal_vs_informal_comparacion_grafico.csv', index=False)

# Violin
df_q6 = pd.DataFrame({
    'precio': list(formal_v['precio_usd'].values) + list(inf_activo['precio_usd'].values),
    'mercado': ['Formal']*len(formal_v) + ['Informal']*len(inf_activo)
})
plt.figure(figsize=(10,6))
sns.violinplot(data=df_q6, x='mercado', y='precio', hue='mercado', palette=['#10B981','#F59E0B'], legend=False)
plt.title('¿Cuál es la diferencia entre los precios del mercado formal y el mercado informal? (distribución)', fontsize=12, fontweight='bold')
plt.xlabel('Mercado')
plt.ylabel('Precio (USD)')
plt.tight_layout()
plt.savefig('reports/figuras/q6_formal_vs_informal_violin.png', dpi=150, bbox_inches='tight')
plt.close()

# Cruce
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

print("Q6 done")
