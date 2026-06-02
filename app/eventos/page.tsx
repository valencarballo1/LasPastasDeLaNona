import { Footer } from "../../src/components/footer/Footer";
import { BootstrapIcon } from "../../src/components/icons/BootstrapIcon";
import { PageHeader } from "../../src/components/PageHeader";
import { services } from "../../src/components/services/services.content";
import { SectionTitle } from "../../src/components/shared/SectionTitle";

const processSteps = ["Nos contás fecha, lugar y cantidad de personas", "Armamos la propuesta según el servicio elegido", "Coordinamos detalles finales y reserva del evento"];

export default function EventsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Eventos"
        title="Pizza party y pasta party"
        subtitle="Una vista para explicar qué incluye cada servicio, sumar condiciones, precios y llamados a contratación."
      />

      <section className="contentSection">
        <SectionTitle
          eyebrow="Servicios"
          title="Llevamos la cocina de la Nona a tu evento"
          subtitle="Cada tarjeta puede crecer con más detalle, imágenes, adicionales y condiciones comerciales."
        />
        <div className="serviceGrid">
          {services.map((service) => (
            <article className="serviceCard serviceCard--expanded" key={service.title}>
              <div className="serviceCard__top">
                <span aria-hidden="true">{service.icon}</span>
                <p>{service.price}</p>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <a href="https://wa.me/5491123456789" target="_blank" rel="noreferrer">
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
          subtitle="Por ahora es frontend: cuando conectemos el backend se puede convertir en solicitud formal con estado y seguimiento."
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
