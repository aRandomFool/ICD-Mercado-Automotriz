# Fuentes de Datos

## 1. Clasificados (informal) - Revolico

- Origen: [revolico.app](https://revolico.app/)
- Ruta: `data/raw/clasificados/revolico/`
- Archivos: `anuncios.csv`, `verificacion_anuncios.csv`, `revolico_paginas/` (JSON crudos del scrape original), `respaldo_600_2026-10-26/` (muestra de 600 antes de ampliar), `respaldo_ampliado_2026-10-26/` (JSON crudos por página de la ampliación), `catalogo_geo/` (catálogo provincias/municipios de la API), `piloto_2026-10-26.csv` (piloto fase 1), `scraping_ampliado_2026-10-26.log` (log de ejecución)
- Método: API GraphQL (`https://graphql-api.revolico.app/`).
  - Scrape original (2026-09-24): `src/scraper_revolico.py` — 12 páginas, solo La Habana, 600 anuncios.
  - **Ampliación nacional (2026-10-26): `src/scraper_revolico_ampliado.py`** — universo completo de carros de todo el país (~3 947 anuncios, 79 páginas de 50), fases piloto→escalado con pausa 4 s, reintentos con backoff, log y respaldo JSON por página. Filtra `subcategorySlug: "vehiculos-carros"` **sin** `provinceSlug` (alcance nacional). No guarda teléfonos ni datos de contacto.
- Geografía: `provincia`/`municipio` del catálogo `ProvincesWithMunicipalities` de la API (16 provincias), cacheado en `catalogo_geo/provincias_municipios.json`.
- Marcas: normalizadas con `src/utils/marcas.py` (ampliado con marcas de las comercializadoras: MG, Maxus, Mitsubishi, Dongfeng).
- Moneda: conversión a USD con `TASA_CUP_USD = 710` (`data/tasas_cambio/tasas_usd.csv`) y EUR con 1.120529 (`tasas_eur_usd.csv`); MLC queda sin convertir (sin tasa documentada). Ver `docs/esquema_datos.md` §2.
- Verificación en vivo: `src/verificar_anuncios_revolico.py` (pendiente de re-ejecutar sobre las filas ampliadas).
- Notas: meta.total no fiable históricamente (puede incluir global); usar conteos reales. El universo medido para carros en país completo fue 3.947 el 2026-10-26.

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