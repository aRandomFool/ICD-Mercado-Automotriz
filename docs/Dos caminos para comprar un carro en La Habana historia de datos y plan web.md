# Dos caminos para comprar un carro en La Habana: historia de datos y plan web

Nov 4, 2026 · @Zero

## Resumen y decisiones para validar

La historia le dice a quien va a comprar un carro que en La Habana hay dos mapas de precios, el formal y el informal, y que la brecha entre ambos es menor de lo que muestran las gráficas actuales: unos 10 700 USD, no unos 15 200.

**Hallazgo que condiciona todo.** Varias gráficas del reporte incluyen precios marcador (209 anuncios con precio de 1 USD, otros con 111) aunque la metodología los excluye. Con esos precios retirados, la mediana informal sube de 18 000 a 22 000 USD y la formal queda en 32 700. También cambian el ranking por municipio (Marianao pasa de 7 000 a 16 000 USD) y el de marcas (BMW aparece como 31 000, 50 713 o 46 000 según la gráfica). Por eso la página recalcula cada cifra de precio desde los CSV; la sección 5 compara ambos valores.

**Decisiones que tomé; cámbialas si no te sirven:**

1. Cifras de precio recalculadas desde los CSV, no leídas de las gráficas. Las de conteo (marcas, municipios, clásicos vs modernos) coinciden con las gráficas.
2. Medida de precio: mediana por defecto, con opción de ver la media recortada al 10% que fija el reporte. Con precios válidos casi coinciden (22 000 vs 22 196 USD en el informal).
3. Una sola página con scroll narrativo, ligera para móvil y conexiones lentas, sin servidor.

**Fuera de alcance:** costos de mantenimiento (Q9). Sin transcripciones de las entrevistas no hay datos, y la historia lo declara como límite en lugar de estimarlo.

## La historia: guion por escenas

Título de la página: **¿Cuánto cuesta un carro en La Habana? Dos caminos, dos mapas de precios.** Bajada: *Analizamos 3 566 anuncios de Revolico y 83 modelos de 4 comercializadoras para que decidas con datos antes de comprar.* Los textos de cada escena están listos para usar; las cifras entre corchetes se generan desde los datos, nunca se escriben a mano.

### Escena 1 · Dos mercados, una brecha

Si compras por el canal formal, el precio típico de catálogo es de \[32 700\] USD y el rango va de \[10 645\] a \[79 125\]. En Revolico, la mitad de los precios pedidos está por debajo de \[22 000\] USD. La diferencia, \[10 700\] USD, es real, pero compara cosas distintas: precios de lista de unidades nuevas frente a precios pedidos por particulares, nuevos y usados.

Gráfico: barras de la mediana formal vs informal con su n (\[83\] modelos, \[2 703\] anuncios). Cifras: Revolico del 24 sep y 26 oct 2026; catálogos del 31 mar al 2 nov 2026.

### Escena 2 · Dos municipios concentran casi la mitad de la oferta

Playa publica \[1 002\] de los \[3 566\] anuncios (\[28%\]). Con Centro Habana suman \[41%\], y con Plaza pasan de la mitad (\[51%\]). En el otro extremo, Cotorro tiene \[47\] anuncios y Regla \[20\]. Si vives lejos del centro de la oferta, probablemente tendrás que moverte para ver opciones.

Gráfico: barras por municipio. Interactivo: “Tu municipio”.

### Escena 3 · Qué hay en la vitrina: Hyundai manda

Uno de cada cuatro anuncios es un Hyundai (\[872\], \[24%\]). Le siguen Kia (\[220\]), Lada (\[192\]), Toyota (\[148\]) y Nissan (\[115\]). Hay \[58\] marcas en Revolico frente a \[11\] en el catálogo formal, y \[31%\] de los anuncios ni siquiera dice la marca.

Gráfico: barras de las 15 marcas con más anuncios.

### Escena 4 · Casi no hay clásicos, y la mitad de los anuncios no dice el año

Entre los \[1 821\] anuncios que declaran año, \[1 752\] (\[96,2%\]) son de 2000 en adelante y solo \[69\] (\[3,8%\]) son anteriores. Además, \[575\] son modelos 2024 o más nuevos. Pero \[1 745\] anuncios (\[49%\]) no dicen el año: el dato más útil para juzgar un precio es justo el que más falta.

Gráfico: dos barras (modernos vs clásicos) con una tercera barra gris para “sin año declarado”.

### Escena 5 · Tres mundos de precio y un año que pesa

Por marca, el mercado informal se parte en niveles: Lada pide \[6 500\] USD (mediana, \[161\] anuncios), Hyundai \[29 000\] (\[713\]) y BMW \[46 000\] (\[33\]). Dentro de cada nivel, el año ordena los precios: cuanto más reciente, más caro (correlación de Spearman \[0,67\] con \[1 322\] anuncios).

Gráficos: barras de precio por marca (solo marcas con n ≥ 10, n visible) y dispersión año–precio sin precios marcador.

### Escena 6 · ¿Importa dónde se anuncia?

La mediana va de \[13 000\] USD en La Lisa a \[28 000\] en Arroyo Naranjo, entre municipios con al menos 30 anuncios: \[2,2\] veces. Que el municipio periférico de Arroyo Naranjo sea el más caro sugiere que pesa más lo que se anuncia en cada zona que la zona misma; estos datos no permiten afirmar el porqué.

Gráfico: barras horizontales por municipio con n; los de n < 30 en gris claro. Interactivo: “Tu municipio”.

### Escena 7 · El mismo nombre, dos precios

En las marcas que existen en ambos canales, el precio pedido en Revolico iguala o supera al de catálogo en cuatro de seis: Maxus \[+22%\], Foton \[+12%\], Dongfeng \[+8%\] y MG \[+5%\]. En BAIC es \[27%\] menor y en Mercedes-Benz \[66%\] menor, porque allí el catálogo (\[72 722\] USD) es de unidades nuevas y lo anunciado son carros usados. Los datos no explican por qué unas marcas cuestan más fuera del catálogo: pueden ser otras versiones o modelos, no necesariamente el mismo carro.

Gráfico: barras agrupadas formal vs informal con n de cada lado; se omiten las marcas con menos de 5 anuncios o menos de 4 modelos de catálogo (Changan, Nissan, Toyota). Interactivo: selector de marca.

### Escena 8 · Antes de comprar: cinco preguntas que los datos sugieren

1. ¿Cuál es el año? Casi la mitad de los anuncios no lo dice.
2. ¿Cuántos kilómetros tiene? \[98%\] de los anuncios no lo informa.
3. ¿El precio es real? \[209\] anuncios publican 1 USD, que equivale a “consultar”, no a un precio.
4. ¿Existe en el catálogo formal? Compara cuando la marca esté en ambos canales (nueve en estos datos).
5. ¿Qué pasa en otros municipios? La diferencia entre zonas puede llegar a \[2,2\] veces.

Gráfico: ninguno; lista ilustrada.

### Escena 9 · Lo que estos datos no dicen

Son precios pedidos, no de cierre. No incluyen mantenimiento, garantía ni estado mecánico; las entrevistas sobre costos de mantenimiento están pendientes de transcribir, así que no se estiman. El canal formal tiene pocos modelos con propulsión declarada y el informal casi no declara combustible (\[90%\] vacío). Cierre: *Si compras, compara. Si ves una cifra sin n, desconfía.*

## Productos interactivos

La página incluye cinco interactivos, todos calculados en el navegador sobre archivos JSON generados desde los CSV, sin servidor ni cuentas.

| Interactivo | Qué hace el usuario | Qué muestra | Datos | Escena |
| --- | --- | --- | --- | --- |
| Mi presupuesto | Mueve un control de 2 000 a 80 000 USD | % de anuncios con precio igual o menor, 5 marcas con más anuncios a ese precio y nº de modelos del catálogo formal que caben | Precios válidos de anuncios y catálogo | 1 |
| Tu municipio | Elige uno de los 15 municipios | Nº de anuncios, % del total, mediana de precio y aviso si n < 30 | Anuncios por municipio | 2 y 6 |
| Medida de precio | Alterna mediana y media recortada al 10% | Los mismos gráficos con la otra medida | Precios válidos | 5 y 6 |
| Formal vs informal por marca | Elige una de las 6 marcas comunes | Mediana de cada canal, n de cada lado y diferencia % | Anuncios y catálogo | 7 |
| Catálogo formal | Filtra por precio máximo, entidad y clase | Tabla de los 83 modelos con entidad, marca, modelo, clase, propulsión y precio | comercializadoras.csv | 7 |

Reglas comunes: cada cifra lleva su n; toda muestra de menos de 30 anuncios se marca “muestra baja”; y el texto debajo de cada control resume el resultado en una frase para lectores de pantalla.

## Gráficos: cuáles se usan y cuáles no

De las 16 gráficas del reporte, 6 entran a la historia (se redibujan desde los datos como gráficos interactivos), 2 se rehacen con otro diseño y 8 se descartan; de estas, la dispersión año–precio se redibuja sin precios marcador. Las gráficas actuales sirven como referencia de diseño, no como imágenes finales.

| Nº | Gráfica del reporte | Decisión | Razón |
| --- | --- | --- | --- |
| 1 | Concentración de la oferta por marca | Usar (escena 3) | Conteos correctos; mensaje claro |
| 2 | Dónde se concentra la oferta | Usar (escena 2) | Conteos correctos; suman los 3 566 anuncios |
| 16 | Q7: municipio con mayor índice de publicaciones | Descartar | Duplica la nº 2 (añade solo “sin municipio: 2”) |
| 11 | Clásicos vs modernos (conteo) | Usar (escena 4) | Cifras correctas; añadir la barra “sin año” (1 745) |
| 10 | Clásicos vs modernos (pastel) | Descartar | Redundante con la nº 11; un pastel de 2 categorías no aporta |
| 14 | Mediana formal vs informal | Usar, recalculada (escena 1) | El informal (18 000, n = 2 443) incluye precios marcador |
| 13 | Formal vs informal, cruce por marca | Usar, recalculada (escena 7) | Sin n visible; incluye Changan con 1 anuncio |
| 15 | Q8: mediana por municipio | Usar, recalculada (escena 6) | Marianao en 7 000 USD es efecto de precios marcador (16 000 con datos válidos) |
| 3 | Municipio vs precio (media recortada) | Rehacer como alternancia de medida | Mezcla medidas con la nº 15; solo una vista por gráfico |
| 4 | Premium por marca (media recortada) | Rehacer (escena 5) | Contradice la nº 8 (BMW 50 713 frente a 31 000) |
| 8 | Q4: mediana por marca | Descartar | Contradice la nº 4; mismos precios marcador |
| 9 | Precio vs año (dispersión) | Descartar y redibujar (escena 5) | Incluye puntos con precio 0; la recta cae bajo cero antes de 1970 |
| 12 | Formal vs informal (diagrama de caja) | Descartar | El bigote informal llega a 0 por precios marcador |
| 5 | Catálogo oficial por marca | Descartar | Cuenta “Microbus” y “Pickup” como marcas (filas CIMEX sin marca) |
| 6 | Dispersión entre entidades oficiales | Descartar como gráfico | Cada entidad vende marcas distintas; parece una comparación del mismo carro y no lo es. Los datos van a la tabla filtrable |
| 7 | Precio promedio por marca, comercializadoras | Descartar | Duplica la nº 5, usa una versión sin CIMEX, y el título y las etiquetas se solapan |

## Cifras de la historia: gráfica actual vs. recalculado

Las cifras de conteo coinciden; las de precio cambian porque las gráficas actuales incluyen precios marcador (209 anuncios con 1 USD, otros con 111, 14 o 20). Valores en USD; precio válido = 1 000 ≤ precio < 1 000 000.

| Cifra | En la gráfica actual | Recalculado desde los CSV | Nota |
| --- | --- | --- | --- |
| Mediana informal | 18 000 (n = 2 443) | 22 000 (n = 2 703) | Los precios marcador bajan la mediana |
| Mediana formal | 33 163 (n = 77) | 32 699 (n = 83) | La gráfica no incluye CIMEX (6 modelos) |
| Brecha formal–informal | 15 163 | 10 699 | Diferencia de medianas |
| Media recortada 10%, informal | No se muestra | 22 196 | Casi igual a la mediana con precios válidos |
| Municipio más barato | Marianao 7 000 (n = 113) | Regla 11 000 (n = 15); con n ≥ 30, La Lisa 13 000 (n = 96) | Marianao recalculado: 16 000 (n = 81) |
| Municipio más caro | Arroyo Naranjo 25 000 (n = 267) | Arroyo Naranjo 28 000 (n = 223) | Mismo municipio, otra cifra |
| Extremos entre municipios | 3,6 veces | 2,2 veces (n ≥ 30) | 28 000 / 13 000 |
| BMW | 50 713 (media recortada) y 31 000 (mediana) | 46 000 (mediana, n = 33) y 56 241 (media recortada) | Las dos gráficas se contradicen |
| Hyundai | 27 558 y 26 000 | 29 000 (mediana, n = 713) |  |
| Mercedes-Benz, informal | 28 889 y 25 000 | 25 000 (mediana, n = 31) |  |
| Mercedes-Benz, formal | 66 818 (media recortada) y ≈ 72 700 (cruce) | 72 722 (mediana, n = 5) |  |
| Clásicos vs modernos | 69 y 1 752 | 69 y 1 752 de 1 821 con año | Coincide; se añaden 1 745 sin año |
| Concentración | Hyundai 872; Playa 1 002 | Igual | 24% y 28% de 3 566 anuncios |
| Precio por entidad | MCV 41 983; CIMEX 32 395; Dongfeng Cuba 31 302; BDC ONE 24 284 | No usar como ranking | Cada entidad vende marcas distintas |
| Catálogo formal | 77 modelos y 13 “marcas” | 83 modelos, 4 entidades, 11 marcas reales | Rango de 10 645 a 79 125 |

Fuente de la columna recalculada: anuncios\_analisis.csv (3 566 filas) y comercializadoras.csv (83 filas). Los precios en EUR del catálogo ya vienen convertidos a USD en el CSV y no se reconvierten.
