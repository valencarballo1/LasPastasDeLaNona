import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Copia la entidad sin su `id`, para armar el cuerpo de un PUT/POST.
 * El contrato con la API es de recurso completo: las ediciones envían
 * todos los campos, no solo los que cambiaron (ver docs/backend-contract.md).
 */
export function withoutId<T extends { id: unknown }>(entity: T): Omit<T, "id"> {
  const copy = { ...entity };
  delete (copy as { id?: unknown }).id;
  return copy;
}
