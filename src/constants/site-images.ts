/**
 * Catálogo de imágenes de la web ("slots").
 *
 * Este archivo es la única fuente de verdad sobre QUÉ imágenes tiene el
 * sitio y DÓNDE aparece cada una. El panel `/admin/imagenes` se construye
 * a partir de acá, agrupado por sección, para que quien administre sepa
 * exactamente qué está reemplazando.
 *
 * Agregar una imagen nueva a la web = agregar un slot en este catálogo y
 * consumirlo con `<SiteImage />` o con el mapa de `getSiteImageMap()`.
 * No hace falta tocar el backend: la API guarda pares (clave, URL).
 */

export interface SiteImageSlotDefinition {
  key: string;
  /** Nombre visible en el panel. */
  label: string;
  /** Dónde aparece exactamente esta imagen dentro de la web. */
  description: string;
  /** Proporción sugerida, en formato CSS `aspect-ratio` (ej: "16 / 9"). */
  aspect: string;
  /** Medida recomendada, para orientar a quien sube la foto. */
  recommendedSize: string;
  /** Texto alternativo por defecto (accesibilidad y SEO). */
  defaultAlt: string;
  /** Imagen que ya vive en el repo y se usa mientras nadie suba otra. */
  defaultUrl?: string;
}

export interface SiteImageSectionDefinition {
  id: string;
  title: string;
  description: string;
  slots: readonly SiteImageSlotDefinition[];
}

export const siteImageSections = [
  {
    id: "cabecera",
    title: "Cabecera del inicio",
    description: "La primera foto que ve alguien al entrar a la web, detrás del título principal.",
    slots: [
      {
        key: "home.hero",
        label: "Foto de portada",
        description: "Fondo a pantalla completa del inicio, detrás de “Las Pastas de la Nona”.",
        aspect: "16 / 9",
        recommendedSize: "2400 × 1350 px",
        defaultAlt: "Mesa servida en Las Pastas de la Nona, con mantel a cuadros y ambiente cálido",
      },
    ],
  },
  {
    id: "portadas",
    title: "Portadas de las páginas",
    description: "La franja oscura con foto de fondo que encabeza cada página interior.",
    slots: [
      {
        key: "page.carta.header",
        label: "Portada de Carta",
        description: "Encabezado de /carta.",
        aspect: "16 / 9",
        recommendedSize: "2000 × 1125 px",
        defaultAlt: "Plato de pastas caseras servido en el restaurante",
      },
      {
        key: "page.fabrica.header",
        label: "Portada de Fábrica",
        description: "Encabezado de /fabrica.",
        aspect: "16 / 9",
        recommendedSize: "2000 × 1125 px",
        defaultAlt: "Pastas frescas recién elaboradas en la fábrica",
      },
      {
        key: "page.eventos.header",
        label: "Portada de Eventos",
        description: "Encabezado de /eventos.",
        aspect: "16 / 9",
        recommendedSize: "2000 × 1125 px",
        defaultAlt: "Mesa preparada para un evento de La Nona",
      },
      {
        key: "page.nosotros.header",
        label: "Portada de Nuestra historia",
        description: "Encabezado de /nosotros.",
        aspect: "16 / 9",
        recommendedSize: "2000 × 1125 px",
        defaultAlt: "La familia detrás de Las Pastas de la Nona",
      },
      {
        key: "page.contacto.header",
        label: "Portada de Contacto",
        description: "Encabezado de /contacto.",
        aspect: "16 / 9",
        recommendedSize: "2000 × 1125 px",
        defaultAlt: "Frente del local de Las Pastas de la Nona en Burzaco",
      },
    ],
  },
  {
    id: "secciones-inicio",
    title: "Secciones del inicio",
    description: "Las fotos que acompañan a cada bloque de la página de inicio.",
    slots: [
      {
        key: "home.story",
        label: "Nuestra historia",
        description: "Bloque “De nuestra familia a tu mesa”, en el inicio.",
        aspect: "4 / 5",
        recommendedSize: "1200 × 1500 px",
        defaultAlt: "Elaboración artesanal de pastas en la fábrica de La Nona",
      },
      {
        key: "home.worlds.factory",
        label: "Tarjeta “Nuestra fábrica”",
        description: "Una de las dos tarjetas grandes de “Elegí tu experiencia”.",
        aspect: "4 / 5",
        recommendedSize: "1200 × 1500 px",
        defaultAlt: "Vitrina de pastas frescas de la fábrica",
      },
      {
        key: "home.worlds.restaurant",
        label: "Tarjeta “Nuestro restaurante”",
        description: "La otra tarjeta grande de “Elegí tu experiencia”.",
        aspect: "4 / 5",
        recommendedSize: "1200 × 1500 px",
        defaultAlt: "Salón del restaurante con mesas a la espera de comensales",
      },
      {
        key: "home.daily-making",
        label: "Pasta fresca del día",
        description: "Bloque “Pasta fresca hecha todos los días”.",
        aspect: "4 / 5",
        recommendedSize: "1200 × 1500 px",
        defaultAlt: "Manos amasando pasta fresca en la fábrica de La Nona",
      },
      {
        key: "home.events-teaser",
        label: "Franja de eventos",
        description: "Fondo de la franja oscura “La Nona va a tu fiesta”.",
        aspect: "16 / 9",
        recommendedSize: "2000 × 1125 px",
        defaultAlt: "Mesa preparada para un Pizza Party de La Nona",
      },
    ],
  },
  {
    id: "galeria-inicio",
    title: "Galería del inicio",
    description: "Las cinco fotos de “Un vistazo a nuestro local”. La primera se muestra más grande.",
    slots: [
      {
        key: "home.gallery.1",
        label: "Galería 1 (destacada)",
        description: "Ocupa el doble de espacio que el resto.",
        aspect: "1 / 1",
        recommendedSize: "1400 × 1400 px",
        defaultAlt: "Salón del restaurante de Las Pastas de la Nona",
      },
      {
        key: "home.gallery.2",
        label: "Galería 2",
        description: "Segunda foto de la galería del inicio.",
        aspect: "1 / 1",
        recommendedSize: "800 × 800 px",
        defaultAlt: "Mesa con mantel a cuadros y velas encendidas",
      },
      {
        key: "home.gallery.3",
        label: "Galería 3",
        description: "Tercera foto de la galería del inicio.",
        aspect: "1 / 1",
        recommendedSize: "800 × 800 px",
        defaultAlt: "Elaboración artesanal de pasta fresca",
      },
      {
        key: "home.gallery.4",
        label: "Galería 4",
        description: "Cuarta foto de la galería del inicio.",
        aspect: "1 / 1",
        recommendedSize: "800 × 800 px",
        defaultAlt: "Vitrina de la fábrica con productos del día",
      },
      {
        key: "home.gallery.5",
        label: "Galería 5",
        description: "Quinta foto de la galería del inicio.",
        aspect: "1 / 1",
        recommendedSize: "800 × 800 px",
        defaultAlt: "Detalle de la cartelería vintage del local",
      },
    ],
  },
  {
    id: "instagram",
    title: "Instagram del inicio",
    description: "Las seis miniaturas que imitan el feed de Instagram, al final del inicio.",
    slots: [
      {
        key: "home.instagram.1",
        label: "Instagram 1",
        description: "Primera miniatura del feed.",
        aspect: "1 / 1",
        recommendedSize: "600 × 600 px",
        defaultAlt: "Publicación de Instagram de Las Pastas de la Nona",
      },
      {
        key: "home.instagram.2",
        label: "Instagram 2",
        description: "Segunda miniatura del feed.",
        aspect: "1 / 1",
        recommendedSize: "600 × 600 px",
        defaultAlt: "Publicación de Instagram de Las Pastas de la Nona",
      },
      {
        key: "home.instagram.3",
        label: "Instagram 3",
        description: "Tercera miniatura del feed.",
        aspect: "1 / 1",
        recommendedSize: "600 × 600 px",
        defaultAlt: "Publicación de Instagram de Las Pastas de la Nona",
      },
      {
        key: "home.instagram.4",
        label: "Instagram 4",
        description: "Cuarta miniatura del feed.",
        aspect: "1 / 1",
        recommendedSize: "600 × 600 px",
        defaultAlt: "Publicación de Instagram de Las Pastas de la Nona",
      },
      {
        key: "home.instagram.5",
        label: "Instagram 5",
        description: "Quinta miniatura del feed.",
        aspect: "1 / 1",
        recommendedSize: "600 × 600 px",
        defaultAlt: "Publicación de Instagram de Las Pastas de la Nona",
      },
      {
        key: "home.instagram.6",
        label: "Instagram 6",
        description: "Sexta miniatura del feed.",
        aspect: "1 / 1",
        recommendedSize: "600 × 600 px",
        defaultAlt: "Publicación de Instagram de Las Pastas de la Nona",
      },
    ],
  },
  {
    id: "eventos",
    title: "Servicios de eventos",
    description: "Las fotos de las tarjetas de Pizza Party y Pasta Party, en /eventos.",
    slots: [
      {
        key: "events.pizza-party",
        label: "Pizza Party",
        description: "Tarjeta de Pizza Party en /eventos.",
        aspect: "16 / 9",
        recommendedSize: "1200 × 675 px",
        defaultAlt: "Pizzas recién horneadas para un Pizza Party",
      },
      {
        key: "events.pasta-party",
        label: "Pasta Party",
        description: "Tarjeta de Pasta Party en /eventos.",
        aspect: "16 / 9",
        recommendedSize: "1200 × 675 px",
        defaultAlt: "Mesa de pastas servida para un Pasta Party",
      },
    ],
  },
  {
    id: "nuestra-historia",
    title: "Nuestra historia",
    description: "Las fotos de la página /nosotros: la principal y las cinco de la galería familiar.",
    slots: [
      {
        key: "about.main",
        label: "Foto principal",
        description: "Acompaña al texto “De nuestra familia a tu mesa” en /nosotros.",
        aspect: "4 / 5",
        recommendedSize: "1200 × 1500 px",
        defaultAlt: "La familia detrás de Las Pastas de la Nona",
      },
      {
        key: "about.gallery.1",
        label: "Galería familiar 1 (destacada)",
        description: "Ocupa el doble de espacio que el resto.",
        aspect: "1 / 1",
        recommendedSize: "1400 × 1400 px",
        defaultAlt: "Familia fundadora de Las Pastas de la Nona",
      },
      {
        key: "about.gallery.2",
        label: "Galería familiar 2",
        description: "Segunda foto de la galería de /nosotros.",
        aspect: "1 / 1",
        recommendedSize: "800 × 800 px",
        defaultAlt: "Primeros años de la fábrica de pastas",
      },
      {
        key: "about.gallery.3",
        label: "Galería familiar 3",
        description: "Tercera foto de la galería de /nosotros.",
        aspect: "1 / 1",
        recommendedSize: "800 × 800 px",
        defaultAlt: "Evolución del restaurante a lo largo de los años",
      },
      {
        key: "about.gallery.4",
        label: "Galería familiar 4",
        description: "Cuarta foto de la galería de /nosotros.",
        aspect: "1 / 1",
        recommendedSize: "800 × 800 px",
        defaultAlt: "El equipo de La Nona trabajando en la cocina",
      },
      {
        key: "about.gallery.5",
        label: "Galería familiar 5",
        description: "Quinta foto de la galería de /nosotros.",
        aspect: "1 / 1",
        recommendedSize: "800 × 800 px",
        defaultAlt: "Detalle de la cartelería del local",
      },
    ],
  },
  {
    id: "marca",
    title: "Marca",
    description: "El logo que se repite en el encabezado, el pie de página y los buscadores.",
    slots: [
      {
        key: "brand.logo",
        label: "Logo",
        description: "Barra de navegación, pie de página, panel admin y datos estructurados (Google).",
        aspect: "1 / 1",
        recommendedSize: "512 × 512 px, fondo transparente",
        defaultAlt: "Logo de Las Pastas de la Nona",
        defaultUrl: "/images/brand/logo.png",
      },
    ],
  },
] as const satisfies readonly SiteImageSectionDefinition[];

export type SiteImageKey = (typeof siteImageSections)[number]["slots"][number]["key"];

/** Slot del catálogo con su clave ya acotada a las del catálogo. */
export type SiteImageSlot = SiteImageSlotDefinition & { key: SiteImageKey };

/** Todos los slots del catálogo, sin agrupar. */
export const siteImageSlots = siteImageSections.flatMap<SiteImageSlot>((section) => [...section.slots]);

export const siteImageKeys = siteImageSlots.map((slot) => slot.key);

export function getSiteImageSlot(key: SiteImageKey): SiteImageSlot {
  const slot = siteImageSlots.find((item) => item.key === key);
  if (!slot) throw new Error(`No existe el slot de imagen "${key}" en el catálogo`);
  return slot;
}

export function isSiteImageKey(value: string): value is SiteImageKey {
  return siteImageSlots.some((slot) => slot.key === value);
}
