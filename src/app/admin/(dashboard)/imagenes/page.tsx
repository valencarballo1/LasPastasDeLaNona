"use client";

import { siteImageSections } from "@/constants/site-images";
import { useAdminSiteImagesQuery, useUpdateSiteImageMutation } from "@/features/site-images/use-admin-site-images";
import { SiteImageCard } from "@/components/admin/SiteImageCard";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";

/**
 * Imágenes de la web, agrupadas por dónde aparecen: cabecera, portadas de
 * cada página, secciones del inicio, galerías, eventos y marca.
 */
export default function AdminImagenesPage() {
  const siteImagesQuery = useAdminSiteImagesQuery();
  const updateSiteImageMutation = useUpdateSiteImageMutation();

  if (siteImagesQuery.isPending) return <LoadingState label="Cargando imágenes..." />;
  if (siteImagesQuery.isError) return <ErrorState onRetry={() => siteImagesQuery.refetch()} />;

  const images = siteImagesQuery.data ?? [];
  const byKey = new Map(images.map((image) => [image.key, image] as const));
  const total = siteImageSections.reduce((count, section) => count + section.slots.length, 0);
  const loaded = images.filter((image) => Boolean(image.imageUrl)).length;

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-600">
          Cada imagen de la web tiene su lugar fijo. Reemplazá la que quieras: se guarda al instante y las que
          queden vacías se muestran con el marco de La Nona hasta que subas una foto.
        </p>
        <p className="mt-3 text-sm font-medium text-slate-900">
          {loaded} de {total} imágenes cargadas
        </p>

        <nav aria-label="Secciones de imágenes" className="mt-4 flex flex-wrap gap-2">
          {siteImageSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-red/40 hover:text-red"
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>

      {siteImageSections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24">
          <h2 className="text-base font-semibold text-slate-900">{section.title}</h2>
          <p className="mt-1 text-sm text-slate-500">{section.description}</p>

          <div className="mt-4 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {section.slots.map((slot) => (
              <SiteImageCard
                key={slot.key}
                slot={slot}
                image={byKey.get(slot.key)}
                onSave={(data) => updateSiteImageMutation.mutateAsync({ key: slot.key, data })}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
