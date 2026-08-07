"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { mainNavLinks } from "@/constants/nav";
import { routes } from "@/constants/routes";
import { useScrolled } from "@/hooks/use-scroll-position";
import { LinkButton } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[80] transition-colors duration-300",
        scrolled ? "bg-carbon shadow-soft" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-12">
        <Link href={routes.home} className="flex items-center gap-3">
          <Image
            src="/images/brand/logo.png"
            alt="Las Pastas de la Nona"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
            priority
          />
          <span className="hidden font-display text-lg leading-tight text-warm-white sm:block">
            Las Pastas
            <br />
            de la Nona
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="underline-nona text-sm font-medium uppercase tracking-wide text-warm-white/90 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LinkButton href={routes.carta} variant="primary" size="md" className="hidden sm:inline-flex">
            Ver carta
          </LinkButton>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="rounded-full p-2 text-warm-white hover:bg-warm-white/10 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
