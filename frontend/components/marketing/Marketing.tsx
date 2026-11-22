import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { LANGUAGE_PAGES } from "@/lib/languages";
import { SUPPORT_EMAIL } from "@/lib/site";

export const btnPrimary = "inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brand-500 active:bg-brand-700";
export const btnGhost = "inline-flex items-center justify-center rounded-xl border border-line/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-line/25 hover:bg-surface-2";

export function SiteHeader() {
  const link = "rounded-lg px-3 py-2 text-muted transition-colors hover:bg-surface-2 hover:text-ink";
  return (
    <header className="sticky top-0 z-30 border-b border-line/[0.06] bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="TalkMate home">
          <Image src="/logo/logo-mark.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" priority />
          <span className="font-display text-lg font-bold tracking-tight">TalkMate</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm">
          <Link href="/#modes" className={`${link} hidden md:block`}>Modes</Link>
          <Link href="/#how-it-works" className={`${link} hidden md:block`}>How it works</Link>
          <Link href="/learn" className={`${link} hidden sm:block`}>Languages</Link>
          <Link href="/login" className={link}>Sign in</Link>
          <Link href="/login" className="ml-1 rounded-control bg-brand-600 px-4 py-2 font-semibold text-ink transition-colors hover:bg-brand-500 active:bg-brand-700">Get started</Link>
        </nav>
      </div>
    </header>
  );
}

const PRACTICE_LINKS = [
  ["Chat with an AI tutor", "/#modes"], ["Voice calls", "/#modes"], ["Roleplays and debates", "/#modes"],
  ["Pronunciation practice", "/#modes"], ["How it works", "/#how-it-works"], ["FAQ", "/#faq"],
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  const head = "eyebrow mb-4";
  const item = "text-muted transition-colors hover:text-ink";
  return (
    <footer className="mt-8 border-t border-line/[0.07] bg-surface/40 text-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 lg:grid-cols-[1.4fr_1.6fr_1fr_1fr]">
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2 rounded-lg" aria-label="TalkMate home">
            <Image src="/logo/logo-mark.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
            <span className="font-display text-lg font-bold tracking-tight text-ink">TalkMate</span>
          </Link>
          <p className="mt-4 max-w-[34ch] leading-relaxed text-muted">Learn a language by speaking it, with an AI tutor that corrects every message and rates your pronunciation.</p>
          <Link href="/login" className="mt-5 inline-flex items-center rounded-control bg-brand-600 px-4 py-2 font-semibold text-ink transition-colors hover:bg-brand-500">Start free</Link>
        </div>

        <nav aria-label="Languages" className="col-span-2 sm:col-span-1">
          <p className={head}>Languages</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {LANGUAGE_PAGES.map((l) => (
              <li key={l.slug}><Link href={`/learn/${l.slug}`} className={item}>{l.name}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Practice">
          <p className={head}>Practice</p>
          <ul className="flex flex-col gap-2.5">
            {PRACTICE_LINKS.map(([label, href]) => <li key={label}><Link href={href} className={item}>{label}</Link></li>)}
          </ul>
        </nav>

        <div>
          <p className={head}>Company</p>
          <ul className="flex flex-col gap-2.5">
            <li><Link href="/privacy" className={item}>Privacy policy</Link></li>
            <li><Link href="/login" className={item}>Sign in</Link></li>
            <li><Link href="/learn" className={item}>All languages</Link></li>
          </ul>
          <p className={`${head} mt-8`}>Support</p>
          <a href={`mailto:${SUPPORT_EMAIL}`} className={`${item} break-all`}>{SUPPORT_EMAIL}</a>
        </div>
      </div>

      <div className="border-t border-line/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-subtle md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} TalkMate. AI tutors can make mistakes, so check important information.</p>
          <p>
            Developed by{" "}
            <a href="https://devaas.tech" target="_blank" rel="noopener" className="font-semibold text-muted underline-offset-4 transition-colors hover:text-ink hover:underline">
              DEVAAS
            </a>
            <span className="sr-only"> (opens in a new tab)</span>, a software studio in Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}

export type Faq = { q: string; a: string };

// <details> keeps every answer in the page's HTML (good for search engines) and needs no JavaScript.
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="mt-6 space-y-3">
      {items.map((f) => (
        <details key={f.q} className="group rounded-card border border-line/[0.07] bg-surface px-5 py-4 transition-colors open:border-line/15">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium marker:hidden [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown size={18} aria-hidden="true" className="shrink-0 text-subtle transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export const faqJsonLd = (items: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export function LanguageLinks({ exclude }: { exclude?: string }) {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {LANGUAGE_PAGES.filter((l) => l.slug !== exclude).map((l) => (
        <li key={l.slug}>
          <Link href={`/learn/${l.slug}`} className="block rounded-xl border border-line/[0.07] bg-surface px-4 py-3 transition-colors hover:border-brand-400/40 hover:bg-surface-2">
            <span className="block font-semibold">{l.name}</span>
            <span className="block text-sm text-muted">{l.native}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
