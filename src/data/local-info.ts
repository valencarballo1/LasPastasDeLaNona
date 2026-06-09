export const localInfo = {
  name: "Las Pastas de la Nona",
  whatsappNumber: "5491123456789",
  whatsappLabel: "+54 9 11 2345-6789",
  phoneLabel: "11 2345-6789",
  address: "Av. Ejemplo 1234, Burzaco, Buenos Aires",
  hours: ["Mar. a dom. de 11:30 a 15:30", "Vie. y sáb. de 20:00 a 00:00"],
  instagram: "@laspastasdelanona",
  facebook: "Las Pastas de la Nona",
  mapUrl: "https://maps.google.com/?q=Las%20Pastas%20de%20la%20Nona%20Burzaco",
};

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${localInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
