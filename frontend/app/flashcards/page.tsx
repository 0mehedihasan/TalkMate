"use client";
import { CoverFallback } from "@/components/ui/Glyph";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check } from "lucide-react";
import { SentenceShell } from "@/components/sentence/SentenceShell";
import { useFlashcards } from "@/components/flashcards/FlashcardsProvider";
import { ErrorText } from "@/components/Modal";

// Flashcards home: a Daily review shortcut, then one photo card per topic. Opening a topic gives a deck of 15 cards.
export default function FlashcardTopicsPage() {
  const { topics, topicsError, reloadTopics } = useFlashcards();

  // reload every time the page opens, so the check marks are fresh after a deck
  useEffect(() => { reloadTopics(); }, [reloadTopics]);

  return (
    <SentenceShell title="Flashcards" backHref="/dashboard">
      <p className="mt-3 text-[13px] text-ink/90">Practice and memorize new vocabulary.</p>
      <hr className="mt-4 border-line/10" />

      <Link href="/flashcards/review"
        className="mt-6 flex items-center gap-4 rounded-2xl border border-line/10 bg-surface p-4 transition-colors hover:border-brand-400/30 hover:bg-surface-2">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-black"><CalendarDays size={22} className="text-brand-300" /></span>
        <span className="flex-1">
          <span className="block text-sm font-semibold">Daily review</span>
          <span className="block text-xs text-muted">
            Review your flashcards.{topics && topics.reviewCount > 0 ? ` ${topics.reviewCount} waiting.` : ""}
          </span>
        </span>
        <ArrowRight size={18} />
      </Link>

      <ErrorText text={topicsError} />
      {topicsError && <button onClick={reloadTopics} className="mt-3 rounded-full bg-white/10 px-4 py-2 text-sm">Try again</button>}
      {!topics && !topicsError && <p className="mt-8 text-muted">Loading topics…</p>}

      <div className="mt-6 grid grid-cols-2 gap-3">
        {topics?.topics.map((t) => (
          <Link key={t.id} href={`/flashcards/${t.id}`} aria-label={`${t.title}, ${t.total} flashcards${t.completed ? ", completed" : ""}`}
            className="relative overflow-hidden rounded-2xl border border-line/10 bg-surface transition-colors hover:border-brand-400/30 hover:bg-surface-2">
            {t.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.cover} alt="" loading="lazy" className="h-[150px] w-full object-cover" />
            ) : (
              <CoverFallback seed={t.id} title={t.title} mode="flashcards" size={44} className="h-[150px] w-full" />
            )}
            {t.completed && (
              <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-brand-400 bg-white text-brand-600"><Check size={16} strokeWidth={3} /></span>
            )}
            <div className="px-3.5 py-3">
              <p className="text-sm font-semibold">{t.title}</p>
              <p className="mt-0.5 text-[11px] font-semibold text-muted">
                {t.total} Flashcards{t.known > 0 && !t.completed ? ` · ${t.known} known` : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {topics && <p className="mt-6 text-center text-[11px] text-subtle">Photos from <a href="https://pixabay.com" target="_blank" rel="noreferrer" className="underline">Pixabay</a> and <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="underline">Pexels</a></p>}
    </SentenceShell>
  );
}
