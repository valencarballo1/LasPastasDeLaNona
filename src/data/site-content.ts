export type MenuLine = {
  name: string;
  description?: string;
  price?: string;
};

export type MenuGroup = {
  title: string;
  lines: MenuLine[];
};

export type Sauce = {
  name: string;
  description: string;
  icon: string;
  price?: string;
};

export const pastaGroups: MenuGroup[] = [
  {
    title: "Ravioli e ravioloni",
    lines: [
      { name: "Ravioles de ricota", price: "$" },
      { name: "Ravioles de verdura y carne", price: "$" },
      { name: "Ravioles de verdura y pollo", price: "$" },
      { name: "Raviolones verdes de ricota, jamón y nuez", price: "$" },
      { name: "Raviolones de ricota y verdura", price: "$" },
    ],
  },
  {
    title: "Caneloni",
    lines: [{ name: "Canelones de verdura y ricota", price: "$" }],
  },
  {
    title: "Sorrentini",
    lines: [
      { name: "Sorrentinos de jamón y queso", price: "$" },
      { name: "Sorrentinos caprese", price: "$" },
    ],
  },
  {
    title: "Paste tradizionali",
    lines: [
      { name: "Tallarines caseros", price: "$" },
      { name: "Fusilli", price: "$" },
      { name: "Macarrones", price: "$" },
      { name: "Tallarines tricolor cortados a cuchillo", price: "$" },
      { name: "Agnolotis de ricota, verdura y mozzarella", price: "$" },
    ],
  },
  {
    title: "Specialità della casa",
    lines: [{ name: "Lasaña rellena", price: "$" }],
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

export const services = [
  {
    title: "Pasta party",
    price: "Desde $11.500 por persona",
    description:
      "Pastas frescas servidas en el momento, salsas caseras y mesa completa para reuniones familiares o eventos.",
    details: ["Variedad de pastas", "Salsas a elección", "Servicio y armado incluidos"],
  },
  {
    title: "Pizza party",
    price: "Desde $9.500 por persona",
    description:
      "Pizzas caseras con reposición constante y sabores clásicos para cumpleaños, juntadas y eventos empresariales.",
    details: ["Muzzarella y especiales", "Servicio estimado de 2 horas", "Adicionales a coordinar"],
  },
];

export const weeklyMenu = [
  { day: "Lunes", dish: "Ñoquis con tuco", note: "Clásico casero con queso rallado." },
  { day: "Miércoles", dish: "Canelones gratinados", note: "Rellenos de verdura y ricota." },
  { day: "Viernes", dish: "Pasta libre", note: "Todos los días, ideal para compartir." },
];
