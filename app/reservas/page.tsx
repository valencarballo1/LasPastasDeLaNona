import { Footer } from "../../src/components/footer/Footer";
import { PageHeader } from "../../src/components/PageHeader";
import { ReservationForm } from "../../src/components/reservations/ReservationForm";

export default function ReservationsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Reservas"
        title="Reservá tu mesa"
        subtitle="Completá la solicitud y enviála por WhatsApp para que el local pueda confirmar disponibilidad. La reserva queda confirmada cuando recibís respuesta."
      />

      <section className="contentSection contentSection--cream">
        <ReservationForm />
      </section>

      <Footer />
    </main>
  );
}
