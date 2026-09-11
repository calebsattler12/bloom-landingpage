# Bloom Website — Context for Claude Code

This file is read automatically by Claude Code / Cursor agents so edits, SEO
work, and link fixes do not require re-deriving context every session.

## What this is

Marketing site for **Bloom** (Syncro Labs) at **runbloom.ai**. Static HTML,
no build step.

- `index.html` — public site
- `pitch-deck.html` — sales deck (keyboard nav)
- `90-day-timeline.html` — shared 90-day checklist (core engine only)
- `linkedin-content.md` — paste-ready LinkedIn drafts
- `brand-voice.md` — craft rules (sourced from RevBlack locked voice; Bloom-adapted)
- `logo-contour.svg` — source-of-truth rings-only topographic mark (transparent, no letters, no plate, no tagline)
- `logo-contour.png` / `logo-contour@2x.png` — raster fallbacks of the SVG
- `logo.png` / `logo-transparent.png` — same contour mark (aliases)
- Nav/footer/deck lockup: `[contour img src=logo-contour.svg] [gap] BLOOM` typeset in Schibsted Grotesk
- `favicon.png` — contour only
- Do not use the old combined PNG lockup or the tagline "INSIGHTS. LANDSCAPES. GROWTH."
- `logo-nav.png` / `logo-nav@2x.png` / `logo-nav-on-ink*.png` — contour-only fallbacks (prefer the HTML split lockup)

## Deployment

- Vercel project `bloom-landing`, repo `calebsattler12/bloom-landingpage`
- Push to `main` auto-deploys when Git is connected
- Domain `runbloom.ai`

## Brand

- **Palette:** accent `#12C4B4`, background `#F4EFE3`, ink `#0B0B0C`
- **Fonts:** Schibsted Grotesk (headings), Hanken Grotesk (body)
- **Logo:** rings-only contour mark beside typeset BLOOM (Schibsted Grotesk). No sand/white
  plate, no boxed lockup, no combined PNG with letters over the rings. Never include "INSIGHTS. LANDSCAPES. GROWTH."
- **CTA:** Book a Call → https://calendar.app.google/kY3NqzNsspgzzw1F9
- Personality: light, approachable, friendly. Do not revive old Verity navy/Jost.

## Positioning (locked)

**Thesis:** The AI agent team that turns sales calls and email conversations into organic, inbound
**deals**. Mines buyer language → SEO/AEO content that gets found, ranked,
chosen.

Lead with calls → organic inbound. Token-cost / privacy are supporting only.
Product is deliberately narrow (content engine). Nurture may appear as a
future phase in the pitch deck only. Approval ≠ auto-publish. LinkedIn
content is its own paste-only project after the core (never auto-post). Prefer
**projects** (not layers) for product expansion; **use case** for entry points.

## Voice

Follow `brand-voice.md`: zero em dashes; no "it's not X, it's Y"; banned AI
diction; no fabricated proof. Craft source is RevBlack's 2026-08-17 locked
`brand-voice.md` (anti-AI-tell rules only).

## Pricing (public drafts)

**Do not publish dollar amounts, install fees, or retainer figures** in
`index.html`, `pitch-deck.html`, `90-day-timeline.html`, or
`linkedin-content.md`. Qualitative only:
own the hardware, month to month, fraction of a content team. Prefer Book a
Call over a price list.

## Site section map

1. Hero (locked line + sub)
2. Why organic
3. How it starts (findings you keep)
4. First 90 days (core engine + team roster; link to 90-day-timeline.html)
5. What you can add next (scroll-driven contour rings: publishing, SEO/AEO,
   LinkedIn content, weekly email updates, query agent)
6. Continuously improves ("Just like your best employee…")
7. How it runs (qualitative cost/ownership; weekly email updates)
8. RevBlack client example (projects built out; link to revblack.com; no goal numbers)
9. Final CTA

## Roster (site truth)

Content Director, Quality & Voice Gate, Research, Content writers, SEO/AEO,
Scheduler. Not the old "AI VP of everything / unlimited agents" framing.

## Integrations (confirmed only)

Slack, Webflow CMS, HubSpot, Salesforce, Fathom, Circleback, Granola.

## RevBlack proof

Client example only: core content engine from sales calls, plus expanded
projects (LinkedIn paste-only, SEO/AEO, publishing/approval, weekly email
updates, call query agent). Link to https://www.revblack.com. Do not use
"first customer," inbound goal numbers (1–4 → 8–15), fabricated testimonials,
or "12 hrs saved" stats.

## Editing

- Prefer targeted edits unless repositioning the whole narrative
- Respect `prefers-reduced-motion`
- Preview `index.html`, `pitch-deck.html`, and `90-day-timeline.html`
  locally before pushing
- 90-day live means generation → QA → human approval (pool). CMS
  publishing is a later project, not the install finish line.
- Say **agent** not **bot** in user-facing copy (query agent, Slack agent).
