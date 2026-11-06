# Plan de implementación — página web "Dos caminos para comprar un carro en La Habana"

> Documento de preparación para la Etapa 07 (Comunicar). Fuente narrativa y de
> contenidos: `docs/Dos caminos para comprar un carro en La Habana historia de datos y plan web.md`.
> Este documento **no reemplaza** ese plan: lo traduce a arquitectura, archivos y
> criterios de aceptación.

Fecha: 2026-11-05.

---

## 1. Qué existe y qué falta

### Existe (verificado)
- **Datos procesados**: `data/interim/anuncios_analisis.csv` (3.566 anuncios de La Habana),
  `data/processed/comercializadoras.csv` (83 vehículos formales).
- **Entrevistas procesadas**: `data/raw/entrevistas/Entrevistas.txt` (30 entrevistas).
- **Figuras**: `reports/figuras/Analizar/` y `reports/figuras/Analizar/graficos_nuevos/`.
- **Plan narrativo completo** con 11 bloques, cifras, sesgos y fuentes.
- **Paquete de datos web**: `web/assets/js/datos.js` + `web/data/datos.json`,
  generado por `src/exportar_datos_web.py`. Todas las cifras de los interactivos
  salen de aquí; no se hardcodean valores.
- **Página implementada (2026-11-05)**: `web/index.html`, `web/assets/css/estilos.css`,
  `web/assets/js/app.js` y `web/img/` con las 10 figuras corregidas y optimizadas.

### Estado
- ✅ Implementación completa y verificada en Chromium (escritorio y móvil).
- ✅ Figuras 03, 04 y 07 corregidas; las 10 figuras web regeneradas con estilo común.
- ⏳ Actualización de la documentación histórica (`README.md`, `ESTADO_PROYECTO.md`).

---

## 2. Arquitectura propuesta

**Una sola página estática, sin servidor, sin build step y sin CDN.**

```
web/
├── index.html                 # narrativa completa (11 bloques)
├── assets/
│   ├── css/estilos.css
│   └── js/
│       ├── app.js             # render de interactivos + navegación
│       └── datos.js           # window.DATOS = {...}  (generado)
├── data/datos.json            # misma data, auditable
└── img/                       # figuras optimizadas (PNG/WebP) copiadas
```

### Decisión técnica clave: `window.DATOS`, no `fetch`

`fetch('data/datos.json')` **falla al abrir `index.html` con doble clic** (`file://`
bloquea las peticiones locales). Por eso el exportador genera `datos.js`, que
asigna `window.DATOS` y se carga con `<script src="assets/js/datos.js">`. Así la
página funciona sin servidor, tal como exige el plan. `datos.json` se conserva
para auditoría y para reutilizar la data en otros formatos.

### Restricciones de diseño
- Sin frameworks ni dependencias externas (0 requests a terceros).
- Funciona offline y en móvil; CSS con `clamp()`, `grid`/`flex`, imágenes `width:100%`.
- Accesible: contraste AA, `alt` descriptivo, controles nativos, foco visible,
  `prefers-reduced-motion`.
- Sin cookies, sin analytics, sin datos de contacto de anunciantes.

---

## 3. Contrato de datos (`web/assets/js/datos.js`)

```
DATOS.meta        reglas, muestras, brecha, percentiles, fuentes, datasets
DATOS.informal    municipios[15], municipio_marca[323], marcas[58], anios (por_decada, sin_anio), precios_validos[2703], puntos_marca[2024]
DATOS.formal      catalogo[83], marcas[11] (modelos), entidades[4] (modelos), precios_validos[83], rango
DATOS.comparacion criterio "≥10 anuncios informales y presencia en catálogo", marcas[6] + cobertura[31]
```

Cada agregado informal trae: `n`, `mediana`, `media_recortada_10`, `p25`, `p75`,
`min`, `max`, `calidad` (`suficiente` / `baja` / `insuficiente`). Los agregados
formales usan `modelos` y no llevan calidad de muestra. Y, según el caso,
`anuncios` (total de filas) separado de `n` (filas con precio válido).

Regenerar tras cualquier cambio de datos:

```bash
.venv/bin/python src/exportar_datos_web.py
```

Cifras de control (deben coincidir con `reports/figuras/Analizar/reporte_correcciones.md`):

| Cifra | Valor | n |
|---|---:|---:|
| Mediana informal | 22.000 USD | 2.703 |
| Mediana formal | 32.699 USD | 83 |
| Brecha | 10.699 USD | — |
| Media recortada 10% informal | 22.196 USD | 2.703 |
| Clásicos / modernos | 69 / 1.752 | 1.821 |
| Catálogo formal | 83 modelos · 4 entidades · 11 marcas reales | 83 |

---

## 4. Mapa bloque → contenido → figura → interactivo → datos

| Bloque | Figura exacta | Interactivo | Claves de datos |
|---|---|---|---|
| 1 Portada | `graficos_nuevos/01_brecha_formal_vs_informal.png` | "Mi presupuesto" (2.000–80.000 USD) | `meta.brecha`, `informal.precios_validos`, `informal.puntos_marca`, `formal.precios_validos` |
| 2 Dos mercados | `01_brecha...png` | Percentiles P10–P90 por canal | `meta.percentiles` |
| 3 Concentración | `a_estructura_concentracion_municipio.png` | Curva de concentración (1–15 municipios) | `informal.municipios` |
| 4 Precios por municipio | `graficos_nuevos/02_mediana_precio_por_municipio.png` | Misma marca, distinto municipio | `informal.municipio_marca`, `informal.marcas` |
| 5 Marcas | `03_precio_por_marca_informal.png` + `a_estructura_concentracion_marca.png` | Rangos P25–P75 de dos marcas | `informal.marcas` |
| 6 Catálogo formal | `07_catalogo_formal_por_entidad.png` + `03_precio_por_marca_formal.png` | Tabla filtrable | `formal.catalogo`, `formal.marcas` |
| 7 Mismo nombre | `04_comparacion_formal_vs_informal_por_marca.png` | Explorador de cobertura (31 marcas) | `comparacion.cobertura`, `comparacion.marcas` |
| 8 Antigüedad | `q5_clasicos_vs_modernos_conteo.png` + `..._proporcion.png` | Explorador por década (incluye “sin año”) | `informal.anios.por_decada` |
| 9 Mantenimiento | — (narrativa) | — | Texto de `Entrevistas.txt` |
| 10 Checklist | Tarjetas con cifras ya citadas | Checklist descargable | Cifras de bloques 1–9 |
| 11 Cierre | `01_brecha...png` (recap, opcional) | — | `meta` |

Notas de implementación:
- **Bloque 1**: el porcentaje se calcula sobre `precios_validos` (n=2.703). Las
  marcas dentro del presupuesto usan `puntos_marca` (excluye "no identificada").
  Los modelos formales se cuentan sobre `formal.precios_validos` (83).
- **Bloque 4**: comparación condicional marca–municipio; si la celda tiene
  `n<10` se marca como muestra baja (dato informal). No se rankean municipios.
- **Bloque 7**: hoy hay 6 marcas con `n>=10` anuncios informales y presencia en
  catálogo formal (Dongfeng, Foton, MG, Nissan, Toyota y Mercedes-Benz). El
  selector debe decir "6 marcas comparables"; el catálogo no es una muestra.
- **Bloque 9**: no lleva gráficos ni interactivos por decisión editorial; las
  cifras del guion ya están verificadas contra `Entrevistas.txt`.
- Cada bloque declara fuente y sesgos; la calidad de muestra se aplica solo a
  datos informales. En comercializadoras se muestra la cobertura del catálogo
  (número de modelos), nunca una muestra ni ventas. El pie lista todas las URLs.

---

## 5. Hallazgos de la revisión previa

> **Estado:** los puntos 1–4 y 7 quedaron resueltos en la implementación del
> 2026-11-05 (figuras regeneradas en `web/img/` y en `reports/.../graficos_nuevos/`).
> El punto 5 se resolvió manteniendo 2.703 y declarando el subconjunto activo.
> El punto 6 sigue pendiente (documentación histórica).

1. **Figura 04 mal etiquetada.** El eje X dice `ford`, pero el dato es **Foton**
   (informal n=10, mediana 50.000; formal n=15, mediana 44.709). En el catálogo
   formal **no hay Ford** (0 filas). Hay que regenerar la figura o corregir la
   etiqueta; si se publica tal cual, la web contradice sus propios datos.
2. **Figura 07 contradice el plan.** Es un ranking de entidades por mediana
   (BDC 23.463 < CIMEX 31.045 < Dongfeng 32.383 < MCV 41.448), mientras el plan
   prohíbe ordenar entidades porque venden productos distintos. Opciones:
   (a) sustituirla por composición (marcas/clases por entidad), o (b) mantenerla
   con `n` visible y una advertencia explícita de no comparabilidad.
3. **Figura 03 informal ordena por mediana sin mostrar `n`.** Foton (n=10) y
   Land Rover (n=?) aparecen arriba, lo que invita a leer rarezas como precios
   "de marca". Añadir `n` o limitar el gráfico a `n>=30`.
4. **`datos_graficos/` no existe.** El plan referencia CSV en
   `reports/figuras/Analizar/datos_graficos/` (bloques 2, 4 y 5) que no están en
   el repo. Queda cubierto por `web/data/datos.js`; conviene no citar esa ruta.
5. **Base de cálculo: 2.703 vs 2.015.** `anuncios_analisis.csv` incluye filas no
   activas (811 `error`, 66 `despublicado`, 37 `eliminado`, 2 `expirado`). Las
   figuras y el plan usan **2.703** (todos los precios válidos); los solo
   `activo` dan **2.015** (mediana igual: 22.000). Decisión recomendada: mantener
   2.703 por consistencia con lo ya publicado y declarar el subconjunto activo
   en la metodología.
6. **Documentación desfasada.** `README.md` y `ESTADO_PROYECTO.md` hablan de 600
   anuncios, Windows y una carpeta `comunicacion/` que no existe; el README dice
   3.958 anuncios nacionales frente a 3.566 de La Habana procesados. No bloquea
   la web, pero conviene actualizarlo antes de la entrega.
7. **Figuras no optimizadas para web.** 2.600×1.700 px con mucho margen blanco y
   estilo matplotlib por defecto. Para una página ligera conviene recortar
   márgenes y generar versiones 1×/2× o SVG con estilo consistente.

---

## 6. Sistema visual

- **Tema claro**, fondo arena (`#FAF7F2`), texto (`#111827`), azul de datos
  (`#1F5FA8`) y naranja de contraste (`#D97706`).
- Tipografía del sistema (sin descargas): `Georgia` para titulares, `system-ui`
  para texto.
- Ancho de lectura ~72ch; secciones numeradas; navegación lateral discreta en
  escritorio y progreso superior en móvil.
- Las figuras se presentan con título, fuente, `n` y nota de sesgo; nunca solas.
- Tarjetas de "calidad de muestra" con los tres niveles del plan.

---

## 7. Orden de implementación

1. ✅ Corregir/optimizar figuras y copiarlas a `web/img/` (`src/generar_figuras_web.py`).
2. ✅ `index.html` con los 11 bloques y el texto del plan (incluido el guion del 9).
3. ✅ `estilos.css` responsive + print.
4. ✅ `app.js`: navegación, formato de números, calidad de muestra y los 9 interactivos.
5. ✅ Verificación funcional con Chrome DevTools (filtros, selectores, imágenes,
   consola y desbordes) y revisión visual en escritorio/móvil.
6. ⏳ Actualizar README/ESTADO y registrar el journal de implementación.

### Criterios de aceptación (verificados)
- ✅ Abre con doble clic y funciona sin red (datos en `window.DATOS`, sin CDN).
- ✅ Las cifras de los interactivos salen de `DATOS`; el texto narrativo usa las
  cifras aprobadas del plan.
- ✅ 11 bloques, 9 interactivos, fuentes y sesgos en cada bloque.
- ✅ Sin errores de consola; imágenes cargadas tras el scroll; navegación por teclado.
- ✅ Sin desbordamiento horizontal en escritorio ni móvil; peso total ~2 MB.

### Cómo abrir
```bash
xdg-open web/index.html
# o: chromium web/index.html
```
No hace falta servidor. Para regenerar datos y figuras:
```bash
.venv/bin/python src/exportar_datos_web.py
MPLCONFIGDIR=/tmp/mpl .venv/bin/python src/generar_figuras_web.py
```
