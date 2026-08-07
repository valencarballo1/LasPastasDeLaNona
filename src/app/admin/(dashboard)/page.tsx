"use client";

import Link from "next/link";
import { Package, PackageX, FolderTree, MessageSquare } from "lucide-react";
import { useAdminProductsQuery } from "@/features/products/use-admin-products";
import { useAdminCategoriesQuery } from "@/features/categories/use-admin-categories";
import { useAdminEventRequestsQuery } from "@/features/events/use-admin-events";
import { routes } from "@/constants/routes";
import { formatDate, formatPrice } from "@/lib/format";
import { StatCard } from "@/components/admin/StatCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LoadingState } from "@/components/ui/LoadingState";

export default function AdminDashboardPage() {
  const productsQuery = useAdminProductsQuery();
  const categoriesQuery = useAdminCategoriesQuery();
  const eventsQuery = useAdminEventRequestsQuery();

  if (productsQuery.isPending || categoriesQuery.isPending || eventsQuery.isPending) {
    return <LoadingState label="Cargando dashboard..." />;
  }

  const products = productsQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];
  const events = eventsQuery.data ?? [];

  const activeProducts = products.filter((p) => p.active && p.available).length;
  const unavailableProducts = products.filter((p) => !p.available).length;
  const recentProducts = [...products].sort((a, b) => b.id - a.id).slice(0, 5);
  const recentEvents = events.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Productos activos" value={activeProducts} icon={Package} />
        <StatCard label="Sin stock" value={unavailableProducts} icon={PackageX} />
        <StatCard label="Categorías" value={categories.length} icon={FolderTree} />
        <StatCard label="Consultas de eventos" value={events.length} icon={MessageSquare} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Últimos productos editados</h2>
            <Link href={routes.admin.productos} className="text-sm font-medium text-red hover:underline">
              Ver todos
            </Link>
          </div>
          <ul className="mt-4 flex flex-col divide-y divide-slate-100">
            {recentProducts.map((product) => (
              <li key={product.id} className="flex items-center justify-between py-3 text-sm">
                <span className="font-medium text-slate-800">{product.name}</span>
                <span className="text-slate-500">{formatPrice(product.price)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Consultas recientes</h2>
            <Link href={routes.admin.eventos} className="text-sm font-medium text-red hover:underline">
              Ver todas
            </Link>
          </div>
          <ul className="mt-4 flex flex-col divide-y divide-slate-100">
            {recentEvents.map((event) => (
              <li key={event.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium text-slate-800">{event.name}</p>
                  <p className="text-xs text-slate-500">{formatDate(event.createdAt)}</p>
                </div>
                <Badge tone={event.status === "NUEVA" ? "gold" : "muted"}>{event.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
