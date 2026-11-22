import type { ReactNode } from "react";

/** The one page title block for dashboard tabs and mode grids: eyebrow, display title, short lead. */
export function PageHeader({ eyebrow, title, lead, action, className = "" }: {
  eyebrow?: string; title: string; lead?: ReactNode; action?: ReactNode; className?: string;
}) {
  return (
    <header className={`mb-8 flex flex-wrap items-end justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
        <h1 className="font-display text-[26px] font-bold leading-tight tracking-tight sm:text-[30px]">{title}</h1>
        {lead && <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted">{lead}</p>}
      </div>
      {action}
    </header>
  );
}
