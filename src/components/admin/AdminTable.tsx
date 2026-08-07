import type { ReactNode } from "react";

export function AdminTable({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[720px] text-left text-sm">{children}</table>
    </div>
  );
}

export function AdminTableHead({ columns }: { columns: string[] }) {
  return (
    <thead className="border-b border-slate-200 bg-slate-50">
      <tr>
        {columns.map((column) => (
          <th key={column} className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
}
