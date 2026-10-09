# Guía de recolección de campo (Fase 3)

En esta fase vas a registrar carros **observados en la calle** de La Habana.
El archivo es `data/raw/campo.csv` (abrelo con Excel: Doble clic → se abre directo).

> 🎯 Meta: **~100 observaciones**, 20-30 minutos de caminata por sesión.
> Recuerda validar el esquema en `docs/esquema_datos.md` si algo no encaja.

## Reglas para que los datos sirvan (¡importante!)

1. **No elijas "carros bonitos"**: eso crea un sesgo (por ejemplo, solo clásicos
   restaurados o solo modernos). Define una regla simple y síguela siempre, por
   ejemplo: *"registro el 1er carro que veo en cada esquina que cruzo"* o
   *"el carro estacionado más cercano a cada semáforo"*.
2. **Registra lo que ves, no lo que adivinas**: si dudas del año, anótalo en
   `notas` (ej. "años 80 aprox") y usa `anio=0`.
3. **Una fila = un carro**. No repitas el mismo carro dos veces en la misma sesión.
4. **Respeta**: solo observa desde la acera, sin tocar ni molestar.
5. Usa SIEMPRE el mismo formato (minúsculas, mismas palabras) para que la limpieza sea fácil.

## Cómo llenar cada campo

| Campo | Cómo llenarlo |
|-------|---------------|
| `fuente` | ya viene con `campo` |
| `fecha` | día de la observación, formato `2026-09-21` |
| `ubicacion` | municipio + zona, ej. `La Habana, Centro Habana - Dragones` |
| `marca` | nombre normalizado (ver tabla en `docs/esquema_datos.md`). Si no la sabes: déjalo vacío y describe en `notas` |
| `modelo` | si lo conoces (`VAZ-2107`, `Corolla`). Si no: vacío |
| `anio` | año o estimación. Si no se puede: `0` y aclara en `notas` (ej. "80s", "2000s") |
| `precio_original` | SOLO si hay letrero de venta con precio visible. Si no: vacío |
| `moneda` | `USD` / `MLC` / `CUP` / `EUR` (solo si hay precio) |
| `precio_usd` | precio convertido a USD si lo sabes; si no, vacío (lo calculamos en la Fase 4) |
| `combustible` | `gasolina` / `diesel` / `electrico` | Carrito eléctricos cada vez más comunes |
| `transmision` | `manual` / `automatica` (si puedes verlo) |
| `estado` | `excelente` / `bueno` / `regular` / `malo` (criterios fijos en el esquema) |
| `color` | color principal, ej. `rojo` o `blanco` |
| `notas` | detalles: "letrero de venta", "taxi por aplicación", "yuma de los 50s", etc. |
| `cant_ocupantes` | opcional — cantidad de personas (identifica carros de trabajo/taxis) |
| `en_venta` | `si` (letrero de venta visible) / `no` / `no_se_sabe` |

> 💡 El campo `en_venta=si` te permite la comparación clave del proyecto:
> **¿los carros que se venden en la calle se parecen a los anunciados en Revolico?**

## Ejemplo de sesión (30 min)

1. Abre `campo.csv` en Excel.
2. Camina una ruta fija (ej. Malecón → Galiano → El Capitolio).
3. Cada esquina, registra el primer carro estacionado o en el semáforo.
4. Guarda el archivo (Ctrl+S) al terminar — Excel guarda el CSV tal cual.

## ¿Cómo se usará este archivo después?

En la Fase 4 (EDA), unirá `anuncios.csv` + `campo.csv` en
`data/processed/mercado_havana.csv` con una columna `fuente` para distinguirlos.