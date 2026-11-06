# Journal 015 — Web v2: interactivos nuevos y catálogo formal sin “muestra”

**Fecha:** 2026-11-06  
**Tipo:** interfaz / análisis  
**Referencias:** `web/`, `src/exportar_datos_web.py`,
`src/generar_figuras_web.py`, `notebooks/reporte_completo_mercado_automotriz.ipynb`.

## Problema detectado

Varios interactivos repetían el gráfico que los acompañaba: el selector de
municipio repetía el conteo, el detalle de precio repetía la mediana, el selector
de marca repetía la barra y el filtro con/sin año repetía la composición. Además,
el lenguaje de “muestra” aplicado al catálogo formal era incorrecto: un catálogo
de precios no es una muestra y su número de modelos no mide autos vendidos.

## Cambios

Se reemplazaron seis interactivos por exploradores que añaden información:

| Bloque | Antes | Ahora |
|---|---|---|
| 2 | Mediana / media recortada | Percentiles P10–P90 por canal y brecha en cada percentil |
| 3 | “Tu municipio” (conteo) | Curva de concentración: cuántos municipios cubren X% |
| 4 | Detalle de precio por municipio | Misma marca, distinto municipio: mediana local vs. ciudad |
| 5 | Selector de marca | Comparador de rangos P25–P75 entre dos marcas |
| 7 | Selector de las 2 marcas | Explorador de cobertura: comparable / solo informal / informal con n<10 / solo catálogo |
| 8 | Con año / sin año | Explorador por década con mediana, n, P25–P75 y share; incluye “sin año” (11.000 USD vs. 26.000) |

Se conservaron el presupuesto (bloque 1), la tabla del catálogo (bloque 6) y el
checklist (bloque 10), que no repetían gráficos.

## Catálogo formal

- Se eliminó “muestra”, “n=5 insuficiente”, “muestra baja” y “2 marcas
  comparables” de los textos y figuras del canal formal.
- Las etiquetas ahora dicen **“X modelos”**; el número se presenta como
  **cobertura del catálogo**, no como muestra ni ventas.
- La comparación formal-informal pasa de 2 a **6 marcas** con ≥10 anuncios
  informales y presencia en catálogo: Dongfeng, Foton, MG, Nissan, Toyota y
  Mercedes-Benz.
- La dirección de la brecha no es uniforme: el informal pide más en Dongfeng,
  Foton, MG y Toyota; el formal es más caro en Nissan y Mercedes-Benz.
- Se regeneraron las figuras 01, 03 formal, 04 y 07; la 04 ahora muestra las 6
  marcas con barras horizontales y etiquetas “n” / “modelos”.

## Datos y reporte

`src/exportar_datos_web.py` ahora exporta percentiles, `municipio_marca`,
`por_decada`, precios de “sin año”, cobertura de 31 marcas y comparación de 6.
El reporte técnico se actualizó a los mismos criterios y se re-ejecutó sin
errores (Q6 con 6 marcas; catálogo sin muestra).

## Verificación

- 0 excepciones y 0 errores de consola.
- Los 6 interactivos nuevos se probaron con Chrome DevTools (percentiles,
  concentración 1–15, marca/municipio, rangos, cobertura y décadas).
- 11/11 imágenes cargan; sin desbordamiento horizontal.

## Ajuste posterior (2026-11-06)

- El eje horizontal del segundo gráfico del bloque 8 (proporción
  clásicos/modernos) terminaba en 1.750 por decisión automática de Matplotlib.
  Ahora el tick final es **1.821**, la base real de anuncios con año. Se
  regeneró la figura y se re-ejecutó el reporte para incrustar la versión
  corregida.
