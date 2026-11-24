"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { CoverFallback, tintFor } from "@/components/ui/Glyph";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { CharacterPortrait } from "@/components/characters/CharacterPortrait";
import { api, type CharacterInfo, type DebateTopicInfo, type DialogueTopicInfo, type FlashTopicInfo, type PhotoItem, type RoleplayScenarioInfo, type SentenceSkill, type WordStar } from "@/lib/api";
import { localDay } from "@/lib/dates";
import { pickDaily, seeded } from "@/lib/explore";
import { MODES } from "@/lib/modes";

// Static class names so Tailwind can see them (classes written in lib/ are not generated).
const tile = (key: string) => tintFor(key);

type Data = {
  roleplay?: RoleplayScenarioInfo[]; characters?: CharacterInfo[]; dialogue?: DialogueTopicInfo[]; flashcards?: FlashTopicInfo[];
  debate?: DebateTopicInfo[]; words?: WordStar[]; sentences?: SentenceSkill[]; photos?: PhotoItem[];
};
type Daily = { mode: string; title: string; href: string; cover: string | null; emoji: string };

const modeOf = (id: string) => MODES.find((m) => m.id === id)!;

/** Explore: today's picks for every learning mode, chosen from the lists the mode pages use. Frontend only. */
export function ExploreView({ premium, onLocked }: { premium: boolean; onLocked: (mode: string) => void }) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const day = localDay();

  const load = useCallback(() => {
    setError(null);
    // allSettled: one failing mode only hides its own section
    Promise.allSettled([
      api.roleplay.scenarios(), api.characters.list(), api.dialogue.topics(), api.flashcards.topics(),
      api.debate.topics(), api.word.units(), api.sentence.units(), api.photos.units(),
    ]).then(([rp, ch, di, fl, de, wo, se, ph]) => {
      const ok = <T,>(r: PromiseSettledResult<T>) => (r.status === "fulfilled" ? r.value : undefined);
      const d: Data = {
        roleplay: ok(rp)?.scenarios, characters: ok(ch)?.characters, dialogue: ok(di)?.topics, flashcards: ok(fl)?.topics,
        debate: ok(de)?.topics, words: ok(wo)?.units.flatMap((u) => u.words), sentences: ok(se)?.units.flatMap((u) => u.skills),
        photos: ok(ph)?.units.flatMap((u) => u.photos),
      };
      if (Object.values(d).every((v) => !v?.length)) {
        const first = [rp, ch, di, fl, de, wo, se, ph].find((r) => r.status === "rejected") as PromiseRejectedResult | undefined;
        setError(first?.reason instanceof Error ? first.reason.message : "Couldn't load today's picks");
      }
      setData(d);
    });
  }, []);
  useEffect(() => { load(); }, [load]);

  // The daily pick is one item from one mode, chosen by the date; that item is left out of its own section below.
  const daily = data ? dailyPick(data, day) : null;
  const without = <T extends { id: string }>(list: T[] | undefined, mode: string) => (list ?? []).filter((x) => !(daily && daily.mode === mode && daily.id === x.id));

  const link = (mode: string, href: string, children: ReactNode, className: string, label?: string, key?: string) =>
    premium
      ? <Link key={key} href={href} aria-label={label} className={className}>{children}</Link>
      : <button key={key} type="button" aria-label={label} onClick={() => onLocked(modeOf(mode).title)} className={`${className} text-left`}>{children}</button>;

  const open = <T,>(list: T[] | undefined, n: number, salt: string, done: (t: T) => boolean) => pickDaily(list ?? [], n, day, salt, done);

  const roleplays = data ? open(without(data.roleplay, "roleplay"), 2, "roleplay", (s) => s.practiced) : [];
  const characters = data ? open(without(data.characters, "characters"), 5, "characters", (c) => c.saved > 0) : [];
  const dialogues = data ? open(without(data.dialogue, "dialogue"), 2, "dialogue", (t) => t.passed) : [];
  const flashcards = data ? open(without(data.flashcards, "flashcards"), 5, "flashcards", (t) => t.completed) : [];
  const debates = data ? open(without(data.debate, "debate"), 2, "debate", (t) => t.debated) : [];
  const sentences = data ? open(data.sentences, 2, "sentence", (s) => s.passed) : [];
  const words = data ? open(data.words, 5, "word", (w) => w.passed) : [];
  const wordKey = words.map((w) => w.id).join(",");
  const [wordCovers, setWordCovers] = useState<Record<string, string | null>>({});
  useEffect(() => {
    if (!wordKey) return;
    let live = true;
    api.word.covers(wordKey.split(",")).then((r) => { if (live) setWordCovers(r.covers); }).catch(() => {});
    return () => { live = false; };
  }, [wordKey]);
  const photos = data ? open(data.photos, 5, "photo", (p) => p.passed) : [];

  return (
    <div className="mx-auto w-full max-w-[560px] md:max-w-[1200px]">
      <PageHeader eyebrow="Today" title="Explore" lead="A fresh pick from every mode, chosen for today. New picks arrive at midnight." />

      {error && (
        <div className="mt-8">
          <p className="text-sm text-danger">{error}</p>
          <button onClick={() => { setData(null); load(); }} className="mt-3 rounded-full bg-white/10 px-4 py-2 text-sm">Try again</button>
        </div>
      )}
      {!data && !error && <p className="mt-8 text-muted">Loading today's picks…</p>}

      {data && !error && (
        <div className="mt-6 columns-1 gap-5 md:columns-2 xl:columns-3">
            {daily && (
              <section aria-label="Your daily pick" className="mb-5 break-inside-avoid rounded-card border border-accent/25 bg-gradient-to-b from-accent-soft to-surface p-5">
                <p className="eyebrow !text-accent">Daily pick</p>
                <h2 className="mt-1 font-display text-lg font-bold">One thing to try today</h2>
                <h3 className="mt-4 text-base font-semibold md:text-sm">{daily.mode}</h3>
                {link(daily.modeId, daily.href,
                  <Cover title={daily.title} cover={daily.cover} emoji={daily.emoji} seed={daily.id} />,
                  "relative mt-4 block aspect-[2/1] overflow-hidden rounded-xl", daily.title)}
              </section>
            )}

            {characters.length > 0 && (
              <Card mode="characters" sub="Today's characters">
                <Carousel label="Today's characters">
                  {characters.map((c) => (
                    <div key={c.id} className="relative shrink-0 snap-start overflow-hidden rounded-2xl w-[82%] aspect-[8/9]">
                      {link("characters", `/characters/${c.id}`, <>
                        <CharacterPortrait id={c.id} emoji={c.emoji} hue={c.hue} cover={c.cover} />
                        <Shade /><Title text={c.name} />
                      </>, "absolute inset-0 block", c.name)}
                    </div>
                  ))}
                </Carousel>
              </Card>
            )}

            {dialogues.length > 0 && (
              <Card mode="dialogue" sub="Today's dialogues">
                <TilePair>
                  {dialogues.map((t) => link("dialogue", `/dialogue/${t.id}`,
                    <Cover title={t.title} cover={t.cover} emoji={t.emoji} seed={t.id} />, "relative block aspect-[7/8] overflow-hidden rounded-xl", t.title, t.id))}
                </TilePair>
              </Card>
            )}

            {photos.length > 0 && (
              <Card mode="photo" sub="Complete the decks">
                <Strip>
                  {photos.map((p) => <Thumb key={p.id} src={p.image} emoji="photo" seed={p.id} />)}
                </Strip>
                {link("photo", `/photo/${photos[0].id}`, "Start now", "mt-5 block w-full rounded-xl bg-surface-3 py-4 text-center text-sm font-semibold hover:bg-surface-3 md:text-xs")}
              </Card>
            )}

            {roleplays.length > 0 && (
              <Card mode="roleplay" sub="Today's scenarios">
                <TilePair>
                  {roleplays.map((s) => link("roleplay", `/roleplay/${s.id}`,
                    <Cover title={s.title} cover={s.cover} emoji={s.emoji} seed={s.id} />, "relative block aspect-[7/8] overflow-hidden rounded-xl", s.title, s.id))}
                </TilePair>
              </Card>
            )}

            {words.length > 0 && (
              <Card mode="word" sub="Complete the decks">
                <Strip>
                  {words.map((w) => <Thumb key={w.id} src={wordCovers[w.id] ?? null} emoji={w.emoji} seed={w.id} />)}
                </Strip>
                {link("word", `/word/${words[0].id}`, "Play now", "mt-5 block w-full rounded-xl bg-surface-3 py-4 text-center text-sm font-semibold hover:bg-surface-3 md:text-xs")}
              </Card>
            )}

            {sentences.length > 0 && (
              <Card mode="sentence" sub="Today's lessons">
                <TilePair>
                  {sentences.map((s) => link("sentence", `/sentence/${s.id}`,
                    <Cover title={s.title} cover={s.cover ?? null} emoji={s.emoji} seed={s.id} />, "relative block aspect-[7/8] overflow-hidden rounded-xl", s.title, s.id))}
                </TilePair>
              </Card>
            )}

            {flashcards.length > 0 && (
              <Card mode="flashcards" sub="Today's cards">
                <Carousel label="Today's cards">
                  {flashcards.map((t) => (
                    <div key={t.id} className="w-[82%] shrink-0 snap-start">
                      {link("flashcards", `/flashcards/${t.id}`, <>
                        <span className="relative block aspect-[16/9] overflow-hidden rounded-t-xl">
                          <Cover title="" cover={t.cover} emoji={t.emoji} seed={t.id} />
                        </span>
                        <span className="block px-3 py-3">
                          <span className="block text-[15px] font-semibold md:text-[13px]">{t.title}</span>
                          <span className="mt-1 block text-xs text-muted md:text-[10px]">{t.total} Flashcards</span>
                        </span>
                      </>, "block overflow-hidden rounded-xl border border-line/10 bg-surface", t.title)}
                    </div>
                  ))}
                </Carousel>
              </Card>
            )}

            {debates.length > 0 && (
              <Card mode="debate" sub="Today's topics">
                <div className="flex flex-col gap-3">
                  {debates.map((t) => link("debate", `/debate/${t.id}`,
                    <Cover title={t.title} cover={t.cover} emoji={t.emoji} seed={t.id} />, "relative block aspect-[9/4] overflow-hidden rounded-xl", t.title, t.id))}
                </div>
              </Card>
            )}
        </div>
      )}
      {data && !error && <p className="mt-8 text-center text-[11px] text-subtle">Photos from <a href="https://pixabay.com" target="_blank" rel="noreferrer" className="underline">Pixabay</a> and <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="underline">Pexels</a>; characters from <a href="https://www.wikipedia.org" target="_blank" rel="noreferrer" className="underline">Wikipedia</a>. Picks change every day.</p>}
      {data && !premium && !error && (
        <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-subtle"><Lock size={10} /> Picks open the Premium modes.</p>
      )}
    </div>
  );
}

/** Chooses today's daily pick: one mode by date, one open item in it. Returns null when nothing loaded. */
function dailyPick(d: Data, day: string): (Daily & { id: string; modeId: string }) | null {
  const options: (Daily & { id: string; modeId: string })[] = [];
  const add = <T extends { id: string }>(modeId: string, list: T[] | undefined, done: (t: T) => boolean, make: (t: T) => Omit<Daily, "mode">) => {
    const item = pickDaily(list ?? [], 1, day, `daily:${modeId}`, done)[0];
    if (item) options.push({ ...make(item), id: item.id, modeId, mode: modeOf(modeId).title });
  };
  add("debate", d.debate, (t) => t.debated, (t) => ({ title: t.title, href: `/debate/${t.id}`, cover: t.cover, emoji: t.emoji }));
  add("roleplay", d.roleplay, (s) => s.practiced, (s) => ({ title: s.title, href: `/roleplay/${s.id}`, cover: s.cover, emoji: s.emoji }));
  add("dialogue", d.dialogue, (t) => t.passed, (t) => ({ title: t.title, href: `/dialogue/${t.id}`, cover: t.cover, emoji: t.emoji }));
  add("flashcards", d.flashcards, (t) => t.completed, (t) => ({ title: t.title, href: `/flashcards/${t.id}`, cover: t.cover, emoji: t.emoji }));
  if (!options.length) return null;
  return options[Math.floor(seeded(`${day}:daily`)() * options.length)];
}

/** A mode card: title and description from MODES, a divider, a sub heading, then the picks. */
function Card({ mode, sub, children }: { mode: string; sub: string; children: ReactNode }) {
  const m = modeOf(mode);
  return (
    <section aria-label={m.title} className="mb-5 break-inside-avoid rounded-2xl border border-line/5 bg-surface p-5">
      <h2 className="text-lg font-semibold">{m.title}</h2>
      <p className="mt-3 text-[15px] leading-snug text-ink/90 md:text-[13px]">{m.desc}</p>
      <hr className="mt-4 border-line/10" />
      <h3 className="mt-4 text-base font-semibold md:text-sm">{sub}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

const TilePair = ({ children }: { children: ReactNode }) => <div className="grid grid-cols-2 gap-2.5">{children}</div>;

/** Picture (or a line icon on a tinted tile) with the title in the top left corner. */
function Cover({ title, cover, emoji, seed }: { title: string; cover: string | null; emoji: string; seed: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <>
      {cover && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt="" loading="lazy" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <span className="absolute inset-0"><CoverFallback seed={seed} title={title || emoji} size={40} /></span>
      )}
      {title && <><Shade /><Title text={title} /></>}
    </>
  );
}

// a darkened top edge keeps the white title readable on any picture
const Shade = () => <span className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 to-transparent" />;
const Title = ({ text }: { text: string }) => (
  <span lang="en" style={{ hyphens: "auto" }} className="absolute left-3 right-3 top-3 text-base font-semibold leading-tight text-ink drop-shadow md:text-[15px]">{text}</span>
);

/** A row of five equal square thumbnails (slightly overlapping). */
const Strip = ({ children }: { children: ReactNode }) => <div className="flex items-center [&>*:first-child]:ml-0 [&>*]:-ml-1 [&>*]:rounded-lg [&>*]:ring-2 [&>*]:ring-surface">{children}</div>;

/** One square slot of fixed size: the picture fills it (cropped), or a line icon if there is none yet. */
function Thumb({ src, emoji, seed }: { src: string | null; emoji: string; seed: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return (
    <span className={`relative block aspect-square min-w-0 flex-1 basis-0 overflow-hidden bg-gradient-to-br ${tile(seed)}`}>
      {src && !failed
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" />
        : <span className="absolute inset-0"><CoverFallback seed={seed} title={emoji} size={20} /></span>}
    </span>
  );
}

/** Swipeable row with a 1/5 counter and arrow buttons. Items are snap-aligned; the counter follows the scroll position. */
function Carousel({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = Array.isArray(children) ? children.length : 1;

  const step = () => {
    const el = ref.current;
    const first = el?.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + 12 : 0;
  };
  const onScroll = () => {
    const el = ref.current;
    if (!el || !step()) return;
    // at the far end the last item can never reach the left edge, so count it as reached
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setIndex(atEnd ? total - 1 : Math.min(total - 1, Math.round(el.scrollLeft / step())));
  };
  const go = (dir: number) => ref.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  return (
    <div role="group" aria-roledescription="carousel" aria-label={label}>
      <div ref={ref} onScroll={onScroll} className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-lg font-semibold" aria-live="polite">{index + 1}<span className="text-muted">/{total}</span></span>
        <div className="flex gap-3">
          <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-40"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => go(1)} disabled={index >= total - 1} aria-label="Next" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-40"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
}
