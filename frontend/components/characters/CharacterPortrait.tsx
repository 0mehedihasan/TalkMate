"use client";
import { useState } from "react";
import { portraitSrc, tileBackground, USE_PORTRAITS } from "@/lib/characters";
import { iconFor } from "@/components/ui/Glyph";

/** A character's picture: your own portrait file when portraits are on, else the stock photo from the API (`cover`), else a tinted tile with a line icon (TalkMate draws no emoji). Fills its parent. */
export function CharacterPortrait({ id, emoji, hue, cover, emojiClass = "text-6xl" }: { id: string; emoji: string; hue: number; cover?: string | null; emojiClass?: string }) {
  const [failed, setFailed] = useState(false);
  const [coverFailed, setCoverFailed] = useState(false);
  if (USE_PORTRAITS && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={portraitSrc(id)} alt="" loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover object-top" />
    );
  }
  if (cover && !coverFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={cover} alt="" loading="lazy" onError={() => setCoverFailed(true)} className="h-full w-full object-cover object-top" />
    );
  }
  const Icon = iconFor(id, "characters");
  const small = emojiClass.includes("text-lg");
  return (
    <div className="flex h-full w-full items-center justify-center text-ink/85" style={{ background: tileBackground(hue) }} aria-hidden="true">
      <Icon size={small ? 18 : 48} strokeWidth={1.5} />
    </div>
  );
}
