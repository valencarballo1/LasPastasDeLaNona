"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useAdminSession } from "@/features/auth/use-admin-session";
import { routes } from "@/constants/routes";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileSidebar } from "@/components/admin/AdminMobileSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { LoadingState } from "@/components/ui/LoadingState";
import { AdminProviders } from "@/app/admin/providers";

const titles: Record<string, string> = {
  [routes.admin.dashboard]: "Dashboard",
  [routes.admin.productos]: "Productos",
  [routes.admin.productoNuevo]: "Nuevo producto",
  [routes.admin.categorias]: "Categorías",
  [routes.admin.imagenes]: "Imágenes de la web",
  [routes.admin.eventos]: "Solicitudes de eventos",
  [routes.admin.configuracion]: "Configuración",
};

function resolveTitle(pathname: string) {
  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith("/admin/productos/")) return "Editar producto";
  return "Panel administrativo";
}

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { session, loading } = useAdminSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !session) router.replace(routes.admin.login);
  }, [loading, session, router]);

  if (loading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <LoadingState label="Verificando sesión..." />
      </div>
    );
  }

  return (
    <AdminProviders>
      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar />
        <AdminMobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="flex min-h-screen flex-1 flex-col">
          <AdminHeader title={resolveTitle(pathname)} onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 px-5 py-8 sm:px-8">{children}</main>
        </div>
      </div>
    </AdminProviders>
  );
}
