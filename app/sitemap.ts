import type { MetadataRoute } from "next";
import { MAJOR_GU } from "@/content/gu";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE.url, priority: 1 }, ...MAJOR_GU.map((g) => ({ url: `${SITE.url}/gu/${g.slug}`, priority: 0.8 }))];
}
