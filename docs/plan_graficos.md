# Plan para generar gráficos mejorados del mercado automotriz habanero

Fecha: 2026-11-04  
Objetivo: Reemplazar/añadir gráficos más informativos que los de barras, siguiendo estrictamente las reglas del proyecto.

## Reglas obligatorias
- Trabajar únicamente en `reports/figuras/`
- Usar como base `data/processed/comercializadoras.csv` y `data/interim/anuncios_analisis.csv`
- **Media recortada al 10%**: ordenar precios de menor a mayor, eliminar 10% inferior y 10% superior, promediar el resto. Los gráficos que antes usaban mediana deben usar este promedio recortado.
- **Excluir datos anómalos**: precios `1`, `1111111`, `2222222`, `3333333`, `999999`, `1234567`, etc. (números con dígitos repetidos o valores absurdos). Años `0`, `2107`, `2111` y fuera de rango razonable.
- **Excluir "no identificado"**: si el campo relevante para el análisis es "no identificado", vacío, N/A o equivalente, **excluir esa fila** del análisis correspondiente.
- **Solo La Habana** (15 municipios). 
- **NO inventar datos**. Si no hay datos suficientes para un gráfico/análisis, **no crearlo** y documentar el motivo.
- **Mostrar n cuando aplique** (especialmente con `n < 5`).
- **Títulos deben ser descriptivos** (pregunta/objetivo del análisis).
- Formatos a generar: `.svg`, `.png`, `.pdf` (consistentes con lo existente).

## Propuestas por análisis

### F. Calidad y sesgo
| Análisis | Visualización propuesta | Justificación | Implementación |
|---|---|---|---|
| Duplicados (`anuncio_id`, `url`, `descripcion`) | Tabla/indicador compacto | Conteo absoluto, poca ganancia con gráfico. Si hay duplicados, mostrar desglose. | Reportar conteos; si >0 crear gráfico minimalista, si ==0 crear indicador claro. |
| Sesgo de muestra (por municipio) | *Lollipop chart* (ordenado) | Mantiene ranking con menos tinta. Fácil ver grupos pequeños (Regla, Habana Vieja) frágiles para inferencia. | Contar por municipio válido (excluir "no identificado"), ordenar desc, mostrar `n`. |

### A. Estructura del mercado
| Análisis | Visualización propuesta | Justificación | Implementación |
|---|---|---|---|
| Concentración por marca y modelo | *Pareto chart* (barras + línea % acumulado) | Muestra concentración: ¿cuántas marcas concentran X% de la oferta? | Top marcas con `marca` válida, calcular % y % acumulado sobre total. |
| Antigüedad del parque ofertado | *Histograma* por rangos/décadas | Revela forma de distribución, huecos, multimodalidad. Mejor que barras aisladas por año. | Limpiar años (excluir inválidos), agrupar por década o bins, excluir años anómalos. |
| Composición por combustible y transmisión | *Stacked bar 100%* (comparativo) | Muestra proporciones internas. Más claro que dos gráficos de conteo absoluto. | Excluir "no identificado"/vacíos. Mostrar % y n. |
| Dónde se concentra la oferta (municipio) | *Lollipop chart* / esquema por municipios | Más geográfico-conceptual. Mantener orden por volumen. | 15 municipios habaneros, excluir inválidos. |

### B. Precios
| Análisis | Visualización propuesta | Justificación | Implementación |
|---|---|---|---|
| Distribución de precios y valores atípicos | *Histograma* + *Boxplot* combinado | Muestra forma, asimetría, colas y resumen robusto. Revela atípicos mejor que barras por rango. | Limpiar `precio_usd` (outliers), usar bins razonables, mostrar resumen con media recortada al 10%. |
| Depreciación: precio vs año | *Scatter plot* con línea de tendencia (LOESS/simple) | Muestra relación continua, no-linealidad, dispersión. Barras por año ocultan esto. | Filtrar años/precios válidos, `marca` válida si relevante, mostrar tendencia. Usar media recortada al 10% en resúmenes complementarios si aplica. |
| Premium por marca o modelo | *Boxplot* por marca (Top N) | Muestra mediana, IQR, dispersión y extremos. Más honesto que un solo promedio. | Top marcas con `n >= 5`, excluir "no identificado", precios limpios. |
| Municipio vs precio (Q8) | *Boxplot* por municipio (ordenado) | Distingue diferencia real vs composición de oferta. Clave según nota del plan. | `n >= 5`, 15 municipios, filtros estrictos. |
| Modelo hedónico (regresión) | *Dot-and-whisker / Coefficient plot* | Muestra coeficientes con magnitud e incertidumbre. Más limpio que barras. | Usar variables disponibles, mostrar top coeficientes por |coef|, documentar si no viable. |

### C. Comportamiento de anuncios
| Análisis | Visualización propuesta | Justificación | Implementación |
|---|---|---|---|
| Precio vs vistas | *Scatter plot* + *hexbin* opcional | Relación entre precio pedido y interés. *Hexbin* maneja densidad mejor. | Filtrar `vistas >= 0`, precios limpios, evitar sobreplotting excesivo. |
| Lenguaje de los anuncios | *Lollipop horizontal* | Escaneable, muestra frecuencias literales. Mostrar también % sobre N con texto válido. | Buscar términos literales: `negociable`, `permuta`, `papeles al día` solo si aparecen tal cual. No inferir. |

### D. Mercado oficial
| Análisis | Visualización propuesta | Justificación | Implementación |
|---|---|---|---|
| Catálogo oficial por clase/marca/propulsión | *Treemap* | Jerarquía y proporciones del catálogo formal. | Usar `comercializadoras.csv`, normalizar `marca_norm`/`marca`, precios limpios, media recortada al 10% en agregados. |
| Dispersión de precios entre entidades | *Boxplot* por entidad | Muestra si mismo modelo varía entre entidades. | Agrupar por `entidad`, considerar `n`, filtrar válidos. |
| Mezcla de propulsión: oficial vs Revolico | *Stacked bar 100%* comparativo | Composición relativa por canal (importante si totales difieren). | Cruzar `propulsion` (oficial) vs `combustible` (anuncios), excluir "no identificado". |
| Brecha oficial vs segunda mano | *Slopegraph* (pares marca+modelo) | Conecta pares directamente, muestra brecha visualmente. | Solo pares presentes en ambos tras normalización. Top pares por magnitud/relevancia. Si < 3 pares viables → no graficar y reportar. |
| Cobertura cruzada | *UpSet plot* / *Venn* | Muestra intersecciones claramente. UpSet mejor si se expande. | Marcas normalizadas en ambos conjuntos. |

### E. Segmentación
| Análisis | Visualización propuesta | Justificación | Implementación |
|---|---|---|---|
| Clustering/segmentación de vehículos | *Scatter* (año vs precio) coloreado por segmento + densidad | Muestra solapamiento entre segmentos, más fiel a realidad que solo barras. | Usar reglas `clásico < 2000`, `moderno >= 2000`, y rangos de precio. Aplicar todos los filtros. |
| Segmentación por rangos de precio | *Histograma* o *ECDF* | ECDF responde "% por debajo de umbral" directamente. Más informativo para cortes. | Mostrar cortes y % acumulado. |

## Criterios de "no generar gráfico"
- Falta de datos tras aplicar filtros estrictos
- Campo relevante ausente o mayoritariamente "no identificado"/vacío
- `n < 5` para comparación por grupo (salvo conteos globales justificados)
- Cruce entre datasets imposible tras normalización (ej. brecha sin pares)
- Cualquier caso que requiriera inventar datos

## Entregables
- Nuevos/actualizados gráficos en `reports/figuras/` con nombres claros (prefijo por área: `f_`, `a_`, `b_`, `c_`, `d_`, `e_`)
- Cada gráfico: `.svg`, `.png`, `.pdf`
- Si no se genera algún gráfico, crear/actualizar `reports/figuras/REPORTE_NO_GENERADOS.md` con análisis por ítem y motivo
- Mantener estilo minimalista, títulos descriptivos

## Ejecución
1. Guardar este plan (hecho)
2. Generar script para crear visualizaciones con numpy + SVG + conversión (rsvg-convert/ImageMagick)
3. Aplicar todas las reglas de limpieza y filtrado
4. Generar gráficos propuestos
5. Reportar lo generado y lo no generado
