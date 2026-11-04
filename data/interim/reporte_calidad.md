# Reporte de calidad - anuncios_limpios.csv

## Resumen de filas
- Filas iniciales: 3566
- Filas excluidas: 0
- Filas finales: 3566
- Verificación: filas_finales + filas_excluidas = 3566 = filas_iniciales (3566)

## Nulos/vacíos
- Porcentaje de celdas nulas/vacías después: 20.34%
- Verificación sin cadenas vacías/"N/A" en dataset final: OK

## Duplicados
- Duplicados encontrados: 0 (no se detectaron duplicados según criterios URL/anuncio_id o combinación)

## Valores inválidos o sospechosos detectados
- ('anio_fuera_rango', 0, '57663364')
- ('anio_fuera_rango', 0, '57661916')
- ('anio_fuera_rango', 0, '57661621')
- ('anio_fuera_rango', 0, '57660529')
- ('anio_fuera_rango', 0, '57659427')
- ('anio_fuera_rango', 0, '57658652')
- ('anio_fuera_rango', 0, '57657515')
- ('anio_fuera_rango', 0, '57655547')
- ('anio_fuera_rango', 0, '57654604')
- ('anio_fuera_rango', 0, '57654574')
- ('anio_fuera_rango', 0, '57654281')
- ('anio_fuera_rango', 0, '57654157')
- ('anio_fuera_rango', 0, '57653069')
- ('anio_fuera_rango', 0, '57653061')
- ('anio_fuera_rango', 0, '57651299')
- ('anio_fuera_rango', 0, '57651225')
- ('anio_fuera_rango', 0, '57651224')
- ('anio_fuera_rango', 0, '57651117')
- ('anio_fuera_rango', 0, '57650452')
- ('anio_fuera_rango', 0, '57649679')
- ('anio_fuera_rango', 0, '57649571')
- ('anio_fuera_rango', 0, '57649455')
- ('anio_fuera_rango', 0, '56486755')
- ('anio_fuera_rango', 0, '57647758')
- ('anio_fuera_rango', 0, '57647712')
- ('anio_fuera_rango', 0, '57647374')
- ('anio_fuera_rango', 0, '57647067')
- ('anio_fuera_rango', 0, '57645681')
- ('anio_fuera_rango', 0, '57645092')
- ('anio_fuera_rango', 0, '57644528')
- ('anio_fuera_rango', 0, '57643642')
- ('anio_fuera_rango', 0, '57640329')
- ('anio_fuera_rango', 0, '57639726')
- ('anio_fuera_rango', 0, '57639577')
- ('anio_fuera_rango', 0, '57639275')
- ('anio_fuera_rango', 0, '57638601')
- ('anio_fuera_rango', 0, '57638519')
- ('anio_fuera_rango', 0, '57637843')
- ('anio_fuera_rango', 0, '57637224')
- ('anio_fuera_rango', 0, '57636307')
- ('anio_fuera_rango', 0, '57634602')
- ('anio_fuera_rango', 0, '57632237')
- ('anio_fuera_rango', 0, '57629304')
- ('anio_fuera_rango', 0, '57629068')
- ('anio_fuera_rango', 0, '57628076')
- ('anio_fuera_rango', 0, '57626952')
- ('anio_fuera_rango', 0, '57624838')
- ('anio_fuera_rango', 0, '57624167')
- ('anio_fuera_rango', 0, '57624027')
- ('anio_fuera_rango', 0, '57623371')

## Decisiones de criterio tomadas
- Campos vacíos convertidos a null (campos vacíos en CSV). Sin imputación de datos.
- Normalización formal aplicada: campos categóricos en minúsculas, espacios recortados.
- Filtrado estricto a La Habana (solo municipios habaneros). Todos los registros cumplen província "la habana" y municipio válido.
- Sin extracción de datos faltantes del título/descripción por ambigüedad.
- Valores inválidos no corregidos, solo registrados.
