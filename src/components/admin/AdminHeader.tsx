"use client";

import { LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminSession } from "@/features/auth/use-admin-session";
import { routes } from "@/constants/routes";

export function AdminHeader({ title, onMenuClick }: { title: string; onMenuClick?: () => void }) {
  const router = useRouter();
  const { session, logout } = useAdminSession();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Abrir menú"
          className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden text-sm text-slate-500 sm:block">{session?.user.email}</span>
        <button
          type="button"
          onClick={() => {
            logout();
            router.push(routes.admin.login);
          }}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Salir
        </button>
      </div>
    </header>
  );
}
