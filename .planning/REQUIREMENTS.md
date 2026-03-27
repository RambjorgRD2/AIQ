# Requirements: AIQ — AI~Quotient

**Defined:** 2026-03-27
**Core Value:** The assessment score creates a personal AI identity — a tier, a number, and a progression path — that no other consumer platform provides.

## v1 Requirements (Milestone 1 — Revenue Infrastructure)

### Authentication

- [ ] **AUTH-01**: User can sign up with email (magic link — no password required)
- [ ] **AUTH-02**: User receives magic link email and can authenticate via it
- [ ] **AUTH-03**: Authenticated session persists across browser refresh and devices
- [ ] **AUTH-04**: User can sign out from any page

### Payments

- [ ] **PAY-01**: Pricing page shows Free, Society, and Enterprise tiers with features listed
- [ ] **PAY-02**: User can start Stripe checkout for Society membership from any locked content gate
- [ ] **PAY-03**: User can start Stripe checkout from the pricing page
- [ ] **PAY-04**: Successful payment automatically upgrades user to Society member
- [ ] **PAY-05**: Subscription status is verified server-side before serving locked lesson content
- [ ] **PAY-06**: Cancelled subscriptions correctly revoke access on next page load
- [ ] **PAY-07**: User receives confirmation email after successful subscription

### Content Gating

- [ ] **GATE-01**: Locked lesson pages show upgrade prompt and redirect to checkout for non-subscribers
- [ ] **GATE-02**: Authenticated Society members can access all 52 lessons without prompts
- [ ] **GATE-03**: Free tier users can access all 18 unlocked lessons without authentication
- [ ] **GATE-04**: Lesson unlock state is enforced server-side (not just client-side)

### Learner Dashboard

- [ ] **DASH-01**: Authenticated user can see their AIQ score and tier from most recent assessment
- [ ] **DASH-02**: User can see progress through each course (lessons completed / total)
- [ ] **DASH-03**: User can see their subscription status and next billing date
- [ ] **DASH-04**: User can access their AIQ certificate once eligible
- [ ] **DASH-05**: User can re-take the assessment from their dashboard

### Progress Persistence

- [ ] **PROG-01**: Lesson completion is saved to user account (not localStorage only)
- [ ] **PROG-02**: Assessment results are saved to user account
- [ ] **PROG-03**: Lesson reflection notes are saved to user account
- [ ] **PROG-04**: Progress syncs across devices when authenticated

### Shareable Score Card

- [ ] **SHARE-01**: Assessment results page generates a unique share URL (`/AIQ/share/:scoreId`)
- [ ] **SHARE-02**: Share URL renders an OG image with tier badge, score, and tier name
- [ ] **SHARE-03**: Share URL works without authentication (publicly viewable)
- [ ] **SHARE-04**: LinkedIn and X share buttons on results page use the score share URL

### Certificate Verification

- [ ] **CERT-01**: Completed users receive a certificate with a unique verification ID
- [ ] **CERT-02**: Public verification page (`/AIQ/verify/:certId`) confirms certificate authenticity
- [ ] **CERT-03**: Verification page shows name, tier achieved, and completion date

### Legal & Compliance

- [ ] **LEGAL-01**: Terms of Service page exists at `/AIQ/terms`
- [ ] **LEGAL-02**: Privacy Policy page exists at `/AIQ/privacy`
- [ ] **LEGAL-03**: Refund Policy page exists at `/AIQ/refund`
- [ ] **LEGAL-04**: Footer links to all legal pages across the site
- [ ] **LEGAL-05**: Cookie/data consent banner shown on first visit (GDPR)

### Mobile UX Fix

- [ ] **MOB-01**: Lesson sidebar has a visible toggle button on screens < 900px
- [ ] **MOB-02**: Lesson content is fully readable on mobile without requiring sidebar

## v2 Requirements (Milestone 2 — Community & Identity)

### Community Forums

- **COMM-01**: Authenticated users can access tier-appropriate discussion channels
- **COMM-02**: Users can post and reply in course-specific discussion threads
- **COMM-03**: Society members get access to all tier channels
- **COMM-04**: Community activity visible from learner dashboard

### Live Events

- **EVENT-01**: Forum events page shows upcoming workshops with booking flow
- **EVENT-02**: Society members get priority access / discounted event pricing
- **EVENT-03**: Event booking confirms via email and adds to user dashboard

### Social Proof

- **PROOF-01**: Landing page shows testimonials from real users
- **PROOF-02**: Landing page shows real member count (not placeholder)
- **PROOF-03**: Case studies or success stories visible on Society page

### Thought Leadership

- **DATA-01**: "State of AI Fluency" report page aggregates anonymized assessment benchmarks
- **DATA-02**: Report published annually and linked from landing page

### B2B

- **B2B-01**: Team/organization assessment plans available with bulk pricing
- **B2B-02**: Organization admins can view aggregate team AIQ scores
- **B2B-03**: Services page has calendar booking (not email-only contact)

## v3 Requirements (Milestone 3 — Content Depth)

- **VID-01**: At least one video concept walkthrough per lesson
- **QUIZ-01**: Interactive quiz with immediate feedback per lesson (not just reflection)
- **SRS-01**: Spaced repetition scheduling surfaces active recall questions over time
- **RES-01**: Curated supplementary reading list per lesson

## Out of Scope

| Feature | Reason |
|---------|--------|
| Native mobile app (iOS/Android) | Web-first; mobile-responsive web is sufficient for v1-v2 |
| Building or fine-tuning own LLM | Platform teaches fluency, doesn't develop AI models |
| Self-hosted video infrastructure | Use Vimeo/Mux if/when video is added — not a v1 concern |
| Synchronous live cohort delivery | Async-first; live events via Luma are supplementary, not core |
| OAuth social login (Google, GitHub) | Magic link sufficient; reduces attack surface |
| Real-time chat | High complexity; discussion forums are async |
| Content management system (CMS) | Lesson content is in code; no CMS needed until content team scales |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 | Pending |
| AUTH-02 | Phase 1 | Pending |
| AUTH-03 | Phase 1 | Pending |
| AUTH-04 | Phase 1 | Pending |
| PAY-01 | Phase 2 | Pending |
| PAY-02 | Phase 2 | Pending |
| PAY-03 | Phase 2 | Pending |
| PAY-04 | Phase 2 | Pending |
| PAY-05 | Phase 2 | Pending |
| PAY-06 | Phase 2 | Pending |
| PAY-07 | Phase 2 | Pending |
| GATE-01 | Phase 2 | Pending |
| GATE-02 | Phase 2 | Pending |
| GATE-03 | Phase 2 | Pending |
| GATE-04 | Phase 2 | Pending |
| DASH-01 | Phase 3 | Pending |
| DASH-02 | Phase 3 | Pending |
| DASH-03 | Phase 3 | Pending |
| DASH-04 | Phase 3 | Pending |
| DASH-05 | Phase 3 | Pending |
| PROG-01 | Phase 3 | Pending |
| PROG-02 | Phase 3 | Pending |
| PROG-03 | Phase 3 | Pending |
| PROG-04 | Phase 3 | Pending |
| SHARE-01 | Phase 4 | Pending |
| SHARE-02 | Phase 4 | Pending |
| SHARE-03 | Phase 4 | Pending |
| SHARE-04 | Phase 4 | Pending |
| CERT-01 | Phase 4 | Pending |
| CERT-02 | Phase 4 | Pending |
| CERT-03 | Phase 4 | Pending |
| LEGAL-01 | Phase 5 | Pending |
| LEGAL-02 | Phase 5 | Pending |
| LEGAL-03 | Phase 5 | Pending |
| LEGAL-04 | Phase 5 | Pending |
| LEGAL-05 | Phase 5 | Pending |
| MOB-01 | Phase 5 | Pending |
| MOB-02 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 38 total
- Mapped to phases: 38
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-27*
*Last updated: 2026-03-27 after initial definition*
