# Handoff 004 — Reorganización a 7 etapas + análisis de las 9 preguntas

> **Traspaso a la sesión** `ses_ed617d618ffeZLBDGKATaObiaK`
> (*Reorganización 7 etapas + 9 preguntas*). Sesión de origen:
> `ses_ed62e5417ffeZWZhgQzACb4s5L`. Fecha: 2026-10-11.
> Objetivo del traspaso: **ejecutar** el plan de reorganización ya acordado con el
> usuario (no volver a planificar). Ver también `docs/ESTADO_PROYECTO.md`.

## Objetivo de la sesión destino

Reorganizar `D:\Dany\ProyectoCD` siguiendo las **7 etapas** de la asignatura
(Capturar → Preprocesar → Estructurar y almacenar → Procesar → Analizar →
Presentar → Comunicar), **manteniendo la estructura de directorios actual**
(`data/`, `notebooks/`, `src/`, `docs/`, `reports/`, `opencode/`) y añadiendo
subcarpetas. Sustituir los notebooks actuales por un análisis nuevo de las **9
preguntas de investigación**, sin romper los resultados ya validados.

## ⚠️ Restricciones y decisiones bloqueadas (NO reabrir)

1. **Un único proyecto: `D:\Dany\ProyectoCD`.** NO fusionar con
   `...\Introducción a Ciencia de Datos\Proyecto\` (ese directorio es un andamiaje
   de referencia; **no se copia ni se combina**). Los scripts nuevos se **reescriben
   nativos** en ProyectoCD.
2. **Estructura:** actual + subcarpetas. Las 7 etapas son el *concepto organizador*;
   **no** renombrar carpetas de primer nivel a `01_..07_`.
3. **Etapa 07 (Comunicar):** carpeta nueva de primer nivel `comunicacion/`.
4. **Notebooks actuales:** archivar en `notebooks/historico/` (reversible por git);
   construir el análisis nuevo aparte.
5. **Criterio P5:** `clasico` = `anio < 2000`; `moderno` = `anio >= 2000`.
6. **Q1 ("redes sociales"):** usar los anuncios de Revolico como *proxy* de
   "publicaciones por marca" (no se captura redes sociales aparte).
7. **Scraper que se conserva:** `src/scraper_revolico.py` (API GraphQL), que es el
   que realmente funciona. Comercializadoras y entrevistas son capturas **nuevas**.
8. **No re-ejecutar** notebooks ni pipeline hasta fijar versiones
   (`requirements-lock.txt`) y recrear `.venv`; así no cambian las cifras validadas.

## Estado heredado (verificado)

- **Proyecto (0–6): completo.** 600 anuncios de Revolico; `data/raw/anuncios.csv`
  (601 líneas = cabecera + 600); datasets `data/processed/mercado_havana.csv` (600)
  y `data/processed/regresion_dataset.csv` (247); informe en
  `notebooks/03_informe_final.ipynb`; resultados en `docs/ESTADO_PROYECTO.md`
  (mediana 19 500 USD, +716 USD/año, clasificación funcional).
- **Git:** repo con **1 commit** limpio (`827fd`); `README.md` y
  `docs/ESTADO_PROYECTO.md` modificados sin commit; `opencode/` **sin versionar**.
- **`.venv` NO existe.** Recrear con `py -m venv .venv` solo tras fijar versiones.
- **Desajustes a corregir durante la reorg:** `handoffs/003` dice `scripts/` (es
  `src/`); `ESTADO_PROYECTO` lista `.venv` y `data/raw/{campo,visitas}.csv` que no
  existen; `README`/`00_inicio`/`esquema_datos` hablan de "~100 anuncios" y de
  Fase 3 saltada; `src/README.md` dice "~130 anuncios" (son 600).

## Set nuevo de preguntas (vivo, puede cambiar)

Fuente: `...\Introducción a Ciencia de Datos\Preguntas_Analizar.txt`.
1. Marca con mayor índice de publicaciones (proxy: conteo en anuncios).
2. Mediana de precios por marca.
3. Relación precio–año de fabricación.
4. Marca con los precios más elevados.
5. Proporción clásicos (<2000) vs modernos (>=2000).
6. **Diferencia de precios mercado formal (comercializadoras) vs informal (clasificados).**
7. Municipio con mayor índice de publicaciones.
8. Relación municipio–precio.
9. **Factores de decisión eléctrico vs combustión (entrevistas).**

Respondibles hoy: 1–5, 7, 8. Requieren captura nueva: **6** (comercializadoras) y
**9** (entrevistas).

## Estructura objetivo

```
ProyectoCD/
├── data/
│   ├── raw/
│   │   ├── clasificados/revolico/   # anuncios.csv, revolico_paginas/, respaldo_150_2026-09-24/
│   │   ├── comercializadoras/       # NUEVO
│   │   └── entrevistas/             # NUEVO (encuestas.csv, entrevistas.csv)
│   ├── interim/                     # NUEVO
│   ├── processed/                   # mercado_havana.csv, regresion_dataset.csv
│   └── tasas_cambio/tasas_usd.csv   # NUEVO
├── notebooks/
│   ├── 00_inicio.ipynb
│   ├── 01_preprocesamiento.ipynb    # NUEVO
│   ├── 02_preguntas.ipynb           # NUEVO: las 9 preguntas
│   └── historico/                   # 01_eda, 02_modelo_precios, 03_informe_final (sin tocar)
├── src/
│   ├── scraper_revolico.py          # captura real (GraphQL)
│   ├── scraper_comercializadoras.py # NUEVO
│   ├── captura_entrevistas.py       # NUEVO (plantilla/validador)
│   ├── preprocesamiento.py          # NUEVO
│   ├── generar_variables.py         # NUEVO
│   ├── utils/ (helpers, limpieza, validacion)   # NUEVO
│   └── exploracion/                 # histórico de ingeniería inversa
├── docs/
│   ├── preguntas_investigacion.md   # NUEVO: fuente única y viva
│   ├── fuentes.md                   # NUEVO: Revolico + comercializadoras + entrevistas
│   ├── diccionario_datos.md         # NUEVO: esquema unificado (soporta Q6)
│   ├── esquema_datos.md · guia_campo.md · instrumentos/ · ESTADO_PROYECTO.md
├── reports/
│   ├── figuras/                     # fig_*.png
│   └── tablas/                      # *.csv
├── comunicacion/                    # NUEVO (etapa 07): informe + slides
├── opencode/                        # bitácora obligatoria
├── README.md · requirements.txt · requirements-lock.txt · .gitignore
```

## Mapa etapas → carpetas

| Etapa | Carpeta(s) |
|-------|-----------|
| 01 Captura | `src/scraper_*.py`, `src/captura_entrevistas.py`, `data/raw/{clasificados,comercializadoras,entrevistas}` |
| 02 Preprocesamiento | `src/preprocesamiento.py`, `notebooks/01_preprocesamiento.ipynb`, `data/interim/` |
| 03 Estructurar y almacenar | `data/processed/`, `data/tasas_cambio/`, `docs/diccionario_datos.md` |
| 04 Procesar | `src/generar_variables.py` |
| 05 Analizar | `notebooks/02_preguntas.ipynb` |
| 06 Presentar | `reports/figuras/`, `reports/tablas/` |
| 07 Comunicar | `comunicacion/` |

## Plan de ejecución (orden)

**Fase 0 · Seguridad y registro**
- `git checkout -b reorg-7-etapas` (hay 1 commit limpio).
- Crear `requirements-lock.txt` con las versiones documentadas: pandas 3.0.6,
  numpy 2.5.3, matplotlib 3.11.2, seaborn 0.13.2, scikit-learn 1.9.1,
  requests 2.34.2, beautifulsoup4 4.15.0, notebook 7.6.3.

**Fase 1 · Reestructuración física** (todo con `git mv`)
- `data/raw/{anuncios.csv, revolico_paginas/, respaldo_150_2026-09-24/}` →
  `data/raw/clasificados/revolico/`
- `data/raw/{encuestas.csv, entrevistas.csv}` → `data/raw/entrevistas/`
- `reports/*.png` → `reports/figuras/`; `reports/*.csv` → `reports/tablas/`
- `notebooks/{01_eda,02_modelo_precios,03_informe_final}.ipynb` → `notebooks/historico/`
- Crear `data/interim/`, `data/tasas_cambio/tasas_usd.csv`, `comunicacion/`

**Fase 2 · Documentación viva**
- `docs/preguntas_investigacion.md` (9 preguntas → fuente/variable/análisis/estado).
- `docs/fuentes.md` (Revolico + las 16 comercializadoras de `Comercializadoras.txt` + entrevistas).
- `docs/diccionario_datos.md` (esquema unificado con `tipo_fuente`/`mercado`).
- Actualizar `README.md`, `docs/ESTADO_PROYECTO.md`, `.gitignore`.

**Fase 3 · Código (reescrito nativo, no copiado)**
- `src/utils/{helpers,limpieza,validacion}.py`
- `src/preprocesamiento.py`, `src/generar_variables.py`
- `src/scraper_comercializadoras.py` (con fallback de captura manual),
  `src/captura_entrevistas.py`
- Endurecer rutas de `src/scraper_revolico.py` a la nueva carpeta
  (`data/raw/clasificados/revolico/`).

**Fase 4 · Análisis nuevo**
- `notebooks/01_preprocesamiento.ipynb`, `notebooks/02_preguntas.ipynb`
  (las 9 preguntas; clásico `< 2000`; Q1 por conteo de marca).
- Salidas a `reports/figuras|tablas/`.

**Fase 5 · Comunicación**
- `comunicacion/informe_final.md` + `comunicacion/presentacion.md`.

**Fase 6 · Verificación**
- Recrear `.venv` con el lock, ejecutar pipeline y comprobar coherencia con lo
  validado (600 anuncios, mediana 19 500 USD, +716 USD/año).

**Fase 7 · Cierre**
- Journal + handoff en `opencode/`, actualizar `INDICE.md` y `docs/ESTADO_PROYECTO.md`.

## Entorno (recordatorio)

- `python` NO funciona (stub de Microsoft Store) → usar **`py`**.
- PowerShell destruye comillas dobles en `python -c` largos → escribir scripts a archivo.
- Consola cp1252: usar `sys.stdout.reconfigure(encoding='utf-8', errors='replace')`.

## Notas de ejecución

- Si el scraper de comercializadoras encuentra catálogos públicos con precio, captura
  real; si no, deja estructura + registro en `fuentes.md` y soporte de carga manual.
- La Q1 se documenta explícitamente como *proxy* (anuncios), no como redes sociales.
- No romper la regla permanente de bitácora: toda entrada nueva se registra en
  `opencode/` y se refleja en `INDICE.md`.
