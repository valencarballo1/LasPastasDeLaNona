import { localInfo } from "../../data/local-info";
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
    <footer className="siteFooter">
      <div>
        <strong>{localInfo.name}</strong>
        <p>Pastas artesanales, restaurante familiar, take away, pizza party y pasta party con sabor a domingo en familia.</p>
        <small>{localInfo.address} · {localInfo.whatsappLabel}</small>
      </div>
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
