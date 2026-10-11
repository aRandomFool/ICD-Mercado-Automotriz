# Fuentes de Datos

## 1. Clasificados (informal) - Revolico

- Origen: [revolico.app](https://revolico.app/)
- Ruta: `data/raw/clasificados/revolico/`
- Archivos: `anuncios.csv`, `revolico_paginas/` (JSON crudos), `respaldo_150_2026-09-24/` (respaldo histórico)
- Método: API GraphQL (`https://graphql-api.revolico.app/`) vía `src/scraper_revolico.py` (GraphQL). No se guardan teléfonos ni datos de contacto.
- Filtro aplicado: `subcategorySlug: "vehiculos-carros"`, `provinceSlug: "la-habana"`. Paginación 12 páginas × 50 = 600 anuncios únicos (deduplicados por `anuncio_id`).
- Moneda: conversión a USD con `TASA_CUP_USD = 710` (ver `data/tasas_cambio/tasas_usd.csv`).
- Notas: meta.total no fiable (puede incluir global); usar conteos reales.

## 2. Mercado formal - Comercializadoras autorizadas

- Fuente: lista oficial de entidades autorizadas para importar/comercializar vehículos (Cuba, resolución 104/2026 contexto). Lista tomada de: `D:\Dany\Ciencia_de_Datos\Introducción a Ciencia de Datos\Comercializadoras.txt`
- Ruta objetivo: `data/raw/comercializadoras/`
- Scraper: `src/scraper_comercializadoras.py` (nativo). Estrategia:
  1. Intentar extraer catálogos/precios públicos de sitios web oficiales (si existen). 
  2. Si no hay precios accesibles públicamente, **no inventar**: dejar estructura `comercializadoras.csv` con metadatos, registrar en `fuentes.md`, y activar soporte para **carga manual** (plantilla + validación).
- Comercializadoras incluidas (16 según lista): IMPEXPORT, MCV Comercial, MULTISERVI, CIMEX DTA, DUNA (nota OFAC), SASA, UNEVOL, Cadena de Tiendas CARIBE, TRANSIMPORT, TRADEX, PALCO/Grupo PALCO, MAQUIMPORT, LOGINTER, CONSTRUIMPORT, AXESS, ImpoCARIBE. También entidades con alcances específicos (EISA, DIVEP, SOLIMPORT, DIVSE, IMPLUS) según corresponda.
- Campos esperados (unificados): `fuente`, `tipo_fuente` (comercializadora), `mercado` (formal), `entidad`, `marca`, `modelo`, `anio`, `precio_original`, `moneda`, `precio_usd`, `url`, `fecha_consulta`, `notas`.

## 3. Entrevistas/Encuestas (para Q9)

- Fuente: instrumentos en `docs/instrumentos/` (entrevista.md, encuesta.md). Plantillas también en `data/raw/entrevistas/` (encuestas.csv, entrevistas.csv) según estado actual.
- Ruta: `data/raw/entrevistas/`
- Captura: `src/captura_entrevistas.py` (plantilla/validador) para estructurar respuestas. Datos cualitativos/cuantitativos para analizar factores de decisión eléctrico vs combustión.
- Campos esperados: `id`, `tipo` (entrevista/encuesta), `fecha`, `ubicacion`, `edad`, `genero`, `ocupacion`, `pregunta_1..n`, `respuestas`, `notas`.

## Notas

- La reestructuración respeta "actual + subcarpetas" (no renombrar carpetas de primer nivel). Nueva `comunicacion/` para etapa 07.
- Q1 se documenta como **proxy** (anuncios).