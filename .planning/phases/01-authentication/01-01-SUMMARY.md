---
phase: 01-authentication
plan: 01
subsystem: auth
tags: [supabase, supabase-js, astro, env-vars, github-actions]

# Dependency graph
requires: []
provides:
  - "@supabase/supabase-js singleton client at src/lib/supabase.ts (exports `supabase`)"
  - ".env.example documenting PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY"
  - "GitHub Actions deploy.yml injects Supabase secrets into Astro build step"
affects: [01-02, 01-03, payments, dashboard]

# Tech tracking
tech-stack:
  added: ["@supabase/supabase-js ^2.100.1"]
  patterns:
    - "Singleton Supabase client via src/lib/supabase.ts — import everywhere, never call createClient directly"
    - "Astro PUBLIC_ env var prefix for browser-exposed vars (not VITE_)"
    - "Implicit flow (not PKCE) for static site auth — no server callback needed"

key-files:
  created:
    - src/lib/supabase.ts
    - .env.example
  modified:
    - package.json
    - package-lock.json
    - .github/workflows/deploy.yml

key-decisions:
  - "Use @supabase/supabase-js (not @supabase/ssr) — static site requires browser-only client"
  - "flowType: implicit — static sites cannot use PKCE (requires same browser for code exchange)"
  - "Supabase env vars scoped to Build with Astro step only in CI (not job-level) — only Astro build needs them for bundling"

patterns-established:
  - "Pattern: Singleton Supabase client — create once in src/lib/supabase.ts, import everywhere"
  - "Pattern: PUBLIC_ prefix for all Supabase env vars in Astro (import.meta.env.PUBLIC_*)"

requirements-completed: [AUTH-01, AUTH-02, AUTH-03]

# Metrics
duration: 2min
completed: 2026-03-27
---

# Phase 01 Plan 01: Supabase Client Setup Summary

**@supabase/supabase-js singleton client with implicit flow at src/lib/supabase.ts, .env.example documentation, and GitHub Actions CI wired to inject Supabase secrets at build time**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-27T22:44:42Z
- **Completed:** 2026-03-27T22:46:09Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Installed @supabase/supabase-js ^2.100.1 (the correct browser-only client for static sites)
- Created src/lib/supabase.ts singleton client with implicit flow, detectSessionInUrl, persistSession, autoRefreshToken
- Created .env.example documenting both required PUBLIC_ env vars with source instructions
- Updated .github/workflows/deploy.yml to inject PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY from GitHub repository secrets into the Astro build step

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Supabase JS and create singleton client** - `fdeb9e2` (feat)
2. **Task 2: Update GitHub Actions deploy workflow for Supabase env vars** - `f0bb2a5` (chore)

## Files Created/Modified

- `src/lib/supabase.ts` - Singleton Supabase client with implicit flow config; exports `supabase`
- `.env.example` - Documents PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY with dashboard source instructions
- `package.json` - Added @supabase/supabase-js ^2.100.1 dependency
- `package-lock.json` - Updated lockfile
- `.github/workflows/deploy.yml` - Added env block under Build with Astro step injecting Supabase secrets

## Decisions Made

- Used `@supabase/supabase-js` not `@supabase/ssr` — `@supabase/ssr` requires server-side cookie access and is incompatible with a static GitHub Pages deployment
- Used `flowType: 'implicit'` — PKCE requires the code exchange to happen in the same browser that initiated the flow, which is not reliably possible for a static site; implicit flow is the correct and documented approach for this architecture
- Scoped Supabase env vars to the Build with Astro step only (not job-level) — vars are baked into the JS bundle at build time, not needed at runtime in CI

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. Build succeeds cleanly (69 pages built). Missing env vars at build time are expected and acceptable — they will be provided via GitHub repository secrets in production CI.

## User Setup Required

**External services require manual configuration before auth can function.**

The following must be done manually before testing auth (covered in plan user_setup):

1. **Create a Supabase project** (free tier): https://supabase.com/dashboard -> New Project
2. **Set Site URL**: Supabase Dashboard -> Authentication -> URL Configuration -> Site URL: `https://RambjorgRD2.github.io`
3. **Add Redirect URL**: Supabase Dashboard -> Authentication -> URL Configuration -> Redirect URLs: `https://RambjorgRD2.github.io/AIQ/**`
4. **Add GitHub repository secrets**:
   - `PUBLIC_SUPABASE_URL` — from Supabase Dashboard -> Project Settings -> API -> Project URL
   - `PUBLIC_SUPABASE_ANON_KEY` — from Supabase Dashboard -> Project Settings -> API -> anon public key
   - Location: GitHub repo -> Settings -> Secrets and variables -> Actions -> New repository secret

## Next Phase Readiness

- Supabase client foundation complete — all subsequent auth tasks can `import { supabase } from '../lib/supabase.ts'`
- Plan 01-02 (sign-in page + magic link send) and 01-03 (auth callback page) are unblocked
- Supabase project must be created and secrets added to GitHub before end-to-end auth testing works

---
*Phase: 01-authentication*
*Completed: 2026-03-27*
