# Módulos reutilizables (`src/`)

| Archivo | Contenido |
|---------|-----------|
| `scraper_revolico.py` | ✅ **Scraper de anuncios de Carros en La Habana** (API GraphQL de Revolico) → `data/raw/anuncios.csv` *(muestra original de La Habana, 600)* |
| `scraper_revolico_ampliado.py` | ✅ **Ampliación nacional 2026-10-26**: universo completo de carros de todo el país (fases `--piloto` / `--max-paginas`), con pausa 4 s, reintentos, log y respaldo JSON por página → merge sobre `anuncios.csv` |
| `verificar_anuncios_revolico.py` | ✅ **Verificador en vivo de URLs** → detecta anuncios despublicados/eliminados/expirados (estados "soft" HTTP 200) y anota `anuncios.csv` |
| `validar_calidad_anuncios.py` | ✅ **Validación de calidad**: nulos, duplicados (id/url/hash), precios imposibles, años fuera de rango, cobertura por provincia/marca → `reports/tablas/calidad_*.csv` |
| `utils/marcas.py` | ✅ **Diccionario controlado de marcas** (única fuente de normalización; incluye marcas de comercializadoras MG/Maxus/Mitsubishi/Dongfeng) |
| `extraer_catalogo_mcv.py` | ✅ **Extractor del catálogo de MCV Comercial** (tienda online sobre la plataforma pymesbulevar) → `data/raw/comercializadoras/catalogos/catalogo_mcv.csv` |
| `scraper_comercializadoras.py` | Verificador HTTP+DNS de las webs de las comercializadoras → `estado_comercializadoras.csv`, `endpoints_descubiertos.json`, `informe_catalogos.md` |
| `exploracion/` | Scripts que usamos para *descubrir* la API (análisis de bundles JS, sondeos). No son necesarios para generar datos, pero documentan el proceso de ingeniería inversa |

## Cómo volver a scrapear

```bash
# Ampliación nacional (recomendado): universo completo o por tope de páginas
.venv/bin/python src/scraper_revolico_ampliado.py                 # todo (79 págs)
.venv/bin/python src/scraper_revolico_ampliado.py --piloto 2       # prueba 100
.venv/bin/python src/scraper_revolico_ampliado.py --max-paginas 40 # parcial

# Scrape histórico de solo La Habana (600) — queda como referencia
.venv/bin/python src/scraper_revolico.py

# Verificación en vivo + calidad
.venv/bin/python src/verificar_anuncios_revolico.py
.venv/bin/python src/validar_calidad_anuncios.py
```

El scraper ampliado pide pausas de 4 s entre páginas (para no saturar el
sitio), reintenta con backoff ante caídas de red y guarda log + respaldo JSON
de cada página. No guarda teléfonos ni datos de contacto de vendedores.

## Historia: ¿cómo se descubrió la API?

1. `discover_api.py` — descargó los bundles JS del sitio y buscó rutas/URLs de API.
   Resultado: **GraphQL en `https://graphql-api.revolico.app/`**.
2. `extract_graphql.py` + sondeos — extrajeron de los bundles las queries exactas:
   `AdsSearch` (listado de anuncios), `CategoriesSelect`, `ProvincesWithMunicipalities`.
3. `probe_graphql*.py` — probaron variantes hasta encontrar que el filtro correcto
   es `subcategorySlug: "vehiculos-carros"` + `provinceSlug: "la-habana"`.

Lección aprendida: **GraphQL solo usa variables que la query declara**. Si declaras
`$subcategorySlug` pero la query no la referencia, el filtro se ignora silenciosamente.