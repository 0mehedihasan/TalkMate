import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { LANGUAGE_PAGES } from "@/lib/languages";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";

// Only public pages belong here; everything behind a login is excluded on purpose.
// lastModified is a fixed date (CONTENT_UPDATED in lib/site.ts), not "now": a date that changes on every build is ignored by Google.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/learn`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    ...LANGUAGE_PAGES.map((l) => ({ url: `${SITE_URL}/learn/${l.slug}`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${SITE_URL}/guides`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.7 },
    ...GUIDES.map((g) => ({ url: `${SITE_URL}/guides/${g.slug}`, lastModified: new Date(g.updated), changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${SITE_URL}/privacy`, lastModified: new Date("2026-11-19"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
