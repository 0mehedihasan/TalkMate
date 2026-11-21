"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/api";

// Signed-in learners who open the home page go straight to the app, as before.
// Search engines have no token, so they get the public page.
export function AuthRedirect() {
  const router = useRouter();
  useEffect(() => { if (getToken()) router.replace("/dashboard"); }, [router]);
  return null;
}
