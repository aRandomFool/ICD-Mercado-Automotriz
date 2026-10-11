# Preguntas de Investigación

> Fuente única: [Preguntas_Analizar.txt](file:///D:/Dany/Ciencia_de_Datos/Introducción%20a%20Ciencia%20de%20Datos/Preguntas_Analizar.txt)  
> Proyecto: Mercado automotriz en La Habana (ProyectoCD)  
> Criterio P5: clásico = `anio < 2000`, moderno = `anio >= 2000`.

| # | Pregunta | Fuente de datos | Variables | Análisis | Estado |
|---|----------|-----------------|-----------|----------|--------|
| 1 | ¿Cuál es la marca con mayor índice de publicaciones? (proxy: anuncios) | `data/raw/clasificados/revolico/anuncios.csv` | `marca` | Conteo por marca (top N). Nota: proxy de "publicaciones por marca" (anuncios de clasificados), no redes sociales. | Respondible (ya disponible con 600 anuncios) |
| 2 | ¿Cuál es la mediana de precios por marca? | `data/raw/clasificados/revolico/anuncios.csv`, `data/processed/mercado_havana.csv` | `marca`, `precio_usd` | Mediana de `precio_usd` por marca (solo filas con precio). | Respondible |
| 3 | ¿Existe una relación entre el precio y el año de fabricación? | `data/raw/clasificados/revolico/anuncios.csv`, `data/processed/mercado_havana.csv` | `anio`, `precio_usd` | Correlación, scatter + tendencia (regresión simple). Excluir anio==0. | Respondible |
| 4 | ¿Cuál es la marca con los precios más elevados? | `data/processed/mercado_havana.csv` | `marca`, `precio_usd` | Mediana/percentil P75 (o precio medio) por marca; reportar top. | Respondible |
| 5 | ¿Cuál es la proporción de anuncios de ventas de autos clásicos vs modernos? | `data/processed/mercado_havana.csv` | `anio` | Clasificación: clásico `< 2000`, moderno `>= 2000`. Solo anuncios con `anio > 0`. | Respondible |
| 6 | ¿Cuál es la diferencia entre los precios del mercado formal y el mercado informal? | `data/raw/comercializadoras/` (formal), `data/raw/clasificados/revolico/` (informal) | `mercado` (formal/informal), `tipo_fuente` (comercializadora/clasificados), `precio_usd`, `marca` | Comparación de distribuciones (mediana, media, percentiles). Requiere captura de precios en comercializadoras (o carga manual si no disponibles públicamente). | Pendiente de captura |
| 7 | ¿Cuál es el municipio con mayor índice de publicaciones? | `data/raw/clasificados/revolico/anuncios.csv` | `municipio` | Conteo por municipio (top). | Respondible |
| 8 | ¿Existe una relación entre el municipio y el precio de venta? | `data/processed/mercado_havana.csv` | `municipio`, `precio_usd` | Mediana por municipio; test/comparación de distribuciones. | Respondible |
| 9 | ¿Cuáles son los factores que influyen en la decisión de comprar un auto eléctrico vs combustión? | `data/raw/entrevistas/` (entrevistas.csv, encuestas.csv) | Datos cualitativos/cuantitativos de entrevistas/encuestas | Análisis cualitativo/estadístico según datos capturados. | Pendiente (entrevistas) |

## Notas

- Q1: se documenta explícitamente como **proxy** (anuncios de Revolico), no redes sociales. Esta decisión está bloqueada.
- Q5: criterio **clásico < 2000, moderno >= 2000** (bloqueado).
- Q6 y Q9 requieren nuevas capturas (comercializadoras y entrevistas). No se inventarán datos.
- Anuncios con `anio == 0` no se excluyen del dataset, solo de análisis que requieren año.