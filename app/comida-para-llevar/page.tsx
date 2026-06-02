import { Footer } from "../../src/components/footer/Footer";
import { pastaCategories, sauces } from "../../src/components/menu/menu.content";
import { PageHeader } from "../../src/components/PageHeader";
import { SectionTitle } from "../../src/components/shared/SectionTitle";

export default function TakeAwayPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Take away"
        title="Comida para llevar"
        subtitle="Pastas frescas y salsas caseras para retirar por el local. Los precios quedan como contenido editable para completar cuando los definan."
      />

      <section className="contentSection contentSection--cream">
        <SectionTitle
          eyebrow="Fábrica de pastas"
          title="Pastas frescas para disfrutar en casa"
          subtitle="Separado del menú del restaurante para que el cliente encuentre rápido qué puede pedir o retirar."
        />
        <div className="takeAwayGrid">
          {pastaCategories.map((category) => (
            <article className="takeAwayCard" key={category.title}>
              <h3>{category.title}</h3>
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
          subtitle="Tuco, boloñesa, blanca y especialidades para acompañar cualquier pasta."
        />
        <div className="saucePills">
          {sauces.map((sauce) => (
            <article key={sauce.name}>
              <span aria-hidden="true">{sauce.icon}</span>
              <h3>{sauce.name}</h3>
              <p>{sauce.description}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
