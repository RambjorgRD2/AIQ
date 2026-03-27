# AIQ — AI~Quotient

## What This Is

AIQ is a consumer-facing AI fluency identity platform that measures, names, and progresses individual AI literacy through a 9-tier scoring system. It combines a dynamic multi-stage assessment, three structured learning tracks (Foundations / Workflows / Leadership), a community (SociA|~ Society), and a certification pathway. The tagline is "Know Your AIQ. Raise It." — and the philosophy is "The Question is Mightier than the Model."

## Core Value

The assessment score creates a personal AI identity — a tier, a number, and a progression path — that no other consumer platform provides, turning abstract AI fluency into something learners can name, share, and grow.

## Requirements

### Validated

- ✓ Multi-stage assessment engine (5 stages, 9 tiers, 3 dimensions: Think/Apply/Lead) — existing
- ✓ AI~Foundations course (12 lessons, Tiers 1–3, fully free) — existing
- ✓ AI~Workflows course (22 lessons, Tiers 4–6, partially gated) — existing
- ✓ AI~Leadership course (21 lessons, Tiers 7–9, mostly gated) — existing
- ✓ Freemium model — 18/52 lessons free, rest behind Society membership — existing
- ✓ Courses catalog page with tier badges and access gates — existing
- ✓ Landing page with hero, stats, CTA flow — existing
- ✓ Results screen with score ring, radar chart, tier label, share buttons — existing
- ✓ Society page (SociA|~ community pitch) — existing
- ✓ Forum page (events listing via Luma) — existing
- ✓ Blog page (article listing) — existing
- ✓ Certification page — existing
- ✓ Services page (B2B consulting) — existing
- ✓ Brand design system (dark theme, cyan/violet, Space Grotesk) — existing
- ✓ Static site deployment to GitHub Pages via GitHub Actions — existing

### Active

**Milestone 1 — Revenue Infrastructure**

- [ ] Pricing page with clear tier breakdown (Free / Society / Enterprise)
- [ ] Stripe payment integration for Society membership
- [ ] User authentication (email/magic link — no password complexity needed)
- [ ] Server-side payment verification gate before serving locked lesson content
- [ ] Learner dashboard — progress tracking, subscription status, certificate access
- [ ] Shareable AIQ score card — `/AIQ/share/:scoreId` with OG image (tier badge + score + tier name)
- [ ] Certificate verification page — `/AIQ/verify/:certId` for employer checks
- [ ] Server-side progress persistence (replace localStorage-only approach)
- [ ] Mobile lesson sidebar fix — collapsible toggle on lesson pages
- [ ] Legal pages — Terms of Service, Privacy Policy, Refund Policy

**Milestone 2 — Community & Identity**

- [ ] Discussion forums — tier-gated channels per course/tier
- [ ] Live event booking flow connected to Society membership (Luma integration complete)
- [ ] "State of AI Fluency" data report — aggregate anonymized assessment benchmarks
- [ ] Team/organization bulk assessment plans
- [ ] Testimonials and social proof on landing page

**Milestone 3 — Content Depth**

- [ ] Video content — concept demonstrations per lesson
- [ ] Interactive quizzes with immediate feedback (not just reflection prompts)
- [ ] Spaced repetition scheduling for active recall questions
- [ ] Supplementary reading lists per lesson

### Out of Scope

- Native mobile app — web-first; mobile-responsive web is sufficient
- Building or fine-tuning own LLM — AIQ teaches fluency, doesn't develop AI
- Self-hosted video infrastructure — use Vimeo/Mux if/when video is added
- Synchronous live cohort delivery — async-first; live events via Luma are supplementary
- Separate mobile app for Society community — web community only for now

## Context

**Current state:** A fully-designed static Astro site deployed to GitHub Pages. The content and UX are production-quality. The platform cannot yet process payments, authenticate users, or persist data across devices — all user state lives in localStorage. The entire platform is content-ready but infrastructure-blocked from becoming a real product.

**Tech stack:** Astro v4, Tailwind CSS v3, deployed as a static site to GitHub Pages (`https://RambjorgRD2.github.io/AIQ/`). No backend, no database, no auth layer yet. Node 22 required locally (nvm). Base URL `/AIQ` subpath in all routes.

**Market context:** The AIQ concept is academically validated (SSRN/Springer, 2025). OpenAI entered the certification space in late 2025. No consumer brand owns "AI fluency identity." The window to establish category leadership is now. The closest competitor (Workera) is enterprise-only with no consumer product. DataCamp is data-analyst-centric. LinkedIn Learning has no real signal. The non-technical professional audience (marketers, managers, operators) is severely underserved.

**Business model:** Freemium → Society membership (~$19–29/month or $199/year) → Enterprise (contact). The free assessment is the top-of-funnel hook — the score creates desire, the courses close it, the community keeps it.

**Competitive positioning:** "The Question is Mightier than the Model" is a philosophically differentiated angle — the Fortune 500 AI skills gap is a critical thinking gap, not a tools gap. AIQ owns this framing.

## Constraints

- **Tech Stack**: Astro + Tailwind — preserve existing architecture; backend must integrate without breaking static site deployment
- **Base URL**: All routes prefixed with `/AIQ` — any new pages must follow this pattern
- **No backend currently**: Adding auth/payments requires introducing a backend service (Node/Vercel/Supabase)
- **GitHub Pages**: Static hosting only — dynamic features require serverless functions or a separate API layer
- **Content**: All 56 lessons are text-based HTML embedded in JS — no CMS yet; keep this working while adding infrastructure
- **Brand**: Cyan/violet gradient system, `~` tilde symbol, dark theme — all new UI must match the existing design system

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static Astro site on GitHub Pages | Fast, free hosting; no backend complexity for content delivery | ✓ Good — works well for content |
| 9-tier scoring framework | Granular enough to feel meaningful, maps to 3 course tracks | ✓ Good — core differentiator |
| Freemium with 35% free content (18/52 lessons) | Build trust with Foundations before asking for payment | — Pending validation |
| SociA|~ Society as community brand name | Distinctive, `~` tilde consistent with brand | — Pending validation |
| Assessment-first funnel (not course-first) | Score creates identity desire → drives course enrollment | — Pending validation |
| Backend stack for Milestone 1 | Supabase (auth + DB) + Stripe for payments — serverless, minimal ops overhead | — Pending |

---
*Last updated: 2026-03-27 after project initialization*

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state
