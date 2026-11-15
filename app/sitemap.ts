import type { MetadataRoute } from "next";
import { MAJOR_GU } from "@/content/gu";
import { SITE, UPDATED } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(UPDATED.root),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...MAJOR_GU.map((g) => ({
      url: `${SITE.url}/gu/${g.slug}`,
      lastModified: new Date(UPDATED[g.slug] ?? UPDATED.root),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
