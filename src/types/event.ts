/**
 * Espejo del futuro EventRequestDto expuesto por ASP.NET Core.
 */
export type EventServiceType = "PIZZA_PARTY" | "PASTA_PARTY" | "AMBOS" | "OTRO";

export type EventRequestStatus =
  | "NUEVA"
  | "CONTACTADO"
  | "PRESUPUESTADO"
  | "CONFIRMADO"
  | "CANCELADO";

export interface EventRequestDto {
  id: number;
  name: string;
  phone: string;
  email: string;
  eventType: EventServiceType;
  estimatedGuests: number;
  eventDate: string;
  locality: string;
  message?: string;
  status: EventRequestStatus;
  createdAt: string;
}

/** Payload que envía el formulario público (sin id/estado/fecha de alta). */
export type CreateEventRequestDto = Omit<EventRequestDto, "id" | "status" | "createdAt">;
