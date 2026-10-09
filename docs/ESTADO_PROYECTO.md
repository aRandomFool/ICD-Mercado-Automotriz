# 📋 Estado del Proyecto — Mercado Automotriz de La Habana

> **Documento de traspaso entre sesiones.** Si estás en una sesión nueva, LEE ESTE
> ARCHIVO completo antes de continuar. Última actualización: 2026-09-24.
> Sesión original: `ses_f3d85f00dffeZ9bcjZ8p89aUh5` (renombrada: *Mercado automotriz La Habana — scraper listo, falta EDA*).
> **Fase 4 (EDA) completada** en la sesión `ses_f3a69397dffeGusRm7zPXMha76`.
> **Fase 5 (modelo de precios) completada** en la sesión `ses_f3a69397dffeGusRm7zPXMha76`.
> **Ampliación de datos (2026-09-24):** scraping ampliado de 150 → **600 anuncios
> únicos** y re-entrenamiento de las Fases 4 y 5 sobre la muestra ampliada
> (secciones 6bis y 6ter actualizadas con los resultados reales nuevos).
> **Fase 6 (informe final) completada** en la sesión `ses_f3a69397dffeGusRm7zPXMha76`:
> `notebooks/03_informe_final.ipynb` ✅ (proyecto Fases 0–6 terminado).

---

## 1. Objetivo

Proyecto de Ciencia de Datos (1er año, Universidad de La Habana): analizar el
**mercado automotriz en La Habana** combinando fuentes de datos.

**Preguntas de investigación**
1. ¿Qué factores explican el precio de un carro en La Habana?
2. ¿Los precios publicados difieren de la realidad observada? *(pendiente de datos de campo)*
3. ¿Qué segmentos de mercado existen?
4. *(nueva)* ¿Cómo funciona el mercado informal cubano? *(requiere entrevistas — en pausa)*

**Contexto clave:** no existe dataset público del mercado cubano → el proyecto
**construye sus propios datos**. Revolico (anuncios) ya está listo; campo/entrevistas
se dejaron en pausa por decisión del usuario.

---

## 2. Estado actual (checklist)

| Fase | Estado |
|------|--------|
| 0 · Setup (entorno + dependencias) | ✅ Completa |
| 1 · Esquema de datos validado | ✅ Completa |
| 2 · Scraping Revolico | ✅ **600 anuncios guardados** (ampliado de 150 el 2026-09-24) |
| 3 · Recolección de campo / entrevistas / encuestas | ⏸️ **Saltada por decisión del usuario** (instrumentos creados, disponibles si se retoma) |
| 4 · EDA (notebook `01_eda.ipynb`) | ✅ **Completa** (600 anuncios analizados, 7 gráficos en `reports/`, dataset limpio en `data/processed/`) |
| 5 · Modelo de precios (regresión) | ✅ **Completa** (notebook `02_modelo_precios.ipynb`, M0–M3, lineal y log, split 75/25 + CV 5-fold; re-entrenado con la muestra ampliada) |
| 6 · Informe final | ✅ **Completa** (notebook `03_informe_final.ipynb`, 22 celdas, figuras y tablas reales) |

---

## 3. Estructura del proyecto

```
ProyectoCD/  (D:\Dany\ProyectoCD)
├── data/
│   ├── raw/
│   │   ├── anuncios.csv          # ✅ 600 anuncios de carros (Revolico, ampliado 2026-09-24)
│   │   ├── revolico_paginas/     # respaldo crudo JSON por página (12, formateado legible)
│   │   ├── respaldo_150_2026-09-24/     # muestra original de 150 (CSV + JSON) antes de ampliar
│   │   ├── campo.csv             # plantilla (vacía, sin usar)
│   │   ├── visitas.csv           # plantilla (vacía, sin usar)
│   │   ├── entrevistas.csv       # plantilla (vacía, sin usar)
│   │   └── encuestas.csv         # plantilla (vacía, sin usar)
│   └── processed/                # mercado_havana.csv ✅ (F4, 600 filas) · regresion_dataset.csv ✅ (F5, 247 filas)
├── notebooks/
│   ├── 00_inicio.ipynb           # punto de entrada + verificación de entorno
│   ├── 01_eda.ipynb              # ✅ Fase 4 COMPLETA: Carga → Limpieza → EDA → Hallazgos
│   ├── 02_modelo_precios.ipynb   # ✅ Fase 5 COMPLETA: regresión de precios (M0–M3, lineal y log, split + CV)
│   └── 03_informe_final.ipynb    # ✅ Fase 6 COMPLETA: INFORME FINAL (figuras + tablas reales, sin código largo)
├── src/
│   ├── scraper_revolico.py       # ✅ scraper funcional
│   ├── exploracion/              # 8 scripts del descubrimiento de la API
│   └── README.md
├── docs/
│   ├── esquema_datos.md          # ✅ esquema de campos (validado por el usuario)
│   ├── guia_campo.md             # guía de campo (recolección en pausa)
│   └── instrumentos/
│       ├── entrevista.md         # guía de entrevista
│       └── encuesta.md           # encuesta lista
├── reports/                      # ✅ 7 gráficos Fase 4 (fig_01..fig_07) + 3 Fase 5 (fig_08..fig_10) + CSVs
├── .venv/                        # entorno virtual (Python 3.13.15)
├── requirements.txt
├── .gitignore
└── README.md                     # hoja de ruta + estado
```

---

## 4. Entorno (cómo arrancar en Windows)

- El comando `python` NO funciona en esta máquina (apunta a un stub de Microsoft
  Store). Usar el lanzador **`py`** o directamente el ejecutable del venv.
- Activar: `py -m venv .venv` (ya hecho) → `.venv\Scripts\Activate.ps1`
  (si PowerShell bloquea: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`)
- Dependencias instaladas: pandas 3.0.6, numpy 2.5.3, matplotlib 3.11.2, seaborn
  0.13.2, scikit-learn 1.9.1, requests 2.34.2, beautifulsoup4 4.15.0, notebook 7.6.3.
- Ejecutar scripts: `.venv\Scripts\python.exe src\scraper_revolico.py`
- Jupyter: `jupyter notebook` (desde `ProyectoCD/`).

**Trampas del entorno (importante para la próxima sesión):**
- PowerShell **destruye las comillas dobles** en comandos `python -c` largos → mejor
  escribir scripts a archivo y ejecutarlos.
- La consola de Windows usa cp1252: errores con emojis/tildes al imprimir. Solución
  ya aplicada en el scraper: `sys.stdout.reconfigure(encoding='utf-8', errors='replace')`.
- Para inspeccionar datos rápido: `$env:PYTHONIOENCODING='utf-8'` antes de `python`.

---

## 5. Historia técnica — cómo se scrapeó Revolico (lecciones para el proyecto)

1. Revolico es **Next.js/React + Cloudflare**: el HTML no contiene anuncios, se
   cargan por JS. `requests + BeautifulSoup` a secas NO sirve.
2. Se hicieron ingeniería inversa de los bundles JS (`/_next/static/chunks/*.js`):
   se encontró la **API GraphQL**: `https://graphql-api.revolico.app/` (introspección deshabilitada).
3. Las queries reales se extrajeron de los bundles: `AdsSearch`, `CategoriesSelect`,
   `ProvincesWithMunicipalities` (ver `src/exploracion/` para el proceso completo).
4. Filtros que funcionan:
   - Categoría carros: **`subcategorySlug: "vehiculos-carros"`** (id=1004, Vehículos=1000)
   - Provincia: **`provinceSlug: "la-habana"`** (id=1)
   - Paginación: `page` + `pageLength` (máx 50)
5. **Lección clave:** GraphQL solo aplica las variables que la query **declara y
   referencia**. Si la query omite `$subcategorySlug`, el filtro se ignora en
   silencio y devuelve TODO (bug que costó 2 ejecuciones).
6. `meta.total` con filtros devolvía ~3 510 (en el scrape ampliado de la Fase 5:
   3 517; una vez apareció 544 394 que es un conteo global no filtrado — no usar
   `meta.total` como dato de confianza).

### Scraper (`src/scraper_revolico.py`)
- Peticiones POST a GraphQL con pausa de **4 s** entre páginas (respeto al sitio).
- **Ampliación 2026-09-24:** `MIN_ANUNCIOS = 600`, `MAX_PAGES = 16`; se usaron
  **12 páginas × 50 = 600 anuncios únicos** (deduplicados por `anuncio_id`).
- **No guarda teléfonos ni datos de contacto** (decisión ética, informada al usuario).
- Campos: fuente, fecha, ubicación (municipio), marca, modelo, año (parseado del
  título), precio_original, moneda, precio_usd, descripción (título), url,
  anuncio_id, vistas, imágenes, es_destacado, actualizado_el, página, total_página.
- Guarda respaldo JSON crudo por página. CSV con codificación `utf-8-sig` (BOM).
- La muestra original (150) quedó respaldada en `data/raw/respaldo_150_2026-09-24/`.

### Datos obtenidos (calidad, muestra ampliada)
- **3 517 carros publicados** en La Habana según Revolico; muestra de 600 únicos
  (0 duplicados), que es ~17% del total publicado.
- 555/600 con precio (549 USD + 6 CUP); 45 sin precio = "a convenir".
- 321/600 con año detectado; 210 sin marca (35%, `no identificada`); municipio en todos.
- Marcas principales: hyundai 137 (23%), kia 33, toyota 32, nissan 31, lada 28,
  chevrolet 11, mercedes-benz 9, fiat 8, bmw 8, volkswagen 7.
- Municipal: Playa 189, Centro Habana 80, Plaza 71, Diez de Octubre 44.
- **Ruido conocido:** títulos como "toyota tercen interesados llamar al 543..." —
  modelo parseado contiene basura. Material para la limpieza de la Fase 4.

---

## 6. Decisiones acordadas para la FASE 4 (EDA) — IMPORTANTE

El usuario confirmó estos criterios para `notebooks/01_eda.ipynb`:

1. **Estilo: tipo informe final** — celdas Markdown con títulos de sección
   (Carga → Limpieza → EDA → Hallazgos), comentarios en celdas clave, sin tutorial.
   Listo para entregar al profesor.
2. **Años faltantes:** dejar `anio = 0`; esos anuncios solo se excluyen de los
   análisis que necesitan año (ej. precio vs. año), NO se eliminan del dataset.
3. **Moneda:** tasa de referencia **710 CUP = 1 USD** — el usuario (habanero)
   confirmó la tasa. Constante `TASA_CUP_USD = 710`, documentada y ajustable.
   → `precio_usd = precio_cup / 710` para anuncios en CUP.

### Contenido planificado del notebook
- **Carga**: leer `data/raw/anuncios.csv`, `info()`, `head()`, `describe()`.
- **Limpieza**: precios a número; conversión de moneda; marca (los 53 "sin marca":
  extraer del título con diccionario mejorado o agrupar como "otra"); modelos
  ruidosos (palabras basura); outliers de precio (¡ojo! un clásico de 1952 puede
  costar 100k USD y no ser error).
- **EDA gráficos**: histograma/boxplot de precios; precio medio por marca (top 10);
  precio por año (scatter+tendencia); precio por municipio; conteo por marca/año;
  vistas vs. precio; monedas. Guardar gráficos en `reports/`.
- **Hallazgos**: 3–5 conclusiones con números → responden Q1 y Q3.
- **Salida**: `data/processed/mercado_havana.csv` limpio, listo para la Fase 5.

---

## 6bis. Resultados de la FASE 4 — verificados con datos reales ✅

Notebook **`notebooks/01_eda.ipynb`** completado y ejecutado de principio a fin
(`jupyter nbconvert --execute`) con los datos reales de `data/raw/anuncios.csv`.
Todos los números de abajo salen de esa ejecución (no inventados).

> **Nota de ampliación (2026-09-24):** esta sección refleja la **muestra ampliada
> de 600 anuncios** (el scrape inicial de 150 quedó respaldado en
> `data/raw/respaldo_150_2026-09-24/`; sus hallazgos eran cualitativamente iguales
> pero con n más chicos: 139 con precio, 73 con año, +796 USD/año, r ≈ 0.46).

### Datos verificados (600 anuncios)
- **600 anuncios** únicos, 24 columnas, 0 duplicados (por `anuncio_id` y por `url`).
- **555/600 con precio** (92%): 549 USD, 6 CUP (convertidos a USD con
  `TASA_CUP_USD = 710`), 45 sin precio («a convenir»).
- **Años:** 321 con año detectado; los 279 faltantes quedaron en **`anio = 0`**
  (46%, no se eliminaron). De los 321, **301 son posteriores a 2010** (94%); solo
  hay 6 clásicos ≤1990, el más antiguo de 1952.
- **Marcas:** 37 distintas; 210 sin marca → `no identificada` (35%). Top: hyundai
  137 (23%), kia 33, toyota 32, nissan 31, lada 28.
- **Municipios:** 15 representados; Playa concentra 189 anuncios (32%).

### Hallazgos (en el notebook, sección 4)
1. Oferta dominada por carros modernos (94% de los anuncios con año son 2010+).
2. Precio mediano 19 500 USD; rango de precios simbólicos (15 a 1 USD) hasta
   **250 000 USD** (BMW X6); **3 outliers altos por IQR** (límite 79 500 USD):
   un dongfeng a 82 000 y dos BMW X6 a 120 000 y 250 000 USD.
3. Año = factor más fuerte: **+716 USD por año adicional** (300 anuncios con
   año+precio, r = 0.30); mediana ~11 000 (2000–2010) → ~34 000 USD (2020+).
4. Segmentos: medio-alto (toyota 38k, nissan 32k, hyundai 25k, kia 23.5k) vs.
   económico/trabajo (lada 6k, daewoo 11k). La zona pesa poco (Playa es la más
   ofertada —189, mediana 24k— por debajo de Arroyo Naranjo 26k).
5. Vistas bajas (mediana 13) y correlación vistas–precio débil y negativa
   (r ≈ −0.20); límites: 35% sin marca y 46% sin año.

### Salidas generadas
- **Gráficos** `reports/fig_01_precios.png` … `fig_07_precio_vs_vistas.png` (7).
- **Dataset limpio** `data/processed/mercado_havana.csv` (**600 filas**, listo
  para la Fase 5 con columnas `municipio`, `marca`, `anio`, `precio_usd`, etc.).

---

## 6ter. Resultados de la FASE 5 — verificados con datos reales ✅

Notebook **`notebooks/02_modelo_precios.ipynb`** completado y ejecutado de
principio a fin (`jupyter nbconvert --execute`) con `data/processed/mercado_havana.csv`
(entrada limpia de la Fase 4, **muestra ampliada de 600 anuncios**). Todos los
números de abajo salen de esa ejecución (seed fija `42`, reproducibles).

### Diseño (decisiones acordadas)
- **Excluir por modelo:** cada modelo usa solo sus filas completas y reporta `n`
  (no se eliminan filas del dataset): M0 n=555 (con precio), M1 n=300 (+ año),
  M2 y M3 n=247 (+ año y marca).
- **Dos variantes del target:** `precio_usd` (lineal, coefs en USD) y
  `log1p(precio_usd)` (chequeo frente a extremos como los BMW X6 de 120k/250k USD).
- **Evaluación:** split 75/25 con `random_state=42` + validación cruzada 5-fold
  como chequeo de robustez (la muestra, aunque ampliada, sigue siendo pequeña para
  regresión: n=247–300).
- Transformaciones (One-Hot) ajustadas **solo en train** → sin data leakage.

### Resultados reales (test del split 75/25)
| Modelo | n | R² train | R² test | RMSE test (USD) |
|--------|---|----------|---------|-----------------|
| M0 baseline (media) | 555 | — | −0.015 | 17 599 |
| M1 precio ~ año | 300 | 0.142 | **+0.041** | 29 636 |
| M2 + marca | 247 | 0.349 | **+0.025** | 12 635 |
| M3 completo (+ municipio, vistas, imágenes) | 247 | 0.422 | −0.492 | 15 628 |

Validación cruzada 5-fold (más estable): **M1 R² = −0.085 ± 0.360 (RMSE 19 184)**,
**M2 = −0.378 ± 0.596 (21 188)**, **M3 = −0.573 ± 0.621 (22 339)**. La variante log
tampoco generaliza (R² test ≈ −0.08 a −1.4 en el split; −0.08 a −0.47 en CV).
**Conclusión:** vs. la muestra de 150, las métricas mejoraron mucho (M1 y M2 pasan
de R² test ≈ −0.9 a **positivo**; M2 CV de ≈ −4.4 a −0.38), pero la regresión
lineal aún no supera consistentemente a predecir la media.

### Hallazgos (sección "Discusión y limitaciones" del notebook)
1. **4–5× más datos estabilizaron las métricas, pero el modelo aún no generaliza
   bien.** El RMSE de test (≈ 13–30k USD) sigue siendo alto frente a la desviación
   típica de 19.5k USD, y la CV es negativa en los tres modelos.
2. **La causa ya no es solo el tamaño de muestra:** con n=247–300 el problema
   principal es la **falta de variables fuertes** (km, estado, combustible,
   transmisión están vacías en Revolico) + precios extremadamente heterogéneos
   (1 USD simbólicos hasta 250 000 USD).
3. **El efecto del año se mantiene, algo más débil que en la muestra chica:**
   **≈ +716 USD por año** en M1 completo (r = 0.29; en la muestra de 150 era
   r ≈ 0.46 y +796 USD/año).
4. **Las primas de marca ahora son más estables y con más anuncios por marca**
   (M2 completo, n=247, base `audi`): bmw **+51 878 USD** (n=5, influida por los
   2 X6 de 120k/250k), ford **+30 467** (n=3), land rover **+18 550** (n=4), fiat
   **+10 166** (n=3); porsche **−19 633** con solo 4 anuncios (poco fiable). R² de
   la muestra: 0.092 (solo año) → 0.312 (año + marca).
5. **Q1 respondida de forma cualitativa y honesta**: año y marca son los únicos
   factores con señal detectable; zona y vistas no añaden poder predictivo.

### Límites declarados
Muestra no aleatoria (solo Revolico La Habana, ~17% del total publicado), variables
clave ausentes (km, estado, combustible), multicolinealidad marca–año, influencia
de outliers (BMW X6 a 250k USD), correlación ≠ causalidad y sobreajuste en M3
(train 0.42 vs test −0.49).

### Salidas generadas
- **Gráficos** `reports/fig_08_prediccion_vs_real.png`,
  `reports/fig_09_coeficientes.png`, `reports/fig_10_metricas_modelos.png`.
- **Tablas** `reports/tabla_metricas_modelos.csv`, `reports/coeficientes_m2.csv`.
- **Dataset de regresión** `data/processed/regresion_dataset.csv` (**247 filas**:
  anio, marca, marca_g, municipio, vistas, imagenes, precio_usd, precio_log).
- Re-ejecutar: `py -m jupyter nbconvert --to notebook --execute --inplace notebooks\02_modelo_precios.ipynb`

---

## 7. Pendientes (tras completar la Fase 6)

- **PROYECTO COMPLETO (Fases 0–6).** El informe final es `notebooks/03_informe_final.ipynb`
  (22 celdas, ejecutado de principio a fin, figuras fig_01..fig_10 de `reports/` y
  tablas leídas de los CSV reales; sección 4.4 incluye la comparación de la
  ampliación de datos). Para entregar: exportar a HTML/PDF con
  `py -m jupyter nbconvert --to html notebooks\03_informe_final.ipynb`.
- **Opciones abiertas** (no bloqueantes, si se retoma el proyecto):
  - **(a)** Scraping con más campos u otras fuentes (Porlalivre, grupos) para
    llenar las variables ausentes (km, estado, combustible).
  - **(b)** Retomar Fase 3: recolección de campo/entrevistas/encuestas —
    instrumentos ya creados en `data/raw/` y `docs/instrumentos/`.
  - **(c)** Modelos no lineales (árboles/random forest) cuando existan más variables.

---

## 8. Instrucciones para la nueva sesión

1. Leer este documento completo.
2. **El proyecto está terminado (Fases 0–6 ✅).** Si se abre una sesión nueva, el
   foco es: revisar/mejorar el informe final (`notebooks/03_informe_final.ipynb`),
   exportarlo a HTML/PDF, o retomar alguna de las opciones de la sección 7.
3. Resultados verificados: secciones 6bis y 6ter (muestra ampliada de 600) y el
   propio informe en `03_informe_final.ipynb`.
4. En cualquier celda/notebook que muestre valores, usar salidas reales del CSV
   (NO inventar números).

> **Estado al cierre de esta sesión:** proyecto completo (Fases 0–6 ✅). El
> informe final (`03_informe_final.ipynb`) integra los resultados verificados de
> las Fases 4 y 5 sobre la muestra ampliada de 600 anuncios, incluye la
> comparación antes/después del scraping ampliado y las limitaciones declaradas.
> Única tarea pendiente opcional: exportar el informe a HTML/PDF para entregar.