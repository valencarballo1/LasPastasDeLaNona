"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { eventRequestSchema, type EventRequestFormValues } from "@/lib/validations/event";
import { createEventRequest } from "@/services/event.service";

/**
 * Encapsula el formulario de presupuesto de eventos: validación con Zod
 * y envío mediante event.service (hoy mock, mañana ASP.NET Core).
 */
export function useEventRequestForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<EventRequestFormValues>({
    resolver: zodResolver(eventRequestSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      eventType: "PASTA_PARTY",
      estimatedGuests: undefined,
      eventDate: "",
      locality: "",
      message: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await createEventRequest({
        ...values,
        message: values.message || undefined,
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  });

  return { form, onSubmit, status };
}
