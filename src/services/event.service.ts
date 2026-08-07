import { eventRepository } from "@/services/repositories";

export function getEventRequests() {
  return eventRepository.getAll();
}

export function createEventRequest(...args: Parameters<typeof eventRepository.create>) {
  return eventRepository.create(...args);
}

export function updateEventRequestStatus(...args: Parameters<typeof eventRepository.updateStatus>) {
  return eventRepository.updateStatus(...args);
}
