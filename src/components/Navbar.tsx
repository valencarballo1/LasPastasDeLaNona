"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { localInfo } from "../data/local-info";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/menu-restaurante", label: "Menú" },
  { href: "/comida-para-llevar", label: "Take away" },
  { href: "/eventos", label: "Eventos" },
  { href: "/reservas", label: "Reservas" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="siteNav">
      <a className="siteNav__brand" href="/" aria-label="Ir al inicio">
        <img src="/img/Logo.png" alt="" />
        <span>{localInfo.name}</span>
      </a>

      <button
        className="siteNav__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="site-navigation"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav id="site-navigation" className={`siteNav__links ${isOpen ? "siteNav__links--open" : ""}`} aria-label="Navegación principal">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <a
              className={isActive ? "is-active" : undefined}
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
