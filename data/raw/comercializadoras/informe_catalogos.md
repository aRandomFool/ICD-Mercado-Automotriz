# Informe de Catálogos — Comercializadoras

Fecha de re-verificación: **2026-10-11**
Fuente: `data/raw/comercializadoras/Comercializadoras.txt` (23 entidades)
Método: HTTP directo + DNS público + **DNS autoritativo `.cu` (CENIAI)** + conexión
directa al IP con `Host` + **Wayback Machine**. Entidades `.cu` revisadas una a una.

## Resultado por entidad

| Entidad | Web | HTTP | Activo | Catálogo | Precios | URL catálogo | Notas |
|---|---|---|---|---|---|---|---|
| IMPEXPORT | impexport.cu | timeout | no | no | no | | DNS 181.225.250.233; firewall. Archivo: Odoo de servicios, sin autos |
| MCV Comercial | www.mcvcommercial.com | 200 | si | **si** | **si (USD)** | https://tienda.mcvcommercial.com/ | **426 productos extraídos** (repuestos/neumáticos/herramientas/lubricantes). API pymesbulevar |
| MULTISERVI | multiservi.cu | timeout | no | no | no | | DNS 181.225.238.161; firewall. Sin snapshots |
| CIMEX DTA | dta.cimex.com.cu | NXDOMAIN | no | no | no | | No resuelve ni en DNS público ni autoritativo. Sin snapshots |
| DUNA | — | n/d | no | no | no | | Sin web (canales sociales/teléfono); aviso OFAC 2026-08 |
| SASA | www.sasa.com.cu | 200 | si | no | no | | Drupal informativo. Tienda: partes/piezas/accesorios, sin precios online; autos vía líneas de taller |
| UNEVOL | unevol.cu | timeout | no | no | no | | `www.unevol.cu`→200.55.182.106 (NS cubano); firewall. Archivo: WooCommerce Volvo Penta, repuestos |
| Tiendas Caribe (TRD) | www.trdcaribe.co.cu | NXDOMAIN | no | no | no | | No resuelve (público ni autoritativo). Sin snapshots |
| TRANSIMPORT | transimport.co.cu | timeout | no | no | no | | DNS 190.6.66.228; firewall. Archivo: HTML antiguo, marcas, sin precios |
| TRADEX | tradex.cu | timeout | no | no | no | | `www.tradex.cu`→200.55.140.227 (NS cubano); firewall. Archivo: mercancía in-bond/nacionalizada (piezas, VOLVO), sin precios |
| PALCO (Importadora/Grupo) | palco.cu | timeout | no | no | no | | DNS 200.55.134.250; firewall. Archivo: SPA Angular; `automax.palco.cu`=Odoo (`/web` 403) |
| MAQUIMPORT | maquimport.cu | timeout | no | no | no | | DNS 190.6.66.228; firewall. Archivo: corporativo + PDFs, sin catálogo |
| LOGINTER | loginter.cu | NXDOMAIN | no | no | no | | SERVFAIL; no resuelve. Sin snapshots |
| CONSTRUIMPORT | construimport.cu | NXDOMAIN | no | no | no | | No resuelve. Archivo: Drupal corporativo, sin precios |
| AXESS | axess.cu | timeout | no | no | no | | DNS 181.225.227.27; firewall. Archivo: categorías (neumáticos, baterías, autopartes), sin precios |
| ImpoCARIBE | impocaribe.cu | timeout | no | no | no | | DNS 190.6.70.226; firewall. Archivo: solo homepage |
| EISA | eisa.co.cu | NXDOMAIN | no | no | no | | No resuelve. Sin snapshots |
| DIVEP | portal-divep.xutil.cu | 200 | si | parcial | no | https://portal-divep.xutil.cu/es/ofertas | Comercializa piezas, ferretería y riego; sin vehículos con precio |
| SOLIMPORT | — | n/d | no | no | no | | Sin web; difunde por canales de SASA |
| DIVSE | — | n/d | no | no | no | | Sin web (Grupo PALCO) |
| IMPLUS | — | n/d | no | no | no | | Sin web (Grupo PALCO) |
| BDC ONE | bdcone.online | 200 | si | **si** | **si (EUR)** | https://bdcone.online/autos/ | 13 modelos 0km (MG, Maxus, Mitsubishi) |
| DONGFENG CUBA | dongfengqba.com | 200 | si | **si** | **si (EUR)** | https://dongfengqba.com/catalogo/ | 27 modelos de referencia |

## Catálogos con precios

- **MCV Comercial** — tienda online (pymesbulevar). **426 productos** con precio en **USD**
  (`catalogos/catalogo_mcv.csv`): LLANTAS Y NEUMÁTICOS (115), KIT HERRAMIENTAS (89),
  LUBRICANTES Y ADITIVOS (68), CHAPISTERÍA Y PINTURA (52), PARTES/PIEZAS/ACCESORIOS (48),
  ELECTRÓNICA Y LUMINARIAS (46), BATERÍAS (8). **No incluye vehículos completos.**
- **BDC ONE** — 13 autos 0km, precios en EUR (`catalogos/catalogo_bdcone.csv`).
- **Dongfeng Cuba** — 27 modelos, precios de referencia EUR (`catalogos/catalogo_dongfeng.csv`).

## Las entidades `.cu` que no se pudieron abrir (foco de la re-verificación)

Todas se comprobaron por 4 vías. Resultado: **ninguna publica un catálogo de autos con
precios**, y desde esta red siguen inaccesibles (bloqueo de firewall cubano, no cierre).

1. **HTTP directo** (HTTPS y HTTP) → *ConnectTimeout*.
2. **Conexión directa al IP** resuelto, con cabecera `Host` → *ConnectTimeout* (descarta DNS como causa).
3. **DNS autoritativo `.cu`** vía `ns.ceniai.net.cu` → reveló `www.unevol.cu` (200.55.182.106)
   y `www.tradex.cu` (200.55.140.227), que tampoco responden por HTTP.
4. **Wayback Machine** → todas las copias son **sitios corporativos/informativos**
   (Odoo, Drupal, HTML estático) sin listado de vehículos con precios. AXESS/TRADEX/
   CONSTRUIMPORT llegan a listar *categorías de partes* (neumáticos, baterías, piezas),
   pero **sin precios**.

> Conclusión: no existe, a día de hoy y por vías externas, un catálogo de autos con
> precios para IMPEXPORT, MULTISERVI, CIMEX DTA, UNEVOL, Tiendas Caribe, TRANSIMPORT,
> TRADEX, PALCO, MAQUIMPORT, LOGINTER, CONSTRUIMPORT, AXESS, ImpoCARIBE ni EISA.
> Los únicos catálogos con precio siguen siendo **BDC ONE**, **Dongfeng** y ahora **MCV**
> (este último sólo repuestos/neumáticos), más los portales informativos SASA y DIVEP.

## Reproducibilidad

```powershell
py src\extraer_catalogo_mcv.py   # regenera catalogos/catalogo_mcv.csv (426 filas)
```
