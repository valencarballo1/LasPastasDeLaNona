const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

/**
 * Formatea un precio. Los productos MOCK pueden no tener precio definitivo
 * todavía (price: null) — en ese caso se muestra "Consultar" en vez de
 * inventar un valor.
 */
export function formatPrice(price: number | null | undefined) {
  if (price === null || price === undefined) return "Consultar";
  return currencyFormatter.format(price);
}

export function formatDate(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}
