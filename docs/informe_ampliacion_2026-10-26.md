# Informe — Ampliación del dataset de anuncios de carros en Cuba (Revolico)

**Fecha:** 2026-10-26 · **Etapa:** 01 (Capturar) · **Fuente única:** Revolico
(API GraphQL, anuncios públicos) · **Ejecución:** `.venv/bin/python`

> Este informe se genera dentro de la fase de ampliación de muestra
> (objetivo: 2 000–5 000 anuncios válidos o agotar la fuente). Las cifras se
> completan tras la ejecución; ver §Volumen y §Calidad.

## 1. Resumen ejecutivo

- Se amplió el dataset declarado (`data/raw/clasificados/revolico/anuncios.csv`)
  de **600 → 3.958 filas**, alcanzando la meta de 2.000–5.000 anuncios.
- El **universo de Revolico se agotó**: las **79/79 páginas** del catálogo de
  carros de todo el país fueron recorridas (total del API: ~3.947 anuncios;
  el remanente de 3.958 incluye las filas previas de La Habana no repetidas).
- Cobertura geográfica de **16/16 provincias** (antes: solo La Habana) y
  **62 marcas distintas** (antes: 36).
- Calidad: **0 duplicados por `anuncio_id` y 0 por URL**; 91,8% de filas con
  precio; 40 grupos (83 filas) son republicaciones con ID distinto — se marcan,
  no se borran. Verificación en vivo en curso §6.
- Todo es reproducible: scripts versionados, respaldo JSON por página, log
  fechado y respaldo previo de la muestra de 600.

## 2. Plan ejecutado y estado por fuente

| Fase | Descripción | Estado |
|------|-------------|--------|
| 1. Validación técnica | API GraphQL viva (HTTP 200), catálogo `ProvincesWithMunicipalities` (16 provincias), universo de carros de todo el país medido (**~3.947 anuncios / 79 páginas**), sondeo de campos del tipo `AdType` (no existen `body`, `content`, `publishedOn`, `createdAt`, `categoryId`; `description` existe pero llega `None` en listados) | ✅ |
| 1. Piloto | 2 páginas = 100 anuncios a `piloto_2026-10-26.csv` (sin tocar el dataset declarado); validación de parseo, geografía y dedup | ✅ |
| 2. Escalado | Recorrido de las 79 páginas con pausa de 4 s, reintentos con backoff y log por línea de tiempo | ✅ (ver §Volumen) |
| 3. Cobertura | Diccionario de marcas ampliado (incluye marcas de comercializadoras: MG, Maxus, Mitsubishi, Dongfeng), geografía por catálogo oficial de API | ✅ |

**Única fuente permitida usada:** Revolico. No se consultó ninguna otra web de
clasificados (regla de la tarea). Las comercializadoras (formal) se compararán
después, en otra fase.

## 3. Scripts listos para correr

| Script | Propósito | Uso |
|--------|-----------|-----|
| `src/scraper_revolico_ampliado.py` | Scraping nacional por fases: `--piloto N`, `--max-paginas N` o completo; respaldo JSON crudo por página, log, merge sobre `anuncios.csv` | `.venv/bin/python src/scraper_revolico_ampliado.py` |
| `src/utils/marcas.py` | Diccionario controlado de marcas (única fuente de normalización) | importado por scraper/validador |
| `src/validar_calidad_anuncios.py` | Nulos, duplicados, precios imposibles, años fuera de rango, cobertura | `.venv/bin/python src/validar_calidad_anuncios.py` |
| `src/verificar_anuncios_revolico.py` | Verificación en vivo de URLs (anuncios disponibles vs. despublicados) | `.venv/bin/python src/verificar_anuncios_revolico.py` |

Reproducibilidad completa: misma pausa, mismos parámetros, respaldos JSON de
cada página y log fechado.

## 4. Archivos generados y rutas

| Archivo | Contenido |
|---------|-----------|
| `data/raw/clasificados/revolico/anuncios.csv` | **Dataset declarado ampliado: 3.958 filas** (600 previas + 3.358 nuevas), 28 columnas (añadidas `provincia`, `municipio`) |
| `data/raw/clasificados/revolico/respaldo_600_2026-10-26/` | Respaldos intactos de `anuncios.csv` y `verificacion_anuncios.csv` antes de ampliar |
| `data/raw/clasificados/revolico/respaldo_ampliado_2026-10-26/` | JSON crudo de cada una de las 79 páginas (trazabilidad total) |
| `data/raw/clasificados/revolico/catalogo_geo/provincias_municipios.json` | Catálogo oficial API: 16 provincias + municipios |
| `data/raw/clasificados/revolico/piloto_2026-10-26.csv` | Piloto fase 1 (100 anuncios, no mezclado) |
| `data/raw/clasificados/revolico/scraping_ampliado_2026-10-26.log` | Log con marcas de tiempo, reintentos y progreso |
| `reports/tablas/calidad_resumen.csv` · `calidad_nulos.csv` · `calidad_cobertura.csv` · `calidad_outliers.csv` | Indicadores de calidad (tarea 6) |
| `src/scraper_revolico_ampliado.py` · `src/utils/marcas.py` · `src/validar_calidad_anuncios.py` | Scripts nuevos (tarea 2) |
| `docs/esquema_datos.md` · `docs/fuentes.md` · `src/README.md` | Ampliación de normalización y documentación actualizada |

## 5. Volumen recolectado

| Métrica | Valor |
|---------|-------|
| Páginas del universo | 79/79 (fuente **agotada**, no cortada) |
| Anuncios scrapeados en esta ejecución | 3.096 únicos (2 corridas: 849 + 2.532 en merge final) |
| **Total `anuncios.csv`** | **3.958 filas** (600 previas preservadas + 3.358 añadidas) |
| Provincias cubiertas | **16/16** (La Habana 3.566, Matanzas 84, Artemisa 75, Pinar del Río 54, …) |
| Marcas distintas | **62** (antes 36; ahora incluye las de comercializadoras: mg, maxus, mitsubishi, dongfeng) |
| Con precio | 91,8% (3.632) · Monedas: USD 3.620, CUP 18, vacía 320 |
| Con año | 52,0% · `km` detectado explícitamente: 87 filas (1,7%, el API no lo expone) |

Nota: el total del API bajó de 3.947 a 3.946/3.945 entre mediciones — anuncios
que caducaron en vivo durante la ejecución (comportamiento esperado).

## 6. Calidad

Salida de `src/validar_calidad_anuncios.py` → `reports/tablas/calidad_*.csv`:

| Indicador | Valor | Estado |
|-----------|-------|--------|
| Duplicados por `anuncio_id` / URL | 0 / 0 | ✅ |
| Duplicados por hash de campos clave | 43 (83 filas en 40 grupos) | ⚠️ marcados: republicaciones con ID distinto — **no se borran** (trazabilidad) |
| `pct_con_precio_usd` | 91,8% | ✅ (umbral 60%) |
| Precios imposibles bajos | 3 (1 CUP → 0 USD, anuncios de taxi/transporte) | ℹ️ marcados, no corregidos |
| Precios imposibles altos | 4 (`111111111111` ×2, 58.873.843, Dodge RAM 650.000) | ℹ️ marcados, no corregidos |
| Años fuera de rango | 1 (Honda HR-V **2027**, modelo adelantado) | ⚠️ marcado |
| `pct_sin_marca` | 31,1% | ✅ (intrínseco: títulos sin marca) |
| Nulos críticos | `estado`/`color` 100% vacíos (el API no los expone), `km` 97,8%, `combustible` 90,3% | ✅ documentado en esquema §5: no se inventan |

**Verificación en vivo de URLs** (`verificar_anuncios_revolico.py`): en curso
sobre las 3.958 URLs; los resultados (activos vs. despublicados) se registran
en `verificacion_anuncios.csv` y en la columna `estado_verificacion`.

## 7. Sesgos

Sesgos conocidos **antes** de mirar los datos (declarados, no corregidos):

1. **Sesgo de fuente:** solo Revolico (clasificados online), no es el mercado
   completo de Cuba; acceso a internet condiciona quién publica.
2. **Sesgo de disponibilidad temporal:** los anuncios caducan/desaparecen; la
   verificación en vivo muestra ~21.5% no disponibles en la muestra anterior.
3. **Sesgo de autodeclaración:** marca/año/km los pone el anunciante, sin
   verificación (km sobre todo, por eso solo se toma si el título lo dice).
4. **Sesgo geográfico residual:** el orden de páginas de Revolico no es
   aleatorio (probablemente por fecha de publicación), así que si el recorrido
   se corta antes de agotar las 79 páginas, las provincias con menos anuncios
   publicados recientes quedarían infrarrepresentadas.
5. **Sesgo de precios "en miles":** títulos sin especificar unidad
   (ej. 15 = 15 000) — se marcan, no se corrigen.

## 8. Hallazgos preliminares

1. **Revolico sigue siendo "Habana-centrista":** 3.566 de 3.958 anuncios
   (90,1%) son de La Habana; las 15 provincias restantes suman 392. El sesgo
   geográfico es de la fuente, no del scraping (se recorrió el universo
   completo). Cualquier pregunta nacional debe ponderarse o declararse.
2. **La muestra ya no crece:** con las 79 páginas agotadas, ampliar dentro de
   Revolico solo es posible con el paso del tiempo (anuncios nuevos) u otra
   subcategoría/fuente (ver §9).
3. **40 grupos de anuncios republicados** (mismo auto, distinto `anuncio_id`,
   p. ej. IONIQ 5 2024 repetido en páginas 1/3/5) — el vendedor re-publica;
   contándolos como ofertas distintas se **sobreestimaría** la oferta en ~2%.
4. **Precios "en miles" y precios de relleno** existen y se detectan
   (`111111111111`, 58.873.843): confirmados 3 bajos y 4 altos; la
   mediana-robusta (no la media) es la métrica recomendada para Q2/Q4.
5. **Nuevas marcas formales detectables:** aparecen `mg`, `maxus`,
   `dongfeng` y `mitsubishi` en los anuncios — justo las del mercado formal
   (BDC ONE/Dongfeng), lo que habilita la futura comparación Q6 por marca.
6. **El API no expone km/estado/color/combustible** (solo `title`); el
   diccionario de marcas cubre 62 marcas y `provincia`/`municipio` salen del
   catálogo oficial (0 fracasos de mapeo salvo 2 filas sin municipio).

## 9. Próximos pasos

1. Verificación en vivo de URLs de las filas nuevas (`verificar_anuncios_revolico.py`).
2. Re-ejecutar `validar_calidad_anuncios.py` tras la verificación.
3. Etapa 02/04 (preprocesamiento + variables) sobre la muestra ampliada.
4. Fase pendiente: comparación con el mercado formal (catálogos BDC ONE,
   Dongfeng) — queda para después del scraping, por diseño.
