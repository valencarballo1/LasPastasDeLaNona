import type { CategoryDto } from "@/types/category";

/**
 * MOCK DATA — categorías de ejemplo para poder construir la interfaz
 * mientras no existe el backend en ASP.NET Core. No representan
 * necesariamente la carta/catálogo definitivo del negocio.
 */
export const mockCategories: CategoryDto[] = [
  // ---- Restaurante (/carta) ----
  { id: 1, name: "Entradas", slug: "entradas", type: "RESTAURANT", sortOrder: 1, active: true },
  { id: 2, name: "Pastas", slug: "pastas", type: "RESTAURANT", sortOrder: 2, active: true },
  { id: 3, name: "Milanesas", slug: "milanesas", type: "RESTAURANT", sortOrder: 3, active: true },
  { id: 4, name: "Pizzas", slug: "pizzas", type: "RESTAURANT", sortOrder: 4, active: true },
  { id: 5, name: "Platos", slug: "platos", type: "RESTAURANT", sortOrder: 5, active: true },
  { id: 6, name: "Postres", slug: "postres", type: "RESTAURANT", sortOrder: 6, active: true },
  { id: 7, name: "Bebidas", slug: "bebidas", type: "RESTAURANT", sortOrder: 7, active: true },
  { id: 8, name: "Vinos", slug: "vinos", type: "RESTAURANT", sortOrder: 8, active: true },

  // ---- Fábrica (/fabrica) ----
  { id: 9, name: "Ravioles", slug: "ravioles", type: "FACTORY", sortOrder: 1, active: true },
  { id: 10, name: "Sorrentinos", slug: "sorrentinos", type: "FACTORY", sortOrder: 2, active: true },
  { id: 11, name: "Ñoquis", slug: "noquis", type: "FACTORY", sortOrder: 3, active: true },
  { id: 12, name: "Tallarines", slug: "tallarines", type: "FACTORY", sortOrder: 4, active: true },
  { id: 13, name: "Canelones", slug: "canelones", type: "FACTORY", sortOrder: 5, active: true },
  { id: 14, name: "Lasagna", slug: "lasagna", type: "FACTORY", sortOrder: 6, active: true },
  { id: 15, name: "Salsas", slug: "salsas", type: "FACTORY", sortOrder: 7, active: true },
];
