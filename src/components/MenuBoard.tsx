import { pastaGroups, sauces } from "../data/site-content";

function MenuLine({ name, price }: { name: string; price?: string }) {
  return (
    <li className="menuLine">
      <span>{name}</span>
      <i aria-hidden="true" />
      <strong>{price}</strong>
    </li>
  );
}

export function MenuBoard() {
  return (
    <section className="menuBoardSection" id="carta" aria-labelledby="carta-title">
      <div className="menuBoard">
        <div className="boardHeader">
          <p className="script">Pastas caseras con sabor de familia.</p>
          <h1 id="carta-title">Pasta libre</h1>
          <p>Todos los días</p>
        </div>

        <div className="boardColumns">
          <div className="boardColumn" id="pastas">
            <h2 className="ribbonTitle ribbonTitle--red">Pastas de la Nona</h2>
            {pastaGroups.map((group) => (
              <article className="menuGroup" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.lines.map((line) => (
                    <MenuLine key={line.name} name={line.name} price={line.price} />
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="boardColumn boardColumn--sauces">
            <h2 className="ribbonTitle ribbonTitle--green">Salsas de la Nona</h2>
            <p className="script boardColumn__intro">El secreto está en la salsa</p>
            <div className="sauceList">
              {sauces.map((sauce) => (
                <article className="sauceCard" key={sauce.name}>
                  <span aria-hidden="true">{sauce.icon}</span>
                  <div>
                    <h3>{sauce.name}</h3>
                    <p>{sauce.description}</p>
                    <MenuLine name="" price={sauce.price} />
                  </div>
                </article>
              ))}
            </div>

            <aside className="welcomeBox">
              <p className="script">Bienvenidos a la mesa de la Nona</p>
              <span>Pastas caseras para compartir</span>
            </aside>
          </div>
        </div>

        <footer className="boardFooter">
          <span>Elaboración artesanal</span>
          <span>Ingredientes frescos</span>
          <span>Recetas de la Nona</span>
        </footer>
      </div>
    </section>
  );
}
