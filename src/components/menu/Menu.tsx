import { pastaCategories, sauces } from "./menu.content";

export function Menu() {
  return (
    <section className="qrMenu" id="menu">
      <div className="qrMenu__intro">
        <p className="eyebrow">Menú QR</p>
        <h2>Elegí rápido, leé cómodo y pedí tranquilo</h2>
        <p>
          Categorías a mano, platos con descripciones breves y precios destacados para que el menú se pueda leer fácil desde el celular.
        </p>
      </div>

      <nav className="qrMenu__tabs" aria-label="Categorías del menú">
        {pastaCategories.map((category, index) => (
          <a href={`#${category.id}`} key={category.id}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            {category.title}
          </a>
        ))}
        <a href="#salsas">
          <small>{String(pastaCategories.length + 1).padStart(2, "0")}</small>
          Salsas
        </a>
      </nav>

      <div className="qrMenu__list">
        {pastaCategories.map((category, index) => (
          <article className="qrCategory" id={category.id} key={category.id}>
            <header className="qrCategory__header">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{category.title}</h3>
                <p>{category.subtitle}</p>
              </div>
            </header>
            <ul>
              {category.items.map((item) => (
                <li className="qrDish" key={item.name}>
                  <div>
                    <strong>{item.name}</strong>
                    {item.highlight ? <em>{item.highlight}</em> : null}
                    {item.description ? <p>{item.description}</p> : null}
                  </div>
                  <b>{item.price}</b>
                </li>
              ))}
            </ul>
          </article>
        ))}

        <article className="qrCategory qrCategory--sauces" id="salsas">
          <header className="qrCategory__header">
            <span>{String(pastaCategories.length + 1).padStart(2, "0")}</span>
            <div>
              <h3>Salsas caseras</h3>
              <p>Elegí el toque final para acompañar tu pasta.</p>
            </div>
          </header>
          <div className="qrSauceGrid">
            {sauces.map((sauce) => (
              <article className="qrSauce" key={sauce.name}>
                <div>
                  <strong>{sauce.name}</strong>
                  <p>{sauce.description}</p>
                </div>
                <b>{sauce.price}</b>
              </article>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
