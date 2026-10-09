# Encuesta — Mercado automotriz en La Habana

Encuesta **anónima** para un proyecto universitario de Ciencia de Datos.
Objetivo: conocer percepciones y comportamientos sobre la compra-venta de autos.
Toma menos de 2 minutos. Marca una sola opción por pregunta salvo que se indique.

---

**1. ¿Cuál es tu perfil?**
- ( ) Estudiante universitario
- ( ) Trabajador por cuenta propia
- ( ) Taxista / motorista
- ( ) Dueño de carro (no taxista)
- ( ) Otro

**2. ¿Tienes carro?**
- ( ) Sí
- ( ) No

**3. ¿Has comprado o vendido un carro alguna vez?**
- ( ) Nunca
- ( ) Solo he comprado
- ( ) Solo he vendido
- ( ) Ambos

**4. ¿Qué marca prefieres?** (escribe) ___________________

**5. ¿Cuánto pagarías por un carro?**
- ( ) Menos de 5 000 USD
- ( ) 5 000 – 10 000 USD
- ( ) 10 000 – 25 000 USD
- ( ) Más de 25 000 USD

**6. ¿Qué prefieres como carro?**
- ( ) Clásico nacional (Lada, Moskvich, Alfa…)
- ( ) Moderno importado (Hyundai, Toyota, Kia…)
- ( ) Eléctrico
- ( ) Indiferente

**7. ¿Cómo ves los precios de los autos hoy?**
- ( ) Suben
- ( ) Están igual
- ( ) Bajan

**8. ¿Comprarías un carro ahora mismo?**
- ( ) Sí
- ( ) No
- ( ) Depende del precio

**9. ¿Con qué preferirías pagar?**
- ( ) Efectivo en USD
- ( ) Transferencia / depósito
- ( ) MLC
- ( ) Otro

**10. ¿Cuánto crees que tarda en venderse un carro?**
- ( ) Menos de 1 mes
- ( ) 1 – 3 meses
- ( ) 3 – 6 meses
- ( ) Más de 6 meses
- ( ) No sé

---

*Gracias por tu tiempo. Las respuestas se usarán únicamente con fines académicos.*

## Instrucciones para quien aplica

1. **Dónde**: mercados informales, paradas de taxis, universidad, WhatsApp (si hay datos).
2. **Cómo**: leerla tú y marcar las respuestas (más rápido que entregar papel y esperar).
3. **Meta**: 30+ respuestas; al final del día pasar todo a `data/raw/encuestas.csv`.
4. Si alguien duda: "Es anónimo, solo para un proyecto de la universidad."
5. `marca_preferida` es respuesta abierta: normaliza luego (lada/toyota/hyundai…)
   en la Fase 4. Las demás son de opción múltiple: usa los valores exactos de la
   plantilla para que la limpieza sea trivial.