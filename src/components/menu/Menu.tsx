import { SectionTitle } from "../shared/SectionTitle";
import { pastaCategories, sauces } from "./menu.content";

export function Menu() {
  return (
    <>
      <section className="contentSection contentSection--cream" id="menu">
        <SectionTitle
          eyebrow="Carta del restaurante"
          title="Pastas caseras para compartir en la mesa"
          subtitle="La carta del salón se presenta en tarjetas simples, como el modelo de comida para llevar, para que cada variedad se lea rápido y la marca de la Nona sea la protagonista."
        />
        <div className="takeAwayGrid restaurantMenuGrid">
          {pastaCategories.map((category) => (
            <article className="takeAwayCard restaurantMenuCard" key={category.title}>
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
          eyebrow="Salsas de la Nona"
          title="El toque casero de cada plato"
          subtitle="Tuco, boloñesa, blanca y especialidades preparadas para acompañar la pasta con sabor de casa."
        />
        <div className="saucePills restaurantSauceGrid">
          {sauces.map((sauce) => (
            <article key={sauce.name}>
              <span aria-hidden="true">{sauce.icon}</span>
              <h3>{sauce.name}</h3>
              <p>{sauce.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
