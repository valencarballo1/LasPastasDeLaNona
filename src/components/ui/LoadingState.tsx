import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingState({ label = "Cargando...", className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 px-6 py-16 text-center", className)}>
      <Loader2 className="h-7 w-7 animate-spin text-red" aria-hidden="true" />
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
