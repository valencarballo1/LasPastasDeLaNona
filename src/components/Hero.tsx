const quickLinks = [
  { label: "Menú", href: "#carta" },
  { label: "Pastas frescas", href: "#pastas" },
  { label: "Menú semanal", href: "#semanal" },
  { label: "Eventos", href: "#eventos" },
];

export function Hero() {
  return (
    <header className="hero" id="inicio">
      <div className="hero__quote hero__quote--left">
        <p>La pasta hecha en casa es el corazón de nuestra cocina.</p>
        <span>Elaboración artesanal</span>
      </div>

      <div className="hero__brand">
        <img src="/img/logo.svg" alt="Las Pastas de la Nona" />
      </div>

      <div className="hero__quote hero__quote--right">
        <p>La mesa de la Nona es comida casera, abundante y con amor.</p>
        <span>Recetas tradicionales</span>
      </div>

      <nav className="hero__nav" aria-label="Secciones principales">
        {quickLinks.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
