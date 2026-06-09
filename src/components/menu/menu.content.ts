export type MenuItem = {
  name: string;
  price: string;
  description?: string;
  highlight?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
};

export type Sauce = {
  name: string;
  description: string;
  price: string;
};

export const pastaCategories: MenuCategory[] = [
  {
    id: "ravioles",
    title: "Ravioles y raviolones",
    subtitle: "Rellenos clásicos y combinaciones de la casa para pedir con tu salsa favorita.",
    items: [
      { name: "Ravioles de ricota", price: "$", description: "Suaves, frescos y bien tradicionales." },
      { name: "Ravioles de verdura y carne", price: "$" },
      { name: "Ravioles de verdura y pollo", price: "$" },
      { name: "Raviolones verdes", price: "$", description: "Ricota, jamón y nuez.", highlight: "Especialidad" },
      { name: "Raviolones de ricota y verdura", price: "$" },
    ],
  },
  {
    id: "canelones",
    title: "Canelones",
    subtitle: "Gratinados, abundantes y preparados con rellenos caseros.",
    items: [{ name: "Canelones de verdura y ricota", price: "$", description: "Una porción generosa para comer en el salón o llevar." }],
  },
  {
    id: "sorrentini",
    title: "Sorrentini",
    subtitle: "Pasta rellena con mucho sabor, ideal para quienes buscan un plato bien completo.",
    items: [
      { name: "Sorrentinos de jamón y queso", price: "$", highlight: "Muy pedido" },
      { name: "Sorrentinos caprese", price: "$", description: "Tomate, queso y albahaca." },
    ],
  },
  {
    id: "tradicionales",
    title: "Pastas tradicionales",
    subtitle: "Cortes y formatos de siempre, elaborados para disfrutar con salsas caseras.",
    items: [
      { name: "Tallarines caseros", price: "$" },
      { name: "Fusilli", price: "$" },
      { name: "Macarrones", price: "$" },
      { name: "Tallarines cortados a cuchillo", price: "$", highlight: "Artesanal" },
      { name: "Agnolotis", price: "$", description: "Ricota, verdura y mozzarella." },
    ],
  },
  {
    id: "especialidades",
    title: "Especialidades de la casa",
    subtitle: "Platos para venir con hambre y compartir una mesa familiar.",
    items: [{ name: "Lasaña rellena", price: "$", description: "Capas de pasta, relleno y salsa bien casera." }],
  },
];

export const sauces: Sauce[] = [
  { name: "Tuco casero", description: "La receta tradicional que pasa de generación en generación.", price: "$" },
  { name: "Boloñesa", description: "Carne seleccionada, tomate y cocción lenta.", price: "$" },
  { name: "Blanca", description: "Suave, delicada y cremosa.", price: "$" },
  { name: "La Nona", description: "El sabor auténtico de las recetas de la abuela.", price: "$" },
  { name: "Cuatro quesos", description: "Una combinación irresistible de quesos fundidos.", price: "$" },
];
