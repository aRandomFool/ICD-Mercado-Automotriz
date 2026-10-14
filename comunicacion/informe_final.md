# Informe Final - Proyecto CD

> Proyecto: Mercado automotriz en La Habana  
> Fases 0-6 completadas según lo validado. Este documento corresponde a la Etapa 07 (Comunicar).

## Resumen

- Datos: 600 anuncios únicos de Revolico (La Habana), muestra ampliada con respaldo histórico en `data/raw/clasificados/revolico/respaldo_150_2026-09-24/`.
- Hallazgos clave (EDA validado): mediana 19 500 USD, 94% anuncios con año > 2010, +716 USD/año (r=0.30). 
- Modelo de precios: estabilizado con mayor n; año y marca aportan señal; limitaciones por variables ausentes (km, estado, combustible).

Ver notebooks en `notebooks/historico/` (01_eda, 02_modelo_precios, 03_informe_final) y análisis nuevo en `notebooks/02_preguntas.ipynb` (estructura). 

## Preguntas (resumen)

1-5,7,8 respondibles con datos existentes. 6 (formal vs informal) y 9 (costo de mantener un auto, vía entrevistas) requieren capturas nuevas (comercializadoras/entrevistas). 

Detalles: `docs/preguntas_investigacion.md`.

## Conclusiones

- Mercado mayormente moderno; precio explicado parcialmente por año+marca.
- Limitaciones declaradas (tamaño relativo, sesgo de fuente, variables ausentes). No se inventaron datos.

## Referencias

- Fuentes: `docs/fuentes.md`
- Diccionario: `docs/diccionario_datos.md`
- Estado: `docs/ESTADO_PROYECTO.md`