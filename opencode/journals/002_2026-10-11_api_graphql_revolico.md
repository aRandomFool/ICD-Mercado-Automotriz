# Journal 002 — Descubrimiento de la API GraphQL de Revolico (lección de scraping)

- **Fecha:** 2026-10-11 (descubrimiento de la sesión de la Fase 2, 2026-09)
- **Proyecto:** Mercado Automotriz de La Habana (`D:\Dany\ProyectoCD`)

## Hallazgo

Revolico es un sitio **Next.js/React detrás de Cloudflare**: el HTML no contiene
los anuncios (se cargan por JavaScript), por lo que `requests + BeautifulSoup`
a secas **no sirve**. Se hizo ingeniería inversa de los *bundles* JS
(`/_next/static/chunks/*.js`) y se encontró la API GraphQL pública:

- **Endpoint:** `https://graphql-api.revolico.app/` (introspección deshabilitada)
- **Query:** `AdsSearch` extraída de los bundles (ver `src/exploracion/`)

## Lecciones clave

1. **Filtros:** `subcategorySlug: "vehiculos-carros"` (id=1004), `provinceSlug:
   "la-habana"` (id=1), paginación `page` + `pageLength` (máx 50/página).
2. **Trampa:** GraphQL solo aplica las variables que la query **declara y
   referencia**. Si la query omite `$subcategorySlug`, el filtro se ignora en
   silencio y devuelve TODO (bug que costó 2 ejecuciones).
3. `meta.total` con filtros ≈ 3 517 (una vez apareció 544 394 = conteo global no
   filtrado → no usar como dato de confianza).

## Aplicación práctica

Esto permitió ampliar el scraping de 150 a **600 anuncios** (~17% del total
publicado) con pausa de 4 s entre páginas y dedupe por `anuncio_id`, sin guardar
teléfonos ni datos de contacto (decisión ética).

## Referencias

- `src/scraper_revolico.py` (scraper funcional)
- `src/exploracion/` (proceso completo de descubrimiento)
- `docs/ESTADO_PROYECTO.md` (sección 5: historia técnica)