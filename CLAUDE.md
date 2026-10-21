# Bloom Website — Context for Claude Code

This file is read automatically by Claude Code / Cursor agents so edits, SEO
work, and link fixes do not require re-deriving context every session.

## What this is

Marketing site for **Bloom** (Syncro Labs) at **runbloom.ai**. Static HTML,
no build step, plus a Vercel function for snapshot requests.

- `index.html` — public homepage (AI answers / snapshot + content system)
- `snapshot/index.html` — public snapshot builder (`/snapshot/`)
- `api/snapshot.js` — emails snapshot requests to Caleb
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
- **Hero:** Get your company named in AI answers, not just your competitors.
- **CTA (site):** Book a Call → https://calendar.app.google/zw5FN51UGRgyidLv7
- **Secondary CTA:** Get your free AI visibility report → `/snapshot/` or `#snapshot`
- **Social:** LinkedIn https://www.linkedin.com/company/bloom-ai-llc/ (JSON-LD `sameAs`). No Twitter account.
- Personality: light, approachable, friendly, slightly dramatic on **pain**.
- Prefer **agent** in supporting copy. Never **bot**.

## Positioning (locked)

**Source of truth for the public homepage:** the Oct 20, 2026 website update
brief. Do not invent stats, client results, testimonials, or prices. Do not
paste Zipliens, Archer, Epiq, Synergy, Curant, disability claims, or other
named prospect/competitor detail onto the public site.

**Thesis (public):** Bloom gets B2B companies named in AI answers (ChatGPT,
Perplexity, Google AI Overviews), not just their competitors.

**Pain:** When buyers ask AI for the best tool in a category, a competitor
usually gets named and the company doesn't. Usual causes: missing pages built
for a specific buyer question, no industry or comparison pages, few pages
indexed, and AI crawlers blocked in robots.txt.

**How:**
1. Free AI visibility snapshot
2. Plan from ICP, GSC/GA4, and buyer questions
3. Voice agent interviews the company's own people
4. Approve in Slack, publish to Webflow or WordPress
5. Weekly email report and live dashboard

**Sales motion (copy, not a public playbook dump):** every prospect gets a
free report with no pitch attached, then a short Loom on the one gap to fix
first, then a 20-minute call on a 90-day plan.

**Onboarding (new clients):** Day 0 access, Day 7 foundation, Day 9 first
calibration draft, Day 14 weekly report and dashboard.

**Motion:** Book a Call. Secondary: snapshot form (URL + email).

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

The locked hero line uses "not just your competitors" from the Oct 20 brief.
Do not add more "not just / it's not" constructions elsewhere.

## Pricing (public drafts)

**Do not publish dollar amounts, install fees, or retainer figures.** Homepage
uses a "Choose your level" section with Level 1 / 2 / 3 placeholders
(Pricing TBD). Prefer Book a Call.

## Snapshot report

- Public builder: `/snapshot/` (also the homepage `#snapshot` form).
- Visitor submits website URL + email, sees "Great, we'll send that to your
  email shortly!" and a button back to home.
- `POST /api/snapshot` emails `caleb@runbloom.ai` via Formsubmit.
  It only sends that alert. It does not create a job in the bloom-snapshots app.
  Changing the recipient requires a one-time Formsubmit activation: the first
  submission sends an activation email to `caleb@runbloom.ai`. Open it and
  click the confirmation link. Formsubmit holds submissions (about 30 days)
  and delivers them after confirmation. The browser fallback in
  `snapshot-form.js` posts to the same address if `/api/snapshot` is down.
- Public sample: `/snapshot/sample/` uses a blurred image
  (`snapshot/sample-report.jpg`). Company, domain, and competitor names are
  unreadable. Do not link the live Zipliens report URL on the marketing site.
- The snapshot app admin at bloom-snapshots.calebsattler21.workers.dev is
  Caleb-only. The public site collects the request; it does not generate the
  report in the browser.

## Site section map (`index.html`)

1. Hero (named in AI answers)
2. The gap (causes)
3. How it works (snapshot → plan → interview → approve → measure)
4. Snapshot form
5. Onboarding (Day 0 / 7 / 9 / 14)
6. Choose your level (placeholders)
7. Quotes (Tate, Julia, Rob)
8. Talk with the founder + Book a Call

## Proof on the homepage

Approved quotes already on the site (Tate Stone, Julia Ribas, Rob Nelson).
Do not fabricate new testimonials. Do not put Curant, disability claims, or
named competitor vendors on the public homepage.

## Editing

- Prefer targeted edits unless repositioning the whole narrative
- Preview `index.html` locally before pushing
- Say **agent** not **bot** in user-facing copy
- After homepage edits, keep `preview/index.html` in sync with `index.html`
