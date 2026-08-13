/**
 * Configuración estática del sitio. Los valores de contacto son
 * placeholders (TODO) hasta contar con los datos reales del negocio;
 * a futuro deberían leerse desde /admin/configuracion → SettingsDto.
 */
export const siteConfig = {
  name: "Las Pastas de la Nona",
  shortName: "La Nona",
  tagline: "Pasta, familia y tradición.",
  concept: "La mesa de la Nona",
  foundingYear: 1999,
  url: "https://www.laspastasdelanona.com",
  address: {
    street: "Quintana 665",
    city: "Burzaco",
    province: "Buenos Aires",
    country: "Argentina",
    full: "Quintana 665, Burzaco, Buenos Aires, Argentina",
  },
  contact: {
    // TODO: reemplazar por el número real del negocio.
    whatsappNumber: "5491100000000",
    whatsappLabel: "A confirmar",
    // TODO: reemplazar por el usuario real de Instagram.
    instagramUrl: "https://instagram.com/laspastasdelanona",
    instagramHandle: "@laspastasdelanona",
  },
  maps: {
    // TODO: reemplazar por la URL real de Google Maps del local.
    embedUrl:
      "https://www.google.com/maps?q=Quintana+665,+Burzaco,+Buenos+Aires&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Quintana+665,+Burzaco,+Buenos+Aires",
  },
  /**
   * Video de presentación del local, alojado en Cloudinary.
   * El asset original es .mov (QuickTime), formato que Chrome y Firefox no
   * reproducen de forma confiable: se entrega como .mp4 aprovechando la
   * transcodificación al vuelo de Cloudinary (`f_auto,q_auto` elige formato
   * y compresión según el navegador). El póster es el primer frame del mismo
   * asset (`so_0`), así no hace falta subir una imagen aparte.
   */
  video: {
    cloudName: "dbciaqldq",
    publicId: "LaNonaVideo_qpdar1",
    src: "https://res.cloudinary.com/dbciaqldq/video/upload/f_auto,q_auto/LaNonaVideo_qpdar1.mp4",
    poster: "https://res.cloudinary.com/dbciaqldq/video/upload/so_0,f_auto,q_auto,w_1280/LaNonaVideo_qpdar1.jpg",
  },
} as const;
