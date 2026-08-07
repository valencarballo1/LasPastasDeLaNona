/**
 * Contrato preparado para el futuro login del panel admin contra
 * ASP.NET Core (POST /api/auth/login → JWT).
 */
export interface AdminUserDto {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF";
}

export interface AuthSessionDto {
  token: string;
  expiresAt: string;
  user: AdminUserDto;
}

export interface LoginPayload {
  email: string;
  password: string;
}
