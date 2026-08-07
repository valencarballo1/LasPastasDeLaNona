"use client";

import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { useAdminSession } from "@/features/auth/use-admin-session";
import { routes } from "@/constants/routes";
import { siteConfig } from "@/config/site";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminSession();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setError(null);
    try {
      await login(values);
      router.push(routes.admin.dashboard);
    } catch {
      setError("No pudimos iniciar sesión. Probá de nuevo.");
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-carbon px-4 py-10">
      <Card className="w-full max-w-sm p-8">
        <div className="flex flex-col items-center text-center">
          <Image src="/images/brand/logo.png" alt={siteConfig.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
          <h1 className="mt-4 font-display text-2xl text-carbon">Panel administrativo</h1>
          <p className="mt-1 text-sm text-muted">{siteConfig.name}</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4" noValidate>
          <FormField label="Email" htmlFor="email" required error={errors.email?.message}>
            <Input id="email" type="email" placeholder="admin@laspastasdelanona.com" {...register("email")} />
          </FormField>

          <FormField label="Contraseña" htmlFor="password" required error={errors.password?.message}>
            <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
          </FormField>

          {error ? (
            <p role="alert" className="text-sm text-red">
              {error}
            </p>
          ) : null}

          <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          Acceso mock para desarrollo. Se reemplazará por autenticación real contra la API.
        </p>

        <Link href={routes.home} className="mt-4 block text-center text-xs text-muted underline-nona hover:text-red">
          Volver al sitio
        </Link>
      </Card>
    </div>
  );
}
