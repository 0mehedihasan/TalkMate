import Image from "next/image";
import Link from "next/link";
import { LANGUAGE_PAGES } from "@/lib/languages";
import { SUPPORT_EMAIL } from "@/lib/site";

export const btnPrimary = "inline-flex items-center justify-center rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500";
export const btnGhost = "inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/5";

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
      <Link href="/" className="flex items-center gap-2" aria-label="TalkMate home">
        <Image src="/logo/logo-mark.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" priority />
        <span className="text-lg font-bold tracking-tight">TalkMate</span>
      </Link>
      <nav aria-label="Main" className="flex items-center gap-2 text-sm">
        <Link href="/learn" className="hidden rounded-lg px-3 py-2 text-white/70 hover:text-white sm:block">Languages</Link>
        <Link href="/login" className="rounded-lg px-3 py-2 text-white/70 hover:text-white">Sign in</Link>
        <Link href="/login" className="rounded-lg bg-violet-600 px-4 py-2 font-semibold hover:bg-violet-500">Get started</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 text-sm text-white/60">
      <div className="mx-auto max-w-6xl">
        <p className="font-semibold text-white/80">Learn with TalkMate</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {LANGUAGE_PAGES.map((l) => (
            <li key={l.slug}><Link href={`/learn/${l.slug}`} className="hover:text-white">Learn {l.name}</Link></li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/login" className="hover:text-white">Sign in</Link> · Support: <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white">{SUPPORT_EMAIL}</a>
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
        <details key={f.q} className="group rounded-xl border border-white/10 bg-[#171827] p-4">
          <summary className="cursor-pointer list-none font-medium marker:hidden">
            <span className="mr-2 text-violet-400 group-open:hidden">+</span>
            <span className="mr-2 hidden text-violet-400 group-open:inline">−</span>
            {f.q}
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{f.a}</p>
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
          <Link href={`/learn/${l.slug}`} className="block rounded-xl border border-white/10 bg-[#171827] px-4 py-3 hover:border-violet-500/60">
            <span className="block font-semibold">{l.name}</span>
            <span className="block text-sm text-white/60">{l.native}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
