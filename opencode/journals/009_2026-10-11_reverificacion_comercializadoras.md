# Journal 009 — Re-verificación de comercializadoras `.cu` + catálogo real de MCV

**Fecha:** 2026-10-11
**Etapa:** 01 (nuevas capturas) — fuente: comercializadoras
**Tags:** scraping, comercializadoras, .cu, pymesbulevar, mcvcatalog, wayback, dns-cuba

## Contexto

Se retomó el pendiente del handoff 005: *"verificar IMPEXPORT/MULTISERVI/PALCO/etc.
desde red cubana"* y descubrir los *"endpoints exactos del catálogo MCV en los
lazy-chunks"*. El usuario pidió re-revisar las URLs de `Comercializadoras.txt`
tratando de **extraer el catálogo**, con foco en las entidades que fallaron por `.cu`.

## Qué se hizo

### 1. Sondeo vivo de las `.cu` (4 vías)

Para cada dominio: HTTPS + HTTP, **conexión directa al IP** con cabecera `Host`,
**DNS autoritativo `.cu`** (`ns.ceniai.net.cu`) y **Wayback Machine**.

- Siguen accesibles en vivo: **SASA**, **DIVEP** (portales informativos) y **MCV** (`.com`).
- El resto de `.cu` hace *ConnectTimeout* incluso por IP directa → **firewall cubano**,
  no un problema de DNS.
- El DNS público miente para varios: `www.unevol.cu` → 200.55.182.106 y
  `www.tradex.cu` → 200.55.140.227 **sólo resuelven en los NS de CENIAI**;
  `multiservi.cu`, `palco.cu`, etc. sí resolvían, pero no responden.
- **Wayback**: todas las copias son sitios corporativos (Odoo, Drupal, HTML estático)
  **sin catálogo de vehículos con precios**. AXESS/TRADEX/CONSTRUIMPORT listan
  categorías de *partes* (neumáticos, baterías, piezas) pero sin precios.

### 2. Catálogo real de MCV (¡el hallazgo!)

Cerrando el pendiente de los lazy-chunks: el bundle `main.abb3dc2ee8e1cb20.js` embebe
el entorno con `apiUrl` **y** un `tokenBusiness` (JWT). Decodificado: `BusinessId=223`,
`name: "Tienda MCV"`. El frontend llama a la API pública con el header **`xxx-ff-id`**.

Endpoints del catálogo (chunk 790): `product`, `product/:id`, `category-front`,
`category-tree`, `brand`, `section/front`, `config`.

- La paginación es por **`limit` + `offset`** (con `page` la API repite la 1ª página).
- Filtro por negocio: `filter[$and][BusinessId]=223`.
- Resultado: **426 productos con precio en USD** → `catalogos/catalogo_mcv.csv`.
  Categorías: neumáticos (115), herramientas (89), lubricantes (68), chapa/pintura (52),
  partes/piezas (48), electrónica (46), baterías (8).
- **Importante:** es catálogo de **repuestos/accesorios**, no de vehículos completos.

## Lecciones

- Tercera vez que "leer el JS del sitio" resuelve el problema (Revolico → journal 002;
  MCV pymesbulevar → journal 006; ahora endpoints completos). El token de negocio
  embebido + un header propio (`xxx-ff-id`) es el patrón de pymesbulevar.
- Para `.cu`: DNS público no basta; hay que consultar los **NS autoritativos**.
  Aun así, la verificación final exige **red cubana**.
- `wayback` es la vía cuando no hay acceso directo, pero ojo con su *rate limit*
  (429) desde `requests`; `webfetch` (otra ruta) sí entró.
- `websearch` devolvió **403** en todo el bloque (integración caída).

## Datos capturados

- `data/raw/comercializadoras/catalogos/catalogo_mcv.csv` — **426 filas** (nuevo)
- `data/raw/comercializadoras/estado_comercializadoras.csv` — actualizado
- `data/raw/comercializadoras/endpoints_descubiertos.json` — actualizado (API + Wayback)
- `data/raw/comercializadoras/informe_catalogos.md` — reescrito
- `src/extraer_catalogo_mcv.py` — extractor re-ejecutable (nuevo)

## Estado

Re-verificación y extracción completadas. Pendiente de este issue: commit + bitácora
(este journal + handoff 007).
