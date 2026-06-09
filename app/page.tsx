import { ContactSection } from "../src/components/ContactSection";
import { Footer } from "../src/components/footer/Footer";
import { BootstrapIcon } from "../src/components/icons/BootstrapIcon";
import { Hero } from "../src/components/hero/Hero";
import { SectionTitle } from "../src/components/shared/SectionTitle";

const quickLinks = [
  {
    title: "Menú del restaurante",
    text: "Conocé la propuesta para comer en nuestro salón: pasta libre, platos de la casa y salsas caseras.",
    href: "/menu-restaurante",
    label: "Ver menú",
    icon: "journal",
  },
  {
    title: "Comida para llevar",
    text: "Pastas frescas, salsas y opciones listas para retirar y disfrutar en casa.",
    href: "/comida-para-llevar",
    label: "Ver opciones",
    icon: "bag",
  },
  {
    title: "Pizza party y pasta party",
    text: "Servicios para cumpleaños, reuniones familiares y eventos empresariales con atención personalizada.",
    href: "/eventos",
    label: "Contratar servicios",
    icon: "stars",
  },
  {
    title: "Reserva de mesas",
    text: "Dejá tus datos y te respondemos por WhatsApp para confirmar disponibilidad de mesa.",
    href: "/reservas",
    label: "Reservar",
    icon: "calendar",
  },
] as const;

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="contentSection" id="historia">
        <div className="storyGrid">
          <SectionTitle
            align="left"
            eyebrow="Nuestra historia"
            title="Una casa familiar cálida, artesanal y bien de la Nona"
            subtitle="Las Pastas de la Nona reúne recetas de siempre con la cercanía de una cocina familiar: pastas frescas, salsas caseras, comida abundante y una atención pensada para que cada visita se sienta como un domingo en familia."
          />
          <div className="storyPanel">
            <span>Hecho en el día</span>
            <p>
              Harina, salsa, mesa compartida y ese aroma que recuerda a la cocina de la nona: casero, generoso y con amor.
            </p>
            <div className="storyTags" aria-label="Valores de marca">
              <strong>Tradición</strong>
              <strong>Calidez familiar</strong>
              <strong>Sabor casero</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="contentSection contentSection--cream" id="acciones">
        <SectionTitle
          eyebrow="Elegí qué necesitás"
          title="Todo lo rico de la Nona, en un solo lugar"
          subtitle="Elegí entre comer en el restaurante, retirar pastas frescas para tu casa, organizar una pizza o pasta party, o reservar tu mesa para vivir la experiencia completa."
        />
        <div className="actionGrid">
          {quickLinks.map((item) => (
            <article className="actionCard" key={item.title}>
              <BootstrapIcon name={item.icon} className="cardIcon" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a href={item.href}>{item.label}<BootstrapIcon name="arrow" className="buttonIcon" /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="reservationTeaser" id="reservas">
        <div>
          <p className="eyebrow">Restaurante</p>
          <h2>¿Querés venir a comer?</h2>
          <p>
            Dejá tus datos y vení a disfrutar pastas caseras, salsas tradicionales y una mesa cálida para compartir sin apuro.
          </p>
        </div>
        <a href="/reservas">Reservar mesa<BootstrapIcon name="calendar" className="buttonIcon" /></a>
      </section>

      <ContactSection />

      <Footer />
    </main>
  );
}
