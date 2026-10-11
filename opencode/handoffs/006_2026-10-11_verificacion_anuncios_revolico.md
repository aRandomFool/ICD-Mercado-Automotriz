# Handoff 006 — Verificación de anuncios Revolico (despublicados/eliminados) + implementación

**Fecha:** 2026-10-11
**Rama:** `reorg-7-etapas`
**Estado previo:** Sesión "Revisar URL scrapping": verificación de URLs de
`anuncios.csv` (600 anuncios) pendiente de implementación tras hallazgo.

## Qué se investigó

Se verificaron **en vivo** las 600 URLs de
`data/raw/clasificados/revolico/anuncios.csv` (scrape del 2026-09-24).

### Hallazgo clave: Revolico NO usa 404 para anuncios retirados
Las URLs de anuncios despublicados/eliminados responden **HTTP 200** con una
página de estado ("soft delete"). La detección debe usar texto visible/os
componentes, no solo el código HTTP:

| Estado | Señal en la página | HTTP |
|--------|--------------------|------|
| `activo` | Detalle renderizado (`Detail__Content/Details/InfoWrapper`) | 200 |
| `despublicado` | *"Este anuncio incumple las normas de publicación"* | 200 |
| `eliminado` | *"El anunciante ha eliminado este anuncio"* | 200 |
| `expirado` | *"Este anuncio expiró"* / `Detail__Expired` | 200 |
| `eliminado_total` | Sin página | 404 |

Headers necesarios (sin ellos el sitio responde 403):
`User-Agent` Chrome/120, `Accept-Language: es-ES,es;q=0.9,en;q=0.8`,
`Referer: https://www.revolico.com/`.

## Resultado de la verificación (2026-10-11)

| Estado | Cantidad | % |
|--------|----------|---|
| Activos | 471 | 78.5% |
| **Despublicados** (incumplen normas) | **83** | 13.8% |
| Eliminados (por el anunciante) | 45 | 7.5% |
| Expirados | 1 | 0.2% |
| 404 / error | 0 | 0.0% |
| **Total no disponibles** | **129** | **21.5%** |

- Único expirado: `anuncio_id=56486755` ("Vendo moskovich...", pag. 2).
- 0 duplicados, 0 mismatches de URL (todos los ids terminan en `-{id}`).
- Lista completa de los 83 despublicados y 45 eliminados en el archivo de
  verificación generado (`verificacion_anuncios.csv`) y en el resumen de la sesión.

## Implementación (plan aprobado, ejecutado en esta sesión)

1. **`src/verificar_anuncios_revolico.py`** — verificador reutilizable que
   clasifica por marcadores de contenido (detecta estados soft), con pausa
   corta y respeto al sitio.
2. **`data/raw/clasificados/revolico/verificacion_anuncios.csv`** — informe por
   anuncio (`anuncio_id`, `url`, `estado_verificacion`, `codigo_http`, `verificado_el`).
3. **`anuncios.csv`** anotado con columnas `estado_verificacion` y `verificado_el`.

## Pendientes / siguiente sesión

- [ ] Commit de todo el trabajo en `reorg-7-etapas`.
- [ ] Decidir aguas abajo: si `preprocesamiento.py` / EDA deben **filtrar** o
      solo **marcar** los 129 anuncios no disponibles (Q3 precio por marca,
      Q4 rotación, etc.).
- [ ] Pendientes previos intactos (MCV pymesbulevar, entidades red-dependentes,
      integrar 40 modelos de comercializadoras al dataset de mercado formal Q6).

## Ventana crítica

- La verificación es **en vivo**: el estado puede cambiar (rotación de
  anuncios). Re-ejecutable con `py src/verificar_anuncios_revolico.py`.
- `anuncios.csv` queda autodocumentado: `estado_verificacion` + `verificado_el`
  indican cuándo y cómo se hizo la última comprobación.