"use client";
import { ArrowLeft } from "lucide-react";

/** Back arrow + title + subtitle, the header every Account sub-page shares. */
export function SubPage({ title, subtitle, onBack, children }: {
  title: string; subtitle?: string; onBack: () => void; children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[656px] pt-1">
      <button onClick={onBack} className="flex items-center gap-3 rounded-lg text-lg font-semibold hover:text-ink/90">
        <ArrowLeft size={18} /> {title}
      </button>
      {subtitle && <p className="mt-3 text-[15px] text-muted">{subtitle}</p>}
      <div className="mt-6 border-t border-line/5 pt-8">{children}</div>
    </div>
  );
}
