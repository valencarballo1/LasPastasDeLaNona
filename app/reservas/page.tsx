import { Footer } from "../../src/components/footer/Footer";
import { PageHeader } from "../../src/components/PageHeader";

export default function ReservationsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Reservas"
        title="Reservá tu mesa"
        subtitle="Formulario visual para mesas del restaurante. Queda listo para conectar más adelante con el backend en .NET Core."
      />

      <section className="contentSection contentSection--cream">
        <form className="reservationForm">
          <label>
            Nombre y apellido
            <input type="text" name="name" placeholder="Ej: Juan Pérez" />
          </label>
          <label>
            Teléfono
            <input type="tel" name="phone" placeholder="Ej: 11 1234-5678" />
          </label>
          <label>
            Fecha
            <input type="date" name="date" />
          </label>
          <label>
            Horario
            <input type="time" name="time" />
          </label>
          <label>
            Cantidad de personas
            <input type="number" name="guests" min="1" placeholder="Ej: 4" />
          </label>
          <label>
            Comentarios
            <textarea name="notes" rows={4} placeholder="Cumpleaños, silla para bebé, ubicación preferida..." />
          </label>
          <button type="button">Enviar solicitud</button>
          <p>Este botón no envía datos todavía: queda preparado para la integración del backend.</p>
        </form>
      </section>

      <Footer />
    </main>
  );
}
