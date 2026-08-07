"use client";

import { MessageCircle } from "lucide-react";
import { whatsAppMessageGeneral } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
}

/** Botón flotante configurable — el mensaje precargado cambia según el contexto de la página. */
export function WhatsAppButton({ message, className }: WhatsAppButtonProps) {
  const href = message ?? whatsAppMessageGeneral();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-warm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${className ?? ""}`}
    >
      <MessageCircle className="h-7 w-7" fill="white" strokeWidth={0} aria-hidden="true" />
    </a>
  );
}
