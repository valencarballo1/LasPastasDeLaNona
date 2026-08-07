import { mockEventRequests } from "@/mocks/events.mock";
import type { EventRequestDto } from "@/types/event";
import type { EventRepository } from "@/services/repositories/event.repository";

let requests: EventRequestDto[] = [...mockEventRequests];
let nextId = Math.max(...requests.map((r) => r.id)) + 1;

export const mockEventRepository: EventRepository = {
  async getAll() {
    return [...requests].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  },

  async create(data) {
    const created: EventRequestDto = {
      ...data,
      id: nextId++,
      status: "NUEVA",
      createdAt: new Date().toISOString(),
    };
    requests = [...requests, created];
    return created;
  },

  async updateStatus(id, status) {
    const existing = requests.find((r) => r.id === id);
    if (!existing) throw new Error(`Solicitud ${id} no encontrada`);
    const updated = { ...existing, status };
    requests = requests.map((r) => (r.id === id ? updated : r));
    return updated;
  },
};
