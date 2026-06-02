import { BootstrapIcon } from "./icons/BootstrapIcon";

const whatsappMessage = encodeURIComponent(
  "Hola, quiero hacer una consulta para Las Pastas de la Nona."
);

export function FloatingWhatsApp() {
  return (
    <a
      className="floatingWhatsApp"
      href={`https://wa.me/5491123456789?text=${whatsappMessage}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Consultar por WhatsApp"
    >
      <BootstrapIcon name="whatsapp" className="whatsAppIcon" />
      WhatsApp
    </a>
  );
}
