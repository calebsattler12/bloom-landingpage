# Bloom Website — Context for Claude Code

This file is read automatically by Claude Code / Cursor agents so edits, SEO
work, and link fixes do not require re-deriving context every session.

## What this is

Marketing site for **Bloom** (Syncro Labs) at **runbloom.ai**. Static HTML,
no build step.

- `index.html` — public site
- `pitch-deck.html` — sales deck (keyboard nav)
- `90-day-timeline.html` — shared 90-day checklist (starter pod install)
- `linkedin-content.md` — paste-ready LinkedIn drafts
- `brand-voice.md` — craft rules (sourced from RevBlack locked voice; Bloom-adapted)
- `logo-mark.svg` — simple bloom icon (teal rounded square + cream petals); source of truth
- Nav/footer/deck lockup: `[img src=logo-mark.svg] [gap] BLOOM` typeset in Schibsted Grotesk
- `favicon.png` — same mark, no word
- Do not use the old contour rings, combined PNG lockup, or the tagline "INSIGHTS. LANDSCAPES. GROWTH."

## Deployment

- Vercel project `bloom-landing`, repo `calebsattler12/bloom-landingpage`
- Push to `main` auto-deploys when Git is connected
- Domain `runbloom.ai`

## Brand

- **Palette:** accent `#12C4B4`, background `#F4EFE3`, ink `#0B0B0C`
- **Fonts:** Schibsted Grotesk (headings), Hanken Grotesk (body)
- **Logo:** simple bloom icon beside typeset BLOOM (Schibsted Grotesk). Never include "INSIGHTS. LANDSCAPES. GROWTH."
- **CTA (site):** Book a Call → https://calendar.app.google/kY3NqzNsspgzzw1F9
- **CTA (deck close):** Work with us
- Personality: light, approachable, friendly. Do not revive old Verity navy/Jost.

## Positioning (locked)

**Thesis (internal):** Agent teams that generate organic, inbound deals. Human
install, monitor, improve. Unlimited agents via new project teams while
retained. Grounded in buyer language from sales calls and email.

**Public copy:** Imply that thesis. Do **not** paste the thesis sentence on
every section. Hero leads with buyer language at work (found, ranked, chosen).
Say each proof point once: hardware ownership in partner/how-it-runs; roster
growth in projects; ICP keep-either-way in samples/CTA.

Lead with **outcome** (buyer language → inbound), not "hire an AI employee."
Do **not** boil down to "AI content" or "10k for content."

**White glove (show, don't label):** A human installs, monitors, and helps
improve the team(s). Client owns the hardware (Mac mini). Prefer "How we show
up" / "Your hardware" over repeating "white glove."

**Starter pod:** The first 90 days install a starter team of agents (content
is the usual entry). While retained, projects compound more agents onto that
pod. Prefer **starter pod** over "content core" or "content engine."

**Retention language:** Phrases like "while you stay a client" / "while
retained" belong on the **pitch deck**, not on `index.html`. On the site,
talk about compounding agents and growing the roster without the retainer
frame.

**Projects / use cases:** Prefer **projects** for expansion; **use case** for
entry points. Content is one capability cluster inside the starter pod.
Approval ≠ auto-publish. LinkedIn is paste-only. Placeholders OK until specs
are scrubbed.

## Voice

Follow `brand-voice.md`: zero em dashes; no "it's not X, it's Y"; banned AI
diction; no fabricated proof; say **agent** not **bot**. One job per section.
Cut repeated thesis phrases.

## Pricing (public drafts)

**Do not publish dollar amounts, install fees, or retainer figures** in
`index.html`, `pitch-deck.html`, `90-day-timeline.html`, or
`linkedin-content.md`. Qualitative only: own the hardware, month to month,
roster grows with projects, fraction of a content team. Prefer Book a Call.

## Site section map

1. Hero (buyer language at work + chips: ICP report · Your hardware · Keeps growing)
2. Why this (own the asset vs rent attention; human partner)
3. How we show up / partner (install, monitor, improve; own hardware)
4. Meet the starter pod (job cards; placeholders OK)
5. Projects / services (scroll org chart; each project adds agents to the roster)
6. Samples (ICP teaser + link to `icp-findings-example.html`, Slack query, LinkedIn paste-only)
7. First 90 days (starter pod → then projects; link 90-day-timeline.html)
8. How it runs (month to month; weekly email; tool-agnostic)
9. RevBlack (live multi-team client; logo + Visit RevBlack site)
10. Final CTA

## Roster (placeholders OK until scrubbed)

Starter pod: Content Director, Research / ICP, format writers (how-to,
article, playbook), LinkedIn writer (paste-only), Quality & Voice Gate,
SEO/AEO, Scheduler. Other teams as `[Placeholder]` project cards (query /
close pipeline, weekly email reporter, website recommendations, etc.).

## Integrations (confirmed only)

Slack, Webflow CMS, HubSpot, Salesforce, Fathom, Circleback, Granola.
Frame as **tool-agnostic**.

## RevBlack proof

Live client with multiple agent teams / projects. Link
https://www.revblack.com ("Visit RevBlack site"). Use `revblack-logo.png`.
Do not use "first customer," inbound goal numbers (1–4 → 8–15), fabricated
testimonials, or "12 hrs saved" stats.

## Editing

- Prefer targeted edits unless repositioning the whole narrative
- Respect `prefers-reduced-motion`
- Preview `index.html`, `pitch-deck.html`, and `90-day-timeline.html`
  locally before pushing
- 90-day live means generation → QA → human approval (pool). CMS
  publishing is a later project, not the install finish line.
- Say **agent** not **bot** in user-facing copy.
