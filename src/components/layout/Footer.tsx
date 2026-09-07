import Link from "next/link";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { footerNavLinks } from "@/constants/nav";
import { siteConfig } from "@/config/site";
import { whatsAppMessageGeneral } from "@/lib/whatsapp";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import { BrandLogo } from "@/components/layout/BrandLogo";

interface FooterProps {
  logoSrc: string;
  logoAlt: string;
}

export function Footer({ logoSrc, logoAlt }: FooterProps) {
  return (
    <footer className="texture-brick bg-black text-cream">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <BrandLogo src={logoSrc} alt={logoAlt} size={48} className="h-12 w-12" />
              <span className="font-display text-lg text-warm-white">{siteConfig.name}</span>
            </div>
            <p className="mt-4 flex items-start gap-2 text-sm text-cream/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              {siteConfig.address.street} · {siteConfig.address.city}
            </p>
          </div>

          <div>
            <h3 className="font-display text-base text-warm-white">Navegación</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="underline-nona text-sm text-cream/70 hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base text-warm-white">Encontranos</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-cream/70">
              <li>
                <a
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-nona inline-flex items-center gap-2 hover:text-gold"
                >
                  <Instagram className="h-4 w-4 text-gold" aria-hidden="true" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={whatsAppMessageGeneral()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-nona inline-flex items-center gap-2 hover:text-gold"
                >
                  <MessageCircle className="h-4 w-4 text-gold" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base text-warm-white">{siteConfig.concept}</h3>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">{siteConfig.tagline}</p>
          </div>
        </div>

        <OrnamentDivider tone="dark" className="my-10" />

        <div className="flex flex-col items-center gap-2 text-center text-xs text-cream/50">
          <p className="font-display text-sm text-cream/80">{siteConfig.name}</p>
          <p>Una historia familiar desde {siteConfig.foundingYear}.</p>
        </div>
      </div>
    </footer>
  );
}
