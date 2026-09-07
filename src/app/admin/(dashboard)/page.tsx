"use client";

import Link from "next/link";
import { Package, PackageX, FolderTree, MessageSquare, ImageOff, Images, Pencil } from "lucide-react";
import { useAdminProductsQuery } from "@/features/products/use-admin-products";
import { useAdminCategoriesQuery } from "@/features/categories/use-admin-categories";
import { useAdminEventRequestsQuery } from "@/features/events/use-admin-events";
import { useAdminSiteImagesQuery } from "@/features/site-images/use-admin-site-images";
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
  const siteImagesQuery = useAdminSiteImagesQuery();

  if (productsQuery.isPending || categoriesQuery.isPending || eventsQuery.isPending || siteImagesQuery.isPending) {
    return <LoadingState label="Cargando dashboard..." />;
  }

  const products = productsQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];
  const events = eventsQuery.data ?? [];
  const siteImages = siteImagesQuery.data ?? [];

  const activeProducts = products.filter((p) => p.active && p.available).length;
  const unavailableProducts = products.filter((p) => !p.available).length;
  const productsWithoutPhoto = products.filter((p) => p.active && !p.imageUrl);
  const loadedSiteImages = siteImages.filter((image) => Boolean(image.imageUrl)).length;
  const recentProducts = [...products].sort((a, b) => b.id - a.id).slice(0, 5);
  const recentEvents = events.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Platos publicados" value={activeProducts} icon={Package} />
        <StatCard label="Sin stock" value={unavailableProducts} icon={PackageX} />
        <StatCard label="Platos sin foto" value={productsWithoutPhoto.length} icon={ImageOff} />
        <StatCard label="Categorías" value={categories.length} icon={FolderTree} />
        <StatCard
          label="Imágenes de la web cargadas"
          value={`${loadedSiteImages} de ${siteImages.length}`}
          icon={Images}
        />
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

      {productsWithoutPhoto.length > 0 ? (
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Platos sin foto</h2>
              <p className="mt-1 text-sm text-slate-500">
                Se publican con el marco de La Nona hasta que les cargues una imagen.
              </p>
            </div>
            <Link href={routes.admin.productos} className="text-sm font-medium text-red hover:underline">
              Ver todos
            </Link>
          </div>
          <ul className="mt-4 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {productsWithoutPhoto.slice(0, 9).map((product) => (
              <li key={product.id} className="border-b border-slate-100 py-2.5 last:border-none">
                <Link
                  href={routes.admin.productoEditar(product.id)}
                  className="flex items-center gap-2 text-sm text-slate-700 hover:text-red"
                >
                  <Pencil className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
    </div>
  );
}
