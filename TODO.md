# TODO

Living backlog. Agents: tick items as you finish them and add follow-ups you discover.

## Done
- [x] AGENTS.md, NIST CSF 2.0 profile (`docs/security.md`), deployment guide with go-live checklist
- [x] CI (secret scan, audit, type-check, build, migrate + smoke test) and Dependabot
- [x] Security headers on both apps; `.env` templates; `.gitignore` hardening
- [x] Upgrade Next.js 14 → 16 / React 19 and NestJS 10 → 11 / nodemailer 10 (audit clean)
- [x] Remove the leftover PostgreSQL migrations

## Before go-live
- [x] Hostinger: AI, Gmail, Google client ID, Pixabay keys and `ADMIN_EMAILS` copied from the dev env file (2026-11-12); web rebuilt with `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- [ ] Add https://talkmate.edsol.academy to the Google OAuth client's Authorized JavaScript origins (Google Cloud console)
- [x] Production mail goes through the Hostinger mailbox `talkmate@edsol.academy` (2026-11-22), confirmed with a live sign-up; the Gmail keys were removed from the API env
- [ ] Replace the copied dev keys with separate production keys (OpenRouter) — `docs/security.md` local vs production
- [ ] Test a real sign-up on the live site (verification email arrives) and one AI mode
- [x] Hostinger (2026-11-22): the API's env vars had been wiped (503, `JWT_SECRET` missing). All 14 restored: new DB password and `JWT_SECRET`, the rest (AI, Gmail, Google, Pixabay, `ADMIN_EMAILS`) copied again from the dev env file
- [ ] Hostinger: both TalkMate sites auto-deploy from `FaisalAhmedRafi/TalkMate` `main`; `0mehedihasan/TalkMate` no longer exists. Move them to the owner's GitHub (fork/transfer the repo), and enable daily backups
- [ ] Merge `chore/security-ci-docs` into `main`: `main` still lacks `next build --webpack` and the backend `prebuild` (migrations on build)
- [ ] GitHub Actions do not run: the repo owner's account is locked for billing — fix it so CI can gate merges
- [ ] Complete the *Go-live security checklist* in `docs/guides/deployment.md`
- [ ] Protect `main` on GitHub (require the CI checks)
- [ ] Click through every mode in a browser after the framework upgrade (only login, dashboard, Chat and Explore were checked; Call/mic, Google sign-in and the Admin panel were not)
- [ ] Check on Vercel that the CSP allows everything in production (Google sign-in popup, flag images, photos); watch the browser console for CSP errors
- [ ] Choose a license (none yet — all rights reserved)

## SEO (2026-11-24)
- [x] Public landing page, `/learn` language pages, `/guides`, sitemap, robots, structured data, `noindex` behind the login
- [ ] Have a native speaker check the phrases and romanisation in `lib/languages.ts` (Bengali, Hindi, Arabic, Korean first) and read the three guides in `lib/guides.ts`; rewrite them in your own voice
- [ ] Search Console: submit `sitemap.xml`, request indexing of `/`, `/learn`, `/guides` and a few language pages; check Indexing > Pages weekly
- [ ] Write one new guide a month (real experience beats filler); bump `CONTENT_UPDATED` in `lib/site.ts` when public content changes
- [ ] Get real links to the site (edsol.academy, GitHub README, LinkedIn, communities); run PageSpeed Insights on `/` and `/learn/spanish` (the AdSense script loads on every page and can slow the first paint)
- [ ] Consider keeping ads off the public marketing pages until they have more original content

## Design (premium UI pass, 2026-11-22)
- [x] Semantic colour tokens, fonts, focus/reduced-motion base, no emoji in the UI, Home/tabs/grids/landing restyled (branch `design/premium-ui`)
- [ ] Practice screens (Chat, Call, Debate, Roleplay, Characters, Sentence/Word practice) only got the token and background pass: give their headers, bubbles and feedback panels the same care as Home
- [ ] Admin panel and Account sub-pages only got the token pass
- [ ] Backend error texts reach the UI raw (e.g. "OPENROUTER_API_KEY is not set on the server"); map them to learner-friendly messages
- [ ] Run an axe/contrast check on the main screens

## Advertising (AdSense, 2026-11-19)
- [ ] AdSense: approve edsol.academy, then turn on Auto ads for talkmate.edsol.academy only and exclude `/admin`
- [ ] AdSense > Privacy & messaging: publish Google's consent message for the EEA, UK and Switzerland (required for personalised ads)
- [ ] Watch the browser console on the live site for CSP errors from ad hosts after approval

## Security (from `docs/security.md` accepted risks)
- [ ] Ad scripts run in the page, so they could read the sign-in token in `localStorage`; moving the JWT to an `httpOnly` cookie (below) also closes this
- [ ] Enforce Premium on the API, not only in the UI (needs real billing first)
- [ ] Move the JWT from `localStorage` to an `httpOnly` cookie; revoke tokens on password change / account deletion
- [ ] Refuse to start in production when `JWT_SECRET` < 32 chars (today: warning only)
- [ ] Tighten the CSP with nonces (drop `'unsafe-inline'` scripts)
- [ ] Shared rate-limit store (Redis/DB) so limits survive restarts and span instances; per-account login lockout
- [ ] Server-side validation of scores (Sentence, Word, Flashcards, Photo) to stop XP farming
- [ ] Honour the stored privacy opt-outs or remove the switches; publish a privacy notice (data goes to OpenRouter and model providers)
- [ ] Audit log for admin writes (who changed which element, when)
- [ ] Clean up unverified accounts and old archived chats/calls

## Engineering
- [ ] Add a linter (ESLint) and unit tests; run them in CI
- [ ] Remove dead code listed in `CLAUDE.md` gotcha 57 (GeneratePanel, PhotoPanel, legacy `/ai/*` routes)
- [ ] Prisma 5 → 6 when convenient
- [ ] Wire `MailService` into support messages (today they are only stored)
