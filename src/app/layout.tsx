import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Fábrica de Pastas y Restaurante en Burzaco`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Fábrica de pastas artesanal y restaurante familiar en Burzaco. Pastas frescas, cocina casera, Pizza Party y Pasta Party.",
  keywords: [
    "pastas frescas",
    "restaurante familiar",
    "fábrica de pastas",
    "pizza party",
    "pasta party",
    "Burzaco",
    "comida para llevar",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Fábrica de Pastas y Restaurante en Burzaco`,
    description:
      "Fábrica de pastas artesanal y restaurante familiar en Burzaco. Pastas frescas, cocina casera, Pizza Party y Pasta Party.",
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Fábrica de Pastas y Restaurante en Burzaco`,
    description:
      "Fábrica de pastas artesanal y restaurante familiar en Burzaco. Pastas frescas, cocina casera, Pizza Party y Pasta Party.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="font-ui">{children}</body>
    </html>
  );
}
