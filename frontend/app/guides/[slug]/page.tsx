import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { GuideLinks, LanguageLinks, SiteFooter, SiteHeader, btnPrimary } from "@/components/marketing/Marketing";
import { GUIDES, guideBySlug } from "@/lib/guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));

// Next 16: params is a Promise.
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = guideBySlug((await params).slug);
  if (!g) return {};
  const url = `/guides/${g.slug}`;
  return {
    title: g.title, description: g.description, alternates: { canonical: url },
    openGraph: { type: "article", url, title: g.title, description: g.description, publishedTime: g.published, modifiedTime: g.updated },
  };
}

export default async function GuidePage({ params }: Props) {
  const g = guideBySlug((await params).slug);
  if (!g) notFound();

  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      { "@type": "ListItem", position: 3, name: g.title, item: `${SITE_URL}/guides/${g.slug}` },
    ],
  };
  const article = {
    "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.description,
    datePublished: g.published, dateModified: g.updated, inLanguage: "en",
    mainEntityOfPage: `${SITE_URL}/guides/${g.slug}`,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo/logo-mark.png` } },
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <JsonLd data={[breadcrumb, article]} />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-12">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/" className="hover:text-ink">Home</Link> / <Link href="/guides" className="hover:text-ink">Guides</Link>
        </nav>
        <article>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{g.title}</h1>
          <p className="mt-2 text-sm text-subtle">Updated <time dateTime={g.updated}>{new Date(g.updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time></p>
          <p className="mt-6 text-lg leading-relaxed text-muted">{g.intro}</p>
          {g.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="mt-10 text-2xl font-bold">{s.heading}</h2>
              {s.paragraphs.map((t) => <p key={t} className="mt-3 leading-relaxed text-muted">{t}</p>)}
            </section>
          ))}
        </article>

        <div className="mt-14 rounded-card border border-brand-400/20 bg-surface p-6">
          <h2 className="text-xl font-bold">Practise speaking with TalkMate</h2>
          <p className="mt-2 text-muted">Chat with an AI tutor that corrects every message and rates your pronunciation. Chat Mode is free.</p>
          <Link href="/login" className={`${btnPrimary} mt-5`}>Start practising free</Link>
        </div>

        <h2 className="mt-14 text-2xl font-bold">More guides</h2>
        <GuideLinks exclude={g.slug} />
        <h2 className="mt-14 text-2xl font-bold">Choose a language</h2>
        <LanguageLinks />
      </main>
      <SiteFooter />
    </div>
  );
}
