# Módulos reutilizables (`src/`)

| Archivo | Contenido |
|---------|-----------|
| `scraper_revolico.py` | ✅ **Scraper de anuncios de Carros en La Habana** (API GraphQL de Revolico) → `data/raw/anuncios.csv` |
| `exploracion/` | Scripts que usamos para *descubrir* la API (análisis de bundles JS, sondeos). No son necesarios para generar datos, pero documentan el proceso de ingeniería inversa |

## Cómo volver a scrapear

```powershell
py src\scraper_revolico.py
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