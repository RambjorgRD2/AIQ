# Phase 1: Authentication - Research

**Researched:** 2026-03-27
**Domain:** Supabase magic link auth on a static Astro site hosted at a GitHub Pages subpath
**Confidence:** HIGH (core flow), MEDIUM (cross-device session semantics), HIGH (env vars, callback pattern)

---

## Summary

Phase 1 adds Supabase magic link authentication to a fully static Astro v4 site deployed to GitHub Pages at `https://RambjorgRD2.github.io/AIQ`. The site has no server-side rendering, no API routes, and no backend — all auth state must be managed purely in client-side JavaScript.

The correct approach is `@supabase/supabase-js` (the browser client) with the **implicit flow** (default). When the user clicks the magic link, Supabase sends them to the configured `redirectTo` URL with an `#access_token=...&refresh_token=...` hash fragment. The Supabase JS client auto-detects this fragment on page load (`detectSessionInUrl: true` is the default), extracts and stores the tokens in localStorage, then fires `onAuthStateChange('SIGNED_IN', session)`. No server-side callback route is needed.

`@supabase/ssr` is NOT applicable here — it requires SSR/cookies and is designed for server-rendered frameworks. The plain `@supabase/supabase-js` v2 client is the correct and complete solution for this architecture.

**Cross-device session semantics:** A magic link is single-use and cannot be opened on a different device (PKCE code verifier is device-bound). "Session persists across devices" means: after a user authenticates on Device A, signing in separately on Device B via a new magic link gives them the same Supabase user account and the same data — it does NOT mean one click signs in both devices simultaneously. The ROADMAP's success criterion ("session present on a second device") is achievable by the user simply clicking a fresh magic link on that device.

**Primary recommendation:** Use `@supabase/supabase-js` 2.x with implicit flow. Create a shared `src/lib/supabase.ts` singleton. Place a `<script>` block in `Layout.astro` that initializes the client, subscribes to `onAuthStateChange`, and updates DOM nav elements (sign-in / sign-out button). Add a dedicated `/AIQ/auth/callback` static page that is the `emailRedirectTo` target — its only job is to run a client script that reads the session from the URL hash and redirects to the intended destination.

---

## Project Constraints (from CLAUDE.md)

- **Node 22 required** — all npm commands via `bash -c 'source "$HOME/.nvm/nvm.sh" && nvm use 22 && ...'`
- **Base URL is `/AIQ`** — all internal links prefixed with `${BASE}/path`; `import.meta.env.BASE_URL` available
- **No backend, no SSR** — static output mode only; auth must be 100% client-side
- **Tailwind + Layout.astro pattern** — all new pages use `src/layouts/Layout.astro` wrapper
- **Brand colors as CSS variables and Tailwind tokens** — no arbitrary color values
- **`PUBLIC_` prefix for client-exposed env vars** — Astro exposes only `PUBLIC_*` vars to browser JS

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AUTH-01 | User can sign up with email (magic link — no password required) | `signInWithOtp({ email, options: { emailRedirectTo } })` — creates account if first time, sends link |
| AUTH-02 | User receives magic link email and can authenticate via it | Supabase default email template; magic link delivery via Supabase SMTP; implicit flow handles token extraction on landing |
| AUTH-03 | Authenticated session persists across browser refresh and devices | `persistSession: true` (default) stores tokens in localStorage; tokens survive refresh; new magic link on second device signs into same account |
| AUTH-04 | User can sign out from any page | `supabase.auth.signOut()` clears localStorage; sign-out button in Layout.astro nav (client-side visibility toggle via `onAuthStateChange`) |
</phase_requirements>

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@supabase/supabase-js` | 2.100.1 | Supabase client — auth, DB, storage | Official SDK; works browser-only (no SSR needed); auto handles implicit flow, localStorage, token refresh |

### Do NOT Use

| Library | Why Not |
|---------|---------|
| `@supabase/ssr` | Requires SSR/cookies; incompatible with GitHub Pages static deployment |
| `@supabase/auth-helpers-*` | Deprecated; replaced by `@supabase/ssr` (also SSR-only) |

### Astro env vars for Supabase

Astro uses `PUBLIC_` prefix (not `VITE_`) to expose variables to browser JS:

```
PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Accessed in client scripts as `import.meta.env.PUBLIC_SUPABASE_URL`.

**Installation:**
```bash
bash -c 'source "$HOME/.nvm/nvm.sh" && nvm use 22 && npm install @supabase/supabase-js'
```

**Version verification (confirmed 2026-03-27):**
- `@supabase/supabase-js`: 2.100.1 (latest as of research date)
- `astro`: current project uses `^4.16.0`; latest is 6.1.1 — do NOT upgrade Astro (out of scope)

---

## Architecture Patterns

### Recommended Project Structure (additions only)

```
src/
├── lib/
│   └── supabase.ts          # singleton createClient, exported as `supabase`
├── pages/
│   └── auth/
│       └── callback.astro   # static page — client script reads hash, redirects
├── layouts/
│   └── Layout.astro         # ADD: <script> for onAuthStateChange + nav auth UI
└── .env                     # PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY
```

### Pattern 1: Supabase Singleton Client

Create once, import everywhere. Never `createClient` in multiple places.

```typescript
// src/lib/supabase.ts
// Source: Supabase docs — https://supabase.com/docs/reference/javascript/initializing
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'implicit',        // default — works without a server
    detectSessionInUrl: true,    // default — auto-parses #access_token hash on load
    persistSession: true,        // default — stores tokens in localStorage
    autoRefreshToken: true,      // default — refreshes before expiry
  },
})
```

### Pattern 2: Sending the Magic Link

```typescript
// Source: https://supabase.com/docs/guides/auth/auth-email-passwordless
const { error } = await supabase.auth.signInWithOtp({
  email: userEmail,
  options: {
    emailRedirectTo: 'https://RambjorgRD2.github.io/AIQ/auth/callback',
    shouldCreateUser: true,  // auto-creates account on first sign-in
  },
})
if (error) {
  // show error state
} else {
  // show "Check your email" confirmation state
}
```

### Pattern 3: Auth Callback Page (implicit flow — client-side only)

The callback page is a static `.astro` file. It has NO frontmatter server logic. A `<script>` tag runs on the client, reads the session that Supabase already parsed from the hash, and redirects.

```astro
---
// src/pages/auth/callback.astro
// No server logic needed — Supabase JS auto-parses #access_token from hash
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
---
<html><head><title>Signing in...</title></head>
<body>
  <p>Signing you in...</p>
  <script>
    import { supabase } from '../lib/supabase.ts'

    // Supabase client auto-detects #access_token on init (detectSessionInUrl: true)
    // Wait for the SIGNED_IN event, then redirect
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Redirect to intended destination or dashboard
        const redirectTo = sessionStorage.getItem('auth_redirect') || '/AIQ/'
        sessionStorage.removeItem('auth_redirect')
        window.location.href = redirectTo
      }
    })

    // Fallback: if already signed in (e.g., page refresh)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const redirectTo = sessionStorage.getItem('auth_redirect') || '/AIQ/'
        sessionStorage.removeItem('auth_redirect')
        window.location.href = redirectTo
      }
    })
  </script>
</body></html>
```

### Pattern 4: Global Auth State in Layout.astro

Add to the `<body>` of `Layout.astro` (inside a `<script>` tag — NOT frontmatter):

```javascript
// In Layout.astro <script> block (client-side)
import { supabase } from '../lib/supabase.ts'

// Subscribe to auth changes — fires on every page load and on sign in/out
supabase.auth.onAuthStateChange((event, session) => {
  const user = session?.user ?? null

  // Toggle auth UI elements
  document.querySelectorAll('[data-auth-show]').forEach(el => {
    el.style.display = user ? 'block' : 'none'
  })
  document.querySelectorAll('[data-auth-hide]').forEach(el => {
    el.style.display = user ? 'none' : 'block'
  })

  // Expose user to page-level scripts
  window.__supabaseUser = user
})

// Handle sign-out button(s)
document.querySelectorAll('[data-sign-out]').forEach(btn => {
  btn.addEventListener('click', async () => {
    await supabase.auth.signOut()       // clears localStorage, terminates session
    window.location.href = '/AIQ/'     // redirect to home
  })
})
```

### Pattern 5: Getting Current Session in a Page Script

```javascript
// Source: https://supabase.com/docs/reference/javascript/auth-getsession
const { data: { session } } = await supabase.auth.getSession()
const user = session?.user ?? null
// user is null if not signed in
```

### Anti-Patterns to Avoid

- **Using `@supabase/ssr` on a static site:** It requires server-side cookie access. Will silently fail or throw.
- **Calling `createClient` inside every component/page:** Creates multiple auth instances that don't share state. Always use the singleton from `src/lib/supabase.ts`.
- **Using `VITE_` prefix for env vars in Astro:** Astro uses `PUBLIC_` not `VITE_`. `import.meta.env.VITE_*` will be `undefined` in client scripts.
- **Checking `Astro.locals.user` for auth in static mode:** `Astro.locals` is server-only; unavailable in client JS or static output.
- **Hardcoding the redirect URL without adding it to Supabase Allow List:** The `emailRedirectTo` URL MUST match an entry in Supabase Dashboard > Authentication > URL Configuration > Redirect URLs.
- **Using PKCE flow for this static site:** PKCE requires the same browser that initiated the flow to exchange the code. Fine for SSR, but the implicit flow is simpler and fully sufficient for a public-facing static SPA.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Token storage + refresh | Custom localStorage management, custom token refresh timers | `@supabase/supabase-js` with `persistSession: true`, `autoRefreshToken: true` | Supabase handles JWT expiry detection, silent token refresh, storage race conditions |
| Session detection on page load | Manually parsing `window.location.hash` for `access_token` | `supabase.auth.onAuthStateChange` + `detectSessionInUrl: true` (default) | Supabase parses hash, validates tokens, populates session automatically |
| Email sending / link generation | Custom email service, custom one-time token generation | Supabase Auth built-in magic link (`signInWithOtp`) | Supabase manages link expiry (60 min), one-time use enforcement, rate limiting |
| User record creation | Manual `INSERT INTO users` on first sign-in | Supabase Auth creates user automatically; `auth.users` table managed by Supabase | User dedup, email verification state, metadata all handled |
| Cross-tab session sync | Custom `storage` event listeners | `onAuthStateChange` — Supabase emits events across browser tabs automatically | Built-in; events fire on all tabs when session changes |

**Key insight:** For a static site, Supabase's implicit flow eliminates the need for any server-side callback logic. The auth cycle is entirely: email form → `signInWithOtp` → email arrives → user clicks link → browser lands on callback page → Supabase JS parses hash → session stored → redirect to app.

---

## Common Pitfalls

### Pitfall 1: Redirect URL Not in Supabase Allow List
**What goes wrong:** Magic link sends but clicking it returns a 400/403 error from Supabase: "Redirect URL not allowed."
**Why it happens:** Supabase validates `emailRedirectTo` against the allow list at send time AND at click time.
**How to avoid:** Before writing any code, configure in Supabase Dashboard:
- Authentication > URL Configuration > Site URL: `https://RambjorgRD2.github.io`
- Authentication > URL Configuration > Redirect URLs: `https://RambjorgRD2.github.io/AIQ/**`
**Warning signs:** 400 error in network tab when clicking magic link; no session established.

### Pitfall 2: Magic Link Points to Localhost in Production
**What goes wrong:** Users receive a magic link that points to `http://localhost:3000/auth/callback` even in production.
**Why it happens:** Supabase uses the Site URL as the default when `emailRedirectTo` is not passed, or the email template uses `{{ .SiteURL }}` and it's still set to localhost.
**How to avoid:** Always pass `emailRedirectTo` explicitly in `signInWithOtp`. Set Site URL to production URL in Supabase Dashboard.
**Warning signs:** Clicking magic link opens localhost URL for remote users.

### Pitfall 3: `import.meta.env.PUBLIC_SUPABASE_URL` is undefined in client script
**What goes wrong:** Supabase client throws "supabaseUrl is required" or creates a broken client.
**Why it happens:** Env vars without `PUBLIC_` prefix are stripped from client-side bundles by Astro/Vite.
**How to avoid:** Always use `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` in `.env`. Check that `.env` is NOT committed to git (add to `.gitignore`); add vars to GitHub Actions secrets for CI build.
**Warning signs:** Console error on page load; supabase singleton fails to initialize.

### Pitfall 4: Script module import path errors in Astro static pages
**What goes wrong:** `import { supabase } from '../lib/supabase.ts'` inside a `<script>` tag fails in the browser.
**Why it happens:** Astro processes `<script>` tags with `type="module"` using Vite. Relative imports work, but the import path must be resolvable from the script's location. Astro builds inline scripts differently from component scripts.
**How to avoid:** Use Astro's `<script>` without `is:inline` — Astro will bundle it through Vite and resolve imports. Do not use `is:inline` for scripts that import from `src/lib/`.
**Warning signs:** "Cannot import module" error in browser console.

### Pitfall 5: Multiple `onAuthStateChange` subscribers per page navigation
**What goes wrong:** Each page navigation registers a new listener; on SPAs or after Astro view transitions, listeners accumulate, causing duplicate sign-out calls or redundant UI updates.
**Why it happens:** `onAuthStateChange` returns an `{ data: { subscription } }` object. If you never call `subscription.unsubscribe()`, the listener persists.
**How to avoid:** In Layout.astro, the subscription is registered once per page load (which is fine for a full-page static site). If Astro View Transitions are ever added, unsubscribe in the `astro:before-swap` event.
**Warning signs:** Console logs duplicate SIGNED_IN events; sign-out fires multiple times.

### Pitfall 6: GitHub Actions build fails — env vars not available
**What goes wrong:** Production build on GitHub Actions produces a site where Supabase client cannot initialize.
**Why it happens:** `.env` is not committed (correct), but GitHub Actions has no access to secrets unless explicitly configured.
**How to avoid:** Add `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` as repository secrets in GitHub Settings > Secrets and variables > Actions. Reference them in `deploy.yml` as environment variables in the build step.
**Warning signs:** Deployed site shows auth errors; local dev works fine.

### Pitfall 7: Cross-device session confusion
**What goes wrong:** Implementer assumes clicking one magic link signs in the user on ALL devices simultaneously.
**Why it happens:** The ROADMAP says "session persists across devices." This is misleading if interpreted as "one magic link, multiple devices."
**What actually happens:**
  - `signOut({ scope: 'global' })` (default) terminates ALL device sessions at once — correct behavior for AUTH-04.
  - Session "persistence across devices" means: user's Supabase account data (dashboard, progress, scores) is available on any device they sign in to separately.
  - A new magic link must be requested on each device to establish a local session.
**How to avoid:** Document this behavior in the sign-in UI ("Check your email on this device").

---

## Code Examples

### Full Magic Link Send (with error/success states)
```javascript
// Source: https://supabase.com/docs/guides/auth/auth-email-passwordless
async function sendMagicLink(email) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: 'https://RambjorgRD2.github.io/AIQ/auth/callback',
      shouldCreateUser: true,
    },
  })
  return { error }
}
```

### Getting Session Synchronously on Page Load
```javascript
// Source: https://supabase.com/docs/reference/javascript/auth-getsession
// Returns cached session from localStorage — does NOT hit network unless expired
const { data: { session }, error } = await supabase.auth.getSession()
```

### Global Sign-Out (all devices)
```javascript
// Source: https://supabase.com/docs/guides/auth/signout
await supabase.auth.signOut({ scope: 'global' })
// Clears localStorage session, revokes refresh token server-side
// Note: access token remains valid until it expires (up to 1 hour)
// For immediate effect, redirect user away from any protected page
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@supabase/auth-helpers-astro` | `@supabase/ssr` (SSR only) or `@supabase/supabase-js` (static) | 2023 | Auth helpers are deprecated; for static sites, use the bare JS client |
| `VITE_` env prefix in Astro | `PUBLIC_` env prefix | Astro v1 stabilization | All Astro projects must use `PUBLIC_` for browser-exposed vars |
| Implicit flow (default JS) | PKCE still default for SSR libs | 2022-2024 | `@supabase/supabase-js` still defaults to implicit (`flowType: 'implicit'`); `@supabase/ssr` defaults to PKCE |
| Manual `#access_token` hash parsing | `detectSessionInUrl: true` (default) | supabase-js v2 | Client auto-handles the hash fragment; no manual parsing needed |

**Deprecated/outdated:**
- `supabase.auth.user()` (v1 API): replaced by `supabase.auth.getUser()` and `supabase.auth.getSession()` in v2
- `supabase.auth.session()` (v1 API): replaced by `supabase.auth.getSession()` in v2
- `@supabase/auth-helpers-*` packages: deprecated since 2023, replaced by `@supabase/ssr`

---

## Open Questions

1. **Supabase project not yet created**
   - What we know: Supabase will be the auth backend; project URL and anon key are needed
   - What's unclear: Which Supabase region, org name, project name
   - Recommendation: Plan 01-01 creates the Supabase project as its first task

2. **Auth email deliverability**
   - What we know: Supabase's default SMTP (via Inbucket in local dev, SendGrid in hosted) handles email; hosted Supabase projects have a default rate limit of ~4 emails/hour for the free tier
   - What's unclear: Whether custom SMTP (SendGrid / Postmark) should be configured from day one
   - Recommendation: Start with Supabase default SMTP; upgrade if deliverability issues arise in testing

3. **Sign-in UI placement**
   - What we know: ROADMAP calls for a sign-in modal/page; no specific location decided
   - What's unclear: Modal on existing pages (overlay) vs dedicated `/AIQ/signin` page
   - Recommendation: A modal is better UX (no full-page redirect); but a dedicated `/AIQ/signin` page simplifies the `emailRedirectTo` logic and avoids modal state management across page navigations. **Recommend `/AIQ/signin` page** for phase 1 simplicity.

4. **`sessionStorage` for post-auth redirect**
   - What we know: After magic link click, user lands on `/AIQ/auth/callback`. We need to send them back to where they were.
   - What's unclear: How to persist the "intended destination" through the email click (user may switch browsers)
   - Recommendation: Store intended URL in `sessionStorage` before sending the magic link. If not present on callback, default to `/AIQ/`. Note: if the user opens the email on a different browser/device, `sessionStorage` won't have the value — the default fallback covers this case.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|---------|
| Node 22 | npm commands | Yes | v22.18.0 | — |
| npm | Package install | Yes | 10.9.3 | — |
| `@supabase/supabase-js` | Auth layer | Not installed yet | 2.100.1 (latest) | — (must install) |
| Supabase hosted project | Auth backend | Not created yet | — | — (must create — Plan 01-01) |
| GitHub Actions secrets | CI build env vars | Not configured yet | — | — (must add — Plan 01-01) |

**Missing dependencies with no fallback:**
- `@supabase/supabase-js` — must be installed (`npm install @supabase/supabase-js`)
- Supabase hosted project — must be created at supabase.com before auth can be tested
- GitHub repository secrets (`PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`) — must be added for CI builds

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected in project — manual browser testing only for Phase 1 |
| Config file | None — see Wave 0 gaps |
| Quick run command | Manual: open browser dev tools, check `localStorage['supabase.auth.token']` |
| Full suite command | Manual end-to-end: send magic link → click → verify session → sign out → verify cleared |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AUTH-01 | Email form sends magic link (no error returned) | Manual smoke | — | N/A |
| AUTH-02 | Clicking magic link establishes session (localStorage populated, nav shows sign-out) | Manual smoke | — | N/A |
| AUTH-03 | Session survives browser refresh (reload page, user still shown as signed in) | Manual smoke | — | N/A |
| AUTH-04 | Sign-out clears session from every page (nav reverts to sign-in state, localStorage cleared) | Manual smoke | — | N/A |

**Note:** AUTH-01 through AUTH-04 are all UI/integration behaviors that require a live Supabase project and email delivery. Automated unit testing is not applicable to this phase. Verification is manual browser testing per the success criteria in ROADMAP.md.

### Wave 0 Gaps
- No test infrastructure gaps for this phase — all validation is manual smoke testing against a live Supabase project.
- Recommend defining a manual QA checklist in the PLAN as verification steps for each plan.

---

## Sources

### Primary (HIGH confidence)
- [Supabase Passwordless / Magic Link Docs](https://supabase.com/docs/guides/auth/auth-email-passwordless) — `signInWithOtp`, `emailRedirectTo`, flow types
- [Supabase Implicit Flow Docs](https://supabase.com/docs/guides/auth/sessions/implicit-flow) — how hash fragment is auto-processed; client-only suitability
- [Supabase Sessions Docs](https://supabase.com/docs/guides/auth/sessions) — token lifespan, multi-device behavior, localStorage vs cookies
- [Supabase Sign Out Docs](https://supabase.com/docs/guides/auth/signout) — scope options (global/local/others)
- [Supabase Redirect URLs Docs](https://supabase.com/docs/guides/auth/redirect-urls) — wildcard support, Site URL vs Additional Redirect URLs
- [Astro Environment Variables Docs](https://docs.astro.build/en/guides/environment-variables/) — `PUBLIC_` prefix requirement for browser-exposed vars
- [supabase-js client configuration — DeepWiki](https://deepwiki.com/supabase/supabase-js/2.2-client-configuration) — `detectSessionInUrl`, `flowType`, `persistSession`, `autoRefreshToken` defaults

### Secondary (MEDIUM confidence)
- `npm view @supabase/supabase-js version` → 2.100.1 (verified live 2026-03-27)
- `npm view astro version` → 6.1.1 (latest; project uses 4.x — confirmed not upgrading)
- WebSearch: Astro `PUBLIC_` vs `VITE_` prefix — confirmed `PUBLIC_` by multiple sources including official Astro docs
- WebSearch: `@supabase/ssr` requires SSR/cookies, not applicable to static sites — confirmed by multiple sources

### Tertiary (LOW confidence)
- Community pattern: storing intended redirect URL in `sessionStorage` before sign-in — reasonable pattern, not officially documented by Supabase

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified package version from npm registry; official docs confirm `@supabase/supabase-js` is correct (not `@supabase/ssr`) for static sites
- Auth flow (implicit): HIGH — official Supabase docs explicitly state implicit flow is client-only and correct for static sites
- Callback pattern: HIGH — confirmed by official docs that `detectSessionInUrl: true` (default) auto-handles hash fragment; callback page needs no server logic
- Env var naming: HIGH — Astro official docs explicitly require `PUBLIC_` prefix
- Cross-device semantics: MEDIUM — documented in Supabase sessions guide, but the PKCE limitation (same browser/device for code exchange) is confirmed; the "cross-device" requirement is satisfied by per-device sign-in, not shared session
- Pitfalls: HIGH for Supabase config (verified from docs); MEDIUM for Astro script import paths (based on Astro build behavior knowledge)

**Research date:** 2026-03-27
**Valid until:** 2026-06-27 (stable APIs — supabase-js v2 has been stable for 2+ years; Astro env var behavior stable since v1)
