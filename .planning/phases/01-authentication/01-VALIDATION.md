---
phase: 1
slug: authentication
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-27
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Phase 1 auth is a live integration; all validation is manual browser testing |
| **Config file** | None — no test runner needed for this phase |
| **Quick run command** | Manual: open browser dev tools → check `localStorage['sb-<project>-auth-token']` is set |
| **Full suite command** | Manual end-to-end: send magic link → click → verify session → refresh → verify persists → sign out → verify cleared |
| **Estimated runtime** | ~5 minutes manual QA |

---

## Sampling Rate

- **After every task commit:** Manual smoke test of the specific behavior added (see Per-Task map below)
- **After every plan wave:** Full manual end-to-end auth cycle
- **Before `/gsd:verify-work`:** Full suite must pass (all 4 AUTH requirements verified)
- **Max feedback latency:** 5 minutes per task (manual testing)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| Supabase project setup | 01-01 | 1 | AUTH-01 | Manual smoke | — | N/A | ⬜ pending |
| Env vars + package install | 01-01 | 1 | AUTH-01 | Manual smoke | — | `.env` created | ⬜ pending |
| Auth callback page | 01-02 | 1 | AUTH-02 | Manual smoke | — | `src/pages/auth/callback.astro` | ⬜ pending |
| Sign-in page + magic link form | 01-02 | 1 | AUTH-01, AUTH-02 | Manual smoke | — | `src/pages/signin.astro` | ⬜ pending |
| Session plumbing in Layout.astro | 01-03 | 2 | AUTH-03, AUTH-04 | Manual smoke | — | `src/layouts/Layout.astro` | ⬜ pending |
| Sign-out button on every page | 01-03 | 2 | AUTH-04 | Manual smoke | — | `src/layouts/Layout.astro` | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

No test infrastructure to install. All Phase 1 validation is manual browser smoke testing against a live Supabase project.

*Existing infrastructure covers all phase requirements (manual QA only).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Email magic link is sent within 60s | AUTH-01 | Requires live Supabase project + email delivery | Enter email on sign-in page → click "Send magic link" → check inbox within 60s |
| Clicking magic link establishes session | AUTH-02 | Requires live email + browser click event | Click link in email → should land on `/AIQ/auth/callback` → auto-redirect to `/AIQ/` → check localStorage for `sb-*-auth-token` |
| Session survives browser refresh | AUTH-03 | Requires live session in browser | After sign-in, press F5 → nav should still show "Sign out" button (not "Sign in") |
| Session available on second device | AUTH-03 | Requires second browser/device | Request a new magic link on second device → click it → verify same user account data available |
| Sign-out clears session from any page | AUTH-04 | Requires UI interaction | While authenticated, navigate to `/AIQ/courses/` → click "Sign out" → verify nav shows "Sign in" → check localStorage `sb-*-auth-token` is null |

---

## Validation Sign-Off

- [ ] All tasks have manual verification steps defined above
- [ ] Supabase Dashboard configured (Site URL + Redirect URLs) before any testing
- [ ] GitHub Actions secrets added (`PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`)
- [ ] `.env` added to `.gitignore`
- [ ] End-to-end flow tested: send link → click → session → refresh → sign out
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
