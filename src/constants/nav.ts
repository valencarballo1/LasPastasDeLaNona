import { routes } from "@/constants/routes";

export const mainNavLinks = [
  { label: "Inicio", href: routes.home },
  { label: "Carta", href: routes.carta },
  { label: "Fábrica", href: routes.fabrica },
  { label: "Eventos", href: routes.eventos },
  { label: "Nuestra historia", href: routes.nosotros },
  { label: "Contacto", href: routes.contacto },
] as const;

export const footerNavLinks = mainNavLinks.filter((link) => link.href !== routes.home);

export const adminNavLinks = [
  { label: "Dashboard", href: routes.admin.dashboard },
  { label: "Carta", href: routes.carta },
  { label: "Productos", href: routes.admin.productos },
  { label: "Categorías", href: routes.admin.categorias },
  { label: "Imágenes", href: routes.admin.imagenes },
  { label: "Eventos", href: routes.admin.eventos },
  { label: "Configuración", href: routes.admin.configuracion },
] as const;
