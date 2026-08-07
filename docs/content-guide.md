# Guía de contenido

## Tono

Argentino, cercano, familiar, simple. Se escribe como habla la familia que atiende las mesas, no como una agencia de marketing.

- Frases cortas, directas.
- Segunda persona ("vos"), nunca "usted" ni un "tú" ajeno al habla rioplatense.
- Cero jerga corporativa ("brindamos", "soluciones", "experiencia gastronómica integral").

## Evitar

- Superlativos sin respaldo: "la mejor pasta de Argentina", "el mejor restaurante de Burzaco". Si no hay un dato o reconocimiento real detrás, no se afirma.
- Italiano artificial o forzado ("Buonissimo!", "Mamma mia"). La identidad es **familia italiana + bodegón argentino**, no una caricatura de trattoria.
- Inventar datos comerciales o históricos que puedan confundirse con información definitiva: horarios, precios exactos, cantidad de personas para eventos, cifras de años de trayectoria no confirmadas, testimonios de clientes.

## Precios

- Si un precio no está confirmado, usar `null` en el DTO (`ProductDto.price`) → la UI muestra "Consultar" (`formatPrice` en `src/lib/format.ts`).
- No completar con valores inventados "para que se vea completo".

## Historia

- Usar siempre "desde 1999" para la fábrica.
- No mezclar la fecha del restaurante (2012, según cartelería física) sin aclarar que corresponde a una etapa distinta — ver `docs/brand.md`.
- No agregar hitos, anécdotas o nombres de familiares que no hayan sido confirmados por el negocio.

## Llamados a la acción

Preferir verbos concretos y cercanos:

- "Ver la carta" en vez de "Descubrí nuestra propuesta gastronómica".
- "Pedir presupuesto" en vez de "Solicitá tu cotización personalizada".
- "Consultar por WhatsApp" en vez de "Contactanos a través de nuestros canales".

## Ejemplos de frases de marca

Usar como dirección, no repetir todas juntas en la misma página:

- "Sentate a nuestra mesa."
- "Elegí tus pastas."
- "Nosotros cocinamos, vos disfrutá."
- "Pasta, familia y tradición."
- "Hecho como antes."
