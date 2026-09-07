import { env } from "@/config/env";
import { mockCategoryRepository } from "@/services/repositories/mock-category.repository";
import { apiCategoryRepository } from "@/services/repositories/api-category.repository";
import { mockProductRepository } from "@/services/repositories/mock-product.repository";
import { apiProductRepository } from "@/services/repositories/api-product.repository";
import { mockEventRepository } from "@/services/repositories/mock-event.repository";
import { apiEventRepository } from "@/services/repositories/api-event.repository";
import { mockSettingsRepository } from "@/services/repositories/mock-settings.repository";
import { apiSettingsRepository } from "@/services/repositories/api-settings.repository";
import { mockSiteImageRepository } from "@/services/repositories/mock-site-image.repository";
import { apiSiteImageRepository } from "@/services/repositories/api-site-image.repository";
import { mockMediaRepository } from "@/services/repositories/mock-media.repository";
import { apiMediaRepository } from "@/services/repositories/api-media.repository";

/**
 * Único lugar que decide entre datos mock o la API real, según
 * NEXT_PUBLIC_DATA_SOURCE. Los services/*.service.ts consumen estos
 * repositorios sin saber cuál implementación está activa.
 */
const isMock = env.dataSource === "mock";

export const categoryRepository = isMock ? mockCategoryRepository : apiCategoryRepository;
export const productRepository = isMock ? mockProductRepository : apiProductRepository;
export const eventRepository = isMock ? mockEventRepository : apiEventRepository;
export const settingsRepository = isMock ? mockSettingsRepository : apiSettingsRepository;
export const siteImageRepository = isMock ? mockSiteImageRepository : apiSiteImageRepository;
export const mediaRepository = isMock ? mockMediaRepository : apiMediaRepository;
