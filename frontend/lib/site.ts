// Public facts about the site, used by metadata, the sitemap, robots.txt and structured data.
export const SITE_NAME = "TalkMate";
export const SITE_TITLE = "TalkMate – Learn Languages by Speaking with an AI Tutor";
export const SITE_DESCRIPTION =
  "Practise speaking with an AI language tutor: chat, calls, roleplays and instant pronunciation feedback in 12 languages, including Spanish, French and Japanese.";

// Set NEXT_PUBLIC_SITE_URL (e.g. https://www.yourdomain.com) in the host's environment variables.
// Vercel's production URL is the fallback, localhost is the last resort for local development.
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
export const SITE_URL = resolveSiteUrl().replace(/\/+$/, "");

// Date the public pages last changed in a way worth telling search engines about (sitemap lastmod).
// Bump it when you edit the public content; a date that changes on every build is ignored by Google.
export const CONTENT_UPDATED = new Date("2026-11-24");

export const SUPPORT_EMAIL = "talkmate@edsol.academy"; // the Hostinger mailbox (also the sender of verification and reset emails)

// Pages that must never appear in search results (they need a login or are forms).
export const PRIVATE_PATHS = [
  "/dashboard", "/admin", "/chat", "/call", "/sentence", "/word", "/dialogue", "/roleplay",
  "/characters", "/debate", "/photo", "/flashcards", "/login", "/forgot-password",
  "/reset-password", "/complete-profile",
];
