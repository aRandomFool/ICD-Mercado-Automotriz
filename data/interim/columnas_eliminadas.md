# Columnas eliminadas y reportes - anuncios_limpios.csv -> anuncios_analisis.csv

## Resumen

- Filas originales: 3566
- Filas en anuncios_analisis.csv: 3566 (igual)
- Columnas originales: 30
- Columnas eliminadas: 8
- Columnas conservadas: 22
- Columnas eliminadas: ['color', 'estado', 'fuente', 'tipo_fuente', 'provincia', 'verificado_el', 'pagina', 'total_pagina']

## Columnas eliminadas (con evidencia)

| Columna | Motivo | Evidencia (nulos/únicos) | Valor constante |
|---------|--------|--------------------------|----------------|
| color | 100% nulos, sin ningún valor | nulos=3566/3566 (100.0%), valores_unicos=0 | N/A |
| estado | 100% nulos, sin ningún valor | nulos=3566/3566 (100.0%), valores_unicos=0 | N/A |
| fuente | Único valor en todas las filas (sin variación) | nulos=0/3566 (0.0%), valores_unicos=1 | anuncio |
| tipo_fuente | Único valor en todas las filas (sin variación) | nulos=0/3566 (0.0%), valores_unicos=1 | clasificados |
| provincia | Único valor en todas las filas (sin variación) | nulos=0/3566 (0.0%), valores_unicos=1 | la habana |
| verificado_el | Único valor en todas las filas (registrado en reporte) | nulos=0/3566 (0.0%), valores_unicos=1 | 2026-10-26T17:36:58+00:00 |
| pagina | Metadatos del scraping, no variables de mercado | nulos=0/3566 (0.0%), valores_unicos=72 | 1, 10, 11, 12, 13 |
| total_pagina | Metadatos del scraping, no variables de mercado | nulos=0/3566 (0.0%), valores_unicos=2 | 46, 50 |

## Paso 2: Columnas sospechosas (solo reporte)

### ubicacion vs municipio
- municipio: valores únicos = 15, nulos = 2 (0.0561%)
- ubicacion: valores únicos = 16, nulos = 0 (0.0%)
- ¿ubicacion aporta información que municipio no tiene?: Sí. Hay 16 valores únicos en ubicacion vs 15 municipios.
- Valores en ubicacion NO presentes como valor exacto en municipio (diferencia): ['La Habana', 'La Habana, Arroyo Naranjo', 'La Habana, Boyeros', 'La Habana, Centro Habana', 'La Habana, Cerro', 'La Habana, Cotorro', 'La Habana, Diez de Octubre', 'La Habana, Guanabacoa', 'La Habana, Habana Vieja', 'La Habana, Habana del Este', 'La Habana, La Lisa', 'La Habana, Marianao', 'La Habana, Playa', 'La Habana, Plaza', 'La Habana, Regla', 'La Habana, San Miguel del Padrón']

### km, combustible, transmision
- km: nulos=3492 (97.9248%), con valor real=74, valores únicos=33
- combustible: nulos=3215 (90.157%), con valor real=351, valores únicos=4
- transmision: nulos=3408 (95.5693%), con valor real=158, valores únicos=2

### notas
- nulos=3480 (97.5883%), valores únicos=2
- Valores distintos (primeros 30): ['CUP/USD=710 (tasas_usd.csv, 2026-09-24)', 'km extraído del título']

## Paso 4: Problemas de filas (sin modificar nada)

### anio = 0 o fuera de rango plausible (1900-2026)
- Total: 1745 filas
  - anuncio_id=57663364, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57661916, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57661621, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57660529, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57659427, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57658652, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57657515, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57655547, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57654604, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57654574, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57654281, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57654157, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57653069, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57653061, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57651299, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57651225, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57651224, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57651117, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57650452, anio=0 (fuera_rango_o_cero)
  - anuncio_id=57649679, anio=0 (fuera_rango_o_cero)
  ... (y 1725 más)

### precio_usd nulo, 0 o negativo
- Total: 279 filas
  - anuncio_id=57661293, precio_usd=NULL
  - anuncio_id=57640336, precio_usd=NULL
  - anuncio_id=57640329, precio_usd=NULL
  - anuncio_id=57640172, precio_usd=NULL
  - anuncio_id=57640099, precio_usd=NULL
  - anuncio_id=57639860, precio_usd=NULL
  - anuncio_id=57632237, precio_usd=NULL
  - anuncio_id=57623380, precio_usd=NULL
  - anuncio_id=57621357, precio_usd=NULL
  - anuncio_id=57620788, precio_usd=NULL
  - anuncio_id=57620744, precio_usd=NULL
  - anuncio_id=57618531, precio_usd=NULL
  - anuncio_id=57608817, precio_usd=NULL
  - anuncio_id=57608379, precio_usd=NULL
  - anuncio_id=57597166, precio_usd=NULL
  - anuncio_id=57592357, precio_usd=NULL
  - anuncio_id=57579531, precio_usd=NULL
  - anuncio_id=57579508, precio_usd=NULL
  - anuncio_id=57578094, precio_usd=NULL
  - anuncio_id=57566674, precio_usd=NULL
  ... (y 259 más)

### estado_verificacion (valores distintos)
- activo: 2650 filas
- error: 811 filas
- despublicado: 66 filas
- eliminado: 37 filas
- expirado: 2 filas

### Duplicados
- Por anuncio_id (repetidos): 0 grupos. Ejemplos: []
- Por url (repetidos): 0 grupos. Ejemplos: []
- Por descripcion repetida: 171 grupos. Ejemplos: [('Hyundai IONIQ 5 2024', 11), ('Aprovecha', 2), ('Carro eléctrico', 11), ('Vendo o hago negocio', 3), ('CHEVROLET', 3), ('HYUNDAI IONIQ 5 · 2024 · 100% ELÉCTRICO ⚡', 3), ('Carro moderno', 6), ('VW  en venta', 2), ('Audi A6 2006', 2), ('LAND ROVER SPORT 2017', 2)]

## Verificación final (programática)

- Filas: original=3566, resultado=3566 -> OK
- Ninguna columna eliminada aparece en resultado: OK
- Valores de columnas conservadas sin cambios vs original: OK
- Todas las columnas usadas por plan presentes (anuncio_id,url,marca,modelo,anio,km,combustible,transmision,precio_usd,precio_original,moneda,notas,municipio,ubicacion,descripcion,vistas,imagenes,es_destacado,fecha,actualizado_el,estado_verificacion,mercado): OK
