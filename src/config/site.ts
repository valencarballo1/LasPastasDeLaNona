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
  video: {
    // Video institucional alojado en Cloudinary.
    embedUrl:
      "https://player.cloudinary.com/embed/?cloud_name=dbciaqldq&public_id=LaNonaVideo_qpdar1",
  },
} as const;
