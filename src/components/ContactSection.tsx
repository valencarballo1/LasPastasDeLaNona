import { buildWhatsAppUrl, localInfo } from "../data/local-info";

const contactCards = [
  { title: "Dirección", text: localInfo.address, href: localInfo.mapUrl, label: "Abrir mapa" },
  { title: "Horarios", text: localInfo.hours.join(" · "), href: "/reservas", label: "Reservar mesa" },
  { title: "WhatsApp", text: localInfo.whatsappLabel, href: buildWhatsAppUrl("Hola, quiero hacer una consulta para Las Pastas de la Nona."), label: "Escribir" },
];

export function ContactSection() {
  return (
    <section className="contentSection contactSection" id="contacto">
      <div className="contactSection__copy">
        <p className="eyebrow">Visitá la casa de la Nona</p>
        <h2>Datos claros para llegar, pedir o reservar sin vueltas</h2>
        <p>
          Usamos placeholders visibles para que puedas reemplazarlos por los datos reales del local cuando los tengas listos.
        </p>
      </div>
      <div className="contactCards">
        {contactCards.map((card) => (
          <article className="contactCard" key={card.title}>
            <span>{card.title}</span>
            <strong>{card.text}</strong>
            <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noreferrer" : undefined}>
              {card.label}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
