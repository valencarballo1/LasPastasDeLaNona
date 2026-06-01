import { services } from "../data/site-content";
import { SectionTitle } from "./SectionTitle";

export function Services() {
  return (
    <section className="contentSection" id="eventos">
      <SectionTitle
        eyebrow="Servicios para eventos"
        title="Pizza party y pasta party con diseño moderno"
        subtitle="Cada servicio tiene su propia información para que puedas actualizar precios, detalles y condiciones de forma independiente."
      />
      <div className="serviceGrid">
        {services.map((service) => (
          <article className="serviceCard" key={service.title}>
            <div className="serviceCard__top">
              <span>{service.title === "Pasta party" ? "🍝" : "🍕"}</span>
              <p>{service.price}</p>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul>
              {service.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
