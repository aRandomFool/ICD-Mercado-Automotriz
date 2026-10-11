# Diccionario de Datos (Esquema Unificado)

## Convenciones

- `precio_usd`: siempre convertido a USD (si origen CUP, usar tasa en `data/tasas_cambio/tasas_usd.csv`, TASA_CUP_USD=710).
- `anio`: entero; 0 = sin año detectado. Para análisis que requieran año (P5, precio-año) excluir `anio == 0`.
- `tipo_fuente`: `clasificados` | `comercializadora` | `entrevista` | `encuesta`
- `mercado`: `informal` | `formal`

## A. Clasificados Revolico (informal)
Fuente: `data/raw/clasificados/revolico/anuncios.csv`, procesado → `data/processed/mercado_havana.csv`, `regresion_dataset.csv`.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| fuente | str | 'revolico' |
| fecha | str/date | Fecha publicación/registro |
| ubicacion/municipio | str | Municipio en La Habana |
| marca | str | Marca del vehículo ('no identificada' si ausente) |
| modelo | str | Modelo detectado (puede contener ruido) |
| anio | int | Año fabricación (0 si no detectado) |
| precio_original | float | Precio tal como aparece |
| moneda | str | 'USD' o 'CUP' |
| precio_usd | float | Precio convertido a USD |
| descripcion/titulo | str | Título del anuncio |
| url | str | URL del anuncio |
| anuncio_id | int/str | ID único |
| vistas | int | Visualizaciones |
| imagenes | int | Cantidad de imágenes |
| es_destacado | bool | Destacado |
| actualizado_el | str/date | Fecha actualización |
| pagina | int | Página de origen |
| total_pagina | int | Total en página |
| tipo_fuente | str | 'clasificados' |
| mercado | str | 'informal' |

## B. Comercializadoras (formal) - Q6
Ruta: `data/raw/comercializadoras/comercializadoras.csv` (generado por `src/scraper_comercializadoras.py` o carga manual).

| Columna | Tipo | Descripción |
|---------|------|-------------|
| fuente | str | Nombre sitio/entidad |
| tipo_fuente | str | 'comercializadora' |
| mercado | str | 'formal' |
| entidad | str | Nombre de la comercializadora (ver `fuentes.md`) |
| marca | str | Marca |
| modelo | str | Modelo |
| anio | int | Año (opcional; 0 si ausente) |
| precio_original | float | Precio publicado |
| moneda | str | 'USD', 'CUP', 'MLC' o otra |
| precio_usd | float | Convertido a USD (usar tasa correspondiente) |
| url | str | URL origen/catálogo |
| fecha_consulta | date | Fecha de captura/consulta |
| notas | str | Observaciones (ej. "sin precio público") |
| estado | str | 'capturado' o 'manual' |

## C. Entrevistas/Encuestas (Q9)
Ruta: `data/raw/entrevistas/entrevistas.csv`, `encuestas.csv` (estructurados).

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | str | Identificador único |
| tipo | str | 'entrevista' o 'encuesta' |
| fecha | date | Fecha recolección |
| ubicacion | str | Ubicación |
| edad | int | Edad (rango opcional) |
| genero | str | Género |
| ocupacion | str | Ocupación |
| factores_elec_vs_comb | text/list | Factores mencionados (codificables) |
| motivacion_electrico | text | Razones a favor eléctrico |
| barreras_electrico | text | Barreras (precio, autonomía, infraestructura, etc.) |
| combustible_preferido | str | Preferencia |
| precio_importa | int/scale | Importancia precio (1-5) |
| autonomia_importa | int/scale | Importancia autonomía (1-5) |
| costo_uso_importa | int/scale | Costo uso (1-5) |
| infraestructura_carga | int/scale | Infraestructura (1-5) |
| tipo_fuente | str | 'entrevista'/'encuesta' |
| mercado | str | (no aplica) |
| notas | str | Observaciones |

## Reglas de integración para Q6

- Unificar en vista analítica con columnas `tipo_fuente`, `mercado`, `precio_usd`, `marca`, `anio`, `entidad/municipio` según corresponda.
- Reportar diferencias por distribuciones (mediana, IQR, percentiles) y tamaño muestral por grupo; **no fusionar muestras sin documentar sesgos**.
- Si no hay precios públicos en comercializadoras: documentar en `fuentes.md`, generar estructura vacía con `estado=manual` y no rellenar con datos ficticios.