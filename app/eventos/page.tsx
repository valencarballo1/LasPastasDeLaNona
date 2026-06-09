import { Footer } from "../../src/components/footer/Footer";
import { BootstrapIcon } from "../../src/components/icons/BootstrapIcon";
import { PageHeader } from "../../src/components/PageHeader";
import { services } from "../../src/components/services/services.content";
import { SectionTitle } from "../../src/components/shared/SectionTitle";
import { buildWhatsAppUrl } from "../../src/data/local-info";

const processSteps = [
  "Nos contás fecha, lugar, horario estimado y cantidad de personas.",
  "Te recomendamos el servicio y las cantidades según el tipo de evento.",
  "Coordinamos sabores, adicionales, traslado y forma de reserva.",
  "Llegamos el día del evento con todo listo para servir y disfrutar.",
];

export default function EventsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Eventos"
        title="Pizza party y pasta party a domicilio"
        subtitle="Llevamos la cocina de la Nona a cumpleaños, reuniones familiares y eventos empresariales, con una propuesta clara y atención cercana."
      />

      <section className="contentSection">
        <SectionTitle
          eyebrow="Servicios"
          title="Elegí el formato ideal para tu evento"
          subtitle="Cada servicio resume qué incluye, precio de referencia y próximos pasos para pedir disponibilidad por WhatsApp."
        />
        <div className="serviceGrid">
          {services.map((service) => (
            <article className="serviceCard serviceCard--expanded" key={service.title}>
              <div className="serviceCard__top">
                <span aria-hidden="true">{service.badge}</span>
                <p>{service.price}</p>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <a href={buildWhatsAppUrl(`Hola, quiero consultar disponibilidad para ${service.title}.`)} target="_blank" rel="noreferrer">
                Consultar disponibilidad
                <BootstrapIcon name="whatsapp" className="buttonIcon" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="contentSection contentSection--cream">
        <SectionTitle
          eyebrow="Cómo contratar"
          title="Proceso simple para coordinar tu fecha"
          subtitle="La página guía al usuario paso a paso para reducir dudas antes de escribir y acelerar la consulta comercial."
        />
        <ol className="processList">
          {processSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <Footer />
    </main>
  );
}
