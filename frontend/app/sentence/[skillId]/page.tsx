"use client";
import { CoverFallback } from "@/components/ui/Glyph";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SentenceShell } from "@/components/sentence/SentenceShell";
import { useSentence } from "@/components/sentence/SentenceProvider";
import { sessionKey, useSkillId } from "@/lib/sentence";

// Page 1: one skill, with a Start button.
export default function SentenceSkillPage() {
  const skillId = useSkillId();
  const router = useRouter();
  const { units, progress } = useSentence();
  const skill = units?.units.flatMap((u) => u.skills).find((k) => k.id === skillId);
  const [coverFailed, setCoverFailed] = useState(false);

  useEffect(() => {
    if (units && !skill) router.replace("/sentence"); // unknown skill id
  }, [units, skill, router]);

  const start = () => {
    // Start always means a fresh set of 5 sentences
    try { sessionStorage.removeItem(sessionKey(skillId, progress.language, progress.level, progress.nativeLanguage)); } catch {}
    router.push(`/sentence/${skillId}/practice`);
  };

  return (
    <SentenceShell title="Sentence Mode" backHref="/sentence">
      <p className="mt-3 text-[13px] text-ink/90">
        The Sentence Mode is a unique way to learn everyday phrases. This interactive mode creates an engaging
        learning environment, helping you improve your pronunciation skills.
      </p>
      <hr className="mt-4 border-line/10" />

      {!skill ? (
        <p className="mt-8 text-muted">Loading…</p>
      ) : (
        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-line/5 bg-surface p-5 sm:flex-row">
          <div className="relative h-56 shrink-0 overflow-hidden rounded-xl sm:h-auto sm:min-h-[200px] sm:w-[200px]">
            {skill.cover && !coverFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={skill.cover} alt="" onError={() => setCoverFailed(true)} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <CoverFallback seed={skill.id} title={skill.title} mode="sentence" size={56} className="h-full w-full" />
            )}
          </div>
          <div className="flex flex-1 flex-col">
            <h1 className="text-lg font-semibold">{skill.title}</h1>
            <p className="mt-2 text-[13px] text-ink/90">{skill.description}</p>
            <p className="mt-3 text-xs text-muted">
              {progress.language} · {progress.level} · 5 sentences · Translations in {progress.nativeLanguage}
              {skill.attempts > 0 && ` · Best ${skill.bestScore.toFixed(1)}/5`}
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
