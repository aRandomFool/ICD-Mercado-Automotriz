# Reporte de Correcciones - Gráficas de Precios

> **Actualización 2026-11-06 (web v2):** la comparación formal-informal se
> amplió a 6 marcas (≥10 anuncios informales y presencia en catálogo formal).
> Las etiquetas formales dicen “X modelos” y el catálogo se presenta como
> cobertura de precios de lista, no como muestra ni como ventas.

> **Actualización 2026-11-05 (web):** la figura `04_comparacion...` se corrigió
> (la marca es **Foton**, no Ford) y la `07_catalogo_formal_por_entidad` se
> rediseñó como dispersión por entidad para no rankearlas por mediana. La carpeta
> `datos_graficos/` no se generó; los agregados auditables están en
> `web/data/datos.json` (script `src/exportar_datos_web.py`).

## Reglas aplicadas
- Precio válido: 1000 <= precio_usd < 1,000,000
- Excluir marca nula o "no identificada" en análisis por marca
- Excluir anio = 0 en gráficos que usan año
- Propulsión "camioneta" tratada como no identificada
- En comercializadoras, filas con marca Microbus/Pickup excluidas de gráficos por marca
- Mediana por defecto; media recortada al 10% calculada donde se indica

## Exclusiones por precio (regla de validez)
- Precio < 1000 USD: 581
- Precio >= 1,000,000 USD: 3
- **Total excluidos por precio no válido: 584**
- Precio nulo/ausente: 279

## Verificación (valores recalculados)
| Cifra | Valor recalculado | n | Nota |
|---|---:|---:|---|
| Mediana informal | 22000 | 2703 | Precios válidos 1000-999999 USD |
| Mediana formal | 32699 | 83 | |
| Brecha (formal-informal) | 10699 | - | USD |
| Media recortada 10% informal | 22196 | 2703 | |
| Arroyo Naranjo (mediana) | 28000 | 223 | |
| Marianao (mediana) | 16000 | 81 | |
| La Lisa (mediana) | 13000 | 96 | |
| BMW informal (mediana) | 46000 | 33 | |
| Hyundai informal (mediana) | 29000 | 713 | |
| Mercedes-Benz informal (mediana) | 25000 | 31 | |
| Mercedes-Benz formal (mediana) | 72722 | 5 | insuficiente |
| Clásicos / Modernos (anuncios con año) | 69 / 1752 | 1821 | año != 0 |
| Catálogo: modelos / entidades / marcas reales | 83 / 4 / 11 | - | |

## Salidas generadas
- PNG: `reports/figuras/Analizar/graficos_nuevos/`
- CSV: `reports/figuras/Analizar/datos_graficos/`
