# Bloom Website — Context for Claude Code

This file is read automatically by Claude Code / Cursor agents so edits, SEO
work, and link fixes do not require re-deriving context every session.

## What this is

Marketing site for **Bloom** (Bloom AI LLC) at **runbloom.ai**. Static HTML,
no build step, plus Vercel functions for lead forms.

- `index.html` — public homepage (free snapshot hero + offer)
- `snapshot/index.html` — focused free snapshot landing (`/snapshot/`)
- `snapshot/sample/` — blurred sample free snapshot
- `privacy/index.html` — privacy policy
- `404.html` — branded not-found
- `ai-info/index.html` — structured AI crawler / assistant page (`/ai-info/`), Tally-style
- `knowledge/index.html` — Knowledge hub (`/knowledge/`)
- `knowledge/b2b-content-library/` — first published article; `/blog/b2b-content-library` 301s here
- `llms.txt` — plain-text summary for language models (points at `/ai-info/`)
- `api/snapshot.js` — emails free snapshot requests via Formsubmit using
  server env `NOTIFY_EMAIL` (set to `caleb@runbloom.ai` in Vercel)
- `api/loom-teardown.js` — Loom teardown requests, same `NOTIFY_EMAIL`
- `resources/*` — scaffolded articles, **noindex**, not in sitemap until filled
- `preview/index.html` — mirror of homepage; `/preview/` 301s to `/`
- `robots.txt` / `sitemap.xml` — discoverability; font lab and resources disallowed/noindex. Rebuild the sitemap with `npm run generate:sitemap` after a public page changes.
- `site.css` / `site.js` / `brand.css` — shared layout and brand
- `logos/clients/` — client marks + `manifest.js` for the logo row
- Nav/footer lockup: CSS wordmark `bloom` plus the always-on light (`brand.css`)
- `favicon.svg` — Bloom Blue glow mark
- Do not use the old contour rings, cream/lavender palette, Schibsted/Hanken,
  combined PNG lockup, or the tagline "INSIGHTS. LANDSCAPES. GROWTH."
- Old always-on / Mac mini / team roster pages are deleted and 301'd (see
  `TODOS.md` and `vercel.json`).

## Deployment

- Vercel project `bloom-landing`, repo `calebsattler12/bloom-landingpage`
- Push to `main` auto-deploys when Git is connected
- Domain `runbloom.ai`
- Required env: `NOTIFY_EMAIL=caleb@runbloom.ai`
- **Agent habit:** after finishing site edits, commit and push `main` without
  asking (see `.cursor/rules/auto-deploy-main.mdc`), unless the user says hold.

## Brand

- **Palette:** black/white first (ink `#0B0B0F`, white `#FFFFFF`, soft `#F4F5F8`, mist `#E4E7EE`, slate `#5E6272`); Bloom Blue `#3355FF` is accent only (links, marks, highlights). Glow edge `#FFB8E6` / halo `#A591FF` on the wordmark light.
- **Fonts:** Geist (UI and headings), Geist Mono (labels)
- **Logo:** `bloom` wordmark plus glowing light
- **Architecture:** Coa-style homepage: centered hero + product dashboard stage, pillar strip, then problem/proof/pricing/FAQ
- **Hero:** Turn your call data into content / Get named in AI search (blue highlight mark)
- **Primary CTA:** black button → Get your free snapshot (`#snapshot` or `/snapshot/`)
- **Secondary CTA:** text link Book a call → https://calendar.app.google/zw5FN51UGRgyidLv7
- **Public email:** caleb@runbloom.ai (only address allowed on the public site / committed front-end)
- **Social:** LinkedIn https://www.linkedin.com/company/bloom-ai-llc/
- Prefer **agent** in supporting copy. Never **bot**.

## Positioning (locked)

**Thesis:** Build and maintain a content library for B2B businesses. AI search
visibility is a supporting benefit. Call data becomes citeable pages through
technical health, visibility reporting, and interview-backed content with
Slack approval. Homepage story still follows the Figma pitch template
(`Bloom-pitch-template--AI-search-plan`) until the body copy is updated.

**Lead magnet:** Free snapshot (website URL + email; optional competitors).
No call recordings required for the snapshot.

**Fallback:** Free 15-minute Loom teardown (quieter than the snapshot).

**Do not lead with:** Mac mini, always-on marketing roster / Orchestrator /
director seats, or “no token charges.”

## Voice

Follow `brand-voice.md`: zero em dashes; no "it's not X, it's Y"; banned AI
diction; no fabricated proof.

## Public pricing (locked)

- Starter: $2,485/mo · 3 pillar pages · 15 content pieces / mo
- Growth: $4,950/mo · 6 pillar pages · 35 content pieces / mo · all website formats · lead magnets and CRO conversion assets
- Scale: $9,885/mo · 10 pillar pages · 50 content pieces / mo · LinkedIn, X, performance management
- No implementation fee

## Editing

- Prefer targeted edits unless repositioning the whole narrative
- After homepage edits, keep `preview/index.html` in sync with `index.html`
- See `TODOS.md` for placeholders and deleted URL redirects
