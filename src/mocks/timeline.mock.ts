export interface TimelineMilestone {
  year: string;
  title: string;
  description?: string;
}

/**
 * MOCK DATA / contenido real confirmado — no inventar hitos adicionales.
 * 1999: fecha de nacimiento de la fábrica de pastas (según brief del negocio).
 * 2012: fecha que figura en la cartelería física del restaurante
 * ("Pasta y tradición · Desde 2012"), preparada para diferenciarse de la
 * fábrica cuando el negocio confirme el detalle completo de esa etapa.
 */
export const timelineMilestones: TimelineMilestone[] = [
  {
    year: "1999",
    title: "Nace la fábrica de pastas",
    description:
      "Las Pastas de la Nona arranca como un proyecto familiar: pasta fresca hecha como en casa, todos los días.",
  },
  {
    year: "2012",
    title: "Abre el restaurante",
    description: "La familia suma la mesa del restaurante a la fábrica, para compartir la pasta recién hecha.",
  },
];
