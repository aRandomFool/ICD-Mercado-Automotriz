# 📂 `opencode/` — Handoffs y journals del proyecto

Carpeta central del proyecto **Mercado Automotriz de La Habana** para conservar
los artefactos de trabajo de OpenCode: documentos de traspaso entre sesiones
(*handoffs*) y entradas de bitácora (*journals*).

## ⚠️ Regla permanente (desde 2026-10-11)

**TODOS los handoffs y journals que se ejecuten a lo largo del proyecto se
registran obligatoriamente aquí**, en `handoffs/` y `journals/`
respectivamente:

- **Al cerrar/transferir una sesión** → escribir un handoff en `handoffs/` con
  el siguiente número secuencial y actualizar `docs/ESTADO_PROYECTO.md`.
- **Al descubrir algo relevante** (hallazgo, decisión, hallazgo técnico) →
  escribir un journal en `journals/` con el siguiente número secuencial.
- Nada de esta bitácora se guarda fuera de esta carpeta: `opencode/` es la
  única fuente de handoffs y journals del proyecto.
- Al registrar una entrada, **actualizar `INDICE.md`** (tabla con número,
  fecha, tipo y tema de cada entrada).

## Estructura

```
opencode/
├── README.md        # este archivo (convención + regla permanente)
├── INDICE.md        # registro de todas las entradas (tabla)
├── handoffs/        # documentos de traspaso entre sesiones
│   └── 001_...md    # numerados por orden de creación
└── journals/        # entradas de bitácora / hallazgos del proyecto
    └── 001_...md    # numeradas por orden de creación
```

## Convención

- **Handoffs** (`handoffs/`): se genera uno al **cerrar una sesión de trabajo** o
  cuando se transfiere el control a otra sesión. Contiene: objetivo, estado del
  trabajo, archivos relevantes, decisiones y siguiente paso.
  - Formato de archivo: `001_AAAA-MM-DD_tema.md` (número secuencial + fecha).
  - Fuente oficial de verdad del estado: `docs/ESTADO_PROYECTO.md` (este README y
    los handoffs complementan, no reemplazan ese documento).
- **Journals** (`journals/`): entradas cortas de **hallazgos, decisiones y
  descubrimientos técnicos** del proyecto (p. ej. "la API GraphQL de Revolico",
  "el venv ya no existe", "más datos estabilizan la CV del modelo M2").
  - Formato de archivo: `001_AAAA-MM-DD_tema.md`.
- Todos los archivos en **Markdown**, en español, con fecha y referencia a los
  archivos del proyecto implicados.

## Uso

- Al terminar una sesión: escribir un handoff en `handoffs/` **obligatorio** y
  actualizar `docs/ESTADO_PROYECTO.md`.
- Al descubrir algo relevante: escribir un journal en `journals/` (o usar la
  herramienta de journal de OpenCode y volcar la entrada aquí).
- Numerar siempre por orden de creación para mantener el orden cronológico y
  actualizar `INDICE.md` después de cada entrada.