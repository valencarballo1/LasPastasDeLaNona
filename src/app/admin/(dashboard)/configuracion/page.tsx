"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { getSettings, updateSettings } from "@/services/settings.service";
import { settingsSchema, type SettingsFormValues } from "@/lib/validations/settings";
import { FormField } from "@/components/ui/FormField";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LoadingState } from "@/components/ui/LoadingState";

export default function AdminConfiguracionPage() {
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { openingHours: [] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "openingHours" });

  useEffect(() => {
    getSettings().then((settings) => {
      reset({
        phone: settings.phone,
        whatsappNumber: settings.whatsappNumber,
        instagramUrl: settings.instagramUrl,
        address: settings.address,
        mainText: settings.mainText,
        googleMapsUrl: settings.googleMapsUrl,
        openingHours: settings.openingHours,
      });
      setLoading(false);
    });
  }, [reset]);

  const onSubmit = handleSubmit(async (values) => {
    setSaved(false);
    await updateSettings(values);
    setSaved(true);
  });

  if (loading) return <LoadingState label="Cargando configuración..." />;

  return (
    <Card className="max-w-3xl p-6 sm:p-8">
      <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Teléfono" htmlFor="phone" error={errors.phone?.message}>
            <Input id="phone" {...register("phone")} />
          </FormField>

          <FormField label="WhatsApp" htmlFor="whatsappNumber" required error={errors.whatsappNumber?.message} hint="Solo números, con código de país">
            <Input id="whatsappNumber" {...register("whatsappNumber")} />
          </FormField>

          <FormField label="Instagram" htmlFor="instagramUrl" error={errors.instagramUrl?.message}>
            <Input id="instagramUrl" {...register("instagramUrl")} />
          </FormField>

          <FormField label="Dirección" htmlFor="address" required error={errors.address?.message}>
            <Input id="address" {...register("address")} />
          </FormField>

          <FormField label="Google Maps URL" htmlFor="googleMapsUrl" error={errors.googleMapsUrl?.message} className="sm:col-span-2">
            <Input id="googleMapsUrl" {...register("googleMapsUrl")} />
          </FormField>

          <FormField label="Texto principal" htmlFor="mainText" error={errors.mainText?.message} className="sm:col-span-2">
            <Textarea id="mainText" {...register("mainText")} />
          </FormField>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Horarios</h2>
            <Button type="button" variant="ghost" size="md" onClick={() => append({ days: "", hours: "" })}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Agregar horario
            </Button>
          </div>

          <div className="mt-3 flex flex-col gap-3">
            {fields.length === 0 ? (
              <p className="text-sm text-slate-500">Todavía no hay horarios cargados.</p>
            ) : (
              fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-[1fr_1fr_auto] items-end gap-3">
                  <FormField label="Días" htmlFor={`days-${field.id}`} error={errors.openingHours?.[index]?.days?.message}>
                    <Input id={`days-${field.id}`} placeholder="Martes a domingo" {...register(`openingHours.${index}.days`)} />
                  </FormField>
                  <FormField label="Horario" htmlFor={`hours-${field.id}`} error={errors.openingHours?.[index]?.hours?.message}>
                    <Input id={`hours-${field.id}`} placeholder="12:00 a 16:00" {...register(`openingHours.${index}.hours`)} />
                  </FormField>
                  <Button type="button" variant="ghost" size="md" onClick={() => remove(index)} aria-label="Quitar horario">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar configuración"}
          </Button>
          {saved ? <span className="text-sm text-emerald-600">Cambios guardados.</span> : null}
        </div>
      </form>
    </Card>
  );
}
