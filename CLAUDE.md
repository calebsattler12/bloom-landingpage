# Bloom Website — Context for Claude Code

This file is read automatically by Claude Code / Cursor agents so edits, SEO
work, and link fixes do not require re-deriving context every session.

## What this is

Marketing site for **Bloom** (Syncro Labs) at **runbloom.ai**. Static HTML,
no build step.

- `index.html` — public splash homepage (AI search / inbound thesis)
- `preview/index.html` — mirror of the homepage; `/preview/` 301s to `/`
- `get-started.html`, `pitch-deck.html`, `90-day-*`, sample reports, `teams/*`
  — **legacy** pages from the older always-on marketing roster narrative.
  Do not let them override homepage positioning until a later rewrite pass.
- `robots.txt` / `sitemap.xml` — discoverability; `logo-font-options.html` is noindex
- `linkedin-content.md` — paste-ready LinkedIn drafts (may still reflect legacy
  framing; prefer homepage thesis for new posts)
- `brand-voice.md` — craft rules (sourced from RevBlack locked voice; Bloom-adapted)
- Nav/footer lockup: CSS wordmark `bloom` plus the always-on light (`brand.css`).
  `logo-mark.png` remains the Open Graph image until a new share mark exists.
- `favicon.svg` — Bloom Blue glow mark
- `brand.css` — Geist, tokens, wordmark glow, section scale
- Do not use the old contour rings, cream/lavender palette, Schibsted/Hanken,
  combined PNG lockup, or the tagline "INSIGHTS. LANDSCAPES. GROWTH."
- `/blue-variation` and `/preview/` redirect to the live root.

## Deployment

- Vercel project `bloom-landing`, repo `calebsattler12/bloom-landingpage`
- Push to `main` auto-deploys when Git is connected
- Domain `runbloom.ai`
- **Agent habit:** after finishing site edits, commit and push `main` without
  asking (see `.cursor/rules/auto-deploy-main.mdc`), unless the user says hold.

## Brand

- **Palette:** ink `#0B0B0F`, white `#FFFFFF`, cloud `#F4F5F8`, mist `#E4E7EE`, slate `#5E6272`, Bloom Blue `#3355FF` (accent, light, one high-intent CTA). Glow edge `#FFB8E6` / halo `#A591FF`. No full-bleed blue sections.
- **Fonts:** Geist (UI and headings), Geist Mono (labels)
- **Logo:** `bloom` wordmark plus glowing light. Never include "INSIGHTS. LANDSCAPES. GROWTH."
- **Hero:** Mobilize your call data. `index.html` is that splash (Book a Call,
  how strip, three quotes, talk with the founder).
- **CTA (site):** Book a Call → https://calendar.app.google/oLraWPKZUFHqQXt18
- **Social:** LinkedIn https://www.linkedin.com/company/bloom-ai-llc/ (JSON-LD `sameAs`). No Twitter account.
- Personality: light, approachable, friendly, slightly dramatic on **pain**.
- Prefer **agent** in supporting copy. Never **bot**.

## Positioning (locked)

**Source of truth for the public homepage:** the current AI-search inbound
thesis (client decks such as Curant are engagement examples; do not paste
client-specific verticals, competitor names, or prices onto the public site).

**Thesis (public):** Bloom turns a company’s call recordings and expert
interviews into pages that get **named in AI search**, so buyers find them
and **organic inbound** follows.

**Pain:** AI already answers your buyers and names someone else.

**How (show, do not over-label):** buyer questions → real call packets →
expert interview → agent draft → quality gates → human approval → HTML ready
to post. Weekly scorecard on the core buyer questions. Quality line: your
calls, your expert’s voice, a person approves every page.

**Motion:** Book a Call.

**Do not lead with:** Mac mini, always-on marketing roster / Orchestrator /
director seats, or “no token charges.” Those are not the public lead story.
Do not put Cloudflare, Workers, or Durable Objects on the marketing site.
Never use “it’s not X, it’s Y.” Do not boil the product down to generic
“AI content” or SEO alone. Do not publish dollar amounts, install fees, or
retainer figures.

**Legacy pages:** `get-started.html`, `pitch-deck.html`, `90-day-*`,
`icp-findings-example.html`, `win-loss-example.html`,
`events-partnerships-example.html`, and `teams/*` still describe the older
always-on marketing-team offer. Leave them in place for now. Do not expand
or revive that roster narrative on `index.html`. A later pass should align
or retire them.

## Voice

Follow `brand-voice.md`: zero em dashes; no "it's not X, it's Y"; banned AI
diction; no fabricated proof. One job per section. Cut repeated thesis phrases.
Slightly dramatic on pain. Calm on how Bloom works.

## Pricing (public drafts)

**Do not publish dollar amounts, install fees, or retainer figures** in
`index.html`, `get-started.html`, `pitch-deck.html`, `90-day-timeline.html`,
`events-partnerships-example.html`, or `linkedin-content.md`. Prefer Book a Call.

## Site section map (`index.html`)

1. Hero (Mobilize your call data)
2. How it works (thin step strip: calls and experts → draft → gates → approval → pages live and scorecard)
3. Quotes (Tate, Julia, Rob)
4. Talk with the founder + Book a Call

## Proof on the homepage

Approved quotes already on the splash (Tate Stone, Julia Ribas, Rob Nelson).
Do not fabricate new testimonials. Do not put Curant, disability claims, or
named competitor vendors on the public homepage.

## Editing

- Prefer targeted edits unless repositioning the whole narrative
- Preview `index.html` locally before pushing
- Say **agent** not **bot** in user-facing copy
- After homepage edits, keep `preview/index.html` in sync with `index.html`
