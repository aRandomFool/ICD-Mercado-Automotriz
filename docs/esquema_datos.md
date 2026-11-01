# Esquema de datos unificado

Este documento define TODOS los campos que recolectarás, tanto de anuncios como de
observaciones de campo. El objetivo es que ambos datasets compartan el mismo esquema
para poder combinarlos al final en un solo archivo.

> **Regla de oro:** fíjate en estos campos revisando anuncios reales ANTES de empezar.
> Si hay un campo importante que no aparece aquí, agrégalo.

> **Ampliación 2026-10-26 (scraping nacional):** el esquema se amplió de la muestra
> de La Habana (600) al universo de carros de todo el país en Revolico (~3 947
> anuncios). Cambios: columnas nuevas `provincia` y `municipio` (catálogo oficial
> de la API, 16 provincias), diccionario de marcas ampliado en
> `src/utils/marcas.py` (única fuente de normalización, reutilizable por
> scraper/preprocesamiento/notebooks) y reglas de extracción de
> `km`/`combustible`/`transmision` desde el título (ver §5–6). El dataset
> declarado sigue siendo `data/raw/clasificados/revolico/anuncios.csv`.

## Campos comunes (anuncios y campo)

| Campo | Tipo | Ejemplo | Notas |
|-------|------|---------|-------|
| `fuente` | texto | `anuncio` / `campo` | De dónde salió el dato |
| `fecha` | fecha | `2026-09-21` | Día de captura |
| `ubicacion` | texto | `La Habana, Playa` | Provincia + municipio concatenados |
| `provincia` | texto | `La Habana` | **(nuevo 2026-10-26)** catálogo oficial de la API (16 provincias); vacío si el anuncio no trae `provinceId` |
| `municipio` | texto | `Playa` | **(nuevo 2026-10-26)** catálogo oficial de la API (municipios por provincia) |
| `marca` | texto | `Lada`, `Toyota`, `Geely` | Normalizar: **Misma marca, mismo nombre** (diccionario `src/utils/marcas.py`) |
| `modelo` | texto | `VAZ-2107`, `Corolla` | Puede quedar vacío en campo |
| `anio` | entero | `1998` | Año del carro. `0` si no se puede estimar |
| `precio_original` | número | `45000` | Precio tal como apareció |
| `moneda` | texto | `USD` / `MLC` / `CUP` / `EUR` | Moneda del precio original |
| `precio_usd` | número | `45000` | Precio convertido a USD (criterio: ver abajo) |
| `combustible` | texto | `gasolina` / `diesel` / `electrico` | Puede quedar vacío en campo |
| `transmision` | texto | `manual` / `automatica` | Puede quedar vacío en campo |
| `estado` | texto | `excelente` / `bueno` / `regular` / `malo` | Subjetivo — define criterios claros |
| `color` | texto | `rojo` | Opcional |
| `notas` | texto | `le falta un espejo` | Cualquier detalle extra (incluye la tasa aplicada) |

## Campos solo de anuncios

| Campo | Tipo | Notas |
|-------|------|-------|
| `km` | número | Kilómetros reportados (si aparece) |
| `descripcion` | texto | Texto completo del anuncio |
| `url` | texto | Enlace al anuncio |

## Reglas de normalización (importantes)

### 1. Marcas
Unifica a un solo nombre (todo en minúsculas, sin acentos):

| Variantes | Normalizado |
|-----------|-------------|
| `lada`, `LADA`, `Vaz` | `lada` |
| `toyota`, `TOYOTA` | `toyota` |
| `hyundai`, `hyunday`, `hiunday` | `hyundai` |
| `vw`, `volkswaken`, `volskwagen` | `volkswagen` |
| `mercedes`, `mercedes benz`, `mercedez` | `mercedes-benz` |
| `mg`, `MG` | `mg` |
| `maxus`, `Maxus` | `maxus` |
| `dongfeng` | `dongfeng` |

**Fuente única del diccionario:** `src/utils/marcas.py` (función
`normalizar_marca(texto)`). Se amplió el 2026-10-26 incluyendo:

- las **36 marcas observadas** en las 600 filas de Revolico ya capturadas;
- las **marcas de las comercializadoras** de los catálogos formales:
  **MG**, **Maxus** (BDC ONE), **Mitsubishi** (BDC ONE), **Dongfeng**
  (Dongfeng Cuba) — permiten comparar formal vs informal sin sesgo de marca;
- variantes ortográficas frecuentes en títulos cubanos (`hyunday`, `mercedez`,
  `volkswaguen`, `misubishi`, `chverolet`…);
- marcas chinas/comunes en el mercado cubano reciente ausentes del dataset
  previo (`changan`, `haval`, `gwm/great wall`, `hongqi`, `gac`, `faw`…).

Si encuentras una variante nueva en los títulos, **agrégalala al diccionario
de `src/utils/marcas.py`** (y no a un `if` local): así todo el pipeline la usa.

### 2. Moneda y precio
- Guarda SIEMPRE el precio original y su moneda.
- Cuba usa múltiples monedas (USD, MLC, CUP, EUR). Para comparar, define una **tasa de
  conversión de referencia** y consígnala en `precio_usd`.
- Anota la tasa usada en el README o en `notas` si cambia con el tiempo.

**Tasas vigentes en el proyecto** (registradas en `data/tasas_cambio/`; NO se
inventan conversiones):

| Moneda | Tasa | Archivo / fecha | Tratamiento |
|--------|------|-----------------|-------------|
| USD | 1 | — | `precio_usd = precio_original` |
| CUP | 710 CUP = 1 USD | `tasas_usd.csv` (2026-09-24) | `precio_usd = precio / 710` |
| EUR | 1 EUR = 1.120529 USD | `tasas_eur_usd.csv` (2026-10-11) | `precio_usd = precio × 1.120529` |
| MLC | **sin tasa documentada** | — | `precio_usd` **vacío** + nota en `notas` (pendiente de documentar tasa) |

- La tasa aplicada se registra en la columna `notas` (ej.
  `CUP/USD=710 (tasas_usd.csv, 2026-09-24)`).
- **Advertencia de calidad:** algunos anuncios publican "en miles" sin decirlo
  (ej. `precio_original=15` con título "EN 15 MIL VENDO"). NO se corrige en
  crudo (sería inventar); se marca como outlier bajo en el informe de calidad.

### 3. Estado (criterios sugeridos)
- `excelente` — parece nuevo, sin daños visibles.
- `bueno` — uso normal, pequeños detalles.
- `regular` — daños visibles o mecánica dudosa.
- `malo` — necesita reparaciones importantes.

### 4. Año desconocido
Si no puedes estimar el año (común en la calle), usa:

- `0` = no se sabe
- Si el carro es claramente clásico (años 70–80) anótalo en `notas`.

### 5. Extracción desde el título (scraping, sin adivinar)

La API de Revolico (`AdsSearch`) solo expone `title`, `price`, `currency`,
ids de provincia/municipio y métricas. Por eso, **solo si el texto lo dice
explícitamente** se rellenan (`src/scraper_revolico_ampliado.py`):

| Campo | Regla | Si no aparece |
|-------|-------|---------------|
| `anio` | número 1950–2039 como palabra independiente (`\b`) | `""` (luego `0` en etapa 02) |
| `km` | número + `km`/`kilómetros` en el título; `0 km` → `0` | `""` (vacío, no se estima) |
| `combustible` | literales `electr*`, `híbrid*`, `diesel`, `gasolina` | `""` |
| `transmision` | literales `automatic*`, `manual` | `""` |
| `modelo` | resto del título quitando marca, año y palabras basura (≤3 tokens) | `""` |
| `estado`, `color` | **nunca**: la API no los expone y son subjetivos | `""` |

### 6. Geografía: catálogo estándar

- Provincias y municipios **NO** se parsean del texto: salen del catálogo
  oficial `ProvincesWithMunicipalities` de la API (16 provincias), cacheado en
  `data/raw/clasificados/revolico/catalogo_geo/provincias_municipios.json` y
  mapeados por `provinceId`/`municipalityId`.
- El dataset de La Habana previo (que solo traía `ubicacion`) se rellenó
  retroactivamente con `provincia`/`municipio` a partir de `ubicacion`.

## Tamaño objetivo

| Dataset | Meta |
|---------|-------------|
| `data/raw/clasificados/revolico/anuncios.csv` | 2 000–5 000 anuncios válidos **o el universo completo de Revolico** (~3 947, 2026-10-26), lo que ocurra primero |
| `data/raw/campo.csv` | ~100 observaciones |

## Archivo final combinado

Después de la limpieza, el resultado será `data/processed/mercado_havana.csv` con todos
los campos comunes + `fuente` para distinguir el origen. (Si el alcance pasa a
ser nacional, revisar el nombre/alcance de este archivo — decisión pendiente.)