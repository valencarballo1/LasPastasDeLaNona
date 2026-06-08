import { BootstrapIcon } from "../icons/BootstrapIcon";

const footerLinks = [
  { label: "Inicio", href: "/" },
  { label: "Menú restaurante", href: "/menu-restaurante" },
  { label: "Comida para llevar", href: "/comida-para-llevar" },
  { label: "Eventos", href: "/eventos" },
  { label: "Reservas", href: "/reservas" },
];

export function Footer() {
  return (
    <footer className="siteFooter" id="contacto">
      <strong>Las Pastas de la Nona</strong>
      <p>Pastas artesanales, restaurante familiar, take away, pizza party y pasta party con sabor a domingo en familia.</p>
      <nav aria-label="Navegación secundaria">
        {footerLinks.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
            <BootstrapIcon name="arrow" className="footerIcon" />
          </a>
        ))}
      </nav>
    </footer>
  );
}
