# Journal 014 — Reporte técnico 2.0: Q1–Q9 completas y reproducible

**Fecha:** 2026-11-05  
**Tipo:** documentación / análisis  
**Referencias:** `notebooks/reporte_completo_mercado_automotriz.ipynb`,
`data/interim/anuncios_analisis.csv`, `data/processed/comercializadoras.csv`,
`data/raw/entrevistas/Entrevistas.txt`.

## Qué cambió

El reporte anterior era un borrador de 43 celdas: no tenía resumen, método
reproducible, tablas con `n`, referencias ni anexos, y decía que Q9 estaba
“bloqueada” porque no había transcripciones. Ese estado ya no era cierto:
`Entrevistas.txt` contiene **30 entrevistas procesadas**.

Se reconstruyó como reporte técnico de 36 celdas (23 markdown + 13 código),
ejecutado de principio a fin:

- Portada, resumen, palabras clave, índice.
- Introducción con objetivos y las 9 preguntas.
- Marco conceptual y definiciones operativas.
- Datos y métodos: fuentes, captura, verificación (3.958 URLs), reglas de
  inclusión/exclusión, variables, métodos, reproducibilidad y ética.
- Control de calidad con la tabla de exclusiones y la decisión 2.703 vs 2.015.
- Resultados Q1–Q9 con tablas, figuras numeradas y `n`:
  - Q1 Hyundai 872 (24,5%).
  - Q2 medianas por marca (5.500–46.000 USD con n≥30).
  - Q3 Spearman ρ=0,65; OLS 583 USD/año vs Theil-Sen 1.417; medianas por década.
  - Q4 BMW 46.000 (n=33); Foton 50.000 con n=10 marcada como no comparable.
  - Q5 69 clásicos / 1.752 modernos; 1.745 sin año.
  - Q6 brecha 10.699 USD; solo Dongfeng y Foton comparables.
  - Q7 Playa 1.002 (28,1%).
  - Q8 13.000–28.000 USD con n≥30; Kruskal-Wallis H=146,3.
  - Q9 30 entrevistas: 200–3.000 USD/año; cobertura y límites.
- Discusión, limitaciones (12 filas), conclusiones Q1–Q9, referencias y anexos
  (diccionario, scripts, instrumento, verificación, tabla completa de entrevistas).
- Cada tabla y figura lleva número, título, fuente y `n`.

## Decisiones

- **Mediana por defecto** y media recortada al 10% como robustez (se corrigió la
  afirmación previa de que la recortada era la medida principal).
- **Base 2.703** (precios válidos) y se declara la base activa 2.015 (misma
  mediana: 22.000).
- **Q9 respondida** con las 30 entrevistas; se mantiene la cautela de muestra de
  conveniencia y no se generaliza.
- Se usan las **figuras corregidas** de `web/img/` (03, 04 y 07), no las versiones
  antiguas con la etiqueta Ford o el ranking de entidades.

## Verificación

`jupyter nbconvert --execute --inplace` completó sin errores; 0 excepciones y
0 salidas `stderr`. El notebook pesa ~1,6 MB con las imágenes embebidas.

## Pendientes

- Exportar a HTML/PDF si se entrega fuera de Jupyter.
- Revisar el nombre del autor en la portada.
- Actualizar `docs/ESTADO_PROYECTO.md` (hecho solo con una nota de contexto).
