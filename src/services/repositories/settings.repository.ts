import type { SettingsDto } from "@/types/settings";

export interface SettingsRepository {
  get(): Promise<SettingsDto>;
  update(data: Partial<SettingsDto>): Promise<SettingsDto>;
}
