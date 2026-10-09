# Esquema de datos unificado

Este documento define TODOS los campos que recolectarás, tanto de anuncios como de
observaciones de campo. El objetivo es que ambos datasets compartan el mismo esquema
para poder combinarlos al final en un solo archivo.

> **Regla de oro:** fíjate en estos campos revisando anuncios reales ANTES de empezar.
> Si hay un campo importante que no aparece aquí, agrégalo.

## Campos comunes (anuncios y campo)

| Campo | Tipo | Ejemplo | Notas |
|-------|------|---------|-------|
| `fuente` | texto | `anuncio` / `campo` | De dónde salió el dato |
| `fecha` | fecha | `2026-09-21` | Día de captura |
| `ubicacion` | texto | `Plaza de la Revolución` | Municipio o zona en La Habana |
| `marca` | texto | `Lada`, `Toyota`, `Geely` | Normalizar: **Misma marca, mismo nombre** |
| `modelo` | texto | `VAZ-2107`, `Corolla` | Puede quedar vacío en campo |
| `anio` | entero | `1998` | Año del carro. `0` si no se puede estimar |
| `precio_original` | número | `45000` | Precio tal como apareció |
| `moneda` | texto | `USD` / `MLC` / `CUP` / `EUR` | Moneda del precio original |
| `precio_usd` | número | `45000` | Precio convertido a USD (criterio: ver abajo) |
| `combustible` | texto | `gasolina` / `diesel` / `electrico` | Puede quedar vacío en campo |
| `transmision` | texto | `manual` / `automatica` | Puede quedar vacío en campo |
| `estado` | texto | `excelente` / `bueno` / `regular` / `malo` | Subjetivo — define criterios claros |
| `color` | texto | `rojo` | Opcional |
| `notas` | texto | `le falta un espejo` | Cualquier detalle extra |

## Campos solo de anuncios

| Campo | Tipo | Notas |
|-------|------|-------|
| `km` | número | Kilómetros reportados (si aparece) |
| `descripcion` | texto | Texto completo del anuncio |
| `url` | texto | Enlace al anuncio |

## Reglas de normalización (importantes)

### 1. Marcas
Unifica a un solo nombre (todo en minúsculas o en un formato fijo):

| Variantes | Normalizado |
|-----------|-------------|
| `lada`, `LADA`, `Vaz` | `lada` |
| `toyota`, `TOYOTA` | `toyota` |
| `hyundai`, `hyunday`, `hyndai` | `hyundai` |
| `vw`, `volkswaken`, `volskwagen` es: | `volkswagen` |

**Ejercicio de la Fase 1:** cuando revises anuncios, anota TODAS las variantes
ortográficas que encuentres de cada marca y agrégala a esta tabla.

### 2. Moneda y precio
- Guarda SIEMPRE el precio original y su moneda.
- Cuba usa múltiples monedas (USD, MLC, CUP, EUR). Para comparar, define una **tasa de
  conversión de referencia** (ej: 1 USD = 120 CUP) y consígnala en `precio_usd`.
- Anota la tasa usada en el README o en `notas` si cambia con el tiempo.

### 3. Estado (criterios sugeridos)
- `excelente` — parece nuevo, sin daños visibles.
- `bueno` — uso normal, pequeños detalles.
- `regular` — daños visibles o mecánica dudosa.
- `malo` — necesita reparaciones importantes.

### 4. Año desconocido
Si no puedes estimar el año (común en la calle), usa:

- `0` = no se sabe
- Si el carro es claramente clásico (años 70–80) anótalo en `notas`.

## Tamaño objetivo

| Dataset | Meta mínima |
|---------|-------------|
| `data/raw/anuncios.csv` | ~100 anuncios |
| `data/raw/campo.csv` | ~100 observaciones |

## Archivo final combinado

Después de la limpieza, el resultado será `data/processed/mercado_havana.csv` con todos
los campos comunes + `fuente` para distinguir el origen.