import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { GuideLinks, SiteFooter, SiteHeader } from "@/components/marketing/Marketing";
import { SITE_URL } from "@/lib/site";

const TITLE = "Language Speaking Guides";
const DESCRIPTION = "Practical guides to speaking a new language: how to practise alone, improve pronunciation and follow a simple 30-day plan.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides" },
  openGraph: { url: "/guides", title: TITLE, description: DESCRIPTION },
};

export default function GuidesIndex() {
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    ],
  };
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <JsonLd data={breadcrumb} />
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-12">
        <h1 className="text-3xl font-bold sm:text-4xl">Language speaking guides</h1>
        <p className="mt-3 max-w-2xl text-muted">{DESCRIPTION}</p>
        <GuideLinks />
      </main>
      <SiteFooter />
    </div>
  );
}
