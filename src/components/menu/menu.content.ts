export type MenuItem = {
  name: string;
  price: string;
};

export type MenuCategory = {
  title: string;
  subtitle?: string;
  items: MenuItem[];
};

export type Sauce = {
  name: string;
  description: string;
  icon: string;
  price: string;
};

export const pastaCategories: MenuCategory[] = [
  {
    title: "Ravioles y raviolones",
    items: [
      { name: "Ravioles de ricota", price: "$" },
      { name: "Ravioles de verdura y carne", price: "$" },
      { name: "Ravioles de verdura y pollo", price: "$" },
      { name: "Raviolones verdes de ricota, jamón y nuez", price: "$" },
      { name: "Raviolones de ricota y verdura", price: "$" },
    ],
  },
  {
    title: "Canelones",
    items: [{ name: "Canelones de verdura y ricota", price: "$" }],
  },
  {
    title: "Sorrentini",
    items: [
      { name: "Sorrentinos de jamón y queso", price: "$" },
      { name: "Sorrentinos caprese", price: "$" },
    ],
  },
  {
    title: "Pastas tradicionales",
    items: [
      { name: "Tallarines caseros", price: "$" },
      { name: "Fusilli", price: "$" },
      { name: "Macarrones", price: "$" },
      { name: "Tallarines cortados a cuchillo", price: "$" },
      { name: "Agnolotis de ricota, verdura y mozzarella", price: "$" },
    ],
  },
  {
    title: "Especialidades de la casa",
    items: [{ name: "Lasaña rellena", price: "$" }],
  },
];

export const sauces: Sauce[] = [
  {
    name: "Tuco casero",
    description: "La receta tradicional que pasa de generación en generación.",
    icon: "🍅",
    price: "$",
  },
  {
    name: "Boloñesa",
    description: "Carne seleccionada, tomate y cocción lenta.",
    icon: "🥩",
    price: "$",
  },
  {
    name: "Blanca",
    description: "Suave, delicada y cremosa.",
    icon: "🥣",
    price: "$",
  },
  {
    name: "La Nona",
    description: "El sabor auténtico de las recetas de la abuela.",
    icon: "👵",
    price: "$",
  },
  {
    name: "Cuatro quesos",
    description: "Una combinación irresistible de quesos fundidos.",
    icon: "🧀",
    price: "$",
  },
];
