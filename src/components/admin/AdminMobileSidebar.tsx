"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LayoutDashboard, BookOpenText, Package, FolderTree, PartyPopper, Settings, Images } from "lucide-react";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

const links = [
  { label: "Dashboard", href: routes.admin.dashboard, icon: LayoutDashboard },
  { label: "Carta", href: routes.carta, icon: BookOpenText },
  { label: "Productos", href: routes.admin.productos, icon: Package },
  { label: "Categorías", href: routes.admin.categorias, icon: FolderTree },
  { label: "Imágenes", href: routes.admin.imagenes, icon: Images },
  { label: "Eventos", href: routes.admin.eventos, icon: PartyPopper },
  { label: "Configuración", href: routes.admin.configuracion, icon: Settings },
] as const;

export function AdminMobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed inset-0 z-[90] transition-opacity duration-300 lg:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Menú del panel"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className={cn(
          "absolute left-0 top-0 flex h-full w-72 flex-col bg-white shadow-xl transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <span className="text-sm font-semibold text-slate-900">Panel admin</span>
          <button type="button" onClick={onClose} aria-label="Cerrar menú" className="rounded-md p-1.5 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                  isActive ? "bg-red/10 text-red" : "text-slate-600 hover:bg-slate-100",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
