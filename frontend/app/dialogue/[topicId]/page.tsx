"use client";
import { CoverFallback } from "@/components/ui/Glyph";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SentenceShell } from "@/components/sentence/SentenceShell";
import { useDialogue } from "@/components/dialogue/DialogueProvider";
import { DIALOGUE_INTRO, dialogueKey, useDialogueId } from "@/lib/dialogue";

// Step 2: the picture of the chosen topic, a short description and Start.
export default function DialogueTopicPage() {
  const topicId = useDialogueId();
  const router = useRouter();
  const { topics, topicsError, progress } = useDialogue();
  const topic = topics?.topics.find((t) => t.id === topicId);

  useEffect(() => {
    if (topics && !topic) router.replace("/dialogue"); // unknown topic id
  }, [topics, topic, router]);

  const start = () => {
    // Start always begins at the first line, not wherever an earlier visit stopped
    try { sessionStorage.removeItem(dialogueKey(topicId, progress.language, progress.level, progress.nativeLanguage)); } catch {}
    router.push(`/dialogue/${topicId}/practice`);
  };

  return (
    <SentenceShell title="Dialogue Mode" backHref="/dialogue">
      <p className="mt-3 text-[13px] text-ink/90">{DIALOGUE_INTRO}</p>
      <hr className="mt-4 border-line/10" />

      {topicsError ? (
        <p className="mt-8 text-muted">{topicsError}</p>
      ) : !topic ? (
        <p className="mt-8 text-muted">Loading…</p>
      ) : (
        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-line/10 bg-surface p-4 sm:flex-row">
          <div className="h-56 shrink-0 overflow-hidden rounded-xl sm:h-[206px] sm:w-[206px]">
            {topic.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={topic.cover} alt="" className="h-full w-full object-cover" />
            ) : (
              <CoverFallback seed={topic.id} title={topic.title} mode="dialogue" size={56} className="h-full w-full" />
            )}
          </div>
          <div className="flex flex-1 flex-col">
            <h1 className="text-lg font-semibold">{topic.title}</h1>
            <p className="mt-2 text-[13px] text-ink/90">
              Practice with a pre-scripted conversation. Record and read your part of the dialogue out loud.
            </p>
            <p className="mt-3 text-xs text-muted">
              {progress.language} · {progress.level} · with a {topic.partner.toLowerCase()} · Translations in {progress.nativeLanguage}
              {topic.attempts > 0 && ` · Best ${topic.bestScore.toFixed(1)}/5`}
            </p>
            <button onClick={start} className="mt-6 rounded-xl bg-brand-700 py-3.5 text-sm font-semibold hover:bg-brand-600 sm:mt-auto">
              Start
            </button>
          </div>
        </div>
      )}
    </SentenceShell>
  );
}
