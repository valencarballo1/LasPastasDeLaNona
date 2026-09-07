import type { SiteImageKey } from "@/constants/site-images";
import type { SiteImageDto, UpdateSiteImagePayload } from "@/types/site-image";

export interface SiteImageRepository {
  getAll(): Promise<SiteImageDto[]>;
  update(key: SiteImageKey, data: UpdateSiteImagePayload): Promise<SiteImageDto>;
}
