# Roadmap: AIQ — AI~Quotient

## Overview

Milestone 1 transforms AIQ from a content-complete static site into a functional monetized product. Starting from a working Astro + GitHub Pages deployment with 56 lessons and a 5-stage assessment, this milestone adds the infrastructure layer: Supabase auth and PostgreSQL, Stripe payments, server-side content gating, a learner dashboard with persistent progress, shareable score cards, certificate verification, and legal/mobile polish. Five phases build sequentially — each phase unblocks the next and delivers a coherent, verifiable capability.

## Milestones

- 🚧 **Milestone 1 — Revenue Infrastructure** - Phases 1-5 (in progress)

**Milestone Goal:** Make AIQ a functional, monetized product — auth, payments, gating, dashboard, identity layer, legal.

## Phases

- [ ] **Phase 1: Authentication** - Users can create accounts and maintain authenticated sessions via Supabase magic link
- [ ] **Phase 2: Payments & Content Gating** - Users can purchase Society membership via Stripe and locked content is enforced server-side
- [ ] **Phase 3: Dashboard & Progress** - Authenticated users have a persistent learner dashboard with cross-device progress sync
- [ ] **Phase 4: Identity Layer** - Assessment scores produce shareable score cards and eligible users receive verifiable certificates
- [ ] **Phase 5: Legal & Mobile Polish** - The platform is legally compliant and fully usable on mobile devices

## Phase Details

### Phase 1: Authentication
**Goal**: Users can create accounts and maintain authenticated sessions across devices using Supabase magic link.
**Depends on**: Nothing (first phase)
**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04
**Success Criteria** (what must be TRUE):
  1. User can enter their email and receive a magic link within 60 seconds
  2. Clicking the magic link signs the user in and redirects them to their intended destination
  3. Authenticated session survives browser refresh and is present on a second device after login
  4. Sign-out link is reachable from every page and immediately terminates the session
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md — Install @supabase/supabase-js, create singleton client, document env vars, update CI deploy workflow
- [ ] 01-02-PLAN.md — Sign-in page with magic link form and auth callback page
- [x] 01-03-PLAN.md — Global auth state listener in Layout.astro with nav Sign In/Sign Out toggle

### Phase 2: Payments & Content Gating
**Goal**: Users can purchase Society membership via Stripe and all locked lesson content is enforced by server-side subscription verification.
**Depends on**: Phase 1
**Requirements**: PAY-01, PAY-02, PAY-03, PAY-04, PAY-05, PAY-06, PAY-07, GATE-01, GATE-02, GATE-03, GATE-04
**Success Criteria** (what must be TRUE):
  1. Pricing page clearly shows Free, Society, and Enterprise tiers with feature comparison
  2. A non-subscriber clicking a locked lesson is shown an upgrade prompt with a working Stripe checkout link
  3. After successful Stripe payment, the user's account is upgraded and locked lessons immediately become accessible
  4. A cancelled subscription correctly revokes access on the next page load — the user sees the upgrade gate again
  5. Free-tier users can access all 18 unlocked lessons with no authentication prompt
**Plans**: TBD

Plans:
- [ ] 02-01: Pricing page — `/AIQ/pricing` page with tier cards (Free / Society / Enterprise), feature lists, and CTA buttons wired to Stripe checkout or contact
- [ ] 02-02: Stripe integration — Stripe checkout session creation via Supabase Edge Function (or Vercel serverless), webhook handler to write `society_member = true` to Supabase `profiles` table on `checkout.session.completed`
- [ ] 02-03: Subscription sync — Stripe webhook handler for `customer.subscription.deleted` / `customer.subscription.updated` to revoke access; store `subscription_status` and `next_billing_date` in Supabase
- [ ] 02-04: Content gating — replace existing client-side localStorage gates with Supabase session + `profiles.society_member` check; locked lesson pages show upgrade prompt for non-members, full content for members
**UI hint**: yes

### Phase 3: Dashboard & Progress
**Goal**: Authenticated users have a persistent learner dashboard showing their AIQ score, course progress, and subscription status, synced across devices.
**Depends on**: Phase 2
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, DASH-05, PROG-01, PROG-02, PROG-03, PROG-04
**Success Criteria** (what must be TRUE):
  1. Authenticated user can navigate to their dashboard and see their most recent AIQ score, tier, and radar chart summary
  2. Dashboard shows lessons completed per course as a progress fraction (e.g., "7/12 lessons") that updates when lessons are completed
  3. Dashboard shows current subscription status and next billing date pulled live from Supabase
  4. Completing a lesson on one device is reflected in the dashboard on a different device after re-login
  5. User can click "Retake Assessment" from the dashboard and their new result overwrites the stored score
**Plans**: TBD

Plans:
- [ ] 03-01: Supabase schema — `profiles` table (user_id, society_member, subscription_status, next_billing_date), `lesson_progress` table (user_id, lesson_id, completed_at, reflection_notes), `assessment_results` table (user_id, score, tier, radar_data, completed_at)
- [ ] 03-02: Progress write hooks — on lesson completion, write to `lesson_progress`; on assessment completion, write to `assessment_results`; migrate existing localStorage data to Supabase on first authenticated load
- [ ] 03-03: Dashboard page — `/AIQ/dashboard` showing AIQ score ring + tier, course progress bars, subscription status card, certificate access (if eligible), and retake CTA; all data fetched from Supabase on load
**UI hint**: yes

### Phase 4: Identity Layer
**Goal**: Assessment results generate unique shareable score cards with OG images, and users who complete the full course track receive a verifiable certificate.
**Depends on**: Phase 3
**Requirements**: SHARE-01, SHARE-02, SHARE-03, SHARE-04, CERT-01, CERT-02, CERT-03
**Success Criteria** (what must be TRUE):
  1. Completing the assessment produces a unique share URL (`/AIQ/share/:scoreId`) that is publicly viewable without login
  2. The share URL renders a branded OG image containing the user's tier badge, numeric score, and tier name when posted to LinkedIn or X
  3. LinkedIn and X share buttons on the results page use the score-specific share URL (not the generic results URL)
  4. A user who completes all courses receives a certificate with a unique verification ID accessible from their dashboard
  5. Anyone can visit `/AIQ/verify/:certId` and see the certificate holder's name, tier achieved, and completion date
**Plans**: TBD

Plans:
- [ ] 04-01: Share URL infrastructure — on assessment completion, write score record to Supabase `share_cards` table (scoreId, user_id, score, tier, radar_data, created_at); `/AIQ/share/[scoreId].astro` dynamic route renders public score card page
- [ ] 04-02: OG image generation — Supabase Edge Function (or Vercel) generates a PNG/SVG OG image for each scoreId using tier badge + score + tier name; inject correct `og:image` meta tag into share page
- [ ] 04-03: Share button wiring — update results page to generate scoreId on completion, update LinkedIn/X share buttons to use `/AIQ/share/:scoreId` URL
- [ ] 04-04: Certificate system — write cert record to Supabase `certificates` table (certId, user_id, name, tier, completed_at) when eligibility is met; `/AIQ/verify/[certId].astro` dynamic route renders public verification page; dashboard links to cert download/view

### Phase 5: Legal & Mobile Polish
**Goal**: The platform meets minimum legal compliance requirements and lesson pages are fully usable on mobile devices.
**Depends on**: Phase 2 (footer links require pricing page to exist; gating must be live before ToS governs it)
**Requirements**: LEGAL-01, LEGAL-02, LEGAL-03, LEGAL-04, LEGAL-05, MOB-01, MOB-02
**Success Criteria** (what must be TRUE):
  1. Terms of Service, Privacy Policy, and Refund Policy pages exist at their canonical URLs and are linked from the footer on every page
  2. A first-visit cookie/data consent banner appears and does not reappear after the user dismisses it
  3. On a screen narrower than 900px, lesson pages show a visible sidebar toggle button and the lesson content is readable without the sidebar open
**Plans**: TBD

Plans:
- [ ] 05-01: Legal pages — create `/AIQ/terms`, `/AIQ/privacy`, `/AIQ/refund` pages using Layout.astro; write substantive policy content covering subscription billing, data storage (Supabase/Stripe), and refund window
- [ ] 05-02: Footer and consent — add footer links to all legal pages across every page layout; implement first-visit GDPR consent banner (localStorage flag, dismisses permanently, links to Privacy Policy)
- [ ] 05-03: Mobile sidebar fix — add collapsible toggle button to lesson sidebar on screens < 900px; ensure lesson content fills viewport width when sidebar is hidden; test across Foundations / Workflows / Leadership course layouts
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Authentication | 2/3 | In Progress|  |
| 2. Payments & Content Gating | 0/4 | Not started | - |
| 3. Dashboard & Progress | 0/3 | Not started | - |
| 4. Identity Layer | 0/4 | Not started | - |
| 5. Legal & Mobile Polish | 0/3 | Not started | - |

---
*Roadmap created: 2026-03-27*
*Milestone 1 — Revenue Infrastructure*
*Coverage: 38/38 v1 requirements mapped*
