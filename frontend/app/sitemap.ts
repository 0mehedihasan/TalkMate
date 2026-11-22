import type { MetadataRoute } from "next";
import { LANGUAGE_PAGES } from "@/lib/languages";
import { SITE_URL } from "@/lib/site";

// Only public pages belong here; everything behind a login is excluded on purpose.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/learn`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...LANGUAGE_PAGES.map((l) => ({ url: `${SITE_URL}/learn/${l.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
