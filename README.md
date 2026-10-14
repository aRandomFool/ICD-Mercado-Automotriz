# Mercado Automotriz de La Habana

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

## Cómo empezar (Windows)

Este proyecto usa el lanzador `py` porque en esta máquina el comando `python` está
ocupado por el stub de Microsoft Store.

```powershell
# 1. Crear el entorno virtual (una sola vez)
py -m venv .venv

# 2. Activarlo
.venv\Scripts\Activate.ps1

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Abrir los notebooks
jupyter notebook
```

> Si PowerShell te bloquea la activación, ejecuta primero:
> `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`

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
├── comunicacion/                    # Etapa 07: informe_final.md + presentacion.md
├── opencode/                        # bitácora obligatoria (handoffs/, journals/, INDICE.md)
├── requirements.txt · requirements-lock.txt · .gitignore
└── README.md
```

## Las 7 etapas (01–07)

Las 7 etapas de la asignatura son el **concepto organizador**: las carpetas de
primer nivel se mantienen (`data/`, `notebooks/`, `src/`, `docs/`, `reports/`) con
subcarpetas, y la etapa 07 vive en `comunicacion/`.

| Etapa | Nombre | Dónde | Estado |
|-------|--------|-------|--------|
| 01 | Capturar | `src/scraper_*.py`, `src/captura_entrevistas.py`, `data/raw/*` | Revolico ✅ · comercializadoras ✅ · entrevistas ⏳ |
| 02 | Preprocesar | `src/preprocesamiento.py`, `notebooks/01_preprocesamiento.ipynb`, `data/interim/` | ✅ |
| 03 | Estructurar y almacenar | `data/processed/`, `data/tasas_cambio/`, `docs/diccionario_datos.md` | ✅ |
| 04 | Procesar | `src/generar_variables.py` | ✅ |
| 05 | Analizar | `notebooks/02_preguntas.ipynb` | ✅ Q1–5,7,8 · pendientes Q6 y Q9 |
| 06 | Presentar | `reports/figuras/`, `reports/tablas/` | ✅ |
| 07 | Comunicar | `comunicacion/` | ✅ |

## Estado de las capturas

- **Anuncios (Revolico, informal):** 600 anuncios únicos en `data/raw/clasificados/revolico/anuncios.csv`. La verificación en vivo de URLs quedó en `verificacion_anuncios.csv` (83 despublicados, 45 eliminados, 1 expirado); el preprocesamiento (etapa 02) conserva solo los **activos**.
- **Comercializadoras (formal):** verificación HTTP+DNS registrada en `estado_comercializadoras.csv` y `informe_catalogos.md`; catálogos con precios públicos de **BDC ONE**, **Dongfeng Cuba** y **MCV Comercial** en `data/raw/comercializadoras/catalogos/`. El resto de entidades no fueron verificables desde esta red (ver `docs/fuentes.md`).
- **Entrevistas/encuestas (cualitativo):** audio en `data/raw/entrevistas/Audios/`, **pendiente de transcribir/estructurar**. Instrumentos en `docs/instrumentos/`.

> No se inventan datos: las preguntas 6 (formal vs informal) y 9 (costo de mantener un auto) quedan pendientes hasta completar las capturas correspondientes.

## Handoffs y journals del proyecto

La carpeta **`opencode/`** es el **registro obligatorio** de todo handoff y
journal ejecutado en el proyecto (regla permanente desde 2026-10-11):

- `opencode/handoffs/` — documentos de traspaso entre sesiones (estado, archivos
  clave, decisiones, siguiente paso).
- `opencode/journals/` — bitácora de hallazgos y decisiones técnicas.
- `opencode/INDICE.md` — tabla de registro con todas las entradas.
- Convención y regla permanente documentadas en `opencode/README.md`.
