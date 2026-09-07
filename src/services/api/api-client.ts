import { env } from "@/config/env";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * Cliente HTTP central para la futura API en ASP.NET Core.
 * Todos los repositorios `api-*.repository.ts` pasan por acá — cuando el
 * backend esté disponible, no hace falta tocar servicios ni componentes.
 */
async function request<T>(path: string, { params, headers, ...init }: RequestOptions = {}): Promise<T> {
  const url = new URL(path.replace(/^\//, ""), `${env.apiUrl}/`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, String(value));
    });
  }

  // FormData trae su propio Content-Type (con el boundary): si lo forzamos
  // a JSON el backend no puede parsear la subida de archivos.
  const isFormData = typeof FormData !== "undefined" && init.body instanceof FormData;

  const response = await fetch(url.toString(), {
    ...init,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(`Error ${response.status} al consultar ${path}`, response.status);
  }

  if (response.status === 204) return undefined as T;

  return (await response.json()) as T;
}

export const apiClient = {
  get: <T>(path: string, params?: RequestOptions["params"]) => request<T>(path, { method: "GET", params }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  /** POST multipart/form-data — usado para subir imágenes. */
  upload: <T>(path: string, formData: FormData) => request<T>(path, { method: "POST", body: formData }),
};
