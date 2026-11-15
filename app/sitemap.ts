import type { MetadataRoute } from "next";
import { MAJOR_GU } from "@/content/gu";
import { SITE } from "@/content/site";

/** Last significant content update dates per page (W3C Datetime format).
 *  Reflects actual content revisions rather than dynamic request timestamps. */
const LAST_MODIFIED: Record<string, string> = {
  root: "2026-11-13",
  "myriad-voices": "2026-11-10",
  "numeral-insight": "2026-11-07",
  "blood-seal": "2026-10-26",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(LAST_MODIFIED.root),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...MAJOR_GU.map((g) => ({
      url: `${SITE.url}/gu/${g.slug}`,
      lastModified: new Date(LAST_MODIFIED[g.slug] ?? LAST_MODIFIED.root),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
