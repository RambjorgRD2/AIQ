---
phase: 01-authentication
plan: 03
subsystem: auth
tags: [supabase, magic-link, astro, auth-nav, onAuthStateChange]

# Dependency graph
requires:
  - phase: 01-authentication-01-01
    provides: src/lib/supabase.ts singleton client and sign-in/callback pages
provides:
  - Global auth nav strip on every page via Layout.astro
  - onAuthStateChange subscription wired site-wide
  - data-auth-show/data-auth-hide DOM toggle pattern
  - window.__supabaseUser global for downstream page scripts
  - Sign Out handler clearing session and redirecting to /AIQ/
affects: [all pages using Layout.astro, any page script consuming window.__supabaseUser]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "data-auth-show/data-auth-hide: attributes on DOM elements toggled by onAuthStateChange callback"
    - "window.__supabaseUser: global exposed by Layout.astro for page-level scripts"
    - "Fixed-position auth nav strip at z-index:9999 overlaid on all pages"

key-files:
  created: []
  modified:
    - src/layouts/Layout.astro

key-decisions:
  - "Auth nav strip is position:fixed overlay — does not disturb each page's own nav structure"
  - "BASE constant added to Layout.astro frontmatter for signin link construction"
  - "Script tag uses standard Astro bundled import (not is:inline) so supabase.ts is bundled by Vite"

patterns-established:
  - "Pattern 1: data-auth-show/data-auth-hide DOM attributes — add to any element that should toggle with auth state"
  - "Pattern 2: window.__supabaseUser — page scripts can read this after Layout.astro's onAuthStateChange fires"

requirements-completed: [AUTH-03, AUTH-04]

# Metrics
duration: 10min
completed: 2026-03-27
---

# Phase 01 Plan 03: Global Auth Nav in Layout.astro Summary

**Fixed-position auth nav strip wired to Supabase onAuthStateChange added to Layout.astro, giving every page Sign In / Sign Out UI with session persistence and window.__supabaseUser global**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-03-27T22:00:00Z
- **Completed:** 2026-03-27T22:09:25Z
- **Tasks:** 2 of 2 complete (Task 2 checkpoint approved by human tester)
- **Files modified:** 1

## Accomplishments
- Added `BASE` constant to Layout.astro frontmatter (previously missing — was inlined in favicon href)
- Added fixed-position auth nav strip before `<slot />` with Sign In link (data-auth-hide) and Sign Out button + email span (data-auth-show)
- Added bundled `<script>` block subscribing to `supabase.auth.onAuthStateChange` for DOM toggling
- Sign Out handler calls `supabase.auth.signOut()` and redirects to `/AIQ/`
- Production build passes: 70 pages built successfully

## Task Commits

Each task was committed atomically:

1. **Task 1: Add auth nav bar and auth state listener to Layout.astro** - `3cb8f05` (feat)
2. **Task 2: Verify full auth flow end-to-end** - checkpoint:human-verify — approved by human tester in production on GitHub Pages

## Files Created/Modified
- `src/layouts/Layout.astro` - Added BASE const, auth nav strip HTML, and onAuthStateChange script block

## Decisions Made
- Auth nav strip uses `position:fixed; z-index:9999` so it overlays any page's own nav without layout disruption
- Script tag is NOT `is:inline` — Astro/Vite bundles it, enabling the `import { supabase }` ES module import
- `BASE` constant extracted to frontmatter (was previously inlined only in the favicon href); now used for Sign In link construction

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
See `.planning/phases/01-authentication/01-USER-SETUP.md` — Supabase project, .env vars, and Site URL / Redirect URL configuration required before human-verify checkpoint can be completed.

## Checkpoint Outcome

**Task 2 (human-verify) APPROVED.** Full end-to-end magic link flow verified in production on GitHub Pages:
- AUTH-01: Email form sends magic link without errors
- AUTH-02: Clicking magic link establishes session and redirects to /AIQ/
- AUTH-03: Session survives browser refresh — Sign Out button remains visible
- AUTH-04: Sign Out button works from any page, clears session, reverts nav to Sign In

## Next Phase Readiness
- After checkpoint approval: AUTH-01 through AUTH-04 requirements fully verified
- Phase 01 authentication complete — ready for Phase 02 (payments/Stripe)
- `window.__supabaseUser` available for any downstream page needing auth-gated content

---
*Phase: 01-authentication*
*Completed: 2026-03-27*
