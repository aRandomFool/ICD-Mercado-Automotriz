# Journal 001 — Ampliación de datos 150→600: se estabilizan las métricas, pero el techo es de variables, no de muestra

- **Fecha:** 2026-10-11 (hallazgo de la sesión del 2026-09-24)
- **Proyecto:** Mercado Automotriz de La Habana (`D:\Dany\ProyectoCD`)

## Hallazgo

Al ampliar el scraping de Revolico de 150 a 600 anuncios (12 páginas × 50, API
GraphQL) y re-entrenar el modelo de precios (Fase 5), se observó:

- El R² de test en el split 75/25 (seed 42) pasó de **negativo** (−0.94 en M1,
  −0.88 en M2) a **positivo** (+0.04 y +0.03).
- La CV 5-fold de M2 (año+marca) mejoró de **≈ −4.4 a −0.38**: con n=247 las
  primas de marca dejaron de sobreajustar.
- **PERO** la CV sigue negativa en los tres modelos (M1 −0.085, M2 −0.378,
  M3 −0.573) y el RMSE (~19–22k USD) es comparable a la desviación típica de los
  precios (19.5k USD).

## Conclusión

4–5× más datos **estabilizan las métricas** y confirman que el pipeline es
correcto, pero **no sustituyen mejores variables**. La limitación real es que
Revolico no reporta km, estado, combustible ni transmisión (columnas vacías en el
100% de los anuncios). El modelo lineal no supera consistentemente a predecir la
media con los datos disponibles.

## Lección aplicada

- Reportar siempre la **CV**, no solo el split único.
- Distinguir entre «tamaño de muestra» y «variables disponibles» como causas del
  bajo rendimiento.
- Se incorporó a la Discusión del informe final (`03_informe_final.ipynb`, sección 4.4).

## Referencias

- `notebooks/02_modelo_precios.ipynb` (resultados M1–M3, split + CV)
- `notebooks/03_informe_final.ipynb` (sección 4.4 comparación antes/después)
- `docs/ESTADO_PROYECTO.md` (sección 6ter)