# Handoff 007 — Comercializadoras: re-verificación `.cu` + catálogo MCV extraído

**Fecha:** 2026-10-11
**Rama:** `reorg-7-etapas`
**Precede a:** handoff 005 (catálogos de comercializadoras) — cierra sus dos pendientes
principales (endpoints MCV y verificación `.cu`).

## Qué se hizo

1. **Re-verificación de las 23 entidades** de `Comercializadoras.txt` por 4 vías:
   HTTPS/HTTP, conexión directa al IP con `Host`, **DNS autoritativo `.cu` (CENIAI)** y
   **Wayback Machine**.
2. **Cierre del pendiente MCV**: se descubrió el `tokenBusiness` (JWT) embebido en el
   bundle de `tienda.mcvcommercial.com`, el header de negocio `xxx-ff-id`, y los
   endpoints del catálogo de pymesbulevar. Se extrajo el **catálogo real: 426 productos
   con precio en USD** (repuestos/neumáticos/herramientas/lubricantes; **sin vehículos**).
3. **Entregables:**
   - `src/extraer_catalogo_mcv.py` — extractor re-ejecutable (nuevo).
   - `data/raw/comercializadoras/catalogos/catalogo_mcv.csv` — 426 filas (nuevo).
   - `data/raw/comercializadoras/estado_comercializadoras.csv` — actualizado.
   - `data/raw/comercializadoras/endpoints_descubiertos.json` — actualizado.
   - `data/raw/comercializadoras/informe_catalogos.md` — reescrito.
   - `src/README.md` — añadido el extractor.
4. **Bitácora:** journal 009 (este issue) + este handoff 007.

## Hallazgo central sobre las `.cu`

Ninguna entidad `.cu` publica un catálogo de autos con precios. Desde esta red todas
hacen *ConnectTimeout* (incluso por IP directa con `Host`), lo que apunta a **firewall
cubano**, no a cierre. En Wayback sólo aparecen sitios corporativos sin precios.

Catálogos con precio confirmados: **BDC ONE** (13, EUR), **Dongfeng** (27, EUR) y ahora
**MCV** (426, USD, sólo repuestos). SASA y DIVEP son portales informativos.

## Pendientes / siguiente sesión

- [ ] (Bloqueado por red) Verificar IMPEXPORT, MULTISERVI, CIMEX DTA, UNEVOL,
      Tiendas Caribe, TRANSIMPORT, TRADEX, PALCO, MAQUIMPORT, LOGINTER, CONSTRUIMPORT,
      AXESS, ImpoCARIBE y EISA desde **red/circuito cubano** (VPN o colaborador).
      Datos útiles: `www.unevol.cu`→200.55.182.106, `www.tradex.cu`→200.55.140.227
      (sólo en NS de CENIAI).
- [ ] (Opcional) Integrar los **426 productos de MCV** y los 40 modelos BDC/Dongfeng al
      dataset de mercado formal (Q6), mapeando `fuente`.
- [ ] Reintentar `websearch` cuando la integración vuelva (dio 403 todo el bloque).
- [ ] El catálogo MCV es de **repuestos**, no de vehículos: decidir si entra en Q6 como
      referencia de precios de posventa o queda fuera del alcance de "autos".

## Ventana crítica

- El catálogo de MCV depende de: (a) el bundle `main.<hash>.js` (cambia al desplegar) y
  (b) el `tokenBusiness` embebido. El script lo re-descubre en cada ejecución, así que
  se auto-repara; si pymesbulevar empieza a exigir login, habría que revisar.
- BDC ONE y Dongfeng son HTML estático; se recrean con `src/scraper_comercializadoras.py`.
- Precios EUR→USD con la tasa de `data/tasas_cambio/tasas_eur_usd.csv`; MCV ya está en USD.
