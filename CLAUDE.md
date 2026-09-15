# Bloom Website — Context for Claude Code

This file is read automatically by Claude Code / Cursor agents so edits, SEO
work, and link fixes do not require re-deriving context every session.

## What this is

Marketing site for **Bloom** (Syncro Labs) at **runbloom.ai**. Static HTML,
no build step.

- `index.html` — public site
- `pitch-deck.html` — sales deck (keyboard nav)
- `90-day-timeline.html` — shared 90-day checklist (starter team install)
- `linkedin-content.md` — paste-ready LinkedIn drafts
- `brand-voice.md` — craft rules (sourced from RevBlack locked voice; Bloom-adapted)
- `logo-mark.png` — lavender rounded square + centered cream bloom wordmark; source of truth
- Nav/footer/deck lockup: wordmark image only (`logo-mark.png`)
- `favicon.png` — same mark, no word
- Do not use the old contour rings, combined PNG lockup, or the tagline "INSIGHTS. LANDSCAPES. GROWTH."

## Deployment

- Vercel project `bloom-landing`, repo `calebsattler12/bloom-landingpage`
- Push to `main` auto-deploys when Git is connected
- Domain `runbloom.ai`
- **Agent habit:** after finishing site edits, commit and push `main` without
  asking (see `.cursor/rules/auto-deploy-main.mdc`), unless the user says hold.

## Brand

- **Palette:** accent `#E0A0FC`, background `#F4EFE3`, ink `#0B0B0C`
- **Fonts:** Schibsted Grotesk (headings), Hanken Grotesk (body)
- **Logo:** full wordmark in `logo-mark.png` (no separate BLOOM typeset). Never include "INSIGHTS. LANDSCAPES. GROWTH."
- **CTA (site):** Book a Call → https://calendar.app.google/kY3NqzNsspgzzw1F9
- **CTA (deck close):** Work with us
- Personality: light, approachable, friendly. Do not revive old Verity navy/Jost.
- Prefer **team** over **pod** in all public-facing copy.

## Positioning (locked)

**Thesis (internal):** Agent teams that generate organic, inbound deals. Human
install, monitor, build out. Unlimited agents via new project teams while
retained. Grounded in buyer language from sales calls and email.

**Public copy:** Imply that thesis. Do **not** paste the thesis sentence on
every section. Hero leads with agent teams → organic inbound. Say each proof
point once: hardware in partner/after-install; roster growth in projects; ICP
keep-either-way in samples/CTA; Slack / AI VP in after-install.

Lead with **outcome** (teams of AI agents → organic inbound deals).
Hiring AI employees (plural) is supporting language across the site.
Do **not** boil down to "AI content," SEO alone, or "10k for content."

**White glove (show, don't label):** A human installs, monitors, and builds out
the team(s). Client owns the hardware (Mac mini); Bloom comes and installs it
in their office. Prefer "How we show up" / "Your hardware" over repeating
"white glove."

**Starter teams (level one):** Pitch **teams by client-facing name**, not every
agent. Clients can start with any of five (source: *Bloom Agent Scopes DRAFT*):
**Customer Intelligence**, **Content Production**, **Search Visibility**,
**Demand & Lifecycle**, **Sales Enablement**. Orchestration (**AI VP of
Marketing** + analytics) is the Slack surface across teams, not a starter
choice. Prefer **starter team** over "content core" or "content engine."

**Public grouping (Marketing vs Sales):**
- **Marketing:** Customer Intelligence, Content Production, Search Visibility,
  Demand & Lifecycle (nurture / forms / paid; outbound may lean sales-side)
- **Sales:** Sales Enablement (call query, win-loss, battlecards, case studies,
  coaching). Call query is sales-facing; shares the intelligence call vault.

**Projects:** deepen the hired team (more agents / cadence) or add a second
team after install. Public site does not use LIVE/stub labels. Bloom builds
those AI employees onto the teams they hired.

**Public framing:** Lead with teams of AI agents → organic inbound deals.
Hiring AI employees (plural) is the supporting metaphor across the site.

**Retention language:** Phrases like "while you stay a client" / "while
retained" belong on the **pitch deck**, not on `index.html`. On the site,
talk about compounding agents and growing the roster without the retainer
frame. Prefer "no contract" over month-to-month lock-in language on the site.

**Projects / use cases:** Prefer **projects** for expansion; **use case** for
entry points. Content is one capability cluster inside the starter team.
Approval ≠ auto-publish. LinkedIn is paste-only. Placeholders OK until specs
are scrubbed.

## Voice

Follow `brand-voice.md`: zero em dashes; no "it's not X, it's Y"; banned AI
diction; no fabricated proof; say **agent** not **bot**. One job per section.
Cut repeated thesis phrases.

## Pricing (public drafts)

**Do not publish dollar amounts, install fees, or retainer figures** in
`index.html`, `pitch-deck.html`, `90-day-timeline.html`, or
`linkedin-content.md`. Qualitative only: own the hardware, no contract,
roster grows with projects, fraction of a content team. Prefer Book a Call.

## Site section map

1. Hero (teams of AI agents → organic inbound deals; Marketing/Sales + team chips)
2. Why this (agent teams / organic growth engine vs renting pipeline)
3. How we show up / partner (install, monitor, build out; Mac mini they own;
   Bloom installs in office; AI VP in Slack)
4. Meet the starter teams (Marketing vs Sales groups)
5. Projects / services (scroll org: cumulative reveal of five starter teams)
6. Samples (ICP report, Slack call query, LinkedIn from CEO notes / paste-only)
7. First 90 days (install chosen starter team → then projects; link 90-day-timeline.html)
8. After install (no contract; ongoing build-out; no new dashboards; tool logo marquee)
9. RevBlack (live multi-team client; logo + Visit RevBlack site)
10. Final CTA

## Roster (from Agent Scopes DRAFT; scrub for public)

**Source of truth:** Google Doc *Bloom Agent Scopes DRAFT* (internal). Agent
detail is for build/sales enablement; public copy pitches teams + outputs.

**Starter teams (client can choose any):**
- Customer Intelligence (LIVE): Research, Call Query, Competitor Intel, Content Audit
  (public Marketing card leans research/competitive/audit; call query framed under Sales)
- Content Production (LIVE): Director, format writers, Brand Voice, QA, Scheduler
- Search Visibility (LIVE): SEO, AEO
- Demand & Lifecycle (mostly NET-NEW / stubs): nurture, forms QA, paid; outbound optional
- Sales Enablement (NET-NEW): win-loss, battlecards, case studies, coaching (+ call query surface)

**Orchestration (always-on surface):** AI VP of Marketing, Analytics,
Findings/Roadmap Compiler. Not a separate starter choice.

**Public projects menu:** ICP Findings, Call Query, Competitive Intel, Website
Audit, Brand Voice, Article Engine, Playbook/How-To, LinkedIn, Publishing,
Keyword/SEO, AEO, Weekly Report, Performance reporting; then nurture, outbound,
forms QA, paid, win-loss, coaching, battlecards, case studies.

## Integrations (confirmed only)

Slack, Microsoft Teams, Webflow CMS, HubSpot, Salesforce, Fathom, Circleback,
Granola. Show as a logo marquee on the site labeled "Tools we work with"
(`logos/`: SVG for Slack/Webflow/HubSpot/Salesforce; PNG for Teams, Fathom,
Circleback, Granola). Prefer local assets over CDN.

## RevBlack proof

Live client with multiple agent teams / projects. Link
https://www.revblack.com ("Visit RevBlack site"). Use `revblack-logo.png`.
Do not use "first customer," inbound goal numbers (1–4 → 8–15), fabricated
testimonials, or "12 hrs saved" stats.

## Editing

- Prefer targeted edits unless repositioning the whole narrative
- Respect `prefers-reduced-motion` (org chart shows all; marquee becomes static)
- Preview `index.html`, `pitch-deck.html`, and `90-day-timeline.html`
  locally before pushing
- 90-day live means generation → QA → human approval (pool). CMS
  publishing is a later project, not the install finish line.
- Say **agent** not **bot** in user-facing copy.
