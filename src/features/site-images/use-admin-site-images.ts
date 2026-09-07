"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SiteImageKey } from "@/constants/site-images";
import { getSiteImages, updateSiteImage } from "@/services/site-image.service";
import type { UpdateSiteImagePayload } from "@/types/site-image";

const siteImagesKey = ["admin", "site-images"] as const;

export function useAdminSiteImagesQuery() {
  return useQuery({ queryKey: siteImagesKey, queryFn: () => getSiteImages() });
}

export function useUpdateSiteImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ key, data }: { key: SiteImageKey; data: UpdateSiteImagePayload }) => updateSiteImage(key, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: siteImagesKey }),
  });
}
