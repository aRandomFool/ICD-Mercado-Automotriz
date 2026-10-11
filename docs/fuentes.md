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
  1. HTTP estático (requests + bs4): homepage + rutas comunes de catálogo.
  2. Detección de SPA/JS (HTML vacío pero HTTP OK).
  3. Ingeniería inversa del JS (bundles → endpoints API), igual que con Revolico.
- Comercializadoras incluidas (16 según lista): IMPEXPORT, MCV Comercial, MULTISERVI, CIMEX DTA, DUNA (nota OFAC), SASA, UNEVOL, Cadena de Tiendas CARIBE, TRANSIMPORT, TRADEX, PALCO/Grupo PALCO, MAQUIMPORT, LOGINTER, CONSTRUIMPORT, AXESS, ImpoCARIBE. También entidades con alcances específicos (EISA, DIVEP, SOLIMPORT, DIVSE, IMPLUS) según corresponda, y los sitios extra **BDC ONE** (bdcone.online) y **Dongfeng Cuba** (dongfengqba.com) listados al final del TXT.
- Campos esperados (unificados): `fuente`, `tipo_fuente` (comercializadora), `mercado` (formal), `entidad`, `marca`, `modelo`, `anio`, `precio_original`, `moneda`, `precio_usd`, `url`, `fecha_consulta`, `notas`.

### Hallazgos de la verificación (2026-10-11, técnica HTTP+DNS+JS)

| Entidad | Web | Activa | Catálogo/precios | Detalle |
|---|---|---|---|---|
| **BDC ONE** | bdcone.online | ✅ | **Sí — precios públicos** | Concesionario de autos 0km (MG, Maxus, Mitsubishi). Precios en **EUR**. Catálogo: `catalogos/catalogo_bdcone.csv` (13 modelos). |
| **Dongfeng Cuba** | dongfengqba.com | ✅ | **Sí — precios públicos** | Distribuidor oficial Dongfeng. Precios de referencia en **EUR** por modelo. Catálogo: `catalogos/catalogo_dongfeng.csv` (27 modelos). |
| **MCV Comercial** | mcvcommercial.com | ✅ | Parcial | Tienda virtual Angular (tienda.mcvcommercial.com) sobre plataforma **pymesbulevar**; API descubierta por JS-inversa (`api.pymesbulevar.com/v1/`), sin precios en HTML estático. |
| **SASA** | sasa.com.cu | ✅ | No | Portal corporativo (líneas comerciales, bazar virtual). Sin precios públicos en línea. |
| **DIVEP** | portal-divep.xutil.cu | ✅ | Parcial | Sección comercialización/ofertas sin precios públicos. |
| Resto (IMPEXPORT, MULTISERVI, CIMEX DTA, UNEVOL, TRD Caribe, TRANSIMPORT, TRADEX, PALCO, MAQUIMPORT, LOGINTER, CONSTRUIMPORT, AXESS, ImpoCARIBE, EISA) | — | ⚠️ No verificable desde esta red | — | DNS público no resuelve o el servidor no responde (timeout/firewall); **no implica cierre**. Requiere circuito/red cubano para confirmar. |

- Moneda EUR → USD: tasa registrada en `data/tasas_cambio/tasas_eur_usd.csv` (1.120529, open.er-api, 2026-10-11). `precio_usd` en los catálogos ya convertido.
- Estado completo por entidad: `data/raw/comercializadoras/estado_comercializadoras.csv`.
- Endpoints descubiertos por JS-inversa: `data/raw/comercializadoras/endpoints_descubiertos.json`.

## 3. Entrevistas/Encuestas (para Q9)

- Fuente: instrumentos en `docs/instrumentos/` (entrevista.md, encuesta.md). Plantillas también en `data/raw/entrevistas/` (encuestas.csv, entrevistas.csv) según estado actual.
- Ruta: `data/raw/entrevistas/`
- Captura: `src/captura_entrevistas.py` (plantilla/validador) para estructurar respuestas. Datos cualitativos/cuantitativos para analizar factores de decisión eléctrico vs combustión.
- Campos esperados: `id`, `tipo` (entrevista/encuesta), `fecha`, `ubicacion`, `edad`, `genero`, `ocupacion`, `pregunta_1..n`, `respuestas`, `notas`.

## Notas

- La reestructuración respeta "actual + subcarpetas" (no renombrar carpetas de primer nivel). Nueva `comunicacion/` para etapa 07.
- Q1 se documenta como **proxy** (anuncios).