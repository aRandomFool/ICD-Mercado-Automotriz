# Dos caminos para comprar un carro en La Habana: historia de datos y plan web (actualizado)

**Actualización:** Se adapta el plan a los gráficos corregidos en `reports/figuras/Analizar/graficos_nuevos/` (precios válidos: 1000–999,999 USD, sin precios marcador) y a los datos procesados de entrevistas en `data/raw/entrevistas/Entrevistas.txt` (Q9: costos de mantenimiento).

## Resumen
La web cuenta, con datos, cómo se ve el mercado automotriz en La Habana para quien quiere comprar un carro: dos canales (formal e informal), precios típicos, dónde se concentra la oferta, qué marcas dominan, cómo varían los precios por municipio y qué dicen 30 entrevistas procesadas sobre el costo de mantener un auto. **No se generaliza**: cada hallazgo declara su alcance, sesgos y limitaciones.

**Hallazgo central (precios recalculados):** Al excluir precios marcador (584 anuncios con precio no válido según regla 1000 ≤ precio < 1,000,000 USD), la mediana informal es **22,000 USD (n=2,703)** y la formal **32,699 USD (n=83)**, con una brecha de **10,699 USD**. La media recortada al 10% informal es **22,196 USD (n=2,703)**.

## Reglas del proyecto (obligatorias)
- Prohibido inventar datos. Lo que falta es nulo y se excluye del cálculo correspondiente.
- Solo La Habana.
- Todas las cifras se calculan desde los CSV originales (`data/interim/anuncios_analisis.csv`, `data/processed/comercializadoras.csv`) y desde `data/raw/entrevistas/Entrevistas.txt` (datos procesados, no verbatim).
- Precio válido: **1000 ≤ precio_usd < 1,000,000 USD**.
- Marca nula/“no identificada” se excluye en análisis por marca. `anio = 0` se trata como ausente en gráficos que usan año. Propulsión “camioneta” se trata como no identificada. En comercializadoras, “Microbus”/“Pickup” no son marcas en gráficos por marca.
- Precios de Revolico son **precios pedidos** (no de cierre). Catálogos formales son precios de lista/referencia.

## Formato y alcance técnico
- **Una sola página local** (scroll narrativo), sin servidor, ligera para móvil/conexiones lentas.
- Cada bloque contiene **al menos un gráfico y/o producto interactivo** para mantener al público (compradores) enganchado, **excepto el Bloque 9 (mantenimiento)**, que se presenta como narrativa basada en datos de entrevistas sin gráficos ni interactivos por decisión editorial.
- En **cada análisis** se referencia la fuente de datos (URL de Revolico y/o URLs de comercializadoras según corresponda; en el Bloque 9, la fuente es `Entrevistas.txt`). Todas las URLs/fuentes se listan al final de la página.
- Interactivos calculados en el navegador sobre JSON/CSV derivados de los datos originales (sin inventar valores).

## Sesgos y limitaciones (declarar en la web y en cada bloque relevante)
1. **Sesgo de selección (informal):** Revolico captura solo anuncios publicados en esa plataforma; no representa todas las ventas en La Habana ni el universo de vehículos.
2. **Precios pedidos, no transacciones:** Los precios informales son ofertas; el precio real de cierre puede diferir. No hay datos de negociación/cierre.
3. **Información incompleta en anuncios:** Muchos anuncios no declaran año, kilometraje, estado o detalles mecánicos. 1,745 anuncios (49%) no declaran año; el kilometraje es mayoritariamente ausente. Esto limita comparaciones.
4. **Precios marcador excluidos:** 584 anuncios tenían precio no válido (<1000 o >=1,000,000 USD, incluyendo marcadores como 1 USD). Se excluyen de cálculos de precio para evitar distorsión.
5. **Composición heterogénea:** Comparar precios por municipio/marca/canal mezcla años, modelos, equipamiento y estado. “Más caro/barato” no implica que el mismo carro cueste distinto.
6. **Muestra formal pequeña y no comparable por entidad:** 83 modelos de 4 entidades, 11 marcas reales. Cada entidad vende marcas/modelos distintos; no se ordenan entidades como si vendieran lo mismo.
7. **Cruce formal-informal limitado:** Solo marcas con suficiente presencia en ambos canales se comparan (n>=10 en ambos). En muchos casos, el catálogo formal es nuevo y el informal incluye usados.
8. **Entrevistas (Q9) - sesgo de conveniencia y tamaño:** 30 entrevistas procesadas (resúmenes), no muestra representativa de todos los propietarios en La Habana/Cuba. Respuestas son estimaciones declaradas, con rangos y valores faltantes. No permiten generalizar costos a toda la población.
9. **Contexto temporal y cambiario:** Precios y costos cambian rápido. Catálogos formales (31 mar–2 nov 2026) y anuncios (sep–oct 2026) reflejan momentos específicos. Conversiones EUR→USD ya vienen en el CSV procesado.
10. **Cobertura geográfica:** Solo La Habana (15 municipios). No extrapolable al resto de Cuba.

## Estructura narrativa (bloques) y gráficos exactos

> Nota: Los gráficos “nuevos” están en `reports/figuras/Analizar/graficos_nuevos/`. Los gráficos “anteriores” (conteos/estructura correctos donde aplique) están en `reports/figuras/Analizar/`. Usar exactamente los indicados.

### Bloque 1 · Portada: ¿Cuánto cuesta un carro en La Habana?
- **Objetivo (enganche):** Plantear la pregunta central y mostrar los dos caminos de compra.
- **Texto guía (data storytelling):** “Si estás pensando en comprar un carro en La Habana, te enfrentas a dos mapas: el catálogo formal y los precios pedidos en Revolico. Esta historia usa datos reales para ayudarte a comparar con cautela.”
- **Gráfico exacto:** `reports/figuras/Analizar/graficos_nuevos/01_brecha_formal_vs_informal.png`
- **Interactivo:** “Mi presupuesto” (control 2,000–80,000 USD): % de anuncios informales con precio válido <= presupuesto (n base 2,703), marcas con más anuncios en ese rango, y nº de modelos formales dentro del presupuesto (de 83). Cifras calculadas desde CSVs.
- **Fuente en bloque:** Revolico (https://www.revolico.com) y comercializadoras (ver pie de página).
- **Sesgos a declarar:** Precios pedidos vs lista; exclusión de precios marcador; no representa cierres reales.

### Bloque 2 · Dos mercados, una brecha (con datos limpios)
- **Objetivo:** Explicar la brecha real tras limpiar precios marcador.
- **Texto con datos:** Mediana informal **22,000 USD (n=2,703)**; mediana formal **32,699 USD (n=83)**; brecha **10,699 USD**. Media recortada 10% informal **22,196 USD**. Comparar canales distintos (nuevos vs mezcla usado/nuevo/oferta).
- **Gráfico exacto:** `reports/figuras/Analizar/graficos_nuevos/01_brecha_formal_vs_informal.png` (reutilizar como referencia visual principal de brecha) + opcional tabla de verificación desde `reports/figuras/Analizar/datos_graficos/01_brecha_formal_vs_informal.csv`
- **Interactivo:** Alternar “Mediana / Media recortada 10%” (mostrar ambos valores informales; formal según disponibilidad).
- **Fuente:** Revolico + comercializadoras.
- **Sesgos:** Heterogeneidad de productos; informal = precios pedidos.

### Bloque 3 · Dónde se concentra la oferta
- **Objetivo:** Mostrar que la oferta no se distribuye igual en La Habana.
- **Texto con datos:** Playa concentra 1,002 de 3,566 anuncios (28%). Playa + Centro Habana = 41%; con Plaza = 51%. Regla 20, Cotorro 47. *(Conteos de concentración no dependen del precio).*
- **Gráfico exacto:** `reports/figuras/Analizar/a_estructura_concentracion_municipio.png` (o `q7_municipio_mayor_indice_publicaciones_horizontal.png` como alternativa más limpia; elegir uno solo en implementación)
- **Interactivo:** “Tu municipio” (selector 15 municipios): nº anuncios, % del total, aviso si muestra de precios es baja.
- **Fuente:** Revolico (https://www.revolico.com).
- **Sesgos:** Sesgo de publicación por plataforma; concentración no implica mayor disponibilidad real de compra.

### Bloque 4 · Precios por municipio (sin precios marcador)
- **Objetivo:** Mostrar variación territorial en precios pedidos válidos.
- **Texto con datos:** Entre municipios con n>=30, la mediana va de **13,000 USD (La Lisa, n=96)** a **28,000 USD (Arroyo Naranjo, n=223)** (~2.2×). Marianao **16,000 USD (n=81)**. Ranking solo con n>=30; otros listados aparte como muestra baja/insuficiente.
- **Gráfico exacto:** `reports/figuras/Analizar/graficos_nuevos/02_mediana_precio_por_municipio.png`
- **Interactivo:** “Tu municipio” (detalle de mediana, n, calidad de muestra) + enlace a `datos_graficos/02_mediana_precio_por_municipio.csv`.
- **Fuente:** Revolico (https://www.revolico.com).
- **Sesgos:** Diferencias pueden reflejar mix de marcas/modelos/años/estado, no solo ubicación. No afirmar causalidad territorial.

### Bloque 5 · Qué marcas dominan la oferta y sus precios
- **Objetivo:** Mostrar concentración por marca y niveles de precio en el informal.
- **Texto con datos:** Hyundai lidera publicaciones (872 anuncios, ~24% de 3,566). Precios informales (mediana, válidos): Hyundai **29,000 USD (n=713)**, BMW **46,000 USD (n=33)**, Mercedes-Benz **25,000 USD (n=31)**. *Solo comparar/ordenar donde n sea suficiente.*
- **Gráfico exacto (principal):** `reports/figuras/Analizar/graficos_nuevos/03_precio_por_marca_informal.png`
- **Gráfico exacto (apoyo estructura):** `reports/figuras/Analizar/a_estructura_concentracion_marca.png` o `q1_marca_mayor_indice_publicaciones_barras.png`
- **Interactivo:** Selector de marca (ver mediana, n, calidad) usando datos de `03_precio_por_marca_informal.csv`.
- **Fuente:** Revolico (https://www.revolico.com).
- **Sesgos:** 31% de anuncios sin marca identificada (excluidos en análisis por marca); concentración de publicaciones ≠ calidad/oferta real.

### Bloque 6 · Catálogo formal: qué hay y a qué precios
- **Objetivo:** Contextualizar el canal formal sin comparaciones engañosas entre entidades.
- **Texto con datos:** 83 modelos, 4 entidades, 11 marcas reales. Rango 10,645–79,125 USD (según datos procesados). Mercedes-Benz formal mediana **72,722 USD (n=5, insuficiente)**. **No** ordenar entidades por precio medio (venden marcas/modelos distintos).
- **Gráfico exacto:** `reports/figuras/Analizar/graficos_nuevos/07_catalogo_formal_por_entidad.png`
- **Gráfico exacto (apoyo):** `reports/figuras/Analizar/graficos_nuevos/03_precio_por_marca_formal.png`
- **Interactivo:** Tabla filtrable del catálogo (entidad, marca, modelo, clase, propulsión, precio USD) desde `data/processed/comercializadoras.csv`.
- **Fuente:** Comercializadoras: https://bdcone.online, https://dongfengqba.com, https://mcvcommercial.com, https://cimex.cu
- **Sesgos:** Catálogo pequeño; “Microbus/Pickup” excluidos como marca en gráficos por marca; precios de lista/referencia.

### Bloque 7 · El mismo nombre, dos precios (comparación con cautela)
- **Objetivo:** Comparar canales solo donde hay cruce suficiente.
- **Texto con datos:** Se comparan **solo marcas con n>=10 en ambos canales**; si n<30 se marca “muestra baja”. El catálogo suele ser nuevo; el informal incluye usados/ofertas. Ejemplo con cautela: Mercedes-Benz informal 25,000 USD (n=31) vs formal 72,722 USD (n=5, insuficiente) — no comparable como “mismo carro”.
- **Gráfico exacto:** `reports/figuras/Analizar/graficos_nuevos/04_comparacion_formal_vs_informal_por_marca.png`
- **Interactivo:** Selector de marca común (mostrar ambos valores y calidad de muestra).
- **Fuente:** Revolico + comercializadoras.
- **Sesgos:** No es el mismo vehículo/version/año; cruce parcial; muestras pequeñas en formal.

### Bloque 8 · Antigüedad del parque: clásicos, modernos y datos faltantes
- **Objetivo:** Mostrar composición por año sin perder de vista los faltantes.
- **Texto con datos:** Entre 1,821 anuncios con año declarado (anio != 0): **69 clásicos (<2000)** y **1,752 modernos (>=2000)**. 1,745 anuncios (49%) **no declaran año** — una limitación clave para evaluar precio.
- **Gráfico exacto:** `reports/figuras/Analizar/q5_clasicos_vs_modernos_conteo.png` y `reports/figuras/Analizar/q5_clasicos_vs_modernos_proporcion.png` (mostrar conteo + proporción). *Si se implementa versión con “sin año declarado”, debe calcularse desde datos y no inventarse.*
- **Interactivo:** Filtro “con año / sin año” (conteos desde datos).
- **Fuente:** Revolico (https://www.revolico.com).
- **Sesgos:** Casi la mitad sin año; clasificación depende de lo declarado en el anuncio.

### Bloque 9 · Lo que cuesta mantener un auto (historia desde entrevistas procesadas)
- **Objetivo:** Contar, con base en los datos recopilados, cómo viven el costo de mantenimiento 30 propietarios entrevistados. Sin gráficos ni productos interactivos: solo narrativa apoyada en lo declarado.
- **Formato:** Relato breve (data storytelling) con cifras textuales extraídas de `data/raw/entrevistas/Entrevistas.txt`. No se inventan datos; cuando falta información se indica “no declarado”.
- **Historia (guion para la web):**  
  Comprar el carro es solo el primer gasto. Para entender qué viene después, reunimos 30 entrevistas procesadas (resúmenes, no transcripciones textuales completas) con propietarios que usan sus vehículos para fines personales, trabajo o carga en La Habana. Sus respuestas no describen a “todos” los dueños de autos, pero sí muestran una realidad repetida: mantener un carro cuesta, y cuesta de formas muy distintas.

  **El combustible es un gasto constante, pero no uniforme.** Entre quienes declararon precio, el litro se movió generalmente entre **2.00 y 2.80 USD** (con menciones a CUPET, Mipymes y compras “por la calle”). El consumo mensual también varió mucho: hubo quienes reportaron **20–25 litros** al mes, otros **50–100 litros**, y casos de uso intensivo como **100–120, 100–130 o 130–160 litros** mensuales; en un caso (camión Chevrolet 1954, carga) el consumo se describió en **2.2 km por litro** y rangos diarios de **40 a 100–200 litros**. Algunos entrevistados no declararon fuente o precio.

  **Las reparaciones y el mantenimiento no tienen una sola factura.** Al pedir un estimado anual, aparecieron respuestas muy dispares: desde **200 USD**, **200–300 USD**, **200–400 USD**, **300–500 USD** o **400–800 USD**, hasta **1000–2000 USD** y **2000–3000 USD** en varios casos. También hubo quien no pudo dar una cifra y la describió como “bastante elevada”, y otro caso mencionó **15k, 20k, 30k CUP** (equivalentes declarados: **19, 25, 38 USD** con tasa 788 CUP = 1 USD, según la entrevista). La lección es clara: el costo anual depende del vehículo, el uso, la disponibilidad de piezas y la magnitud de las averías.

  **Conseguir piezas suele ser la parte difícil.** La dificultad se calificó con frecuencia como **alta**, **compleja** o asociada a **precios elevados** (en pocos casos se matizó: “baja, pero precios elevados” o “hay piezas pero caras”). Las fuentes mencionadas incluyen **Mipymes**, **importadoras**, **internet**, **redes sociales/páginas de Facebook**, **contactos que importan**, encargos al exterior y, en algunos casos, agencias o talleres. Esto sugiere que el mantenimiento no depende solo del taller: depende de encontrar la pieza.

  **Más allá de gasolina y reparaciones, pocos declararon otros gastos fijos.** La mayoría respondió “ninguno”; de forma puntual se mencionaron **neumáticos (60–80 USD)** y **baterías (300 USD)**. Aun así, la ausencia de declaración no significa ausencia de gasto: solo refleja lo reportado en estas entrevistas.
- **Fuente:** Entrevistas procesadas del ProyectoCD, `data/raw/entrevistas/Entrevistas.txt` (30 entrevistas; resúmenes procesados, no transcripciones verbatim completas). No se usan datos de Revolico ni de comercializadoras en este bloque.
- **Sesgos y limitaciones (declarar en el bloque):** Muestra pequeña y no representativa (30 entrevistas, sesgo de conveniencia). Respuestas son estimaciones declaradas por los propietarios, con rangos, valores faltantes (“no declarado”) y contextos distintos (uso personal, trabajo, carga; modelos muy diversos). No se puede generalizar a todos los propietarios, municipios ni modelos en La Habana o Cuba. Los montos reflejan lo reportado en el momento/contexto de cada entrevista.

### Bloque 10 · Antes de comprar: checklist con datos
- **Objetivo:** Convertir hallazgos en acciones prácticas.
- **Contenido (lista):** verificar año (49% no lo declara), sospechar precios marcador, comparar canales con cautela, revisar municipio, considerar mantenimiento (alta variabilidad en entrevistas), pedir información faltante.
- **Gráfico/visual:** Infografía estática o tarjetas (sin inventar cifras nuevas); puede reutilizar iconografía con cifras ya citadas y sus fuentes.
- **Interactivo:** Checklist descargable/seleccionable (local).
- **Fuente:** Síntesis de Revolico + comercializadoras + entrevistas.

### Bloque 11 · Cierre: lo que estos datos dicen y lo que no dicen
- **Objetivo:** Transparencia total.
- **Texto:** Resumen de hallazgos + recordatorio de sesgos. “Si ves una cifra sin contexto, desconfía.”
- **Gráfico exacto (opcional):** `reports/figuras/Analizar/graficos_nuevos/01_brecha_formal_vs_informal.png` como recap visual.
- **Fuente:** Todas (listadas al final).

## Fuentes (listar al final de la página)
### Datos de anuncios (mercado informal)
- Revolico: https://www.revolico.com
- Dataset procesado: `data/interim/anuncios_analisis.csv` (derivado de anuncios de Revolico; 3,566 filas; La Habana)

### Datos de catálogos (mercado formal)
- BDC ONE: https://bdcone.online
- Dongfeng Cuba: https://dongfengqba.com
- MCV Comercial: https://mcvcommercial.com
- CIMEX: https://cimex.cu
- Dataset procesado: `data/processed/comercializadoras.csv` (83 filas)

### Datos cualitativos/cuantitativos declarados (mantenimiento)
- Entrevistas procesadas (30): `data/raw/entrevistas/Entrevistas.txt` (resúmenes; no verbatim)

### Documentación del proyecto
- `docs/preguntas_investigacion.md`
- `docs/plan_analisis_mercado_automotriz.xlsx`
- `notebooks/reporte_completo_mercado_automotriz.ipynb`
- `reports/figuras/Analizar/reporte_correcciones.md`

## Resumen de gráficos exactos por bloque
| Bloque | Gráfico(s) exacto(s) | Interactivo |
|---|---|---|
| 1 | `graficos_nuevos/01_brecha_formal_vs_informal.png` | Mi presupuesto |
| 2 | `graficos_nuevos/01_brecha_formal_vs_informal.png` | Mediana / Media recortada 10% |
| 3 | `a_estructura_concentracion_municipio.png` (o `q7_municipio_mayor_indice_publicaciones_horizontal.png`) | Tu municipio (conteos) |
| 4 | `graficos_nuevos/02_mediana_precio_por_municipio.png` | Tu municipio (precios, n/calidad) |
| 5 | `graficos_nuevos/03_precio_por_marca_informal.png` + `a_estructura_concentracion_marca.png` | Selector de marca |
| 6 | `graficos_nuevos/07_catalogo_formal_por_entidad.png` + `graficos_nuevos/03_precio_por_marca_formal.png` | Tabla filtrable catálogo |
| 7 | `graficos_nuevos/04_comparacion_formal_vs_informal_por_marca.png` | Selector de marca común |
| 8 | `q5_clasicos_vs_modernos_conteo.png` + `q5_clasicos_vs_modernos_proporcion.png` | Filtro con/sin año |
| 9 | Ninguno (narrativa basada en datos) | Ninguno |
| 10 | Visual de checklist (con cifras ya citadas) | Checklist |
| 11 | `graficos_nuevos/01_brecha_formal_vs_informal.png` (opcional recap) | — |

## Notas finales para implementación
- Verificar que todas las cifras mostradas provengan de los CSV/datos procesados; no hardcodear valores no verificados.
- Mantener consistencia: mediana por defecto; media recortada 10% como alternativa donde se indique.
- Mostrar calidad de muestra (n>=30 suficiente, 10<=n<30 baja, n<10 insuficiente) en interactivos y textos analíticos.
- No usar ranking por entidad formal.
- Lenguaje claro, enfocado en compradores; transparencia sobre incertidumbre.
