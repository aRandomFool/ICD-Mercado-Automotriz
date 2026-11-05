# `web/` — página "Dos caminos para comprar un carro en La Habana"

Sitio estático de una sola página (Etapa 07 · Comunicar). La narrativa, cifras y
reglas están en `docs/Dos caminos para comprar un carro en La Habana historia de datos y plan web.md`;
la arquitectura, el contrato de datos y los criterios de aceptación, en
`docs/plan_implementacion_web.md`.

## Abrir

```bash
xdg-open web/index.html
# o
chromium web/index.html
```

No necesita servidor ni conexión: funciona con doble clic (`file://`). Los datos
se cargan desde `assets/js/datos.js` (`window.DATOS`), no con `fetch`.

## Contenido

- `index.html` — 11 bloques narrativos, 9 interactivos, fuentes y sesgos.
- `assets/css/estilos.css` — estilos responsive + impresión.
- `assets/js/app.js` — interactivos, navegación y checklist.
- `assets/js/datos.js` — paquete de datos generado (no editar a mano).
- `data/datos.json` — el mismo paquete, auditable.
- `img/` — 10 figuras corregidas y optimizadas.

## Regenerar datos y figuras

```bash
.venv/bin/python src/exportar_datos_web.py
MPLCONFIGDIR=/tmp/mpl .venv/bin/python src/generar_figuras_web.py
```

`src/exportar_datos_web.py` deriva de `data/interim/anuncios_analisis.csv` y
`data/processed/comercializadoras.csv` todos los agregados de la página. Si
cambian los CSV, hay que volver a ejecutarlo.

## Verificación realizada (2026-11-05)

- 10/10 imágenes cargan; 0 excepciones de consola.
- Sin desbordamiento horizontal en escritorio (1440 px) ni móvil (≤640 px).
- Filtros de tabla, selectores de marca/municipio, presupuesto, comparación,
  filtro de año y checklist probados con Chrome DevTools.
