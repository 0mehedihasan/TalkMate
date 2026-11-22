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
    <div className="min-h-screen overflow-x-clip bg-canvas text-ink">
      <AuthRedirect />
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
          <div>
            <p className="eyebrow !text-brand-300">AI language tutor &middot; {LANGUAGE_PAGES.length} languages</p>
            <h1 className="mt-4 font-display text-[40px] font-extrabold leading-[1.05] tracking-tight sm:text-[56px]">
              Learn a language by speaking it.
            </h1>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
              A patient AI tutor that chats, calls and role-plays with you, corrects every message and rates your pronunciation. Right in your browser.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/login" className={btnPrimary}>Start practising free</Link>
              <a href="#how-it-works" className={btnGhost}>See how it works</a>
            </div>
            <p className="mt-4 text-sm text-subtle">Chat Mode is free. No download needed.</p>
          </div>
          <HeroDemo />
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12" aria-labelledby="modes">
          <p className="eyebrow">Ten modes</p>
          <h2 id="modes" className="mt-2 font-display text-2xl font-bold sm:text-3xl">Ten ways to practise speaking</h2>
          <p className="mt-2 max-w-2xl text-muted">Mix and match the modes to build vocabulary, grammar and confidence.</p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
            {MODES.map((m) => (
              <li key={m.id} className="overflow-hidden rounded-card border border-line/[0.07] bg-surface">
                <Image src={m.image} alt={`${m.title} for language learning`} width={350} height={200} className="aspect-[16/10] h-auto w-full object-cover" />
                <div className="p-3.5">
                  <h3 className="text-[15px] font-semibold">{m.title}</h3>
                  <p className="mt-1 line-clamp-3 text-[13px] leading-relaxed text-muted">{m.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-12" aria-labelledby="how">
          <h2 id="how" className="font-display text-2xl font-bold sm:text-3xl">How TalkMate works</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Pick your language and level", "Choose from 12 languages and a Beginner, Intermediate or Advanced level. Feedback and translations come in the language you already speak."],
              ["Speak or type with your tutor", "Chat with an AI tutor, make a call, act out a real-life scenario or argue a point. Everything adapts to your level."],
              ["Get instant feedback", "Each message is checked with a correction and a short explanation. Read-aloud exercises get a pronunciation rating from 1 to 5. Daily practice builds your streak and XP."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-2xl border border-line/10 bg-surface p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/15 font-display text-sm font-bold text-brand-200">{i + 1}</span>
                <h3 className="mt-3 font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12" aria-labelledby="languages">
          <h2 id="languages" className="font-display text-2xl font-bold sm:text-3xl">Languages you can learn</h2>
          <LanguageLinks />
        </section>

        <section className="mx-auto max-w-3xl px-5 py-12" aria-labelledby="faq">
          <h2 id="faq" className="font-display text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
          <FaqList items={FAQ} />
        </section>

        <section className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Ready to start speaking?</h2>
          <p className="mt-2 text-muted">Create your account and have your first conversation today.</p>
          <Link href="/login" className={`${btnPrimary} mt-6`}>Get started free</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

/** A static sample of a chat turn with its correction: shows what the product does without a screenshot. */
function HeroDemo() {
  return (
    <div aria-hidden="true" className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-brand-600/10 blur-3xl" />
      <div className="rounded-card border border-line/[0.08] bg-surface p-4 shadow-pop sm:p-5">
        <div className="flex items-center gap-3 border-b border-line/[0.06] pb-3">
          <Image src="/tutors/emma.png" alt="" width={36} height={36} className="h-9 w-9 rounded-full bg-surface-2 object-cover" />
          <div>
            <p className="text-sm font-semibold">Emma</p>
            <p className="text-xs text-subtle">Spanish tutor &middot; Beginner</p>
          </div>
          <span className="ml-auto h-2 w-2 rounded-full bg-success" />
        </div>
        <div className="mt-4 flex flex-col gap-3 text-sm">
          <p className="max-w-[85%] rounded-2xl rounded-tl-md bg-surface-2 px-3.5 py-2.5">¡Hola! ¿Qué hiciste el fin de semana?</p>
          <p className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-brand-600 px-3.5 py-2.5">Yo fui a la playa con mis amigo.</p>
          <div className="ml-auto max-w-[92%] rounded-xl border border-accent/25 bg-accent-soft/60 p-3 text-[13px]">
            <p className="font-semibold text-accent">Can be improved</p>
            <p className="mt-1">Fui a la playa con mis <span className="font-semibold text-success">amigos</span>.</p>
            <p className="mt-1 text-muted">&ldquo;mis&rdquo; is plural, so the noun needs an -s.</p>
          </div>
          <p className="max-w-[85%] rounded-2xl rounded-tl-md bg-surface-2 px-3.5 py-2.5">¡Qué bien! ¿Nadaste en el mar?</p>
        </div>
      </div>
    </div>
  );
}
