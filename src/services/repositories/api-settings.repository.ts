import { apiClient } from "@/services/api/api-client";
import { endpoints } from "@/services/api/endpoints";
import type { SettingsDto } from "@/types/settings";
import type { SettingsRepository } from "@/services/repositories/settings.repository";

export const apiSettingsRepository: SettingsRepository = {
  get: () => apiClient.get<SettingsDto>(endpoints.settings),
  update: (data) => apiClient.put<SettingsDto>(endpoints.adminSettings, data),
};
