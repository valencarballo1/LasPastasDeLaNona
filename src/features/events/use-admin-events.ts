"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEventRequests, updateEventRequestStatus } from "@/services/event.service";
import type { EventRequestStatus } from "@/types/event";

const eventsKey = ["admin", "event-requests"] as const;

export function useAdminEventRequestsQuery() {
  return useQuery({ queryKey: eventsKey, queryFn: () => getEventRequests() });
}

export function useUpdateEventStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: EventRequestStatus }) => updateEventRequestStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: eventsKey }),
  });
}
