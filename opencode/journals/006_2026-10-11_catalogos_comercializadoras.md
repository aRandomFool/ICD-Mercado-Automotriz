# Journal 006 — Catálogos de comercializadoras: verificación y extracción

**Fecha:** 2026-10-11
**Etapa:** 01 (nuevas capturas) — fuente: comercializadoras
**Tags:** scraping, comercializadoras, precios, pymesbulevar, bdcone, dongfeng

## Contexto

Se verificó la lista `data/raw/comercializadoras/Comercializadoras.txt` (empresas
estatales autorizadas + BDC ONE y Dongfeng Cuba), buscando:
1. Que el sitio esté activo (no cerrado).
2. Que exponga un catálogo público de precios de autos.

Estrategia en 3 niveles (como se acordó con Revolico): HTTP estático → detección
SPA/JS → **ingeniería inversa del JS** para llegar a la API subyacente. No se
resolvieron captchas (páginas públicas únicamente) y hubo pausas entre peticiones.

## Hallazgos principales

| Sitio | Estado | Resultado |
|---|---|---|
| **bdcone.online** (BDC ONE) | ✅ activo | **Catálogo 0km con precios públicos en EUR** (13 modelos MG/Maxus/Mitsubishi) |
| **dongfengqba.com** (Dongfeng Cuba) | ✅ activo | **Catálogo con precios de referencia EUR por modelo** (27 modelos) |
| **tienda.mcvcommercial.com** (MCV) | ✅ activo | Tienda Angular sobre plataforma **pymesbulevar**; sin precios en HTML estático |
| **sasa.com.cu** (SASA) | ✅ activo | Portal corporativo; sin precios públicos en línea |
| **portal-divep.xutil.cu** (DIVEP) | ✅ activo | Sección comercialización/ofertas; sin precios públicos |
| Resto (.cu) | ⚠️ no verificable | DNS público no resuelve o timeout (posible bloqueo/firewall cubano); **no implica cierre** |

### Descubrimiento por JS-inversa (MCV tienda)

Analizando el bundle Angular (`main.*.js`) del shell `tienda.mcvcommercial.com`:

- `apiUrl: "https://api.pymesbulevar.com/v1/"` (plataforma e-commerce cubana pymesbulevar / Guajiritos SRL)
- `imageUrl: "https://cdntienda.pymesbulevar.com/"`
- `admin: https://admintienda.mcvcommercial.com/`
- Rutas `backend/product/*` pertenecen a la app admin (SPA catch-all), no al API pública.
- Los endpoints exactos del catálogo viven en lazy-chunks → quedan documentados como pendiente.

Esto es la **segunda** lección de "leer el JS del sitio" (la primera, API GraphQL de
Revolico, journal 002): el patrón se repite en sitios cubanos modernos.

## Datos capturados

- `data/raw/comercializadoras/catalogos/catalogo_bdcone.csv` — 13 filas (modelo, EUR, USD)
- `data/raw/comercializadoras/catalogos/catalogo_dongfeng.csv` — 27 filas (modelo, EUR, USD)
- `data/raw/comercializadoras/estado_comercializadoras.csv` — verificación por entidad
- `data/raw/comercializadoras/endpoints_descubiertos.json` — APIs por JS-inversa
- `data/raw/comercializadoras/informe_catalogos.md` — resumen legible
- `data/tasas_cambio/tasas_eur_usd.csv` — tasa real EUR→USD 1.120529 (open.er-api, hoy)

## Decisión de conversión

Los precios públicos están en **EUR** (no CUP/MLC). Se obtuvo la tasa real
1.120529 EUR→USD desde open.er-api.com (sin inventar), registrada con fecha y fuente.

## Lecciones

- Los dominios `.cu` estatales no son verificables desde el exterior (DNS/firewall);
  la ausencia de respuesta no es sinónimo de cierre.
- El orden de la moneda importa en los regex: BDC ONE escribía `14,849.00 EUR`
  (número→moneda); Dongfeng usa `€ 21.900 EUR` (ambos direcciones contempladas).
- PowerShell + `python -c` con comillas dobles corrompe los strings: siempre
  escribir el script a archivo y ejecutar con `.venv\Scripts\python.exe`.

## Estado

Implementación del plan aprobado completada. Pendientes de este issue:
commits + actualización de bitácora + handoff (ver handoff 005).