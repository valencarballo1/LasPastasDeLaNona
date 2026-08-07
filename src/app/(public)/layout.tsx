import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { StructuredData } from "@/components/layout/StructuredData";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
