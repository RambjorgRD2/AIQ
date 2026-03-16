# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Always run npm commands via nvm (Node 22 required):

```bash
# Dev server (localhost:4321)
bash -c 'source "$HOME/.nvm/nvm.sh" && nvm use 22 && npm run dev'

# Production build (outputs to dist/)
bash -c 'source "$HOME/.nvm/nvm.sh" && nvm use 22 && npm run build'

# Preview production build locally
bash -c 'source "$HOME/.nvm/nvm.sh" && nvm use 22 && npm run preview'
```

The GitHub Actions workflow (`deploy.yml`) uses Node 20 with `npm ci` + `npm run build` for CI.

## Architecture

Static site — no backend, no database. Results are computed and stored client-side only.

### Page Structure

| Route | File | Purpose |
|---|---|---|
| `/AIQ/` | `src/pages/index.astro` | Landing page |
| `/AIQ/assessment` | `src/pages/assessment.astro` | Multi-stage interactive assessment |
| `/AIQ/results` | `src/pages/results.astro` | Score results display |
| `/AIQ/society` | `src/pages/society.astro` | Community/membership page |
| `/AIQ/certification` | `src/pages/certification.astro` | Certification info |
| `/AIQ/courses/*` | `src/pages/courses/` | Course pages (foundations, leadership, workflows) |

### Key Patterns

**Base URL handling** — all pages define `const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')` and prefix internal links with `${BASE}/path`. This is required because the site is deployed under the `/AIQ` subpath on GitHub Pages.

**Layout** — all pages wrap content in `src/layouts/Layout.astro`, which provides global CSS variables, fonts (Space Grotesk / Inter / JetBrains Mono via Google Fonts), utility classes, and the CSS reset. Most styling is done via Tailwind classes + the utility classes defined in Layout.astro.

**Assessment flow** — `assessment.astro` is a single-page multi-stage app driven by client-side JS. Stages are shown/hidden via `display` toggling. State lives in JS variables on the page; nothing is persisted to a server.

**Tailwind config** — custom colors (`cyan`, `violet`, `bg-dark`, `text-primary`, `muted`), font families, and animations are defined in `tailwind.config.mjs`. Use these tokens rather than arbitrary values.

### Brand Colors (CSS variables + Tailwind tokens)

| Name | Hex | Tailwind class |
|---|---|---|
| Background | `#04070F` | `bg-dark` |
| Cyan | `#00CFFF` | `cyan` |
| Violet | `#7C3AED` | `violet` |
| Text | `#E8F0FF` | `text-primary` |
| Muted | `#6B7A99` | `muted` |

Gradient text uses the `.gradient-text` utility class (cyan → violet). The `~` tilde is the brand's signature symbol.

### Deployment

Push to `main` → GitHub Actions builds and deploys to GitHub Pages automatically. The live site is at `https://RambjorgRD2.github.io/AIQ`.
