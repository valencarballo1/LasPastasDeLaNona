import type { AuthSessionDto } from "@/types/auth";

const STORAGE_KEY = "nona-admin-session";

/**
 * Sesión mock en localStorage — solo para poder navegar el panel admin
 * mientras no existe el backend. NO es un mecanismo de autenticación
 * seguro y no debe usarse en producción tal cual: a futuro debe
 * reemplazarse por el JWT emitido por POST /api/auth/login (ASP.NET Core),
 * validado en el servidor.
 */
export function getStoredSession(): AuthSessionDto | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthSessionDto;
  } catch {
    return null;
  }
}

export function storeSession(session: AuthSessionDto) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredSession() {
  window.localStorage.removeItem(STORAGE_KEY);
}
