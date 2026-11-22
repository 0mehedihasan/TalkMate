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
- [ ] Replace the copied dev keys with separate production keys (OpenRouter, Gmail app password) — `docs/security.md` local vs production
- [ ] Test a real sign-up on the live site (verification email arrives) and one AI mode
- [ ] Hostinger (2026-11-22): the API's env vars had been wiped (503, `JWT_SECRET` missing). Restored `DATABASE_URL` (new DB password), a new `JWT_SECRET`, `MIGRATE_ON_BUILD`, `FRONTEND_URL`, `PUBLIC_API_URL`, `MEDIA_DIR`, `OPENROUTER_MODEL(S)`. **Still missing on the API: `OPENROUTER_API_KEY`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `GOOGLE_CLIENT_ID`, `PIXABAY_API_KEY`, `ADMIN_EMAILS`** (add in hPanel, Node.js > Environment variables)
- [ ] Hostinger: both TalkMate sites auto-deploy from `FaisalAhmedRafi/TalkMate` `main`; `0mehedihasan/TalkMate` no longer exists. Move them to the owner's GitHub (fork/transfer the repo), and enable daily backups
- [ ] Merge `chore/security-ci-docs` into `main`: `main` still lacks `next build --webpack` and the backend `prebuild` (migrations on build)
- [ ] GitHub Actions do not run: the repo owner's account is locked for billing — fix it so CI can gate merges
- [ ] Complete the *Go-live security checklist* in `docs/guides/deployment.md`
- [ ] Protect `main` on GitHub (require the CI checks)
- [ ] Click through every mode in a browser after the framework upgrade (only login, dashboard, Chat and Explore were checked; Call/mic, Google sign-in and the Admin panel were not)
- [ ] Check on Vercel that the CSP allows everything in production (Google sign-in popup, flag images, photos); watch the browser console for CSP errors
- [ ] Choose a license (none yet — all rights reserved)

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
