# Guía de entrevista — mercado informal de autos en La Habana

Entrevista **corta (5–7 minutos)**, anónima, a vendedores y compradores en los
puntos informales de venta. No se lee el guion: se conversa con naturalidad y se
anota luego. No se graba sin permiso. Nunca se registran nombre, teléfono ni placa.

## Cómo pedirla (guion sugerido)

> "Buenos días, soy estudiante de la Universidad de La Habana y estoy haciendo
> un proyecto sobre el mercado de autos. Todo es anónimo y me tomará 5 minutos.
> ¿Le parece si le hago un par de preguntas?"

Si dice que no: "¡Gracias igualmente, que tenga buen día." (No insistas.)

## Preguntas — vendedor

1. **¿Hace cuánto tiempo se dedica a vender autos?** (o ¿hace cuánto vende este?)
2. **¿Cuál es el precio que pide por este carro?** (`precio_pedido`)
3. **¿Cuál fue el precio final acordado en su última venta parecida?** (`precio_acordado`)
4. **¿Cuánto suele bajar en la negociación?** (rango en USD o %)
5. **¿En qué moneda prefiere cobrar y por qué?** (USD / MLC / CUP)
6. **¿Qué papeles se entregan?** (título / resolución / factura / herencia / ninguno)
   ¿Hay que hacer alguna gestión?
7. **¿Cuánto tarda en venderse un carro promedio aquí?** (`tiempo_venderse_meses`)
8. **¿Por qué está vendiendo este carro?** (`motivo_venta` — qué piensa hacer con el dinero)
9. **¿Cómo ve el mercado ahora: subiendo, bajando o estable?** (`percepcion_mercado`)
10. **¿Qué consejo le daría a alguien que quiere comprar un carro hoy?**

## Preguntas — comprador (variantes)

1. ¿Qué busca comprar y con qué presupuesto?
2. ¿Cómo le han ido las negociaciones: cuánto se baja del precio pedido?
3. ¿Prefiere efectivo o transferencia/MLC? ¿Por qué?
4. ¿Cómo ve los precios: subiendo o bajando?
5. ¿Qué consejo le daría a un comprador primerizo?

## Mientras conversas, anota en papel

- Marca, modelo y año del carro del que hablan (si aplica).
- Precio pedido vs. acordado — **es la perla del proyecto** (brecha oferta/real).
- Moneda y forma de pago.
- Todo lo cualitativo que suene a cita textual de valor (solo ideas, no quien lo dijo).
- Al terminar el día, pasa cada entrevista a `data/raw/entrevistas.csv`.

## Ética

- Anónimo siempre. No grabaciones sin permiso explícito.
- El dato más sensible (precios reales) se agradece con buena conversación, no con presión.
- Las entrevistas son estudios de caso ilustrativos (n≈15–20): úsalas para
  profundidad/explicación, no para estadística inferencial.