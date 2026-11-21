import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { FaqList, LanguageLinks, SiteFooter, SiteHeader, btnPrimary, faqJsonLd, type Faq } from "@/components/marketing/Marketing";
import { LANGUAGE_PAGES, languageBySlug } from "@/lib/languages";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => LANGUAGE_PAGES.map((l) => ({ language: l.slug }));

type Props = { params: { language: string } };

export function generateMetadata({ params }: Props): Metadata {
  const l = languageBySlug(params.language);
  if (!l) return {};
  const title = `Learn ${l.name} Online with an AI Tutor`;
  const description = `Practise speaking ${l.name} with an AI tutor: chat, calls, roleplays and instant pronunciation feedback for beginners to advanced learners.`;
  const url = `/learn/${l.slug}`;
  return { title, description, alternates: { canonical: url }, openGraph: { url, title, description } };
}

export default function LanguagePage({ params }: Props) {
  const l = languageBySlug(params.language);
  if (!l) notFound();
  const english = l.slug === "english";

  const faq: Faq[] = [
    { q: `Can I start learning ${l.name} from zero?`, a: `Yes. Choose the Beginner level and TalkMate keeps its ${l.name} sentences, vocabulary and replies simple, with translations in your own language. You can move to Intermediate or Advanced whenever you are ready.` },
    { q: `How does TalkMate help me speak ${l.name}?`, a: `You talk to an AI tutor by voice or text in Chat Mode, Call Mode and Roleplays. Every message you send gets a correction and an explanation, and in Sentence Mode and Word Mode your pronunciation is rated from 1 to 5.` },
    { q: `Is it free to practise ${l.name}?`, a: "Chat Mode is free for every learner. The other modes (Call, Sentence, Word, Dialogue, Roleplays, Characters, Debates, Photo and Flashcards) need Premium." },
    { q: "Which browser is best for speaking practice?", a: "Speaking practice uses your browser's built-in speech recognition, which works best in Chrome and Edge. You can always type in Chat Mode." },
  ];
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Languages", item: `${SITE_URL}/learn` },
      { "@type": "ListItem", position: 3, name: `Learn ${l.name}`, item: `${SITE_URL}/learn/${l.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0D0E17] text-white">
      <JsonLd data={[breadcrumb, faqJsonLd(faq)]} />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-12">
        <nav aria-label="Breadcrumb" className="text-sm text-white/50">
          <Link href="/" className="hover:text-white">Home</Link> / <Link href="/learn" className="hover:text-white">Languages</Link> / <span className="text-white/80">{l.name}</span>
        </nav>
        <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">Learn {l.name} online with an AI tutor</h1>
        <p className="mt-4 text-lg text-white/70">{l.intro}</p>
        <p className="mt-3 text-white/70">
          With TalkMate you practise {l.name} (<span lang={langCode(l.slug)}>{l.native}</span>) by talking, not just reading: your AI tutor answers in {l.name}, corrects your
          mistakes and explains them in the language you already speak.
        </p>
        <Link href="/login" className={`${btnPrimary} mt-6`}>Start learning {l.name} free</Link>

        <h2 className="mt-14 text-2xl font-bold">Starter {english ? "phrases" : `${l.name} phrases`}</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#171827] text-white/60">
              <tr>
                <th className="px-4 py-3 font-medium">{english ? "Situation" : "In English"}</th>
                <th className="px-4 py-3 font-medium">{l.name}</th>
                {!english && l.phrases.some((p) => p.roman) && <th className="px-4 py-3 font-medium">Pronunciation</th>}
              </tr>
            </thead>
            <tbody>
              {l.phrases.map((p) => (
                <tr key={p.meaning} className="border-t border-white/10">
                  <td className="px-4 py-3 text-white/70">{p.meaning}</td>
                  <td className="px-4 py-3 font-medium" lang={english ? "en" : langCode(l.slug)}>{p.text}</td>
                  {!english && l.phrases.some((q) => q.roman) && <td className="px-4 py-3 text-white/70">{p.roman ?? ""}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-14 text-2xl font-bold">What is hard about {l.name}?</h2>
        <p className="mt-3 text-white/70">{l.tricky}</p>

        <h2 className="mt-14 text-2xl font-bold">How you practise {l.name} on TalkMate</h2>
        <ul className="mt-4 space-y-3 text-white/70">
          <li><strong className="text-white">Chat and Call:</strong> hold a real conversation with an AI tutor and get every message reviewed.</li>
          <li><strong className="text-white">Sentence and Word Mode:</strong> learn useful sentences and words, read them aloud and get a pronunciation rating.</li>
          <li><strong className="text-white">Roleplays and Dialogues:</strong> rehearse ordering food, asking for directions and other everyday situations.</li>
          <li><strong className="text-white">Flashcards, Photo and Debates:</strong> build vocabulary, describe pictures and argue a point in {l.name}.</li>
        </ul>

        <h2 className="mt-14 text-2xl font-bold">{l.name} learning questions</h2>
        <FaqList items={faq} />

        <h2 className="mt-14 text-2xl font-bold">Other languages</h2>
        <LanguageLinks exclude={l.slug} />
      </main>
      <SiteFooter />
    </div>
  );
}

// BCP 47 codes so screen readers and search engines know which language a snippet is in
function langCode(slug: string): string {
  return ({ spanish: "es", french: "fr", german: "de", italian: "it", chinese: "zh", japanese: "ja", korean: "ko", hindi: "hi", bengali: "bn", english: "en", russian: "ru", arabic: "ar" } as Record<string, string>)[slug] ?? "en";
}
