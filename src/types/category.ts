/**
 * Espejo del futuro CategoryDto expuesto por ASP.NET Core.
 * El frontend nunca debe acoplarse a la forma de las entidades de EF Core:
 * siempre se trabaja contra este contrato.
 */
export type CategoryType = "RESTAURANT" | "FACTORY";

export interface CategoryDto {
  id: number;
  name: string;
  slug: string;
  description?: string;
  type: CategoryType;
  sortOrder: number;
  active: boolean;
}
