import { pastaCategories, sauces } from "./menu.content";

function PriceLine({ name, price }: { name: string; price: string }) {
  return (
    <li className="priceLine">
      <span>{name}</span>
      <i aria-hidden="true" />
      <strong>{price}</strong>
    </li>
  );
}

export function Menu() {
  return (
    <section className="menuSection" id="menu" aria-labelledby="menu-title">
      <div className="menuBoard">
        <div className="menuBoard__header">
          <p>Mangia bene, ridi spesso, ama molto.</p>
          <h1 id="menu-title">Pasta libre</h1>
          <span>Todos los días</span>
        </div>

        <div className="menuBoard__content">
          <div className="menuColumn" id="pastas-frescas">
            <h2 className="ribbonTitle ribbonTitle--red">Le nostre paste</h2>
            {pastaCategories.map((category) => (
              <article className="menuCategory" key={category.title}>
                <h3>{category.title}</h3>
                <ul>
                  {category.items.map((item) => (
                    <PriceLine key={item.name} name={item.name} price={item.price} />
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="menuColumn menuColumn--sauces">
            <h2 className="ribbonTitle ribbonTitle--green">Le nostre salse</h2>
            <p className="menuColumn__intro">El secreto está en la salsa</p>
            <div className="sauceGrid">
              {sauces.map((sauce) => (
                <article className="sauceCard" key={sauce.name}>
                  <span aria-hidden="true">{sauce.icon}</span>
                  <div>
                    <h3>{sauce.name}</h3>
                    <p>{sauce.description}</p>
                    <div className="saucePrice">
                      <i aria-hidden="true" />
                      <strong>{sauce.price}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="welcomeBox">
              <p>Benvenuti alla nostra tavola</p>
              <span>Bienvenidos a nuestra mesa</span>
            </aside>
          </div>
        </div>

        <footer className="menuBoard__footer">
          <span>Elaboración artesanal</span>
          <span>Ingredientes frescos</span>
          <span>Recetas tradicionales italianas</span>
        </footer>
      </div>
    </section>
  );
}
