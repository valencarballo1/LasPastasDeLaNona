"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Envoltorio que agrega una aparición sutil al entrar en viewport. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Sin IntersectionObserver el contenido se muestra igual: la animación
    // es un adorno y nunca puede dejar una sección invisible. Se difiere
    // para no encadenar renders dentro del efecto.
    if (typeof IntersectionObserver === "undefined") {
      const timeout = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // `top < 0` cubre el bloque que quedó por encima del viewport: al
        // arrastrar la barra de scroll o saltar a un ancla, el observador
        // puede no llegar a verlo intersectando y la sección quedaría
        // invisible para siempre.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Umbral 0 + margen inferior: aparece apenas asoma, sin esperar a que
      // entre un 15% (un bloque alto tardaba media pantalla de más).
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
