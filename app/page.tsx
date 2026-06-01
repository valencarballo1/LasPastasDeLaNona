import menuData from "../src/data/menu.json";

type MenuItem = {
  nombre: string;
  descripcion: string;
  precio: number;
};

type MenuCategory = [string, MenuItem[]];

const moneyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const quickLinks = [
  { label: "Menú", href: "#menu" },
  { label: "Pastas frescas", href: "#pastas-frescas" },
  { label: "Menú semanal", href: "#menu-semanal" },
];

const pastaHighlights = [
  "Ravioles, sorrentinos, ñoquis y tallarines artesanales.",
  "Salsas caseras para combinar a elección.",
  "Pedidos para retirar, delivery y eventos familiares.",
];

const weeklyMenu = [
  {
    day: "Lunes",
    dish: "Ñoquis con salsa fileto",
    detail: "Clásico de la casa con queso rallado.",
  },
  {
    day: "Miércoles",
    dish: "Milanesa napolitana",
    detail: "Con guarnición a elección.",
  },
  {
    day: "Viernes",
    dish: "Pizza grande de muzzarella",
    detail: "Ideal para cerrar la semana en familia.",
  },
];

const services = [
  {
    title: "Pizza Party",
    price: "Desde $9.500 por persona",
    description:
      "Llevamos variedad de pizzas, servicio cálido y organización para cumpleaños, reuniones y eventos empresariales.",
    includes: [
      "Muzzarella, napolitana, jamón y morrones, verdura y sabores a coordinar.",
      "Servicio estimado de 2 horas con reposición constante.",
      "Opciones de bebidas y empanadas para sumar al evento.",
    ],
  },
  {
    title: "Pasta Party",
    price: "Desde $11.500 por persona",
    description:
      "Una experiencia de pastas frescas servidas en el momento, con salsas caseras y opciones para todos los gustos.",
    includes: [
      "Ravioles, sorrentinos, ñoquis, tallarines y lasagna según disponibilidad.",
      "Salsas fileto, bolognesa, crema, rosa y combinaciones especiales.",
      "Mesa lista para compartir y asesoramiento para calcular porciones.",
    ],
  },
];

const categories = Object.entries(menuData) as MenuCategory[];

export default function Home() {
  return (
    <main>
      <section className="hero" id="inicio">
        <div className="hero__content">
          <div className="logoCard" aria-label="Logo Las Pastas de la Nona">
            <img src="/img/logo.svg" alt="Las Pastas de la Nona" />
          </div>
          <p className="eyebrow">Pastas caseras • Comidas listas • Eventos</p>
          <h1>El sabor de la cocina de la Nona, ahora en React + Next.js.</h1>
          <p className="hero__lead">
            Armamos una experiencia simple para conocer el menú, pedir pastas
            frescas y consultar servicios de pizza party o pasta party para tu
            próxima reunión.
          </p>
          <nav className="quickLinks" aria-label="Secciones principales">
            {quickLinks.map((link) => (
              <a href={link.href} key={link.href} className="button">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="section section--cream" id="pastas-frescas">
        <div className="section__header">
          <p className="eyebrow">Pastas frescas</p>
          <h2>Hechas todos los días con recetas de familia</h2>
          <p>
            Elegí tu pasta, combiná la salsa que más te guste y coordiná tu
            pedido para disfrutar en casa o en un evento.
          </p>
        </div>
        <div className="highlightGrid">
          {pastaHighlights.map((highlight) => (
            <article className="highlight" key={highlight}>
              <span aria-hidden="true">🍝</span>
              <p>{highlight}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="servicios">
        <div className="section__header">
          <p className="eyebrow">Servicios para eventos</p>
          <h2>Pizza party y pasta party con precio por persona</h2>
          <p>
            Propuestas flexibles para eventos chicos, medianos o grandes. Los
            valores son de referencia y se ajustan según cantidad de invitados,
            zona y adicionales.
          </p>
        </div>
        <div className="serviceGrid">
          {services.map((service) => (
            <article className="serviceCard" key={service.title}>
              <div>
                <h3>{service.title}</h3>
                <p className="price">{service.price}</p>
                <p>{service.description}</p>
              </div>
              <ul>
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="button button--dark" href="#contacto">
                Consultar disponibilidad
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--cream" id="menu-semanal">
        <div className="section__header">
          <p className="eyebrow">Menú semanal</p>
          <h2>Ideas destacadas para organizar la semana</h2>
        </div>
        <div className="weeklyGrid">
          {weeklyMenu.map((item) => (
            <article className="weeklyCard" key={item.day}>
              <span>{item.day}</span>
              <h3>{item.dish}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="menu">
        <div className="section__header">
          <p className="eyebrow">Menú</p>
          <h2>Conocé nuestras opciones</h2>
          <p>
            Esta sección reutiliza el menú del proyecto original y lo presenta
            como componentes de React.
          </p>
        </div>
        <div className="menuGrid">
          {categories.map(([category, items]) => (
            <article className="menuCard" key={category}>
              <h3>{category}</h3>
              <div className="menuCard__items">
                {items.slice(0, 4).map((item) => (
                  <div className="menuItem" key={`${category}-${item.nombre}`}>
                    <div>
                      <h4>{item.nombre}</h4>
                      {item.descripcion ? <p>{item.descripcion}</p> : null}
                    </div>
                    <strong>{moneyFormatter.format(item.precio)}</strong>
                  </div>
                ))}
              </div>
              {items.length > 4 ? (
                <p className="moreItems">+ {items.length - 4} opciones más</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <footer className="footer" id="contacto">
        <strong>Las Pastas de la Nona</strong>
        <p>Pastas frescas, comidas caseras y eventos a medida.</p>
        <p>
          Consultanos por WhatsApp o redes sociales para confirmar precios y
          disponibilidad.
        </p>
      </footer>
    </main>
  );
}
