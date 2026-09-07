"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import type { SiteImageSlot } from "@/constants/site-images";
import type { SiteImageDto, UpdateSiteImagePayload } from "@/types/site-image";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

interface SiteImageCardProps {
  slot: SiteImageSlot;
  image?: SiteImageDto;
  onSave: (data: UpdateSiteImagePayload) => Promise<unknown>;
}

function toPayload(imageUrl: string | undefined, alt: string): UpdateSiteImagePayload {
  return { imageUrl: imageUrl ?? null, alt: alt.trim() || null };
}

/** Una imagen de la web: dónde aparece, qué medida conviene y sus acciones. */
export function SiteImageCard({ slot, image, onSave }: SiteImageCardProps) {
  const [alt, setAlt] = useState(image?.alt ?? "");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const currentUrl = image?.imageUrl;
  const hasImage = Boolean(currentUrl);

  async function save(imageUrl: string | undefined, nextAlt: string) {
    setStatus("saving");
    try {
      await onSave(toPayload(imageUrl, nextAlt));
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{slot.label}</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">{slot.description}</p>
        </div>
        <Badge tone={hasImage ? "success" : "muted"}>{hasImage ? "Cargada" : "Sin imagen"}</Badge>
      </div>

      <ImageUploadField
        value={currentUrl}
        onChange={(url) => void save(url, alt)}
        previewAlt={alt.trim() || slot.defaultAlt}
        aspect={slot.aspect}
        disabled={status === "saving"}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`alt-${slot.key}`} className="text-xs font-semibold text-slate-700">
          Texto alternativo
        </label>
        <Input
          id={`alt-${slot.key}`}
          value={alt}
          placeholder={slot.defaultAlt}
          disabled={status === "saving"}
          onChange={(event) => setAlt(event.target.value)}
          onBlur={() => {
            if ((image?.alt ?? "") !== alt) void save(currentUrl, alt);
          }}
          className="text-sm"
        />
        <p className="text-xs text-slate-400">
          Describe la foto para quien no puede verla y para Google. Vacío = se usa el texto sugerido.
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs">
        <span className="text-slate-400">Medida sugerida: {slot.recommendedSize}</span>
        {status === "saving" ? (
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            Guardando
          </span>
        ) : status === "saved" ? (
          <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            Guardado
          </span>
        ) : status === "error" ? (
          <span role="alert" className="font-medium text-red">
            No se pudo guardar
          </span>
        ) : null}
      </div>
    </div>
  );
}
