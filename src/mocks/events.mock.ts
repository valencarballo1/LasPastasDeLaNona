import type { EventRequestDto } from "@/types/event";

/** MOCK DATA — solicitudes de presupuesto de ejemplo para el panel admin. */
export const mockEventRequests: EventRequestDto[] = [
  {
    id: 1,
    name: "Marina Sosa",
    phone: "11 4000-0000",
    email: "marina.sosa@example.com",
    eventType: "PASTA_PARTY",
    estimatedGuests: 30,
    eventDate: "2026-09-12",
    locality: "Burzaco",
    message: "Cumpleaños de 15, buscamos pasta party para el salón de fiestas.",
    status: "NUEVA",
    createdAt: "2026-08-01T14:30:00.000Z",
  },
  {
    id: 2,
    name: "Federico Gómez",
    phone: "11 4111-1111",
    email: "federico.gomez@example.com",
    eventType: "PIZZA_PARTY",
    estimatedGuests: 60,
    eventDate: "2026-09-20",
    locality: "Adrogué",
    message: "Evento de empresa, buscamos pizza party a domicilio.",
    status: "CONTACTADO",
    createdAt: "2026-07-28T10:15:00.000Z",
  },
  {
    id: 3,
    name: "Laura Fernández",
    phone: "11 4222-2222",
    email: "laura.fernandez@example.com",
    eventType: "AMBOS",
    estimatedGuests: 25,
    eventDate: "2026-08-30",
    locality: "Burzaco",
    status: "PRESUPUESTADO",
    createdAt: "2026-07-20T09:00:00.000Z",
  },
];
