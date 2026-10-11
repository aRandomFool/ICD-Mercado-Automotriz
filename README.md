# Mercado Automotriz de La Habana

Proyecto de Ciencia de Datos (1er año) — Universidad de La Habana.

**Objetivo:** analizar el mercado automotriz en La Habana combinando dos fuentes de datos:

1. **Anuncios** scrapeados de sitios como Revolico y Porlalivre (el mercado "declarado").
2. **Observaciones de campo** recolectadas en la calle (el mercado "real").

## Preguntas de investigación

1. ¿Qué factores explican el precio de un carro en La Habana? (año, marca, estado, km...)
2. ¿Los precios publicados en anuncios difieren de la realidad observada en la calle?
3. ¿Qué segmentos de mercado existen? (clásicos, modernos, de trabajo...)

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

## Estructura del proyecto

```
ProyectoCD/
├── data/
│   ├── raw/          # datos crudos (anuncios.csv, campo.csv)
│   └── processed/    # datos limpios (mercado_havana.csv, regresion_dataset.csv)
├── notebooks/        # análisis paso a paso (Jupyter)
├── src/              # módulos reutilizables (scraper, limpieza)
├── docs/             # documentación del esquema de datos
├── reports/          # gráficos y resultados finales
├── requirements.txt
└── README.md
```

## Hoja de ruta (fases)

| Fase | Descripción | Archivo | Estado |
|------|-------------|---------|--------|
| 0 | Setup del entorno | este README | ✅ |
| 1 | Revisar ~50–100 anuncios a mano y validar el esquema | `docs/esquema_datos.md` | ✅ |
| 2 | Scraping de anuncios de Carros en La Habana | `data/raw/anuncios.csv` | ✅ 600 anuncios |
| 3 | Recolección de campo (~100 observaciones) | `data/raw/campo.csv` + `docs/guia_campo.md` | ⏳ en curso — plantilla lista |
| 4 | Limpieza y EDA | `notebooks/01_eda.ipynb` | ✅ 600 anuncios, 7 gráficos, dataset limpio |
| 5 | Primer modelo de precios (regresión) | `notebooks/02_modelo_precios.ipynb` | ✅ M0–M3, lineal y log, split 75/25 + CV |
| 6 | Informe final con gráficos | `notebooks/03_informe_final.ipynb` | ✅ **proyecto completo** |

## Fase 2 completada — scraping de Revolico

`src/scraper_revolico.py` consulta la **API GraphQL de Revolico**
(`https://graphql-api.revolico.app/`), descubierta analizando los bundles JS
(ver `src/exploracion/`). Datos obtenidos:

- **3 517 anuncios** de carros publicados en La Habana (categoría `vehiculos-carros`).
- Muestra guardada: **600 anuncios únicos** en `data/raw/anuncios.csv`
  (ampliada de 150 el 2026-09-24; la muestra original quedó en
  `data/raw/respaldo_150_2026-09-24/`).
- Campos: precio, moneda (USD/CUP), municipio, marca, año (parcial), URL, fecha.
- Sin teléfonos ni datos de contacto (privacidad).
- Respaldo crudo JSON por página en `data/raw/revolico_paginas/` (formateado con
  indentación para lectura directa).

Re-ejecutar con: `py src\scraper_revolico.py`

## Fase 4 completada — limpieza y EDA

`notebooks/01_eda.ipynb` carga `data/raw/anuncios.csv`, limpia y analiza en
estilo informe final (Carga → Limpieza → EDA → Hallazgos). Decisiones aplicadas:

- Años faltantes → `anio = 0` (se excluyen solo de análisis que usan año).
- Moneda: `1 USD = 710 CUP` (constante `TASA_CUP_USD` en el notebook).

Resultados clave (verificados contra los datos reales, muestra ampliada de 600):

- **600 anuncios** (92% con precio; mediana **19 500 USD**).
- **94% de los anuncios con año son posteriores a 2010** → mercado moderno.
- Año = factor más fuerte: **+716 USD por cada año** adicional (r = 0.30).
- Segmentos: Toyota/Nissan/Hyundai/Kia (23.5–38k USD) vs. Lada/Daewoo (6–11k USD).

Salidas:

- **Gráficos** en `reports/`: `fig_01_precios.png` … `fig_07_precio_vs_vistas.png`.
- **Dataset limpio** en `data/processed/mercado_havana.csv` (listo para la Fase 5).

Re-ejecutar el notebook con: `py -m jupyter nbconvert --to notebook --execute --inplace notebooks\01_eda.ipynb`

## Fase 5 completada — modelo de precios (regresión)

`notebooks/02_modelo_precios.ipynb` entrena una regresión lineal (scikit-learn)
sobre `data/processed/mercado_havana.csv` (muestra ampliada de 600), con el
pipeline correcto: split 75/25 con semilla fija, transformaciones (One-Hot)
ajustadas **solo en train**, evaluación en test + validación cruzada 5-fold.
Decisiones aplicadas:

- Datos incompletos → **excluir por modelo** (cada uno reporta su `n`): M0 n=555,
  M1 n=300, M2/M3 n=247 (no se eliminan filas del dataset).
- Dos variantes del target: `precio_usd` (lineal) y `log1p(precio_usd)`.

Resultados clave (verificados contra los datos reales):

- **4–5× más datos estabilizaron las métricas, pero el modelo aún no generaliza**:
  R² de test ahora positivo en M1 (+0.04) y M2 (+0.03), M3 −0.49; en CV 5-fold el
  R² sigue negativo (M1 −0.09, M2 −0.38, M3 −0.57) y el RMSE (~19–22k USD) es tan
  alto como la desviación típica. La causa ya no es solo el tamaño: faltan
  variables fuertes (km, estado, combustible están vacías en Revolico).
- **El año sigue siendo el factor más fuerte**: **+716 USD por año** en M1
  completo; r = 0.29 (en la muestra de 150 era +796 y r ≈ 0.46).
- **La marca aporta señal**: bmw +51 878, ford +30 467, land rover +18 550,
  fiat +10 166 USD sobre la base (audi); R² 0.092 → 0.312.

Salidas:

- **Gráficos** en `reports/`: `fig_08_prediccion_vs_real.png`,
  `fig_09_coeficientes.png`, `fig_10_metricas_modelos.png`.
- **Tablas**: `reports/tabla_metricas_modelos.csv`, `reports/coeficientes_m2.csv`.
- **Dataset**: `data/processed/regresion_dataset.csv` (247 filas listas para el
  informe final).

Re-ejecutar el notebook con: `py -m jupyter nbconvert --to notebook --execute --inplace notebooks\02_modelo_precios.ipynb`

## Fase 6 completada — informe final

`notebooks/03_informe_final.ipynb` integra el proyecto completo (Fases 1–5) en
estilo informe: portada, resumen ejecutivo, metodología (scraping, limpieza,
modelado), resultados del EDA y del modelo con las figuras y tablas reales, la
**comparación antes/después del scraping ampliado** (150 → 600 anuncios),
discusión con limitaciones, conclusiones y anexos.

- Solo 3 celdas de código, que **leen los CSV reales** (`data/processed/`,
  `reports/`) para que todas las cifras citadas salgan de ejecución.
- Figuras embebidas: `reports/fig_01_precios.png` … `fig_10_metricas_modelos.png`.
- Exportar a HTML/PDF: `py -m jupyter nbconvert --to html notebooks\03_informe_final.ipynb`

## El esquema de datos

Consulta **`docs/esquema_datos.md`**: define TODOS los campos que vas a recolectar,
tanto de anuncios como de campo. Revísalo y ajústalo ANTES de empezar a recolectar.

## Handoffs y journals del proyecto

La carpeta **`opencode/`** es el **registro obligatorio** de todo handoff y
journal ejecutado en el proyecto (regla permanente desde 2026-10-11):

- `opencode/handoffs/` — documentos de traspaso entre sesiones (estado, archivos
  clave, decisiones, siguiente paso). Ver `001_2026-10-11_estado_proyecto.md`.
- `opencode/journals/` — bitácora de hallazgos y decisiones técnicas (ver
  `001_2026-10-11_ampliacion_datos.md` y `002_2026-10-11_api_graphql_revolico.md`).
- `opencode/INDICE.md` — tabla de registro con todas las entradas.
- Convención y regla permanente documentadas en `opencode/README.md`.