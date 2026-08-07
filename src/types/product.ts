/**
 * Espejo del futuro ProductDto expuesto por ASP.NET Core.
 * `price: null` se usa a propósito en los mocks cuando el precio
 * definitivo todavía no fue confirmado por el negocio.
 */
export interface ProductDto {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number | null;
  imageUrl?: string;
  /** Unidad de venta, ej: "por porción", "bandeja x 1kg", "docena". */
  unit?: string;
  available: boolean;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  categoryId: number;
  tags?: string[];
}
