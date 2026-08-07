import { settingsRepository } from "@/services/repositories";

export function getSettings() {
  return settingsRepository.get();
}

export function updateSettings(...args: Parameters<typeof settingsRepository.update>) {
  return settingsRepository.update(...args);
}
