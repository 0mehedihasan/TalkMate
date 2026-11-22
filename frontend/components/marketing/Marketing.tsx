import Image from "next/image";
import Link from "next/link";
import { LANGUAGE_PAGES } from "@/lib/languages";
import { SUPPORT_EMAIL } from "@/lib/site";

export const btnPrimary = "inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brand-500 active:bg-brand-700";
export const btnGhost = "inline-flex items-center justify-center rounded-xl border border-line/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-line/25 hover:bg-surface-2";

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
      <Link href="/" className="flex items-center gap-2" aria-label="TalkMate home">
        <Image src="/logo/logo-mark.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" priority />
        <span className="text-lg font-bold tracking-tight">TalkMate</span>
      </Link>
      <nav aria-label="Main" className="flex items-center gap-2 text-sm">
        <Link href="/learn" className="hidden rounded-lg px-3 py-2 text-muted hover:text-ink sm:block">Languages</Link>
        <Link href="/login" className="rounded-lg px-3 py-2 text-muted hover:text-ink">Sign in</Link>
        <Link href="/login" className="rounded-lg bg-brand-600 px-4 py-2 font-semibold hover:bg-brand-500">Get started</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line/10 px-5 py-10 text-sm text-muted">
      <div className="mx-auto max-w-6xl">
        <p className="font-semibold text-ink/90">Learn with TalkMate</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {LANGUAGE_PAGES.map((l) => (
            <li key={l.slug}><Link href={`/learn/${l.slug}`} className="hover:text-ink">Learn {l.name}</Link></li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/login" className="hover:text-ink">Sign in</Link> · Support: <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-ink">{SUPPORT_EMAIL}</a>
        </p>
        <p className="mt-2">© {new Date().getFullYear()} TalkMate. AI tutors can make mistakes, so check important information.</p>
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
        <details key={f.q} className="group rounded-xl border border-line/10 bg-surface p-4">
          <summary className="cursor-pointer list-none font-medium marker:hidden">
            <span className="mr-2 text-brand-400 group-open:hidden">+</span>
            <span className="mr-2 hidden text-brand-400 group-open:inline">−</span>
            {f.q}
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
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
          <Link href={`/learn/${l.slug}`} className="block rounded-xl border border-line/10 bg-surface px-4 py-3 hover:border-brand-500/60">
            <span className="block font-semibold">{l.name}</span>
            <span className="block text-sm text-muted">{l.native}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
