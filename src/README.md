# Módulos reutilizables (`src/`)

| Archivo | Contenido |
|---------|-----------|
| `scraper_revolico.py` | ✅ **Scraper de anuncios de Carros en La Habana** (API GraphQL de Revolico) → `data/raw/anuncios.csv` |
| `verificar_anuncios_revolico.py` | ✅ **Verificador en vivo de URLs** → detecta anuncios despublicados/eliminados/expirados (estados "soft" HTTP 200) y anota `anuncios.csv` |
| `extraer_catalogo_mcv.py` | ✅ **Extractor del catálogo de MCV Comercial** (tienda online sobre la plataforma pymesbulevar) → `data/raw/comercializadoras/catalogos/catalogo_mcv.csv` |
| `scraper_comercializadoras.py` | Verificador HTTP+DNS de las webs de las comercializadoras → `estado_comercializadoras.csv`, `endpoints_descubiertos.json`, `informe_catalogos.md` |
| `exploracion/` | Scripts que usamos para *descubrir* la API (análisis de bundles JS, sondeos). No son necesarios para generar datos, pero documentan el proceso de ingeniería inversa |

## Cómo volver a scrapear

```powershell
py src\scraper_revolico.py
py src\extraer_catalogo_mcv.py
```

El scraper pide ~130 anuncios con pausas de 4 s entre páginas (para no saturar el
sitio). No guarda teléfonos ni datos de contacto de vendedores.

## Historia: ¿cómo se descubrió la API?

1. `discover_api.py` — descargó los bundles JS del sitio y buscó rutas/URLs de API.
   Resultado: **GraphQL en `https://graphql-api.revolico.app/`**.
2. `extract_graphql.py` + sondeos — extrajeron de los bundles las queries exactas:
   `AdsSearch` (listado de anuncios), `CategoriesSelect`, `ProvincesWithMunicipalities`.
3. `probe_graphql*.py` — probaron variantes hasta encontrar que el filtro correcto
   es `subcategorySlug: "vehiculos-carros"` + `provinceSlug: "la-habana"`.

Lección aprendida: **GraphQL solo usa variables que la query declara**. Si declaras
`$subcategorySlug` pero la query no la referencia, el filtro se ignora silenciosamente.