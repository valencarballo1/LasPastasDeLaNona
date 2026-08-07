import { siteConfig } from "@/config/site";

/**
 * Arma un link de wa.me con mensaje pre-cargado según el contexto
 * (producto, evento, o consulta general).
 */
export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function whatsAppMessageForProduct(productName: string) {
  return buildWhatsAppUrl(`Hola, quería consultar por ${productName}.`);
}

export function whatsAppMessageForEvents() {
  return buildWhatsAppUrl("Hola, quería consultar por el servicio de Pizza Party / Pasta Party.");
}

export function whatsAppMessageGeneral() {
  return buildWhatsAppUrl("Hola, quería hacer una consulta.");
}
