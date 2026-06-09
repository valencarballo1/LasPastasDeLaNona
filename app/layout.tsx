import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FloatingWhatsApp } from "../src/components/FloatingWhatsApp";
import { Navbar } from "../src/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Las Pastas de la Nona",
    template: "%s | Las Pastas de la Nona",
  },
  description:
    "Fábrica de pastas familiar en Burzaco: restaurante, pastas frescas para llevar, reservas, pizza party y pasta party a domicilio.",
  keywords: ["pastas frescas", "restaurante familiar", "pizza party", "pasta party", "Burzaco"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
