import { Footer } from "../src/components/footer/Footer";
import { Hero } from "../src/components/hero/Hero";
import { SectionTitle } from "../src/components/shared/SectionTitle";

const quickLinks = [
  {
    title: "Menú del restaurante",
    text: "Conocé la propuesta para comer en nuestro salón: pasta libre, platos de la casa y salsas caseras.",
    href: "/menu-restaurante",
    label: "Ver menú",
  },
  {
    title: "Comida para llevar",
    text: "Pastas frescas, salsas y opciones listas para retirar y disfrutar en casa.",
    href: "/comida-para-llevar",
    label: "Ver opciones",
  },
  {
    title: "Pizza party y pasta party",
    text: "Servicios para cumpleaños, reuniones familiares y eventos empresariales con atención personalizada.",
    href: "/eventos",
    label: "Contratar servicios",
  },
  {
    title: "Reserva de mesas",
    text: "Dejá tus datos para organizar tu visita al restaurante. Luego conectamos el formulario al backend.",
    href: "/reservas",
    label: "Reservar",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="contentSection" id="historia">
        <div className="storyGrid">
          <SectionTitle
            align="left"
            eyebrow="Nuestra historia"
            title="27 años de pastas artesanales en Burzaco"
            subtitle="Las Pastas de la Nona nace como una fábrica familiar de pastas frescas y crece como punto de encuentro para quienes buscan comer rico, casero y con atención cercana. Este texto queda preparado para ajustar tono, historia y datos finales cuando quieras."
          />
          <div className="storyPanel">
            <span>Hecho en casa</span>
            <p>
              Elaboramos pastas, salsas y propuestas para restaurante, take away y eventos. La web queda ordenada por vistas para que cada servicio tenga su propio espacio.
            </p>
          </div>
        </div>
      </section>

      <section className="contentSection contentSection--cream" id="acciones">
        <SectionTitle
          eyebrow="Elegí qué necesitás"
          title="Un inicio simple, con accesos claros"
          subtitle="Desde el home se presenta la fábrica y cada botón lleva a una vista específica, sin cargar toda la información en una sola pantalla."
        />
        <div className="actionGrid">
          {quickLinks.map((item) => (
            <article className="actionCard" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a href={item.href}>{item.label}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="reservationTeaser" id="reservas">
        <div>
          <p className="eyebrow">Restaurante</p>
          <h2>¿Querés venir a comer?</h2>
          <p>
            Sumamos una vista de reservas para mesas del restaurante, lista para conectar con el backend en .NET Core.
          </p>
        </div>
        <a href="/reservas">Reservar mesa</a>
      </section>

      <Footer />
    </main>
  );
}
