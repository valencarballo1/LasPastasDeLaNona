"use client";

import { useAdminEventRequestsQuery, useUpdateEventStatusMutation } from "@/features/events/use-admin-events";
import type { EventRequestDto, EventRequestStatus } from "@/types/event";
import { formatDate } from "@/lib/format";
import { AdminTable, AdminTableHead } from "@/components/admin/AdminTable";
import { Select } from "@/components/ui/Input";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";

const statusOptions: EventRequestStatus[] = ["NUEVA", "CONTACTADO", "PRESUPUESTADO", "CONFIRMADO", "CANCELADO"];

const eventTypeLabels: Record<EventRequestDto["eventType"], string> = {
  PIZZA_PARTY: "Pizza Party",
  PASTA_PARTY: "Pasta Party",
  AMBOS: "Ambos",
  OTRO: "Otro",
};

export default function AdminEventosPage() {
  const eventsQuery = useAdminEventRequestsQuery();
  const updateStatusMutation = useUpdateEventStatusMutation();

  if (eventsQuery.isPending) return <LoadingState label="Cargando solicitudes..." />;
  if (eventsQuery.isError) return <ErrorState onRetry={() => eventsQuery.refetch()} />;

  const requests = eventsQuery.data ?? [];
  if (requests.length === 0) return <EmptyState title="Todavía no hay solicitudes de eventos" />;

  return (
    <AdminTable>
      <AdminTableHead columns={["Nombre", "Teléfono", "Email", "Fecha evento", "Tipo", "Personas", "Consulta", "Estado"]} />
      <tbody className="divide-y divide-slate-100">
        {requests.map((request) => (
          <tr key={request.id}>
            <td className="px-4 py-3 font-medium text-slate-800">{request.name}</td>
            <td className="px-4 py-3 text-slate-500">{request.phone}</td>
            <td className="px-4 py-3 text-slate-500">{request.email}</td>
            <td className="px-4 py-3 text-slate-500">{formatDate(request.eventDate)}</td>
            <td className="px-4 py-3 text-slate-500">{eventTypeLabels[request.eventType]}</td>
            <td className="px-4 py-3 text-slate-500">{request.estimatedGuests}</td>
            <td className="px-4 py-3 text-slate-500">{formatDate(request.createdAt)}</td>
            <td className="px-4 py-3">
              <Select
                value={request.status}
                onChange={(event) =>
                  updateStatusMutation.mutate({ id: request.id, status: event.target.value as EventRequestStatus })
                }
                className="w-40 py-1.5 text-xs"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </td>
          </tr>
        ))}
      </tbody>
    </AdminTable>
  );
}
