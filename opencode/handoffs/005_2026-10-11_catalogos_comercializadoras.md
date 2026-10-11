# Handoff 005 — Catálogos de comercializadoras implementado

**Fecha:** 2026-10-11
**Rama:** `reorg-7-etapas`
**Estado previo:** Plan aprobado (extracción de catálogos de comercializadoras). 

## Qué se hizo

1. **Verificación técnica** (HTTP + DNS público + JS-inversa) de las 23 entidades
   de `data/raw/comercializadoras/Comercializadoras.txt`.
2. **Catálogos reales extraídos** con precios públicos en EUR:
   - `catalogos/catalogo_bdcone.csv` (13 modelos 0km: MG, Maxus, Mitsubishi — BDC ONE)
   - `catalogos/catalogo_dongfeng.csv` (27 modelos — Dongfeng Cuba)
   - `precio_usd` convertido con tasa real 1.120529 (`data/tasas_cambio/tasas_eur_usd.csv`).
3. **JS-inversa aplicada** a `tienda.mcvcommercial.com`: se descubrió la plataforma
   pymesbulevar (`https://api.pymesbulevar.com/v1/`, `cdntienda.pymesbulevar.com`).
   Endpoints exactos del catálogo en lazy-chunks (pendiente).
4. **Entregables** generados:
   - `data/raw/comercializadoras/estado_comercializadoras.csv`
   - `data/raw/comercializadoras/informe_catalogos.md`
   - `data/raw/comercializadoras/endpoints_descubiertos.json`
   - `src/scraper_comercializadoras.py` reescrito como verificador re-ejecutable.
5. `docs/fuentes.md` actualizado con tablas de hallazgos.
6. **Fix de pendientes previos:**
   - `src/scraper_revolico.py`: rutas corregidas a `data/raw/clasificados/revolico/`.
   - Notebooks `01` y `02`: `sys.stdout.reconfigure` ahora con guard `hasattr`
     (no rompe bajo `nbconvert --execute`).

## Pendientes / siguiente sesión

- [ ] **Commit de todo el trabajo** en `reorg-7-etapas` (el árbol tiene modificados y untracked).
- [ ] (Opcional) Descubrir endpoints exactos del catálogo MCV en los lazy-chunks
      de `tienda.mcvcommercial.com` (js de lazy routes del bundle Angular).
- [ ] (Opcional) Verificar IMPEXPORT/MULTISERVI/PALCO/etc. desde red cubana (VPN/colaborador),
      p. ej. intentar conexión directa al IP que resuelve en DNS público.
- [ ] Integrar los 40 modelos nuevos en el dataset de mercado formal (Q6):
      unión con `comercializadoras.csv` (mapear columna `fuente`).
- [ ] `data/interim/` está sin git-ignorar; revisar si se agrega o se incluye.

## Nota sobre el estado del repo (antes del commit)

- `data/raw/entrevistas/*.csv` aparecen como borrados (`D`) — trabajo previo ajeno,
  no se tocó.
- `data/processed/*.csv` modificados por la corrida del pipeline.
- `data/interim/` y `data/raw/comercializadoras/*` untracked (nuevos).

## Ventana crítica

Los catálogos BDC ONE y Dongfeng son **HTML estático**: el scraper recrea el CSV
re-ejecutando `src/scraper_comercializadoras.py` (rutas autos/vehiculos/catalogo…).
Los precios en EUR requieren la tasa vigente de `tasas_eur_usd.csv`.