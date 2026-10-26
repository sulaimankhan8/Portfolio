import type { MetadataRoute } from "next";
import { MAJOR_GU } from "@/content/gu";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE.url, lastModified, changeFrequency: "monthly", priority: 1 },
    ...MAJOR_GU.map((g) => ({
      url: `${SITE.url}/gu/${g.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
