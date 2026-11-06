# Mercado Automotriz de La Habana

> **📄 REPORTE TÉCNICO COMPLETO** → [`notebooks/reporte_completo_mercado_automotriz.ipynb`](notebooks/reporte_completo_mercado_automotriz.ipynb)
>
> Es el **documento principal del proyecto**: resumen, datos y métodos, resultados **Q1–Q9**, discusión, limitaciones, referencias y anexos. Notebook ejecutado y reproducible desde los CSV.

---

Proyecto de Ciencia de Datos (1er año) — Universidad de La Habana.

**Objetivo:** analizar el mercado automotriz en La Habana combinando **tres fuentes de recolección**:

1. **Anuncios de internet** (Revolico) — el mercado informal "declarado".
2. **Comercializadoras autorizadas** — el mercado formal (catálogos y precios públicos).
3. **Entrevistas y encuestas a personas naturales** — el mercado "real" (cualitativo/cuantitativo).

## Preguntas de investigación

1. ¿Cuál es la marca con mayor índice de publicaciones? *(proxy: anuncios de Revolico)*
2. ¿Cuál es el promedio de precios por marca?
3. ¿Existe una relación entre el precio y el año de fabricación?
4. ¿Cuál es la marca con los precios más elevados?
5. ¿Cuál es la proporción de anuncios de ventas de autos clásicos vs modernos?
6. ¿Cuál es la diferencia entre los precios del mercado formal y el mercado informal?
7. ¿Cuál es el municipio con mayor índice de publicaciones?
8. ¿Existe una relación entre el municipio y el precio de venta?
9. ¿Cuál es el costo de mantener un auto en la actualidad? *(se responde con las entrevistas)*

> Fuente única y viva: `docs/preguntas_investigacion.md` (fuente, variables, análisis y estado por pregunta).
> Criterio P5: **clásico** = `anio < 2000`; **moderno** = `anio >= 2000`. Q1 se documenta como **proxy** de anuncios.

## Cómo empezar (Linux)

El entorno de desarrollo actual es **Linux** (Python 3.14). El proyecto usa un
entorno virtual `.venv` en la raíz (no versionado).

```bash
# 1. Crear el entorno virtual (una sola vez)
python3 -m venv .venv

# 2. Instalar dependencias (versiones fijadas)
.venv/bin/python -m pip install -r requirements-lock.txt ipykernel

# 3. Registrar el kernel de Jupyter (una sola vez)
.venv/bin/python -m ipykernel install --user --name proyectocd \
  --display-name "ProyectoCD (.venv)"

# 4. Abrir los notebooks
.venv/bin/python -m jupyter notebook
```

> En los notebooks, seleccionar el kernel **ProyectoCD (.venv)** si no lo elige
> Jupyter automáticamente.
>
> Nota (2026-10-26): `pandas==3.0.6` del lock original no tiene build para
> Python 3.14; se fijó **pandas 3.0.5** (misma línea 3.0.x). El resto de
> versiones del lock se instalan tal cual.

### Archivo histórico: Windows

> El proyecto se desarrolló originalmente en Windows (Python 3.13, lanzador
> `py` porque `python` estaba ocupado por el stub de Microsoft Store;
> activación con `.venv\Scripts\Activate.ps1` y, si PowerShell bloquea,
> `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`). Esas
> instrucciones ya no son el entorno activo; se dejan constancia aquí.
>
> Las versiones exactas ya validadas quedaron fijadas en `requirements-lock.txt`.

## Estructura del proyecto

```
ProyectoCD/
├── data/
│   ├── raw/
│   │   ├── clasificados/revolico/   # anuncios.csv, verificacion_anuncios.csv, revolico_paginas/, respaldo_150_2026-09-24/
│   │   ├── comercializadoras/       # comercializadoras.csv, estado_*, manifest.json + catalogos/ (MCV, Dongfeng, BDC ONE)
│   │   └── entrevistas/             # Audios/ (entrevistas por transcribir/estructurar)
│   ├── interim/                     # anuncios_limpios.csv (preprocesado)
│   ├── processed/                   # mercado_havana.csv, regresion_dataset.csv
│   └── tasas_cambio/                # tasas_usd.csv, tasas_eur_usd.csv
├── notebooks/
│   ├── 00_inicio.ipynb              # punto de entrada + verificación de entorno
│   ├── 01_preprocesamiento.ipynb    # Etapa 02
│   ├── 02_preguntas.ipynb           # Etapa 05: las 9 preguntas
│   ├── reporte_completo_mercado_automotriz.ipynb  # Reporte técnico Q1–Q9 (ejecutado)
│   └── historico/                   # 01_eda, 02_modelo_precios, 03_informe_final (proyecto previo)
├── src/
│   ├── scraper_revolico.py          # captura Revolico (API GraphQL)
│   ├── verificar_anuncios_revolico.py
│   ├── scraper_comercializadoras.py # verificación HTTP+DNS + catálogos
│   ├── extraer_catalogo_mcv.py
│   ├── captura_entrevistas.py       # plantilla/validador de entrevistas
│   ├── preprocesamiento.py          # Etapa 02
│   ├── generar_variables.py         # Etapa 04
│   ├── utils/                       # helpers, limpieza, validacion
│   └── exploracion/                 # ingeniería inversa de la API (histórico)
├── docs/
│   ├── preguntas_investigacion.md   # fuente única y viva (9 preguntas)
│   ├── fuentes.md                   # Revolico + comercializadoras + entrevistas
│   ├── diccionario_datos.md         # esquema unificado (tipo_fuente / mercado)
│   ├── esquema_datos.md · guia_campo.md · instrumentos/ (entrevista, encuesta) · ESTADO_PROYECTO.md
├── reports/
│   ├── figuras/                     # fig_*.png
│   └── tablas/                      # *.csv
├── web/                             # Etapa 07: página estática (index.html + assets/ + datos)
├── opencode/                        # bitácora obligatoria (handoffs/, journals/, INDICE.md)
├── requirements.txt · requirements-lock.txt · .gitignore
└── README.md
```

## Las 7 etapas (01–07)

Las 7 etapas de la asignatura son el **concepto organizador**: las carpetas de
primer nivel se mantienen (`data/`, `notebooks/`, `src/`, `docs/`, `reports/`) con
subcarpetas, y la etapa 07 vive en `web/`.

| Etapa | Nombre | Dónde | Estado |
|-------|--------|-------|--------|
| 01 | Capturar | `src/scraper_*.py`, `src/captura_entrevistas.py`, `data/raw/*` | Revolico ✅ · comercializadoras ✅ · entrevistas ⏳ |
| 02 | Preprocesar | `src/preprocesamiento.py`, `notebooks/01_preprocesamiento.ipynb`, `data/interim/` | ✅ |
| 03 | Estructurar y almacenar | `data/processed/`, `data/tasas_cambio/`, `docs/diccionario_datos.md` | ✅ |
| 04 | Procesar | `src/generar_variables.py` | ✅ |
| 05 | Analizar | `notebooks/02_preguntas.ipynb` + reporte | ✅ Q1–Q9 (Q6 con 6 marcas comparables; Q9 con 30 entrevistas) |
| 06 | Presentar | `reports/figuras/`, `reports/tablas/` | ✅ |
| 07 | Comunicar | `web/` (página estática) | ✅ |

## Reporte técnico

`notebooks/reporte_completo_mercado_automotriz.ipynb` es el **reporte técnico completo**:
resumen, introducción, marco conceptual, datos y métodos, resultados Q1–Q9 con
tablas y figuras, discusión, limitaciones, conclusiones, referencias y anexos.
Está ejecutado de principio a fin y todas las cifras se calculan desde los CSV.

## Página web

La historia de datos está publicada como **una sola página estática** en `web/`:
11 bloques narrativos, 9 interactivos calculados en el navegador y las 10 figuras
corregidas. Funciona con doble clic (sin servidor ni conexión).

```bash
xdg-open web/index.html
```

La data se genera desde los CSV con `src/exportar_datos_web.py` y las figuras con
`src/generar_figuras_web.py`. Detalle de arquitectura, contrato de datos y
verificación: `docs/plan_implementacion_web.md` y `web/README.md`.

## Estado de las capturas

- **Anuncios (Revolico, informal):** **3.958 anuncios** en `data/raw/clasificados/revolico/anuncios.csv` tras la **ampliación nacional de 2026-10-26** (universo completo de 79/79 páginas recorrido con `src/scraper_revolico_ampliado.py`; 16/16 provincias; respaldo de la muestra previa de 600 en `respaldo_600_2026-10-26/`). La muestra anterior (600 de La Habana) tuvo verificación en vivo en `verificacion_anuncios.csv` (83 despublicados, 45 eliminados, 1 expirado); el preprocesamiento (etapa 02) conserva solo los **activos**. Informe completo: `docs/informe_ampliacion_2026-10-26.md`.
- **Comercializadoras (formal):** verificación HTTP+DNS registrada en `estado_comercializadoras.csv` y `informe_catalogos.md`; catálogos con precios públicos de **BDC ONE**, **Dongfeng Cuba** y **MCV Comercial** en `data/raw/comercializadoras/catalogos/`. El resto de entidades no fueron verificables desde esta red (ver `docs/fuentes.md`).
- **Entrevistas/encuestas (cualitativo):** **30 entrevistas procesadas** en `data/raw/entrevistas/Entrevistas.txt` (resúmenes, no verbatim). Instrumentos en `docs/instrumentos/`.

> **Q6 y Q9 están respondidas:** Q6 con los catálogos formales (83 modelos; brecha de 10.699 USD) y Q9 con las 30 entrevistas. El desarrollo completo está en `notebooks/reporte_completo_mercado_automotriz.ipynb`.

## Handoffs y journals del proyecto

La carpeta **`opencode/`** es el **registro obligatorio** de todo handoff y
journal ejecutado en el proyecto (regla permanente desde 2026-10-11):

- `opencode/handoffs/` — documentos de traspaso entre sesiones (estado, archivos
  clave, decisiones, siguiente paso).
- `opencode/journals/` — bitácora de hallazgos y decisiones técnicas.
- `opencode/INDICE.md` — tabla de registro con todas las entradas.
- Convención y regla permanente documentadas en `opencode/README.md`.
