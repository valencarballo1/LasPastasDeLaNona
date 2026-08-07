"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MenuNavigationProps {
  categories: { slug: string; name: string }[];
}

export function MenuNavigation({ categories }: MenuNavigationProps) {
  const [active, setActive] = useState(categories[0]?.slug);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(category.slug))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    const activeButton = navRef.current?.querySelector<HTMLAnchorElement>(`[data-slug="${active}"]`);
    activeButton?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  if (categories.length === 0) return null;

  return (
    <div className="sticky top-[64px] z-40 border-b border-muted/15 bg-warm-white/95 backdrop-blur">
      <div
        ref={navRef}
        className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-12"
        role="tablist"
        aria-label="Categorías de la carta"
      >
        {categories.map((category) => (
          <a
            key={category.slug}
            data-slug={category.slug}
            href={`#${category.slug}`}
            role="tab"
            aria-selected={active === category.slug}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
              active === category.slug
                ? "border-red bg-red text-warm-white"
                : "border-muted/25 text-muted hover:border-red/40 hover:text-red",
            )}
          >
            {category.name}
          </a>
        ))}
      </div>
    </div>
  );
}
