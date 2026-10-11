# Journal 008 — Verificación de anuncios Revolico: 129 no disponibles (21.5%)

**Fecha:** 2026-10-11
**Tags:** scraping, revolico, verificacion, calidad-datos, despublicado

## Qué pasó

Se verificaron en vivo las 600 URLs de
`data/raw/clasificados/revolico/anuncios.csv` (scrape 2026-09-24) en la sesión
"Revisar URL scrapping".

**Hallazgo clave:** Revolico **no responde 404** a anuncios retirados: devuelve
HTTP 200 con páginas de estado que hay que leer por texto/componentes:
- `despublicado` → "Este anuncio incumple las normas de publicación" (lo bajó Revolico)
- `eliminado` → "El anunciante ha eliminado este anuncio"
- `expirado` → "Este anuncio expiró" / `Detail__Expired`

## Resultado (2026-10-11)

| Estado | Cantidad | % |
|--------|----------|---|
| Activos | 471 | 78.5% |
| Despublicados | 83 | 13.8% |
| Eliminados | 45 | 7.5% |
| Expirados | 1 | 0.2% |
| **Total no disponibles** | **129** | **21.5%** |

## Qué se implementó

1. **`src/verificar_anuncios_revolico.py`** — verificador reutilizable
   (GET en vivo con headers de navegador + clasificación por marcadores).
2. **`data/raw/clasificados/revolico/verificacion_anuncios.csv`** — informe por
   anuncio (600 filas: estado, código HTTP, fecha).
3. **`anuncios.csv`** anotado con columnas `estado_verificacion` y
   `verificado_el` (2026-10-11T09:57:47+00:00).
4. **Filtro de disponibilidad en el pipeline** — helper `filtrar_activos` en
   `src/utils/limpieza.py`, aplicado en `preprocesamiento.py` y
   `generar_variables.py`. Solo se conservan los **anuncios activos**:
   interim 471, `mercado_havana.csv` 471, `regresion_dataset.csv` 233.

## Lección

Un control de URLs por solo código HTTP dio antes "599 activos / 0 eliminados";
el análisis por marcadores de contenido corrigió la cifra a 471 activos y 129 no
disponibles. La primera comprobación (2026-10-11) subestimó el desgaste del
dataset. Con `estado_verificacion` embebido, `preprocesamiento.py` puede filtrar
o marcar sin re-verificar.

## Referencias

- Handoff 006 · `src/verificar_anuncios_revolico.py`
- `data/raw/clasificados/revolico/verificacion_anuncios.csv`
- `data/raw/clasificados/revolico/anuncios.csv` (+2 columnas)