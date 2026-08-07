import { apiClient } from "@/services/api/api-client";
import { endpoints } from "@/services/api/endpoints";
import type { EventRequestDto } from "@/types/event";
import type { EventRepository } from "@/services/repositories/event.repository";

export const apiEventRepository: EventRepository = {
  getAll: () => apiClient.get<EventRequestDto[]>(endpoints.adminEventRequests),
  create: (data) => apiClient.post<EventRequestDto>(endpoints.eventRequests, data),
  updateStatus: (id, status) => apiClient.put<EventRequestDto>(endpoints.adminEventRequest(id), { status }),
};
