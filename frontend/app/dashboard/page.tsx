"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutGrid, GraduationCap, BookOpen, Library, TrendingUp, User, Lock, ArrowRight, Flame, Trophy, Crown, MessageSquareText,
} from "lucide-react";
import { Modal, ErrorText } from "@/components/Modal";
import { GeneratePanel } from "@/components/GeneratePanel";
import { PhotoPanel } from "@/components/PhotoPanel";
import { AdUnit } from "@/components/ads/AdUnit";
import { PracticeTimer } from "@/components/PracticeTimer";
import { ProgressView } from "@/components/ProgressView";
import { CoursesView } from "@/components/CoursesView";
import { LearnView } from "@/components/LearnView";
import { ExploreView } from "@/components/ExploreView";
import { courseById, loadCourseId, saveCourseId, type Course } from "@/lib/courses";
import { AccountView } from "@/components/account/AccountView";
import { api, clearToken, getToken, type Progress } from "@/lib/api";
import { MODES, type Mode } from "@/lib/modes";
import { CoverFallback, MODE_ICON } from "@/components/ui/Glyph";

const NAV = [
  { id: "home", label: "Home", icon: LayoutGrid, dot: false },
  { id: "learn", label: "Learn", icon: BookOpen, dot: false },
  { id: "courses", label: "Courses", icon: GraduationCap, dot: false },
  { id: "explore", label: "Explore", icon: Library, dot: false },
  { id: "progress", label: "Progress", icon: TrendingUp, dot: false },
];
const TABS = ["learn", "courses", "explore", "progress"]; // sections that can be opened with /dashboard?tab=...

const XP_PER_LEVEL = 50;
const greeting = () => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"; };
// level tiers shown on the Level card (the medal colour and name change as the level grows)
const TIERS = [
  { min: 1, name: "Starter", ring: "from-zinc-300 to-zinc-600" },
  { min: 3, name: "Bronze", ring: "from-orange-300 to-orange-700" },
  { min: 6, name: "Silver", ring: "from-slate-200 to-slate-500" },
  { min: 10, name: "Gold", ring: "from-yellow-200 to-yellow-600" },
  { min: 15, name: "Platinum", ring: "from-cyan-200 to-sky-500" },
];
const EMPTY: Progress = {
  email: "", name: null, avatar: null, xp: 0, streak: 0, longest: 0, messages: 0, premium: false,
  language: "Spanish", nativeLanguage: "English", level: "Beginner", today: [], needsDetails: false,
};

export default function Dashboard() {
  const router = useRouter();
  const [active, setActive] = useState("home");
  const [s, setS] = useState<Progress>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [openMode, setOpenMode] = useState<Mode | null>(null);
  const [upsell, setUpsell] = useState<string | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [courseId, setCourseId] = useState(() => courseById(loadCourseId()).id); // the course shown on Learn

  useEffect(() => {
    if (!getToken()) { router.replace("/login"); return; }
    api.progress.get()
      .then((p) => {
        if (p.needsDetails) { router.replace("/complete-profile"); return; } // a Google account that has not added country and phone yet
        setS(p); setLoaded(true);
        // other pages link here with ?tab=learn / ?tab=progress
        const tab = new URLSearchParams(window.location.search).get("tab");
        if (tab && TABS.includes(tab)) setActive(tab);
      })
      .catch((e) => setLoadError(e instanceof Error ? e.message : "Couldn't load your progress"));
  }, [router]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const fail = (e: unknown) => setToast(e instanceof Error ? e.message : "Something went wrong");
  const practice = (text: string) => { api.progress.practice(text).then(setS).catch(fail); };
  const updateSettings = (patch: { language?: string; nativeLanguage?: string; level?: string }) => {
    setS((p) => ({ ...p, ...patch }));
    api.progress.settings(patch).catch(fail);
  };
  const unlockPremium = () =>
    api.progress.premium()
      .then((p) => { setS(p); setUpsell(null); setToast("Premium unlocked (demo)"); })
      .catch(fail);
  const logout = () => { clearToken(); router.replace("/login"); };

  const displayName = s.name?.trim() || s.email.split("@")[0] || "Account";
  const level = Math.floor(s.xp / XP_PER_LEVEL) + 1;
  const progress = (s.xp % XP_PER_LEVEL) / XP_PER_LEVEL;
  const tier = [...TIERS].reverse().find((t) => level >= t.min) ?? TIERS[0];
  const learner = { targetLanguage: s.language, nativeLanguage: s.nativeLanguage, level: s.level };
  const clickMode = (m: Mode) => {
    if (m.premium && !s.premium) return setUpsell(m.title);
    if (m.id === "chat" || m.id === "call" || m.id === "sentence" || m.id === "word" || m.id === "dialogue" || m.id === "characters" || m.id === "roleplay" || m.id === "debate" || m.id === "flashcards" || m.id === "photo") return router.push(`/${m.id}`); // these modes are sets of pages, not modals
    setOpenMode(m);
  };
  const onNav = (id: string) => { setActive(id); setOpenMode(null); };
  // a course picked on the Courses page becomes the selected course and opens its learning path
  const openCourse = (c: Course) => { setCourseId(c.id); saveCourseId(c.id); setActive("learn"); window.scrollTo({ top: 0 }); };

  if (!loaded) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-canvas text-muted">
        <p>{loadError ?? "Loading…"}</p>
        {loadError && <button onClick={() => location.reload()} className="rounded-full bg-white/10 px-4 py-2 text-sm text-ink">Try again</button>}
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen bg-canvas text-ink">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-[84px] flex-col gap-10 border-r border-line/[0.07] bg-canvas px-3 py-7 md:flex lg:w-[236px] lg:px-6">
        <button onClick={() => { setActive("home"); setOpenMode(null); router.push("/dashboard"); }} aria-label="TalkMate home"
          className="flex items-center justify-center gap-2 rounded-lg text-left transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 lg:justify-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/logo-mark.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="hidden font-display text-lg font-bold tracking-tight text-ink lg:inline">TalkMate</span>
        </button>
        <nav className="flex flex-col gap-1">
          {NAV.map(({ id, label, icon: Icon, dot }) => (
            <button key={id} onClick={() => onNav(id)} title={label} aria-label={label} aria-current={active === id ? "page" : undefined}
              className={`relative flex items-center justify-center gap-3 rounded-xl px-0 py-3 text-left text-sm font-medium transition-all duration-200 lg:justify-start lg:px-4 ${active === id ? "bg-brand-500/15 text-brand-200" : "text-muted hover:bg-surface-2 hover:text-ink"}`}>
              <Icon size={20} />
              <span className="hidden lg:inline">{label}</span>
              {dot && <span className="absolute left-[34px] top-2 h-2 w-2 rounded-full bg-pink-500" />}
            </button>
          ))}
        </nav>
      </aside>

      {/* phone: logo in the top-left corner (the sidebar is hidden below md) */}
      <button onClick={() => { setActive("home"); setOpenMode(null); router.push("/dashboard"); }} aria-label="TalkMate home"
        className="absolute left-4 top-4 z-20 flex items-center gap-2 py-1 md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/logo-mark.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
        <span className="text-base font-bold tracking-tight">TalkMate</span>
      </button>

      {/* account button: fixed place in the top-right corner of the page (scrolls away with it), shows the user's name and an icon */}
      <button onClick={() => onNav("account")} aria-label="Account"
        className={`absolute right-4 top-4 z-20 flex max-w-[220px] items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-1.5 text-sm font-medium transition-colors sm:pr-4 md:right-6 lg:right-8 lg:top-6 ${active === "account" ? "border-brand-500/30 bg-brand-600/20 text-brand-200" : "border-line/10 bg-surface/90 text-ink/90 hover:bg-white/[0.08] hover:text-ink"}`}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-500/25 text-brand-200">
          {s.avatar
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={s.avatar} alt="" className="h-full w-full object-cover" />
            : <User size={16} />}
        </span>
        <span className="hidden truncate sm:inline">{displayName}</span>
      </button>

      {/* phone: bottom tab bar with the same sections as the sidebar */}
      <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line/[0.08] bg-canvas/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => { onNav(id); window.scrollTo({ top: 0 }); }} aria-current={active === id ? "page" : undefined}
            className={`flex flex-col items-center gap-1 px-1 pb-2 pt-2.5 text-[11px] font-medium transition-colors ${active === id ? "text-brand-300" : "text-muted active:text-ink"}`}>
            <span className={`flex h-7 w-12 items-center justify-center rounded-full transition-colors ${active === id ? "bg-brand-600/20" : ""}`}><Icon size={20} /></span>
            {label}
          </button>
        ))}
      </nav>

      <main className="w-full px-4 pb-28 pt-20 md:pb-9 md:pl-[108px] md:pr-6 lg:px-10 lg:pb-9 lg:pt-24 lg:pl-[260px]">
        {active === "home" ? (
          <div className="mx-auto max-w-[1360px]">
            <header className="mb-8 flex flex-col gap-1.5">
              <p className="eyebrow">{greeting()}, {displayName}</p>
              <h1 className="font-display text-[28px] font-bold leading-tight tracking-tight sm:text-[34px]">What will you practise today?</h1>
              <p className="max-w-[60ch] text-sm text-muted">
                Learning <span className="font-semibold text-ink">{s.language}</span> at {s.level.toLowerCase()} level. Pick a mode to start; practice time counts toward your streak.
              </p>
            </header>
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
            <section aria-label="Learning modes">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {MODES.map((m) => {
                  const locked = m.premium && !s.premium;
                  const Icon = MODE_ICON[m.id];
                  return (
                    <li key={m.id} className="h-full">
                      <button onClick={() => clickMode(m)}
                        className="group flex h-full w-full flex-row items-center gap-4 rounded-card border border-line/[0.07] bg-surface p-2.5 text-left transition duration-200 ease-out hover:border-brand-400/30 hover:bg-surface-2 active:scale-[0.99] sm:flex-col sm:items-stretch sm:gap-0 sm:p-3">
                        <div className="relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-xl sm:w-full">
                          <ModeImage mode={m} locked={locked} />
                          {locked && (
                            <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-canvas/85 px-2 py-1 text-[11px] font-semibold text-ink/90 backdrop-blur">
                              <Lock size={11} aria-hidden="true" /> <span className="hidden sm:inline">Premium</span>
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1 sm:px-1 sm:pb-1 sm:pt-3">
                          <div className="flex items-center gap-2">
                            <Icon size={16} aria-hidden="true" className="shrink-0 text-brand-300" />
                            <h2 className="truncate text-[15px] font-semibold leading-snug">{m.title}</h2>
                            {!m.premium && <span className="ml-auto rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">Free</span>}
                          </div>
                          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">{m.desc}</p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            <aside className="grid items-start gap-4 md:grid-cols-2 xl:flex xl:flex-col xl:items-stretch xl:self-start">
              <div className="card p-5 md:col-span-2 xl:col-span-1">
                <div className="flex items-center gap-4">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${tier.ring} p-[3px]`}>
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-surface font-display text-base font-bold">{level}</span>
                  </span>
                  <div className="min-w-0">
                    <p className="eyebrow">{tier.name} tier</p>
                    <h3 className="mt-0.5 text-lg font-semibold">Level {level}</h3>
                  </div>
                  <span className="ml-auto text-right text-xs text-muted"><span className="block font-display text-lg font-bold text-ink">{s.xp}</span>XP</span>
                </div>
                <div className="mt-4" role="progressbar" aria-label={`Progress to level ${level + 1}`} aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-3">
                    <div className="h-full rounded-full bg-brand-500 transition-[width] duration-500 ease-out" style={{ width: `${Math.max(4, Math.round(progress * 100))}%` }} />
                  </div>
                  <p className="mt-2 flex justify-between text-xs text-subtle"><span>{s.xp % XP_PER_LEVEL} / {XP_PER_LEVEL} XP</span><span>Level {level + 1}</span></p>
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line/[0.06] pt-4">
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs text-muted"><Flame size={14} aria-hidden="true" className="text-accent" /> Current streak</dt>
                    <dd className="mt-1 font-display text-xl font-bold">{s.streak} <span className="text-sm font-medium text-muted">{s.streak === 1 ? "day" : "days"}</span></dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs text-muted"><Trophy size={14} aria-hidden="true" className="text-accent" /> Longest</dt>
                    <dd className="mt-1 font-display text-xl font-bold">{s.longest} <span className="text-sm font-medium text-muted">{s.longest === 1 ? "day" : "days"}</span></dd>
                  </div>
                </dl>
              </div>

              <button onClick={() => setFeedbackOpen(true)}
                className="card group flex items-center gap-4 p-5 text-left transition-colors hover:border-brand-400/30 hover:bg-surface-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300"><MessageSquareText size={20} aria-hidden="true" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold">Daily feedback</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted">A short review of what you practised today.</span>
                </span>
                <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
              </button>

              {!s.premium && (
                <div className="relative overflow-hidden rounded-card border border-brand-400/20 bg-gradient-to-br from-brand-900 to-surface p-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-400/15 px-2.5 py-1 text-[11px] font-semibold text-brand-200">
                    <Crown size={12} aria-hidden="true" /> Premium
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">Unlock all ten modes</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">Calls, roleplays, debates, pronunciation and more.</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button onClick={() => setUpsell("Premium")} className="rounded-control bg-brand-500 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-brand-400 active:bg-brand-600">Get Premium</button>
                    <button onClick={() => onNav("account")} className="text-sm font-medium text-brand-200 underline-offset-4 hover:underline">Invite friends instead</button>
                  </div>
                </div>
              )}

              {/* ads are shown to free users only; Premium removes them */}
              {!s.premium && <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_DASHBOARD} className="md:col-span-2 xl:col-span-1" />}
            </aside>
            </div>
          </div>
        ) : active === "account" ? (
          <AccountView s={s} onSettings={updateSettings} onLogout={logout} onToast={setToast} onSnapshot={setS} />
        ) : active === "learn" ? (
          <LearnView course={courseById(courseId)} premium={s.premium} onSelectCourse={openCourse} onLocked={setUpsell} />
        ) : active === "courses" ? (
          <CoursesView selected={courseId} onSelect={openCourse} />
        ) : active === "explore" ? (
          <ExploreView premium={s.premium} onLocked={setUpsell} />
        ) : active === "progress" ? (
          <ProgressView s={s} onOpenFeedback={() => setFeedbackOpen(true)} />
        ) : (
          <div className="mx-auto max-w-xl pt-10">
            <h1 className="text-lg font-semibold">{NAV.find((n) => n.id === active)?.label}</h1>
            <p className="mt-4 text-muted">This section isn't built yet. Pick Home to practice.</p>
          </div>
        )}
      </main>

      {openMode && <PracticeTimer onSnapshot={setS} />}
      {openMode && ["sentence", "word", "dialogue", "flashcards"].includes(openMode.id) && (
        <GeneratePanel type={openMode.id as any} title={openMode.title} learner={learner} onPractice={practice} onClose={() => setOpenMode(null)} />
      )}
      {openMode?.id === "photo" && <PhotoPanel learner={learner} onPractice={practice} onClose={() => setOpenMode(null)} />}

      {feedbackOpen && <FeedbackModal learner={learner} texts={s.today} onClose={() => setFeedbackOpen(false)} />}

      {upsell && (
        <Modal onClose={() => setUpsell(null)} label="Upgrade to Premium">
          <h2 className="text-xl font-semibold">{upsell === "Premium" ? "Get TalkMate Premium" : `${upsell} is a Premium mode`}</h2>
          <p className="mt-2 text-sm text-muted">Unlock all 10 learning modes. Billing isn't connected in this clone, so this button unlocks everything for testing.</p>
          <button onClick={unlockPremium}
            className="mt-6 w-full rounded-xl bg-brand-500 py-3 text-sm font-semibold hover:bg-brand-400">
            Unlock all modes (demo)
          </button>
        </Modal>
      )}

      {toast && (
        <div role="status" className="fixed bottom-24 left-1/2 z-50 max-w-[90vw] text-center md:bottom-6 -translate-x-1/2 rounded-full border border-line/10 bg-surface-2 px-5 py-3 text-sm font-semibold text-ink shadow-2xl">{toast}</div>
      )}
    </div>
  );
}

// Picture for a mode card: your own file from /public/modes. Falls back to the mode's line icon if the file is missing.
function ModeImage({ mode, locked }: { mode: Mode; locked: boolean }) {
  const [failed, setFailed] = useState(false);
  const bg = mode.id === "chat" ? "bg-[#F4E7D2]" : "bg-surface-2";
  if (failed) {
    return <CoverFallback seed={mode.id} mode={mode.id} size={36} className={locked ? "opacity-70" : ""} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={mode.image} alt={mode.title} onError={() => setFailed(true)} draggable={false}
      className={`h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] ${bg} ${locked ? "saturate-[0.6]" : ""}`} />
  );
}

function FeedbackModal({ learner, texts, onClose }: {
  learner: { targetLanguage: string; nativeLanguage?: string; level: string }; texts: string[]; onClose: () => void;
}) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setBusy(true); setError(null);
    try { setText((await api.feedback({ ...learner, texts })).feedback); }
    catch (e) { setError(e instanceof Error ? e.message : "Something went wrong"); }
    finally { setBusy(false); }
  };

  return (
    <Modal onClose={onClose} label="Daily feedback" wide>
      <h2 className="text-xl font-semibold">Daily feedback</h2>
      {texts.length === 0 ? (
        <p className="mt-3 text-sm text-muted">No practice yet today. Chat or describe a photo to get feedback.</p>
      ) : (
        <>
          <p className="mt-3 text-sm text-muted">{texts.length} practice {texts.length === 1 ? "entry" : "entries"} today.</p>
          {!text && (
            <button onClick={run} disabled={busy} className="mt-4 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold hover:bg-brand-500 disabled:opacity-50">
              {busy ? "Reviewing…" : "Get today's feedback"}
            </button>
          )}
          <ErrorText text={error} />
          {text && <div className="mt-4 whitespace-pre-wrap rounded-xl bg-white/5 p-4 text-sm">{text}</div>}
        </>
      )}
    </Modal>
  );
}
