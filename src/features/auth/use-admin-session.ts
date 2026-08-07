"use client";

import { useCallback, useEffect, useState } from "react";
import type { AuthSessionDto, LoginPayload } from "@/types/auth";
import { clearStoredSession, getStoredSession, storeSession } from "@/features/auth/session";

/**
 * Login mock: acepta cualquier credencial con formato válido y genera un
 * token ficticio. Preparado para reemplazarse por una llamada real a
 * POST /api/auth/login que devuelva un JWT.
 */
async function mockLogin(payload: LoginPayload) {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    token: `mock-token-${Date.now()}`,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
    user: {
      id: 1,
      name: "Administrador",
      email: payload.email,
      role: "ADMIN" as const,
    },
  };
}

export function useAdminSession() {
  // Se inicializa en null (nunca lee localStorage durante el render) para
  // que el primer render en el cliente coincida con el SSR.
  const [session, setSession] = useState<AuthSessionDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Leer localStorage recién después del montaje (no en el render inicial)
    // a propósito: evita un mismatch de hidratación entre SSR y cliente.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(getStoredSession());
    setLoading(false);
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const newSession = await mockLogin(payload);
    storeSession(newSession);
    setSession(newSession);
    return newSession;
  }, []);

  const logout = useCallback(() => {
    clearStoredSession();
    setSession(null);
  }, []);

  return { session, loading, login, logout };
}
