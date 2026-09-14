# Bloom Website — Context for Claude Code

This file is read automatically by Claude Code / Cursor agents so edits, SEO
work, and link fixes do not require re-deriving context every session.

## What this is

Marketing site for **Bloom** (Syncro Labs) at **runbloom.ai**. Static HTML,
no build step.

- `index.html` — public site
- `pitch-deck.html` — sales deck (keyboard nav)
- `90-day-timeline.html` — shared 90-day checklist (core agent team install)
- `linkedin-content.md` — paste-ready LinkedIn drafts
- `brand-voice.md` — craft rules (sourced from RevBlack locked voice; Bloom-adapted)
- `logo-contour.svg` — source-of-truth rings-only topographic mark (transparent, no letters, no plate, no tagline)
- Nav/footer/deck lockup: `[contour img src=logo-contour.svg] [gap] BLOOM` typeset in Schibsted Grotesk
- `favicon.png` — contour only
- Do not use the old combined PNG lockup or the tagline "INSIGHTS. LANDSCAPES. GROWTH."

## Deployment

- Vercel project `bloom-landing`, repo `calebsattler12/bloom-landingpage`
- Push to `main` auto-deploys when Git is connected
- Domain `runbloom.ai`

## Brand

- **Palette:** accent `#12C4B4`, background `#F4EFE3`, ink `#0B0B0C`
- **Fonts:** Schibsted Grotesk (headings), Hanken Grotesk (body)
- **Logo:** rings-only contour mark beside typeset BLOOM (Schibsted Grotesk). No sand/white
  plate, no boxed lockup, no combined PNG with letters over the rings. Never include "INSIGHTS. LANDSCAPES. GROWTH."
- **CTA (site):** Book a Call → https://calendar.app.google/kY3NqzNsspgzzw1F9
- **CTA (deck close):** Work with us
- Personality: light, approachable, friendly. Do not revive old Verity navy/Jost.

## Positioning (locked)

**Thesis:** Your team of AI agents generating organic, inbound **deals** —
white-glove human install, monitor, and improve — **unlimited agents** added
as new project teams while you stay a client. They mine sales calls and email
conversations so the work is grounded in buyer language.

Lead with **outcome** (agent teams → inbound deals). Supporting only:
marketing-employee / resource framing. Do **not** lead with "hire an AI
employee" alone. Do **not** boil down to "AI content" or "10k for content."

**White glove:** A human installs, monitors, and helps improve the team(s).
Client owns the hardware (Mac mini). Not a self-serve cloud agent pack.

**Unlimited agents:** While retained, Bloom keeps building new teams of AI
agents as new **projects**. Say this often in how-it-runs / stickiness copy.
Means ongoing build-out with human oversight — not unsupervised autonomy.

**Projects / use cases:** Prefer **projects** (not layers) for expansion;
**use case** for entry points. Content is one capability cluster inside the
agent-team offer. Approval ≠ auto-publish. LinkedIn is paste-only (never
auto-post). Nurture / close-pipeline / win-loss may appear as placeholder
projects until specs are scrubbed.

## Voice

Follow `brand-voice.md`: zero em dashes; no "it's not X, it's Y"; banned AI
diction; no fabricated proof; say **agent** not **bot**.

## Pricing (public drafts)

**Do not publish dollar amounts, install fees, or retainer figures** in
`index.html`, `pitch-deck.html`, `90-day-timeline.html`, or
`linkedin-content.md`. Qualitative only: own the hardware, month to month,
unlimited agents, fraction of a content team. Prefer Book a Call over a
price list.

## Site section map

1. Hero (outcome line + sub + chips: ICP report · White glove · Unlimited agents)
2. Why this (outcome + owned teams + human partner)
3. White glove (install, monitor, improve; own hardware)
4. Meet the teams (placeholder job cards; core content team first)
5. Projects / services (scroll rings; each project ships or expands an agent team; unlimited agents)
6. Samples (ICP teaser, Slack query, LinkedIn paste-only)
7. First 90 days (core agent team install → then projects; link 90-day-timeline.html)
8. How it runs (month to month after core; weekly email; unlimited agents; tool-agnostic)
9. RevBlack (live multi-team client; logo + Visit RevBlack site)
10. Final CTA

## Roster (placeholders OK until scrubbed)

Core content team: Content Director, Research / ICP, format writers (how-to,
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
