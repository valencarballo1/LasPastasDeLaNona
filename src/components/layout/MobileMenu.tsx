"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";
import { mainNavLinks } from "@/constants/nav";
import { routes } from "@/constants/routes";
import { LinkButton } from "@/components/ui/Button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[90] transition-opacity duration-300 lg:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className={`texture-brick absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-8 bg-carbon px-7 py-8 shadow-warm transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-xl text-warm-white">Las Pastas de la Nona</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="rounded-full p-2 text-cream hover:bg-warm-white/10"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="border-b border-cream/10 py-4 font-display text-2xl text-cream transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <LinkButton href={routes.carta} variant="primary" size="lg" className="mt-auto w-full" onClick={onClose}>
          Ver carta
        </LinkButton>
      </div>
    </div>
  );
}
