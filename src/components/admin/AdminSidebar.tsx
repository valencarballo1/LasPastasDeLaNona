"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpenText, Package, FolderTree, PartyPopper, Settings, Images } from "lucide-react";
import { routes } from "@/constants/routes";
import { siteConfig } from "@/config/site";
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

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
        <Image src="/images/brand/logo.png" alt={siteConfig.name} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
        <div>
          <p className="text-sm font-semibold text-slate-900">La Nona</p>
          <p className="text-xs text-slate-500">Panel admin</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-red/10 text-red" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
