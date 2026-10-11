# Handoff 001 — Proyecto Mercado Automotriz de La Habana (estado completo)

- **Fecha:** 2026-10-11
- **Sesión:** `ses_f3a69397dffeGusRm7zPXMha76`
- **Proyecto:** `D:\Dany\ProyectoCD` (Ciencia de Datos · 1er año · Universidad de La Habana)
- **Fuente de verdad del estado:** `docs/ESTADO_PROYECTO.md`

## Objetivo del proyecto

Analizar el mercado automotriz de La Habana combinando fuentes de datos: no existe
un dataset público del mercado cubano, por lo que el proyecto **construye sus
propios datos** scrapeando anuncios de Revolico (mercado «declarado») y, en el
futuro, recolección de campo (Fase 3, en pausa).

**Preguntas de investigación**
- Q1. ¿Qué factores explican el precio de un carro en La Habana?
- Q2. ¿Los precios publicados difieren de la realidad observada en la calle? *(requiere campo, en pausa)*
- Q3. ¿Qué segmentos de mercado existen?

## Estado del trabajo (Fases 0–6 ✅ completadas)

| Fase | Estado |
|------|--------|
| 0 · Setup | ✅ |
| 1 · Esquema de datos validado | ✅ |
| 2 · Scraping Revolico | ✅ **600 anuncios** (ampliado de 150 el 2026-09-24) |
| 3 · Campo / entrevistas | ⏸️ Saltada por decisión del usuario (instrumentos listos) |
| 4 · EDA | ✅ `notebooks/01_eda.ipynb` (600 anuncios, fig_01..07) |
| 5 · Modelo de precios | ✅ `notebooks/02_modelo_precios.ipynb` (M0–M3, split+CV, re-entrenado con muestra ampliada) |
| 6 · Informe final | ✅ `notebooks/03_informe_final.ipynb` (22 celdas, 0 errores) |

## Archivos clave

- `data/raw/anuncios.csv` — 600 anuncios únicos (0 duplicados).
- `data/raw/revolico_paginas/*.json` — respaldo crudo por página (12 archivos, JSON legible).
- `data/raw/respaldo_150_2026-09-24/` — muestra original de 150 (CSV + 3 JSON).
- `data/processed/mercado_havana.csv` — dataset limpio (600 filas).
- `data/processed/regresion_dataset.csv` — featureset del modelo (247 filas).
- `notebooks/01_eda.ipynb`, `02_modelo_precios.ipynb`, `03_informe_final.ipynb`.
- `src/scraper_revolico.py` — scraper GraphQL (MIN_ANUNCIOS=600, pausa 4 s, sin teléfonos).
- `reports/` — fig_01..fig_10 + `tabla_metricas_modelos.csv` + `coeficientes_m2.csv`.
- `docs/ESTADO_PROYECTO.md` — estado verificado (secciones 6bis y 6ter con numeros reales).

## Resultados verificados (números reales, no inventados)

- **EDA:** 600 anuncios, 555 con precio (92%), mediana 19 500 USD, 94% de los
  anuncios con año posteriores a 2010, tendencia **+716 USD/año** (r=0.30).
- **Modelo (split 75/25, seed 42):** M1 R² test +0.04, M2 +0.03, M3 −0.49;
  CV 5-fold: M1 −0.085, M2 −0.378, M3 −0.573 (RMSE ~19–22k USD).
- **Comparación ampliación (150→600):** 4–5× más datos estabilizaron las métricas
  (M2 CV de ≈ −4.4 a −0.38) pero el modelo sigue sin superar a la media: la causa
  es la falta de variables fuertes (km, estado, combustible vacíos en Revolico).
- Coeficientes M2 (base `audi`): bmw +51 878, ford +30 467, land rover +18 550 USD.

## Decisiones importantes

- `anio = 0` para años faltantes (no se eliminan filas); tasa fija **710 CUP/USD**.
- Pipeline sin data leakage: split 75/25 seed 42 → OHE solo en train → CV 5-fold.
- Scraper sin teléfonos/datos de contacto (ética); respaldo JSON por página.
- JSON crudos organizados y formateados (indent=2) en `data/raw/revolico_paginas/`.

## Pendientes / siguiente paso

- **Opcional:** exportar `03_informe_final.ipynb` a HTML embebido (`--embed-images`,
  con plan B de inlining si nbconvert no incrusta las figuras markdown) para entrega.
- **Opcionales retomar:** Fase 3 de campo, scraping enriquecido, modelos no lineales.

## Nota de entorno

- El comando `python` NO funciona (stub MS Store) → usar `py`.
- ⚠️ **El venv `.venv` del proyecto ya no existe** (2026-10-11): los comandos
  con `.venv\Scripts\python.exe` fallan. Recrear con `py -m venv .venv` y
  `pip install -r requirements.txt` antes de re-ejecutar los notebooks, si se
  necesita (los notebooks ya están ejecutados con sus salidas guardadas).