import { apiClient } from "@/services/api/api-client";
import { endpoints } from "@/services/api/endpoints";
import type { MediaAssetDto } from "@/types/media";
import type { MediaRepository } from "@/services/repositories/media.repository";

export const apiMediaRepository: MediaRepository = {
  async upload(file) {
    const formData = new FormData();
    formData.append("file", file, file.name);

    // multipart/form-data: el Content-Type lo pone el browser junto al boundary.
    return apiClient.upload<MediaAssetDto>(endpoints.adminMedia, formData);
  },
};
