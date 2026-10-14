# Handoff 008 — Cambio de preguntas de investigación

> **Traspaso a la sesión** `ses_ec70f4e50ffeP6HIgxjU51UIHo`
> (*Cambio_preguntas*). Sesión de origen:
> `ses_ed617d618ffeZLBDGKATaObiaK` (*Reorganización 7 etapas + 9 preguntas*).
> Fecha: 2026-10-14.
> Metadata del handoff: `handoff/ses_ed617d618ffeZLBDGKATaObiaK` (fork-local, en cola).
> Objetivo del traspaso: **cambiar/revisar las preguntas de investigación** del proyecto.

## Objetivo de la sesión destino

Revisar y actualizar el set de **preguntas de investigación** tomando como fuente
viva `D:\Dany\Ciencia_de_Datos\Introducción a Ciencia de Datos\Preguntas_Analizar.txt`,
y propagar el cambio a la documentación que las refleja.

## Estado heredado (verificado)

- Proyecto reorganizado en **7 etapas**; rama `reorg-7-etapas`, árbol limpio.
  Último commit: `9a8a6` (*Subiendo audios de las entrevistas, faltan por procesar*).
- **Fuente única y viva de preguntas:** `docs/preguntas_investigacion.md`
  (9 preguntas con fuente de datos, variables, análisis y estado).
- Respondibles con datos actuales: **1–5, 7, 8**. Requieren captura nueva:
  **6** (comercializadoras, formal vs informal) y **9** (entrevistas, eléctrico vs combustión).
- Capturas en curso: anuncios (verificados), comercializadoras (catálogos donde
  había precios públicos), entrevistas (audios sin transcribir/estructurar).

## Acuerdo pendiente de implementar (de la sesión de origen)

En la sesión de origen se acordó con el usuario **reescribir `README.md`** con:
- **3 objetivos de recolección:** anuncios de internet, información de las
  comercializadoras, entrevistas a personas naturales.
- **9 preguntas de investigación** (tabla), estructura del proyecto y las **7 etapas
  (01–07)** en español; estado de capturas **cualitativo** (sin cifras, remitiendo a los CSV/docs).
- Esa edición quedó **sin aplicar** (se discutió en modo Plan). Retomarla si aplica.

## Archivos relevantes

- `docs/preguntas_investigacion.md` — fuente única y viva (actualizar aquí primero).
- `docs/fuentes.md`, `docs/diccionario_datos.md`, `docs/ESTADO_PROYECTO.md`.
- `README.md` — pendiente de actualizar (ver acuerdo arriba).
- `notebooks/02_preguntas.ipynb` — análisis de las 9 preguntas.
- `opencode/INDICE.md` — registro de entrada.

## Decisiones / restricciones (no reabrir)

- **No inventar datos.** Q6/Q9 dependen de capturas nuevas.
- Criterio **clásico `< 2000`, moderno `>= 2000`** (bloqueado).
- **Q1** se documenta como **proxy de anuncios** (no redes sociales).

## Siguiente paso

1. Revisar la fuente viva `...\Preguntas_Analizar.txt`.
2. Actualizar `docs/preguntas_investigacion.md` con el set final de preguntas.
3. Propagar el cambio a `README.md`, `notebooks/02_preguntas.ipynb` y `comunicacion/`.

## Nota de registro

Handoff registrado en la bitácora del proyecto a pedido del usuario, 2026-10-14.
