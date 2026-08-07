"use client";

import { CheckCircle2 } from "lucide-react";
import { useEventRequestForm } from "@/features/events/use-event-request-form";
import { FormField } from "@/components/ui/FormField";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const eventTypeOptions = [
  { value: "PASTA_PARTY", label: "Pasta Party" },
  { value: "PIZZA_PARTY", label: "Pizza Party" },
  { value: "AMBOS", label: "Pizza Party y Pasta Party" },
  { value: "OTRO", label: "Otro / No estoy seguro" },
] as const;

export function EventForm() {
  const { form, onSubmit, status } = useEventRequestForm();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  if (status === "success") {
    return (
      <Card className="flex flex-col items-center gap-3 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-red" aria-hidden="true" />
        <h3 className="font-display text-2xl text-carbon">¡Gracias! Recibimos tu consulta</h3>
        <p className="max-w-sm text-sm text-muted">
          En breve nos vamos a comunicar para coordinar los detalles de tu evento.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate>
        <FormField label="Nombre" htmlFor="name" required error={errors.name?.message}>
          <Input id="name" placeholder="Tu nombre y apellido" {...register("name")} />
        </FormField>

        <FormField label="Teléfono" htmlFor="phone" required error={errors.phone?.message}>
          <Input id="phone" placeholder="11 1234-5678" {...register("phone")} />
        </FormField>

        <FormField label="Email" htmlFor="email" required error={errors.email?.message}>
          <Input id="email" type="email" placeholder="tu@email.com" {...register("email")} />
        </FormField>

        <FormField label="Tipo de evento" htmlFor="eventType" required error={errors.eventType?.message}>
          <Select id="eventType" {...register("eventType")}>
            {eventTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Cantidad estimada de personas" htmlFor="estimatedGuests" required error={errors.estimatedGuests?.message}>
          <Input id="estimatedGuests" type="number" min={1} placeholder="30" {...register("estimatedGuests")} />
        </FormField>

        <FormField label="Fecha del evento" htmlFor="eventDate" required error={errors.eventDate?.message}>
          <Input id="eventDate" type="date" {...register("eventDate")} />
        </FormField>

        <FormField label="Localidad" htmlFor="locality" required error={errors.locality?.message} className="sm:col-span-2">
          <Input id="locality" placeholder="Burzaco, Adrogué, etc." {...register("locality")} />
        </FormField>

        <FormField label="Mensaje" htmlFor="message" error={errors.message?.message} className="sm:col-span-2">
          <Textarea id="message" placeholder="Contanos más sobre tu evento" {...register("message")} />
        </FormField>

        <Button type="submit" variant="primary" size="lg" className="sm:col-span-2" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Solicitar presupuesto"}
        </Button>

        {status === "error" ? (
          <p role="alert" className="text-sm text-red sm:col-span-2">
            No pudimos enviar tu consulta. Probá de nuevo en unos minutos.
          </p>
        ) : null}
      </form>
    </Card>
  );
}
