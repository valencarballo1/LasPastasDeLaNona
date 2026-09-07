import type { ReactNode } from "react";
import { getSiteImageMap } from "@/services/site-image.service";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { StructuredData } from "@/components/layout/StructuredData";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const images = await getSiteImageMap();
  const logo = images["brand.logo"];
  const logoSrc = logo.src ?? "/images/brand/logo.png";

  return (
    <>
      <StructuredData logoUrl={logo.src} />
      <Navbar logoSrc={logoSrc} logoAlt={logo.alt} />
      <main>{children}</main>
      <Footer logoSrc={logoSrc} logoAlt={logo.alt} />
      <WhatsAppButton />
    </>
  );
}
