# Handoff 003 — Reorganizando el proyecto

> **Sesión destino:** `ses_ed62e5417ffeZWZhgQzACb4s5L` — nombre **"Reorganizando el
> proyecto"** (arrancada con `start: true`).
> Sesión de origen: `ses_f3a69397dffeGusRm7zPXMha76`. Fecha: 2026-10-11.

## Objetivo de la sesión destino

**Reorganizar el proyecto** `D:\Dany\ProyectoCD` (Mercado Automotriz de La Habana):
revisar y mejorar la organización de **carpetas, documentación y bitácora**
(`notebooks/`, `data/`, `scripts/`, `reports/`, `docs/`, `opencode/`) **sin romper el
pipeline de datos ni los resultados ya validados** (Fases 0–6).

Recomendación para esa sesión: **proponer el plan de reorganización y confirmarlo
con el usuario antes de mover/renombrar archivos**, porque el pipeline y las rutas
están referenciadas en notebooks y documentación.

## Estado heredado (verificado)

- **Proyecto (Fases 0–6): ✅ completo.** Informe final en
  `notebooks/03_informe_final.ipynb`; resultados en `docs/ESTADO_PROYECTO.md`.
- **Handoff corregido (2026-10-11):** OpenCode actualizado **2.0.6 → 2.0.26** y
  caché del plugin `@hadronomy/opencode-handoff-plugin` re-resuelto. Detalle en
  `opencode/journals/003_2026-10-11_fix_handoff_opencode_2.0.26.md`.
- **Pendiente opcional del proyecto:** exportar `03_informe_final.ipynb` a HTML/PDF.

## Estructura actual conocida

```
ProyectoCD/
├── data/            (raw / processed: mercado_havana.csv 600 filas, regresion_dataset.csv 247)
├── notebooks/       (01_eda.ipynb, 02_modelo_precios.ipynb, 03_informe_final.ipynb)
├── scripts/         (scrapers y utilidades)
├── reports/         (fig_01..fig_10 + tablas CSV)
├── docs/            (ESTADO_PROYECTO.md, esquema_datos.md, guia_campo.md, instrumentos/)
├── opencode/        (README.md, INDICE.md, handoffs/, journals/)  ← bitácora obligatoria
└── README.md
```

## Archivos clave

- `opencode/INDICE.md` — registro **obligatorio** de handoffs y journals (regla permanente).
- `docs/ESTADO_PROYECTO.md` — estado verificado y decisiones del proyecto.
- `opencode/README.md` — convención de la bitácora.

## Decisiones heredadas (no romper)

- `anio = 0` para años faltantes (no se eliminan filas); tasa fija **710 CUP/USD**.
- Pipeline sin data leakage: split 75/25 seed 42 → OHE solo en train → CV 5-fold.
- Scraper sin teléfonos/datos de contacto (ética).
- Toda entrada nueva de bitácora se registra en `opencode/` y se actualiza `INDICE.md`.

## Siguiente paso (sesión destino)

1. Leer `docs/ESTADO_PROYECTO.md`, `opencode/INDICE.md` y `README.md`.
2. Inventariar la estructura real de carpetas y detectar rutas codificadas en notebooks/scripts.
3. Proponer un plan de reorganización (qué se mueve, a dónde, con qué referencias a actualizar)
   y **confirmarlo con el usuario** antes de ejecutar.
- Entorno: `python` no funciona → usar **`py`**; recrear `.venv` con `py -m venv .venv` si
  hay que re-ejecutar notebooks.
