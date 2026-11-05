# Journal 013 — Página web implementada y figuras corregidas

**Fecha:** 2026-11-05  
**Tipo:** implementación / hallazgos técnicos  
**Referencias:** `web/`, `src/exportar_datos_web.py`, `src/generar_figuras_web.py`,
`docs/plan_implementacion_web.md`.

## Qué se construyó

Una página estática de una sola página en `web/` con los 11 bloques del plan y
9 interactivos calculados en el navegador:

- `index.html` — narrativa completa, fuentes, sesgos y calidad de muestra.
- `assets/css/estilos.css` — estilos responsive e impresión.
- `assets/js/app.js` — presupuesto, mediana/media recortada, municipios (conteo y
  precio), marcas, tabla filtrable, comparación por marca, filtro de año,
  checklist con `localStorage` y navegación por scroll.
- `assets/js/datos.js` — `window.DATOS` (208 KB), generado desde los CSV.
- `data/datos.json` — mismo paquete para auditoría.
- `img/` — 10 figuras corregidas y optimizadas (~0,9 MB).

**Decisión clave:** los datos se cargan con `<script src>` y no con `fetch`,
porque la página debe abrirse con doble clic (`file://` bloquea peticiones
locales). No hay servidor, build step ni CDN.

## Figuras corregidas

- **04:** la etiqueta era `ford`; ahora dice **Foton** y muestra `n` en cada barra.
- **07:** se eliminó el ranking de entidades por mediana; ahora es un diagrama de
  puntos (cada modelo = un punto, línea naranja = mediana) con `n` por entidad y
  la advertencia de no comparabilidad.
- **03 informal:** solo marcas con `n≥30`, con valores y `n` en las etiquetas.
- **03 formal:** `n` visible y barras grises para `n<5`.
- **q5 proporción:** la etiqueta de clásicos ya no se recorta.
- Las 10 figuras comparten paleta, tipografía y formato de miles.

Las versiones corregidas de 03/04/07 también se guardaron en
`reports/figuras/Analizar/graficos_nuevos/`.

## Verificación

- 10/10 imágenes cargan tras el scroll; 0 excepciones de consola.
- Sin desbordamiento horizontal en escritorio (1440 px) ni móvil (≤640 px).
- Filtros y selectores probados con Chrome DevTools; la tabla parte de 83 modelos,
  MG devuelve 8, CIMEX 6.
- Checklist persiste en `localStorage` y descarga un `.txt`.
- Altura de la página: ~26.000 px; peso total ~2 MB.

## Decisiones de datos

- Se mantiene la base de **2.703** precios válidos (coherente con las figuras y
  el plan) y se declara el subconjunto activo (2.015, misma mediana: 22.000).
- Las 11 marcas formales se obtienen agrupando `Changan Deepal` en `Changan`
  mediante `marca_norm`; el catálogo muestra el nombre original.
- Solo 2 marcas cumplen `n≥10` en ambos canales (Dongfeng y Foton); la página lo
  declara en vez de simular un cruce mayor.

## Pendientes

- Actualizar el resto de la documentación histórica (el aviso en
  `ESTADO_PROYECTO.md` ya está puesto).
- Opcional: convertir las figuras a WebP/AVIF y añadir un `sitemap`/hosting si se
  publica en línea.
