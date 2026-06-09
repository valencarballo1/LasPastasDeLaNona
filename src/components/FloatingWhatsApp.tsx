import { buildWhatsAppUrl } from "../data/local-info";
import { BootstrapIcon } from "./icons/BootstrapIcon";

const whatsappMessage = "Hola, quiero hacer una consulta para Las Pastas de la Nona.";

export function FloatingWhatsApp() {
  return (
    <a
      className="floatingWhatsApp"
      href={buildWhatsAppUrl(whatsappMessage)}
      target="_blank"
      rel="noreferrer"
      aria-label="Consultar por WhatsApp"
    >
      <BootstrapIcon name="whatsapp" className="whatsAppIcon" />
      WhatsApp
    </a>
  );
}
