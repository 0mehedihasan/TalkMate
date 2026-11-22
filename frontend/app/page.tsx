import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { AuthRedirect } from "@/components/marketing/AuthRedirect";
import { FaqList, LanguageLinks, SiteFooter, SiteHeader, btnGhost, btnPrimary, faqJsonLd, type Faq } from "@/components/marketing/Marketing";
import Link from "next/link";
import { MODES } from "@/lib/modes";
import { LANGUAGE_PAGES } from "@/lib/languages";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const FAQ: Faq[] = [
  { q: "What is TalkMate?", a: "TalkMate is an AI language tutor that runs in your browser. You chat, call and role-play with the tutor, and it corrects your messages, explains the corrections and rates your pronunciation." },
  { q: "Which languages can I learn?", a: `You can practise ${LANGUAGE_PAGES.map((l) => l.name).join(", ")}. Each one has Beginner, Intermediate and Advanced levels, and you can read the feedback in your own language.` },
  { q: "Is TalkMate free?", a: "Chat Mode is free for every learner. The other modes (Call, Sentence, Word, Dialogue, Roleplays, Characters, Debates, Photo and Flashcards) need Premium." },
  { q: "Do I need to speak out loud?", a: "No. In Chat Mode you can type. Speaking practice uses your browser's built-in speech recognition, which works best in Chrome and Edge." },
  { q: "How does the pronunciation rating work?", a: "In Sentence Mode and Word Mode you read a sentence aloud. TalkMate compares what your browser heard with the sentence, word by word, and gives a rating from 1 to 5 with a tip." },
  { q: "Can a complete beginner use it?", a: "Yes. Pick the Beginner level and the tutor keeps its sentences short and simple, with translations in your own language. Move up whenever you feel ready." },
];

export default function Home() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/logo/logo-mark.png` },
    { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    {
      "@context": "https://schema.org", "@type": "SoftwareApplication", name: SITE_NAME, url: SITE_URL,
      applicationCategory: "EducationalApplication", operatingSystem: "Web", description: SITE_DESCRIPTION,
      inLanguage: "en", offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Chat Mode is free" },
    },
    faqJsonLd(FAQ),
  ];

  return (
    <div className="min-h-screen bg-[#0D0E17] text-white">
      <AuthRedirect />
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-4xl px-5 pb-16 pt-12 text-center sm:pt-20">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Learn a language by speaking it, with an AI tutor
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
            TalkMate gives you a patient AI tutor that chats, calls and role-plays with you in {LANGUAGE_PAGES.length} languages, then corrects
            every message and rates your pronunciation. Start practising in minutes, right in your browser.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/login" className={btnPrimary}>Start practising free</Link>
            <a href="#how-it-works" className={btnGhost}>See how it works</a>
          </div>
          <p className="mt-3 text-sm text-white/50">Chat Mode is free. No download needed.</p>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12" aria-labelledby="modes">
          <h2 id="modes" className="text-2xl font-bold sm:text-3xl">Ten ways to practise speaking</h2>
          <p className="mt-2 max-w-2xl text-white/70">Mix and match the modes to build vocabulary, grammar and confidence.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODES.map((m) => (
              <li key={m.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#171827]">
                <Image src={m.image} alt={`${m.title} for language learning`} width={350} height={200} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{m.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{m.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-12" aria-labelledby="how">
          <h2 id="how" className="text-2xl font-bold sm:text-3xl">How TalkMate works</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Pick your language and level", "Choose from 12 languages and a Beginner, Intermediate or Advanced level. Feedback and translations come in the language you already speak."],
              ["Speak or type with your tutor", "Chat with an AI tutor, make a call, act out a real-life scenario or argue a point. Everything adapts to your level."],
              ["Get instant feedback", "Each message is checked with a correction and a short explanation. Read-aloud exercises get a pronunciation rating from 1 to 5. Daily practice builds your streak and XP."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-2xl border border-white/10 bg-[#171827] p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-bold">{i + 1}</span>
                <h3 className="mt-3 font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-white/70">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12" aria-labelledby="languages">
          <h2 id="languages" className="text-2xl font-bold sm:text-3xl">Languages you can learn</h2>
          <LanguageLinks />
        </section>

        <section className="mx-auto max-w-3xl px-5 py-12" aria-labelledby="faq">
          <h2 id="faq" className="text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
          <FaqList items={FAQ} />
        </section>

        <section className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to start speaking?</h2>
          <p className="mt-2 text-white/70">Create your account and have your first conversation today.</p>
          <Link href="/login" className={`${btnPrimary} mt-6`}>Get started free</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
