"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window { adsbygoogle?: unknown[] }
}

// One AdSense display unit. `slot` is the ad-unit ID from your AdSense account.
// Renders nothing when AdSense isn't configured, so it's safe to leave in place.
export function AdUnit({ slot, format = "auto", className = "" }: {
  slot: string | undefined; format?: string; className?: string;
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || !slot || pushed.current) return;
    pushed.current = true; // React strict mode runs effects twice in dev; push only once
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); }
    catch { /* blocked by an ad blocker or not ready yet */ }
  }, [client, slot]);

  if (!client || !slot) return null;
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/[0.07] bg-[#171827] p-3 ${className}`}>
      <p className="mb-1 text-[10px] uppercase tracking-widest text-white/30">Advertisement</p>
      <ins className="adsbygoogle block" style={{ display: "block" }}
        data-ad-client={client} data-ad-slot={slot}
        data-ad-format={format} data-full-width-responsive="true" />
    </div>
  );
}
