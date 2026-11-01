# 📇 Índice de handoffs y journals — proyecto Mercado Automotriz de La Habana

Registro central de TODOS los handoffs y journals del proyecto. Convención y
regla permanente: ver `README.md`.

## Handoffs (`handoffs/`)

| # | Fecha | Archivo | Tema |
|---|-------|---------|------|
| 001 | 2026-10-11 | `001_2026-10-11_estado_proyecto.md` | Estado completo del proyecto (Fases 0–6 ✅, pendientes, nota venv) |
| 002 | 2026-10-11 | `002_2026-10-11_fix_handoff_sesion.md` | Traspaso a sesión nueva (`ses_ed63e010…`) tras corregir el handoff |
| 003 | 2026-10-11 | `003_2026-10-11_reorganizando_el_proyecto.md` | Traspaso a la sesión "Reorganizando el proyecto" (`ses_ed62e541…`) |
| 004 | 2026-10-11 | `004_2026-10-11_reorganizacion_7_etapas.md` | **Ejecutar** la reorganización a 7 etapas + análisis de las 9 preguntas |
| 005 | 2026-10-11 | `005_2026-10-11_catalogos_comercializadoras.md` | Catálogos de comercializadoras implementado (BDC ONE, Dongfeng) + fixes pendientes |
| 006 | 2026-10-11 | `006_2026-10-11_verificacion_anuncios_revolico.md` | Verificación de anuncios Revolico (83 despublicados, 45 eliminados, 1 expirado) + implementación del verificador |
| 007 | 2026-10-11 | `007_2026-10-11_reverificacion_comercializadoras.md` | Re-verificación `.cu` (4 vías) + catálogo real de MCV extraído (426 productos) |
| 008 | 2026-10-14 | `008_2026-10-14_cambio_preguntas.md` | Cambio/revisión de las preguntas de investigación (`ses_ec70f4e50…`) |
| 009 | 2026-10-28 | `009_2026-10-28_implementar_handoff.md` | Implementar y registrar `/handoff` siguiendo pautas del proyecto |

## Journals (`journals/`)

| # | Fecha | Archivo | Tema |
|---|-------|---------|------|
| 001 | 2026-10-11 | `001_2026-10-11_ampliacion_datos.md` | Ampliación 150→600: se estabilizan métricas, el techo es de variables |
| 002 | 2026-10-11 | `002_2026-10-11_api_graphql_revolico.md` | Descubrimiento de la API GraphQL de Revolico (lección de scraping) |
| 003 | 2026-10-11 | `003_2026-10-11_fix_handoff_opencode_2.0.26.md` | Corrección del fallo de handoff (OpenCode 2.0.6 → 2.0.26, recarga del plugin) |
| 004 | 2026-10-11 | `004_2026-10-11_handoff_idle_schema.md` | El mensaje `idle` de OpenCode 2.0.26 rompe el schema del plugin (parche local) |
| 005 | 2026-10-11 | `005_2026-10-11_reorg_7_etapas_ejecutado.md` | Reorganización a 7 etapas ejecutada (commits d511a, 26098) |
| 006 | 2026-10-11 | `006_2026-10-11_catalogos_comercializadoras.md` | Verificación de webs + catálogos (BDC ONE, Dongfeng) y JS-inversa pymesbulevar |
| 007 | 2026-10-11 | `007_2026-10-11_handoff_revisar_url.md` | Handoff en cola + sesión renombrada a "Revisar URL scrapping" |
| 008 | 2026-10-11 | `008_2026-10-11_verificacion_anuncios_revolico.md` | Verificación en vivo de 600 URLs: 129 no disponibles (21.5%) + verificador implementado |
| 009 | 2026-10-11 | `009_2026-10-11_reverificacion_comercializadoras.md` | Re-verificación `.cu` + catálogo MCV (pymesbulevar) extraído con precios USD |
| 010 | 2026-10-14 | `010_2026-10-14_cambio_preguntas_readme.md` | Cambio de Q2 (promedio) y Q9 (costo de mantener un auto) + README a 7 etapas |
| 011 | 2026-11-01 | `011_2026-11-01_handoff_por_compactacion_de_contexto.md` | Handoff por compactación de contexto OpenCode (continuar plan Q1-Q9) |

---
*Regla: al añadir una entrada, insertar la fila correspondiente al final de su
tabla. La numeración es secuencial por tipo (handoffs 001…, journals 001…).*