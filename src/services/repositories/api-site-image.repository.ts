import { apiClient } from "@/services/api/api-client";
import { endpoints } from "@/services/api/endpoints";
import type { SiteImageDto } from "@/types/site-image";
import type { SiteImageRepository } from "@/services/repositories/site-image.repository";

export const apiSiteImageRepository: SiteImageRepository = {
  getAll: () => apiClient.get<SiteImageDto[]>(endpoints.siteImages),
  update: (key, data) => apiClient.put<SiteImageDto>(endpoints.adminSiteImage(key), data),
};
