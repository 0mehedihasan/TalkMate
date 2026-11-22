"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ShieldAlert } from "lucide-react";
import { getToken } from "@/lib/api";
import { admin } from "@/lib/admin";
import { AdminPanel } from "@/components/admin/AdminPanel";

type State = "loading" | "yes" | "no" | "unconfigured" | "error";

export default function AdminPage() {
  const [state, setState] = useState<State>("loading");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!getToken()) { window.location.href = "/login"; return; }
    admin.me()
      .then((r) => setState(r.admin ? "yes" : r.configured ? "no" : "unconfigured"))
      .catch((e) => { setMsg(e.message); setState("error"); });
  }, []);

  if (state === "yes") return <AdminPanel />;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-canvas px-6 text-center text-muted">
      {state === "loading" ? <Loader2 className="animate-spin" /> : (
        <>
          <ShieldAlert size={28} className="text-brand-300" />
          <p className="max-w-sm text-sm">
            {state === "no" && "This account is not an admin."}
            {state === "unconfigured" && <>No admin is set up yet. Add your account email to <code className="rounded bg-white/10 px-1">ADMIN_EMAILS</code> in the backend <code className="rounded bg-white/10 px-1">.env</code> and restart the API.</>}
            {state === "error" && msg}
          </p>
          <Link href="/dashboard" className="text-sm text-brand-300 hover:underline">Back to the app</Link>
        </>
      )}
    </div>
  );
}
