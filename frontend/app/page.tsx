import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { AuthRedirect } from "@/components/marketing/AuthRedirect";
import { FaqList, GuideLinks, LanguageLinks, SiteFooter, SiteHeader, btnGhost, btnPrimary, faqJsonLd, type Faq } from "@/components/marketing/Marketing";
import Link from "next/link";
import { Globe2, Layers, MessageCircle, CheckCheck, AudioLines, Languages } from "lucide-react";
import { MODES } from "@/lib/modes";
import { MODE_ICON } from "@/components/ui/Glyph";
import { LANGUAGE_PAGES } from "@/lib/languages";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const PROOF = [
  { icon: Globe2, label: `${LANGUAGE_PAGES.length} languages` },
  { icon: Layers, label: "10 practice modes" },
  { icon: MessageCircle, label: "Chat Mode is free" },
];

const FEATURES = [
  { icon: CheckCheck, title: "A correction on every message", text: "Each thing you write or say is checked. You see the fixed sentence and a short reason, without breaking the conversation." },
  { icon: AudioLines, title: "Pronunciation you can measure", text: "Read sentences aloud and get a rating from 1 to 5, word by word, with a tip on what to change next time." },
  { icon: Languages, title: "Explained in your language", text: "Translations, tips and daily feedback come in the language you already speak, at Beginner, Intermediate or Advanced level." },
];

const STEPS = [
  ["Pick your language and level", "Choose from 12 languages and a Beginner, Intermediate or Advanced level. Feedback and translations come in the language you already speak."],
  ["Speak or type with your tutor", "Chat with an AI tutor, make a call, act out a real-life scenario or argue a point. Everything adapts to your level."],
  ["Get instant feedback", "Each message is checked with a correction and a short explanation. Read-aloud exercises get a rating from 1 to 5. Daily practice builds your streak and XP."],
] as const;

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
              Learn a language by speaking it with an AI tutor.
            </h1>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
              A patient AI tutor that chats, calls and role-plays with you, corrects every message and rates your pronunciation. Right in your browser.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/login" className={btnPrimary}>Start practising free</Link>
              <a href="#how-it-works" className={btnGhost}>See how it works</a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
              {PROOF.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2"><Icon size={16} aria-hidden="true" className="text-brand-300" />{label}</li>
              ))}
            </ul>
          </div>
          <HeroDemo />
        </section>

        <section className="border-y border-line/[0.06] bg-surface/40" aria-labelledby="why">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="eyebrow">Why it works</p>
            <h2 id="why" className="mt-2 max-w-[22ch] font-display text-2xl font-bold sm:text-3xl">Speak more, and know exactly what to fix</h2>
            <ul className="mt-10 grid gap-8 md:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, text }) => (
                <li key={title}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300"><Icon size={22} aria-hidden="true" /></span>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 max-w-[42ch] leading-relaxed text-muted">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="modes" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16" aria-labelledby="modes-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Ten modes</p>
              <h2 id="modes-title" className="mt-2 font-display text-2xl font-bold sm:text-3xl">Ten ways to practise speaking</h2>
              <p className="mt-2 max-w-2xl text-muted">Mix and match the modes to build vocabulary, grammar and confidence.</p>
            </div>
            <Link href="/login" className={btnGhost}>Try Chat Mode free</Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
            {MODES.map((m) => {
              const Icon = MODE_ICON[m.id];
              return (
                <li key={m.id} className="overflow-hidden rounded-card border border-line/[0.07] bg-surface">
                  <Image src={m.image} alt={`${m.title} for language learning`} width={350} height={200} className="aspect-[16/10] h-auto w-full object-cover" />
                  <div className="p-3.5">
                    <h3 className="flex items-center gap-2 text-[15px] font-semibold">
                      <Icon size={15} aria-hidden="true" className="shrink-0 text-brand-300" />{m.title}
                      {!m.premium && <span className="ml-auto rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">Free</span>}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-muted">{m.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16" aria-labelledby="how">
          <p className="eyebrow">Three steps</p>
          <h2 id="how" className="mt-2 font-display text-2xl font-bold sm:text-3xl">How TalkMate works</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="card relative p-6">
                <span className="font-display text-4xl font-extrabold text-brand-500/40">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold">{t}</h3>
                <p className="mt-2 leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16" aria-labelledby="languages">
          <p className="eyebrow">{LANGUAGE_PAGES.length} languages</p>
          <h2 id="languages" className="mt-2 font-display text-2xl font-bold sm:text-3xl">Languages you can learn</h2>
          <p className="mt-2 max-w-2xl text-muted">Every language has Beginner, Intermediate and Advanced levels, with feedback in the language you already speak.</p>
          <LanguageLinks />
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16" aria-labelledby="guides-title">
          <p className="eyebrow">Guides</p>
          <h2 id="guides-title" className="mt-2 font-display text-2xl font-bold sm:text-3xl">Learn how to practise speaking</h2>
          <GuideLinks />
        </section>

        <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-16" aria-labelledby="faq-title">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="mt-2 font-display text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
          <FaqList items={FAQ} />
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-20 pt-8">
          <div className="relative overflow-hidden rounded-card border border-brand-400/20 bg-gradient-to-br from-brand-900 via-surface to-surface px-6 py-12 text-center sm:px-12">
            <h2 className="font-display text-2xl font-bold sm:text-4xl">Ready to start speaking?</h2>
            <p className="mx-auto mt-3 max-w-[48ch] text-muted">Create your account and have your first conversation today. Chat Mode stays free.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/login" className={btnPrimary}>Get started free</Link>
              <Link href="/learn" className={btnGhost}>Browse languages</Link>
            </div>
          </div>
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
