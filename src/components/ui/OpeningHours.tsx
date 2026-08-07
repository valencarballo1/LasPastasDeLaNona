import { Clock } from "lucide-react";
import type { OpeningHoursEntry } from "@/types/settings";

/** Muestra los horarios reales configurados; nunca inventa valores. */
export function OpeningHours({ hours }: { hours: OpeningHoursEntry[] }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-carbon">
        <Clock className="h-4 w-4 text-red" aria-hidden="true" />
        Horarios
      </p>
      {hours.length > 0 ? (
        <ul className="mt-2 flex flex-col gap-1 text-sm text-muted">
          {hours.map((entry) => (
            <li key={entry.days}>
              <span className="font-medium text-carbon">{entry.days}:</span> {entry.hours}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-muted">Horarios a confirmar — consultanos por WhatsApp.</p>
      )}
    </div>
  );
}
