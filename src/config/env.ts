/**
 * Configuración de entorno del frontend.
 * DATA_SOURCE controla si los servicios leen de los repositorios mock
 * locales o de la futura API en ASP.NET Core, sin cambiar ningún componente.
 */
export const env = {
  dataSource: (process.env.NEXT_PUBLIC_DATA_SOURCE ?? "mock") as "mock" | "api",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "https://api.laspastasdelanona.com",
} as const;
