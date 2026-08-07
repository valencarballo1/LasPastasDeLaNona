/** Rutas de la futura API en ASP.NET Core (ver docs/backend-contract.md). */
export const endpoints = {
  categories: "/api/categories",
  products: "/api/products",
  productBySlug: (slug: string) => `/api/products/${slug}`,
  adminProducts: "/api/admin/products",
  adminProduct: (id: number | string) => `/api/admin/products/${id}`,
  adminCategories: "/api/admin/categories",
  adminCategory: (id: number | string) => `/api/admin/categories/${id}`,
  eventRequests: "/api/event-requests",
  adminEventRequests: "/api/admin/event-requests",
  adminEventRequest: (id: number | string) => `/api/admin/event-requests/${id}`,
  settings: "/api/settings",
  adminSettings: "/api/admin/settings",
  authLogin: "/api/auth/login",
} as const;
