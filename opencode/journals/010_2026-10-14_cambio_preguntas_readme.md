# Journal 010 — Cambio de preguntas (Q2 y Q9) + README actualizado a 7 etapas

**Fecha:** 2026-10-14
**Etapa:** 05 (Analizar) — definición de preguntas
**Tags:** preguntas, q2, q9, readme, 7-etapas, documentacion

## Contexto

Retomando el handoff 008 (*Cambio de preguntas de investigación*), el usuario pidió
dos cambios en el set de preguntas y actualizar el `README.md` con las fases y
rutas nuevas (7 etapas). Decisión del usuario: Q2 usa **media aritmética** y de Q9
**solo se cambia el enunciado** (los instrumentos se actualizan en otro momento).

## Cambios aplicados

### Q2 — de mediana a promedio
- `docs/preguntas_investigacion.md`: enunciado → *"¿Cuál es el promedio de precios
  por marca?"* y análisis → *"Promedio (media aritmética) de `precio_usd` por marca"*.
- `notebooks/02_preguntas.ipynb`: cabecera *"Q2: Promedio de precios por marca"* y
  código `.mean()` (Q4 se mantiene con `.median()`, que es su métrica propia).
- `D:\Dany\Ciencia_de_Datos\ICD\Preguntas_Analizar.txt`: enunciado 2 actualizado.

### Q9 — nuevo enunciado
- Anterior: *"¿Cuáles son los factores que influyen en la decisión de comprar un
  auto eléctrico vs combustión?"*
- Nuevo: *"¿Cuál es el costo de mantener un auto en la actualidad?"* (se responde
  con las **entrevistas**).
- Actualizado en `docs/preguntas_investigacion.md`, `notebooks/02_preguntas.ipynb`,
  `comunicacion/presentacion.md`, `comunicacion/informe_final.md` y el `.txt` fuente.
- **No** se tocaron los instrumentos (`docs/instrumentos/`) ni los campos del
  diccionario ligados a eléctrico vs combustión: quedan para una actualización
  posterior de instrumentos (decisión del usuario).

### README.md reescrito
Se reemplazó el README con la estructura real tras la reorganización a 7 etapas:
tres fuentes de recolección, las 9 preguntas, árbol de carpetas actual
(`data/raw/{clasificados,comercializadoras,entrevistas}`, `data/interim/`,
`data/processed/`, `data/tasas_cambio/`, `reports/figuras|tablas/`, `comunicacion/`),
tabla de las 7 etapas (01–07) y estado **cualitativo** de las capturas.
A pedido del usuario, **no** se incluyó un apartado de "Resultados validados".

- `notebooks/00_inicio.ipynb`: se reemplazó el set viejo de 3 preguntas por las 9
  actuales y se actualizó la hoja de ruta a las 7 etapas.
- `docs/preguntas_investigacion.md`: corregido el enlace de la fuente, que apuntaba
  a la ruta antigua (`Introducción a Ciencia de Datos\...`); ahora apunta a
  `D:\Dany\Ciencia_de_Datos\ICD\Preguntas_Analizar.txt`.

## Notas

- El filtro de "solo activos" (etapa 02) deja `data/processed/mercado_havana.csv`
  en **471 filas** y `regresion_dataset.csv` en **233** (no 600/247 como en el
  handoff). El README quedó sin cifras duras por eso; se recalculan cuando se
  pida el apartado de resultados.
- Se mantiene la regla de no inventar datos: Q6 y Q9 siguen pendientes de captura.

## Archivos implicados

- `README.md`, `notebooks/00_inicio.ipynb`, `notebooks/02_preguntas.ipynb`
- `docs/preguntas_investigacion.md`
- `comunicacion/presentacion.md`, `comunicacion/informe_final.md`
- `D:\Dany\Ciencia_de_Datos\ICD\Preguntas_Analizar.txt`
