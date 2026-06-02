import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FloatingWhatsApp } from "../src/components/FloatingWhatsApp";
import "./globals.css";

export const metadata: Metadata = {
  title: "Las Pastas de la Nona",
  description:
    "Fábrica de pastas en Burzaco, restaurante, take away, reservas y servicios de pizza party y pasta party.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
