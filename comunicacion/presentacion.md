# Presentación - Mercado Automotriz La Habana

## Diapositiva 1: Portada
- Título: Análisis del mercado automotriz en La Habana
- Datos: 600 anuncios Revolico (La Habana)
- Proyecto CD - Reorganización 7 etapas

## Diapositiva 2: Objetivo
- Analizar factores que explican precios
- Responder 9 preguntas (con proxy Q1)
- Comparar formal/informal (Q6) y eléctrico vs combustión (Q9) cuando existan datos

## Diapositiva 3: Metodología
- Scraping GraphQL Revolico (src/scraper_revolico.py)
- EDA + Regresión lineal (scikit-learn)
- Reorganización: actual+subcarpetas, etapa 07 comunicacion/

## Diapositiva 4: Resultados clave
- Mediana 19 500 USD
- +716 USD/año (r=0.30)
- Clásicos <2000 vs modernos >=2000
- Top marcas por publicaciones/precios

## Diapositiva 5: Limitaciones y conclusiones
- Faltan km/estado/combustible
- Q6,Q9 pendientes de captura
- Cifras coherentes con lo validado.

Ver figuras en reports/figuras/.