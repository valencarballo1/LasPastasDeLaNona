# Marca — Las Pastas de la Nona

## Concepto

**"La mesa de la Nona"** — la comida como punto de encuentro de familia, amigos y generaciones.

## Personalidad

Familiar · Cálida · Artesanal · Generosa · Tradicional · Argentina · Italiana · De barrio.

La web debe sentirse como **entrar al restaurante**: bodegón + trattoria + casa de la abuela, reinterpretado con un frontend contemporáneo. No debe parecer una startup, una plantilla genérica de restaurante ni una web fría y minimalista.

## Historia

- La fábrica de pastas nació en **1999** como proyecto familiar.
- El material gráfico físico del local (cartelería) indica "Desde 2012" — corresponde a la apertura del **restaurante**, una etapa posterior a la fábrica.
- La web usa "Una historia familiar desde 1999" como concepto principal, y mantiene la línea de tiempo (`src/mocks/timeline.mock.ts`) preparada para diferenciar ambos hitos sin inventar información adicional.

## Colores

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-carbon` | `#181715` | Fondos oscuros, navbar con scroll |
| `--color-black` | `#101010` | Footer, cartelería |
| `--color-cream` | `#F2E8D8` | Fondos claros secundarios |
| `--color-warm-white` | `#FAF6EF` | Fondo principal |
| `--color-red` | `#A62924` | Acento principal (inspirado en el mantel) |
| `--color-red-dark` | `#781D19` | Hover / estados activos del rojo |
| `--color-wood` | `#68452F` | Detalles cálidos, madera |
| `--color-gold` | `#C19A63` | Detalles ornamentales, eyebrows |
| `--color-muted` | `#8C8175` | Texto secundario |

Definidos como design tokens de Tailwind v4 en `src/app/globals.css` (`@theme`).

## Tipografías

- **Display / titulares**: Playfair Display (`--font-display`) — personalidad editorial e italiana.
- **Texto / UI**: Manrope (`--font-ui`) — legibilidad alta, tono contemporáneo.

Cargadas con `next/font/google` en `src/app/layout.tsx`.

## Identidad gráfica

- `pattern-mantel` — patrón de cuadros rojo, como detalle puntual (nunca de fondo permanente).
- `texture-brick` / `texture-paper` — texturas sutiles inspiradas en el ladrillo visto y el papel/harina.
- `OrnamentDivider` — divisor con espiga de trigo, inspirado en el isologo del local.
- Cartelería oscura (`bg-carbon` / `bg-black`) para héroes y bloques especiales.

## Fotografía

Siempre: cálida, real, humana, gastronómica, ligeramente editorial.
Evitar: fotografía corporativa, fondos artificiales, stock demasiado perfecto.

Mientras no hay fotos reales cargadas, `PhotoFrame` (`src/components/ui/PhotoFrame.tsx`) muestra un placeholder de marca en vez de romper el layout o usar stock genérico.

## Video

El recorrido por el local vive en Cloudinary y se reproduce a demanda en la Home (`VideoSection`), no como fondo del hero: el contenido del video —el salón y los platos— se pierde detrás del overlay oscuro y el recorte a pantalla completa, y cargarlo de entrada penaliza el LCP en celulares, que es de donde llega la mayoría del tráfico.

El asset original es `.mov`; se entrega como `.mp4` mediante la transcodificación al vuelo de Cloudinary, porque QuickTime no se reproduce de forma confiable fuera de Safari. Las URLs están en `siteConfig.video` (`src/config/site.ts`).

## Tono de comunicación

Hablar como una familia que invita a comer, no como una empresa.

**No:** "Brindamos soluciones gastronómicas integrales."
**Sí:** "Sentate a nuestra mesa." · "Elegí tus pastas." · "Nosotros cocinamos, vos disfrutá."

Frases de dirección conceptual (usar como inspiración, no todas juntas):

- "Hay sabores que te hacen volver a casa."
- "Pasta, familia y tradición."
- "Desde 1999 compartiendo nuestra mesa."
- "Hecho como antes."
- "De nuestra fábrica a tu mesa."
