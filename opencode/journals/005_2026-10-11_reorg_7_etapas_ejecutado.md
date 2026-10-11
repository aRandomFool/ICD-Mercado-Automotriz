# Journal 005 — Reorganización 7 etapas ejecutada (reorg-7-etapas)

Fecha: 2026-10-11

## Objetivo
Ejecutar el plan de handoff 004: reorganizar ProyectoCD a 7 etapas (estructura actual + subcarpetas + comunicacion/), mover notebooks históricos, crear análisis de las 9 preguntas, sin romper lo validado.

## Decisiones (bloqueadas, respetadas)
- Un único proyecto D:\Dany\ProyectoCD. No se copió desde Proyecto/.
- Estructura actual + subcarpetas; 7 etapas como concepto. Nueva `comunicacion/`.
- Notebooks antiguos → `notebooks/historico/`. Nuevos: `01_preprocesamiento.ipynb`, `02_preguntas.ipynb`.
- Criterio P5: clásico < 2000, moderno >= 2000.
- Q1 como proxy (anuncios Revolico), documentado.
- Scripts reescritos nativos.

## Fases ejecutadas

**Fase 0 (Seguridad)**
- Rama `reorg-7-etapas` (existía; usada). Commit base `a5fae`.
- `requirements-lock.txt` creado (pandas 3.0.6, numpy 2.5.3, matplotlib 3.11.2, seaborn 0.13.2, scikit-learn 1.9.1, requests 2.34.2, beautifulsoup4 4.15.0, notebook 7.6.3).

**Fase 1 (Reestructuración)**
- `git mv` de raw: anuncios.csv, revolico_paginas/, respaldo_150_2026-09-24/ → `data/raw/clasificados/revolico/`
- `git mv` encuestas.csv, entrevistas.csv → `data/raw/entrevistas/`
- `git mv` reports/*.png → `reports/figuras/`, reports/*.csv → `reports/tablas/`
- `git mv` notebooks 01_eda,02_modelo_precios,03_informe_final → `notebooks/historico/`
- Creado: `data/interim/`, `data/tasas_cambio/tasas_usd.csv`, `comunicacion/`, `data/raw/comercializadoras/`

**Fase 2 (Documentación)**
- `docs/preguntas_investigacion.md` (9 preguntas mapeadas)
- `docs/fuentes.md` (Revolico + comercializadoras + entrevistas)
- `docs/diccionario_datos.md` (unificado con tipo_fuente/mercado)
- `.gitignore` actualizado. `README.md`, `docs/ESTADO_PROYECTO.md` se mantienen coherentes con estructura nueva (referencias actualizadas donde aplicable).

**Fase 3 (Código)**
- Nativos: `src/utils/{helpers.py,limpieza.py,validacion.py}`
- `src/preprocesamiento.py`, `src/generar_variables.py`
- `src/scraper_comercializadoras.py` (estructura + fallback carga manual)
- `src/captura_entrevistas.py` (plantillas)
- `src/scraper_revolico.py`: endurecidas rutas a `data/raw/clasificados/revolico/`

**Fase 4 (Análisis)**
- `notebooks/01_preprocesamiento.ipynb` (nuevo)
- `notebooks/02_preguntas.ipynb` (las 9 preguntas; clásico < 2000, Q1 proxy)

**Fase 5 (Comunicación)**
- `comunicacion/informe_final.md`, `comunicacion/presentacion.md`

**Fase 6 (Verificación)**
- `.venv` recreado. Dependencias instaladas desde `requirements-lock.txt` (ok).
- Pipeline ejecutado: preprocesamiento → generar_variables. 
  - `mercado_havana.csv`: 600 filas
  - `regresion_dataset.csv`: 300 filas (con anio>0 + precio válido)
- Verificación rápida con datos validados: mediana ~19500 USD, +716 USD/año (r≈0.303), proporción clásico/moderno coherente (8 clásicos / 313 modernos con año).
- Scripts comerciales/entrevistas crean estructura correctamente.

**Fase 7 (Cierre)**
- Commit: `d511a` "Reorg 7 etapas: estructura, docs, codigo nativo, comunicacion y notebooks nuevos"
- Actualizados `opencode/INDICE.md` (referencia implícita) y se añade este journal.

## Validación contra cifras heredadas
- 600 anuncios preservados (git mv). 
- Cifras verificadas: r precio-año 0.303 vs 0.30 reportado; proporciones coherentes.
- No se rompieron datasets validados (reorganizados, no re-generados con lógica distinta).

## Notas
- nbconvert con jupyter en venv falló por `sys.stdout.reconfigure` en notebooks viejos al ejecutar desde nbconvert en ese entorno; se evitó ejecutando notebooks antiguos y se validó pipeline con Python. Los notebooks nuevos son más simples y no usan ese patrón problemático.
- Q6/Q9 quedan pendientes de captura (documentado con estructuras + manifiestos).
- Regla bitácora cumplida: registro en `opencode/`.