# Journal 012 — Preparación de la web: datos, figuras y deuda detectada

**Fecha:** 2026-11-05  
**Tipo:** hallazgos / preparación de la Etapa 07 (Comunicar)  
**Referencias:** `docs/Dos caminos para comprar un carro en La Habana historia de datos y plan web.md`,
`docs/plan_implementacion_web.md`, `src/exportar_datos_web.py`, `web/data/`.

## Qué se hizo

1. Se revisó el estado completo del repo y el plan web aprobado (11 bloques,
   cifras, sesgos y fuentes).
2. Se creó `src/exportar_datos_web.py`, que deriva de los CSV **todas** las
   cifras que usará la página (agregados por municipio, marca, año, catálogo
   formal, comparación y puntos para el interactivo de presupuesto).
3. Se generó `web/data/datos.js` (`window.DATOS`) y `web/data/datos.json`.
   Se eligió JS y no `fetch` porque la página debe abrirse con doble clic
   (`file://` bloquea peticiones locales).
4. Se verificaron las cifras de control contra
   `reports/figuras/Analizar/reporte_correcciones.md`: mediana informal 22.000
   (n=2.703), formal 32.699 (n=83), brecha 10.699, media recortada 22.196.

## Hallazgos relevantes

- **La figura `04_comparacion_formal_vs_informal_por_marca.png` está mal
  etiquetada:** el eje X dice `ford`, pero el dato es **Foton** (informal n=10,
  mediana 50.000; formal n=15, mediana 44.709). El catálogo formal no tiene Ford.
  No debe publicarse sin corregir.
- **La figura `07_catalogo_formal_por_entidad.png` ordena entidades por mediana**,
  lo que contradice la regla del plan de no rankear entidades (venden productos
  distintos). Requiere rediseño o advertencia explícita.
- **La figura `03_precio_por_marca_informal.png` no muestra `n`** y coloca arriba
  marcas con muestra baja (Foton n=10). Añadir `n` o filtrar `n>=30`.
- **`reports/figuras/Analizar/datos_graficos/` no existe**, aunque el plan la cita
  en los bloques 2, 4 y 5. La data web ya cubre esa necesidad.
- **Base de cálculo:** `anuncios_analisis.csv` incluye 916 filas no activas; el
  plan y las figuras usan 2.703 precios válidos (todos), mientras que solo
  `activo` da 2.015 (mediana idéntica: 22.000). Se mantiene 2.703 por
  consistencia y se declarará el subconjunto activo.
- **Deuda de documentación/bitácora:** `README.md` y `docs/ESTADO_PROYECTO.md`
  siguen describiendo el estado de octubre (600 anuncios, Windows); el README
  cita `comunicacion/` (no existe) y 3.958 anuncios nacionales frente a 3.566 de
  La Habana procesados. Además, `INDICE.md` registra un journal 011 que no tiene
  archivo en `opencode/journals/`.

## Decisión

La página se implementará como sitio estático en `web/`, sin servidor ni
dependencias externas, consumiendo `window.DATOS`. Antes de maquetar hay que
resolver las figuras 03, 04 y 07 (corregir etiqueta, mostrar `n`, quitar el
ranking engañoso o advertirlo).
