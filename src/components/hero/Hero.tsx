import { BootstrapIcon } from "../icons/BootstrapIcon";
import { heroContent, heroNavItems } from "./hero.content";

export function Hero() {
  return (
    <header className="hero" id="inicio">
      <div className="hero__grid hero__grid--landing">
        <div className="hero__brand">
          <img src="/img/logo.png" alt="Las Pastas de la Nona" />
        </div>

        <div className="hero__copy hero__copy--landing">
          <span>{heroContent.eyebrow}</span>
          <h1>{heroContent.title}</h1>
          <p>{heroContent.subtitle}</p>
          <div className="hero__badges" aria-label="Características principales">
            {heroContent.badges.map((badge) => (
              <strong key={badge}>{badge}</strong>
            ))}
          </div>
        </div>
      </div>

      <nav className="hero__nav" aria-label="Secciones principales">
        {heroNavItems.map((item) => (
          <a href={item.href} key={item.href}>
            <BootstrapIcon name={item.icon} className="navIcon" />
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
