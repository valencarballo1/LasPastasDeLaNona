import { heroContent, heroNavItems } from "./hero.content";

export function Hero() {
  return (
    <header className="hero" id="inicio">
      <div className="italianRibbon italianRibbon--left" aria-hidden="true" />
      <div className="italianRibbon italianRibbon--right" aria-hidden="true" />

      <div className="hero__grid">
        <div className="hero__copy hero__copy--left">
          <p>{heroContent.leftQuote}</p>
          <span>{heroContent.badges[0]}</span>
        </div>

        <div className="hero__brand">
          <img src="/img/logo.svg" alt="Las Pastas de la Nona" />
          <div className="tricolor" aria-hidden="true" />
        </div>

        <div className="hero__copy hero__copy--right">
          <p>{heroContent.rightQuote}</p>
          <span>{heroContent.badges[2]}</span>
        </div>
      </div>

      <nav className="hero__nav" aria-label="Secciones principales">
        {heroNavItems.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
