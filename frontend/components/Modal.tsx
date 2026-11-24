"use client";
import { useEffect } from "react";
import { X } from "lucide-react";

export function Modal({ children, onClose, label, wide }: {
  children: React.ReactNode; onClose: () => void; label: string; wide?: boolean;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        role="dialog" aria-label={label} onClick={(e) => e.stopPropagation()}
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-line/10 bg-surface p-6 ${wide ? "max-w-xl" : "max-w-md"}`}
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 text-muted hover:text-ink"><X size={18} /></button>
        {children}
      </div>
    </div>
  );
}

export const Select = ({ value, onChange, options, label }: {
  value: string; onChange: (v: string) => void; options: string[]; label: string;
}) => (
  <select
    aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}
    className="rounded-lg border border-line/10 bg-canvas px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand-500"
  >
    {options.map((o) => <option key={o}>{o}</option>)}
  </select>
);

export const ErrorText = ({ text }: { text: string | null }) =>
  text ? <p role="alert" className="mt-3 rounded-xl border border-danger/25 bg-danger/10 px-3.5 py-2.5 text-sm text-danger">{text}</p> : null;
