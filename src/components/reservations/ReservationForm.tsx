"use client";

import { FormEvent, useMemo, useState } from "react";
import { buildWhatsAppUrl } from "../../data/local-info";
import { BootstrapIcon } from "../icons/BootstrapIcon";

type FormState = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: "",
  notes: "",
};

export function ReservationForm() {
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState("");

  const whatsappUrl = useMemo(() => {
    const lines = [
      "Hola, quiero reservar una mesa en Las Pastas de la Nona.",
      `Nombre: ${form.name || "-"}`,
      `Teléfono: ${form.phone || "-"}`,
      `Fecha: ${form.date || "-"}`,
      `Horario: ${form.time || "-"}`,
      `Personas: ${form.guests || "-"}`,
      `Comentarios: ${form.notes || "-"}`,
    ];

    return buildWhatsAppUrl(lines.join("\n"));
  }, [form]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name || !form.phone || !form.date || !form.time || !form.guests) {
      setMessage("Completá nombre, teléfono, fecha, horario y cantidad de personas para armar el mensaje.");
      return;
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setMessage("Abrimos WhatsApp con tu solicitud. La reserva queda confirmada cuando el local te responda.");
  }

  return (
    <form className="reservationForm" onSubmit={handleSubmit}>
      <div className="reservationForm__intro">
        <p className="eyebrow">Solicitud por WhatsApp</p>
        <h2>Completá tus datos y enviá el pedido</h2>
        <p>El formulario arma un mensaje listo para WhatsApp. Así el cliente no escribe todo de cero y el local recibe la información ordenada.</p>
      </div>

      <label>
        Nombre y apellido
        <input type="text" name="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Ej: Juan Pérez" required />
      </label>
      <label>
        Teléfono
        <input type="tel" name="phone" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="Ej: 11 1234-5678" required />
      </label>
      <label>
        Fecha
        <input type="date" name="date" value={form.date} onChange={(event) => updateField("date", event.target.value)} required />
      </label>
      <label>
        Horario
        <input type="time" name="time" value={form.time} onChange={(event) => updateField("time", event.target.value)} required />
      </label>
      <label>
        Cantidad de personas
        <input type="number" name="guests" min="1" value={form.guests} onChange={(event) => updateField("guests", event.target.value)} placeholder="Ej: 4" required />
      </label>
      <label className="reservationForm__wide">
        Comentarios
        <textarea name="notes" rows={4} value={form.notes} onChange={(event) => updateField("notes", event.target.value)} placeholder="Cumpleaños, silla para bebé, ubicación preferida..." />
      </label>

      <div className="reservationForm__actions">
        <button type="submit">
          Enviar por WhatsApp
          <BootstrapIcon name="whatsapp" className="buttonIcon" />
        </button>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">Abrir mensaje sin validar</a>
      </div>
      {message ? <p className="reservationForm__message">{message}</p> : null}
    </form>
  );
}
