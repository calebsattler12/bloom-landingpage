# Bloom Website — Context for Claude Code

This file is read automatically by Claude Code / Cursor agents so edits, SEO
work, and link fixes do not require re-deriving context every session.

## What this is

Marketing site for **Bloom** (Syncro Labs) at **runbloom.ai**. Static HTML,
no build step.

- `index.html` — public site
- `get-started.html` — samples of the work + Book a Call + 90-day example
- `pitch-deck.html` — sales deck (keyboard nav)
- `90-day-timeline.html` / `90-day-example.html` — example fitted 90-day
  build (intelligence + Slack lead first, then more seats)
- `icp-findings-example.html` / `win-loss-example.html` — display-case
  deliverables (scrubbed composite, highlight arrows, page-specific calendar CTAs).
  ICP sample follows the remade 11-section pack (no public evidence appendix,
  no dollar amounts, names masked).
- `teams/*.html` — always-on marketing employee pages (person titles)
- `robots.txt` / `sitemap.xml` — discoverability; `logo-font-options.html` is noindex
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
- **Display-page CTAs (same URL):** ICP → Get your ICP report; win-loss → Get your win-loss report; 90-day example → Build your 90 day plan
- **Social:** LinkedIn https://www.linkedin.com/company/bloom-ai-llc/ (JSON-LD `sameAs`). No Twitter account.
- **CTA (deck close):** Work with us
- Personality: light, approachable, friendly, slightly dramatic on **pain**. Do not revive old Verity navy/Jost.
- Prefer **team** over **pod**. Prefer **employees** on the homepage. **Director / manager** on cards. **Agent** in supporting copy. Never **bot**.

## Positioning (locked)

**Source of truth:** Google Doc *Brainstorm Document* (internal). It overrides
the old five-starter-team menu and the organic-inbound-only thesis.

**Thesis (internal):** One always-on marketing team. Client owns the Mac mini;
Bloom installs it in their office. Human stands it up and stays. Client talks
to the **Orchestrator** in Slack. Every fitted 90-day plan starts with
Customer Intelligence and the Orchestrator, then about three more seats for
their situation. Sales motion: first call (where we can help), second call
(bring the 90-day roadmap). Cloudflare is the factory floor. Do not put
Cloudflare, Workers, or Durable Objects on the marketing site.

**Public copy:** Imply that thesis. Do **not** paste sales steps, “CI then
Orchestrator then three,” or the phrase “reports + recommended actions.”
Show **example deliverables**. Hero: always-on marketing employees. Hardware
and “we stay” live in How we show up / After install. Samples prove the work.
Book a Call is the motion.

Do **not** boil down to “AI content,” SEO alone, or a consultancy that
ships a build and leaves. Show stay-with-you in partner and after-install
copy. Never use “it’s not X, it’s Y.”

**White glove (show, don't label):** A human installs, monitors, and builds
out. Client owns the Mac mini; Bloom comes and installs it in their office.
Prefer "How we show up" / "Your hardware" over repeating "white glove."

**Roster (one marketing list, no Marketing vs Sales tabs):**
Orchestrator, Customer Intelligence Director, SEO Director, Content Director,
Demand Manager (Demand & Lifecycle), Deal Enablement Director, Competitive
Advantage Director, Events & Partnerships Manager, Social Media Manager,
Data Structure. Data Structure copy stays **vague** (working memory for the
team). Do not explain knowledge bases, evidence IDs, or CRM hygiene.

Search Visibility is folded into the SEO Director. Content Director is
audit-first; do not make a 12-week content mill the flagship. LinkedIn is
paste-only. Approval before anything client-facing goes live.

**Retention language:** “While you stay a client” / “while retained” belong
on the **pitch deck**, not on `index.html`. On the site: always on, Bloom
keeps building the roster, no contract. Bloom does not disappear after
kickoff.

## Voice

Follow `brand-voice.md`: zero em dashes; no "it's not X, it's Y"; banned AI
diction; no fabricated proof. One job per section. Cut repeated thesis phrases.
Slightly dramatic on pain. Calm on how Bloom stays.

## Pricing (public drafts)

**Do not publish dollar amounts, install fees, or retainer figures** in
`index.html`, `get-started.html`, `pitch-deck.html`, `90-day-timeline.html`, or
`linkedin-content.md`. Qualitative only: own the hardware, no contract,
roster grows, fraction of a content team. Prefer Book a Call.

## Site section map

1. Hero (always-on marketing employees; chips to the roster)
2. Why Bloom (pain: queue, wrong language, paid that pauses, a project that went quiet)
3. How we show up (Mac mini they own; Bloom installs in office; human stays; Slack)
4. The team (one marketing roster of person-titled employees)
5. How the roster grows (implied: intelligence + Slack lead, then seats that fit)
6. Samples (ICP, win-loss, Slack, LinkedIn paste-only)
7. RevBlack (live client; logo + Visit RevBlack site)
8. After install (always on; Bloom keeps building; no new dashboards; tool logo marquee)
9. Get started teaser (samples + 90-day example + Book a Call; no call-one/call-two)
10. Final CTA

**Get started page:** examples of deliverables, 90-day example, Book a Call.
No two-SKU “ICP path vs Sales starter.”

**ICP findings sample (11 sections, public):** (1) Executive synthesis (2)
Evidence base and method (3) Best-client roster and commercial LTV (4)
Derived ICP snapshot (5) Buying committee (6) What buyers actually say (7)
Stated ICP vs derived ICP (8) Qualification boundaries (9) Month-over-month
drift (10) Implications for content and positioning (11) Decisions and next
actions. Do not publish Section 12 (evidence appendix), client names, or
dollar LTV on the public page. Source: remade ICP Findings Report template
/ EXAMPLE_ICP-Findings-Report.

**Employee pages:** one page per roster seat. Demand Manager stays.
`teams/search-visibility.html` redirects to the SEO Director page.

## Integrations (confirmed only)

Slack, Microsoft Teams, Webflow CMS, HubSpot, Salesforce, Fathom, Circleback,
Granola, Google Analytics, Ahrefs. Show as a logo marquee on the site labeled
"Tools we work with" (`logos/`: SVG for Slack/Webflow/HubSpot/Salesforce; PNG
for Teams, Fathom, Circleback, Granola, Google Analytics, Ahrefs). Prefer local
assets over CDN.

## RevBlack proof

Live client. Link https://www.revblack.com ("Visit RevBlack site"). Use
`revblack-logo.png`. Approved quote (Director of Marketing, RevBlack): AI
summary for a keyword after 3 weeks. Do not use "first customer," inbound
goal numbers (1–4 → 8–15), fabricated testimonials, or "12 hrs saved" stats.
Do not put internal quality post-mortems on the site.

## Editing

- Prefer targeted edits unless repositioning the whole narrative
- Respect `prefers-reduced-motion` (org chart shows all; marquee becomes static)
- Preview `index.html`, `pitch-deck.html`, `90-day-timeline.html`, `90-day-example.html`, and the example reports locally before pushing
- Say **agent** not **bot** in user-facing copy.
