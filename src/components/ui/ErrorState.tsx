import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function ErrorState({
  title = "Algo salió mal",
  description = "No pudimos cargar la información. Probá de nuevo en unos segundos.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-red/20 bg-red/5 px-6 py-16 text-center",
        className,
      )}
    >
      <TriangleAlert className="h-8 w-8 text-red" aria-hidden="true" />
      <p className="font-display text-xl text-carbon">{title}</p>
      <p className="max-w-sm text-sm text-muted">{description}</p>
      {onRetry ? (
        <Button variant="primary" size="md" onClick={onRetry}>
          Reintentar
        </Button>
      ) : null}
    </div>
  );
}
