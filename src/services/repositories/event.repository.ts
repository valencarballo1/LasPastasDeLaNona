import type { CreateEventRequestDto, EventRequestDto, EventRequestStatus } from "@/types/event";

export interface EventRepository {
  getAll(): Promise<EventRequestDto[]>;
  create(data: CreateEventRequestDto): Promise<EventRequestDto>;
  updateStatus(id: number, status: EventRequestStatus): Promise<EventRequestDto>;
}
