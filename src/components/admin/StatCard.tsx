import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function StatCard({ label, value, icon: Icon }: { label: string; value: number | string; icon: LucideIcon }) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red/10 text-red">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </Card>
  );
}
