import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { GuideLinks, LanguageLinks, SiteFooter, SiteHeader } from "@/components/marketing/Marketing";
import { LANGUAGE_PAGES } from "@/lib/languages";
import { SITE_URL } from "@/lib/site";

const TITLE = "Learn Languages Online with an AI Tutor";
const DESCRIPTION = `Choose from ${LANGUAGE_PAGES.length} languages and practise speaking with an AI tutor that corrects your mistakes and rates your pronunciation.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/learn" },
  openGraph: { url: "/learn", title: TITLE, description: DESCRIPTION },
};

export default function LearnIndex() {
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Languages", item: `${SITE_URL}/learn` },
    ],
  };
  const list = {
    "@context": "https://schema.org", "@type": "ItemList", name: "Languages you can learn with TalkMate",
    itemListElement: LANGUAGE_PAGES.map((l, i) => ({ "@type": "ListItem", position: i + 1, name: `Learn ${l.name}`, url: `${SITE_URL}/learn/${l.slug}` })),
  };
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <JsonLd data={[breadcrumb, list]} />
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="text-3xl font-bold sm:text-4xl">Learn languages online with an AI tutor</h1>
        <p className="mt-3 max-w-2xl text-muted">{DESCRIPTION}</p>
        <p className="mt-3 max-w-2xl text-muted">
          Every language has Beginner, Intermediate and Advanced levels. You can chat by text, make voice calls, act out everyday scenes, practise
          pronunciation with a 1 to 5 rating, and read each correction in the language you already speak. Pick a language to see its writing system,
          everyday phrases and tips.
        </p>
        <LanguageLinks />
        <h2 className="mt-16 text-2xl font-bold">Speaking guides</h2>
        <GuideLinks />
      </main>
      <SiteFooter />
    </div>
  );
}
