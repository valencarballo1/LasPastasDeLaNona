import { Footer } from "../../src/components/footer/Footer";
import { BootstrapIcon } from "../../src/components/icons/BootstrapIcon";
import { pastaCategories, sauces } from "../../src/components/menu/menu.content";
import { PageHeader } from "../../src/components/PageHeader";
import { SectionTitle } from "../../src/components/shared/SectionTitle";
import { buildWhatsAppUrl } from "../../src/data/local-info";

const orderUrl = buildWhatsAppUrl("Hola, quiero consultar por pastas para llevar de Las Pastas de la Nona.");

export default function TakeAwayPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Take away"
        title="Comida para llevar"
        subtitle="Pastas frescas, salsas caseras y opciones listas para retirar por el local. Los precios quedan como placeholders claros para reemplazar por valores reales."
      />

      <section className="contentSection contentSection--cream">
        <SectionTitle
          eyebrow="Fábrica de pastas"
          title="Elegí, encargá y disfrutá en casa"
          subtitle="La información está separada por familias de producto para que el cliente encuentre rápido qué puede pedir antes de escribir por WhatsApp."
        />
        <div className="takeAwayGrid">
          {pastaCategories.map((category) => (
            <article className="takeAwayCard" key={category.title}>
              <h3>{category.title}</h3>
              <p>{category.subtitle}</p>
              <ul>
                {category.items.map((item) => (
                  <li key={item.name}>
                    <span>{item.name}</span>
                    <strong>{item.price}</strong>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="contentSection">
        <SectionTitle
          eyebrow="Salsas"
          title="Sumá una salsa casera"
          subtitle="Tuco, boloñesa, blanca y especialidades para acompañar cualquier pasta. También podés consultar por porciones y recomendaciones."
        />
        <div className="saucePills">
          {sauces.map((sauce) => (
            <article key={sauce.name}>
              <span aria-hidden="true">{sauce.name.slice(0, 2).toUpperCase()}</span>
              <h3>{sauce.name}</h3>
              <p>{sauce.description}</p>
              <strong>{sauce.price}</strong>
            </article>
          ))}
        </div>
        <div className="takeAwayCta">
          <p>¿Querés consultar stock o hacer un pedido?</p>
          <a href={orderUrl} target="_blank" rel="noreferrer">
            Pedir por WhatsApp
            <BootstrapIcon name="whatsapp" className="buttonIcon" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
