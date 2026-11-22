"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, LayoutGrid, LogOut, TrendingUp } from "lucide-react";
import { clearToken } from "@/lib/api";

/** Always takes the learner back to the dashboard. */
export const Logo = () => (
  <Link href="/dashboard" aria-label="TalkMate home"
    className="flex items-center gap-2 rounded-lg transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/logo/logo-mark.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
    <span className="font-display text-lg font-bold tracking-tight">TalkMate</span>
  </Link>
);

/** Sidebar + centred column used by the unit list and skill pages (the practice screen is full screen). */
export function SentenceShell({ title, backHref, children }: { title: string; backHref: string; children: React.ReactNode }) {
  const router = useRouter();
  const item = "flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-ink";
  return (
    <div className="flex min-h-screen bg-canvas">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-[236px] flex-col gap-10 border-r border-line/[0.07] bg-canvas px-6 py-7 md:flex">
        <Logo />
        <nav aria-label="Main" className="flex flex-col gap-1">
          <Link href="/dashboard" className={item}><LayoutGrid size={18} aria-hidden="true" /> Home</Link>
          <Link href="/dashboard?tab=learn" className={item}><BookOpen size={18} aria-hidden="true" /> Learn</Link>
          <Link href="/dashboard?tab=progress" className={item}><TrendingUp size={18} aria-hidden="true" /> Progress</Link>
        </nav>
        <button onClick={() => { clearToken(); router.replace("/login"); }} className={`${item} mt-auto`}><LogOut size={18} aria-hidden="true" /> Log out</button>
      </aside>
      <main className="w-full px-4 pb-16 pt-8 sm:px-6 md:pl-[260px] md:pr-8 lg:pt-12">
        <div className="mx-auto w-full max-w-[720px]">
          <Link href={backHref} className="group mb-2 inline-flex items-center gap-3 rounded-lg">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line/10 bg-surface text-muted transition-colors group-hover:border-line/20 group-hover:text-ink">
              <ArrowLeft size={17} aria-hidden="true" />
            </span>
            <span className="font-display text-2xl font-bold tracking-tight sm:text-[26px]">{title}</span>
          </Link>
          {children}
        </div>
      </main>
    </div>
  );
}
