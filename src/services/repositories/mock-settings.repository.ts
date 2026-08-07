import { mockSettings } from "@/mocks/settings.mock";
import type { SettingsDto } from "@/types/settings";
import type { SettingsRepository } from "@/services/repositories/settings.repository";

let settings: SettingsDto = { ...mockSettings };

export const mockSettingsRepository: SettingsRepository = {
  async get() {
    return settings;
  },

  async update(data) {
    settings = { ...settings, ...data };
    return settings;
  },
};
