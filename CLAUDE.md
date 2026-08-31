# Bloom Website — Context for Claude Code

This file is read automatically by Claude Code. It exists so edits, SEO work,
and link fixes don't require re-deriving context every session.

## What this is

The marketing site for **Bloom**, an AI content engine by Bloom AI, LLC.
Single static page, deployed to Vercel at **runbloom.ai**. No build step —
`index.html` is the entire site (inline CSS and JS, Google Fonts via CDN).

## Positioning (read this before writing any copy)

**Bloom V1 is one thing: turning a client's sales call recordings into
SEO/AEO content that drives organic inbound leads.** Not a platform, not a
general marketing assistant.

Bloom used to be pitched as an open-ended "AI VP of Marketing that can do
anything." **That positioning was deliberately abandoned** — broad
does-everything framing kills sales cycles because buyers can't evaluate it.
V1 is one dish on the menu, done exceptionally well. The menu expands later.

**The hook is organic inbound leads.** Lead with it. The mechanism —
mining real call data so content reflects what buyers actually say — is the
differentiator and should appear immediately after the hook.

### Never say on this site
- "Cloud-only AI", "per-token", "token bill" — the cost/architecture story is
  a credibility point further down the page, never the lead, and never framed
  as a competitor comparison.
- "A whole marketing team" / "your AI marketing team" — Bloom is a content
  engine, not a team replacement. (Describing the *client's* 1–5 person
  marketing team is fine and correct.)
- "AI VP of Marketing", the 8-agent roster, cold outreach / SDR, Forms QA,
  or video. All legacy or out of V1 scope — do not feature them.
- The old Verity system (navy #0F2A3F, cream #F4F1E6, Jost, octagon motif).

### ICP (state it plainly on the page so bad fits self-select out)
- B2B tech company with a real sales motion, ~15–250 employees.
- **Already recording calls** (Granola, Circleback, Fathom, Gong). This is
  non-negotiable — it's the fuel for the whole engine.
- Marketing team of **1–5 people**, scaling output without adding headcount.
- A CEO or in-house expert willing to be the byline.

## Brand facts

- **Palette — extracted from `Bloom AI Quick Pitch.pptx` (Aug 2026).** These
  supersede the earlier turquoise/sand system *and* the "peach/pink/orange"
  direction described in the product summary; the deck is the source of truth.
  ```
  --green:      #4E7F58   accent — eyebrows, numerals, arrows, primary button
  --green-deep: #3D6446   hover / gradient end (derived, not in the deck)
  --clay:       #A87158   secondary accent
  --mint:       #DAEEDE   pale tint panels
  --ink:        #221C12   headings + dark sections (deep warm brown)
  --ink-soft:   #544C41   body copy (warm gray-brown)
  --cream:      #FAF4EC   page ground
  --paper:      #FEFBF7   cards
  --line:       #DDD6CD   rules, rails, arrows
  --on-dark:    #D2CDC7 / --on-dark-dim: #BBB7B0   text on ink
  ```
  These live as CSS custom properties on `:root` in `index.html` — change them
  there and the whole page follows.
- **Fonts:** **Lora** (display/headings, serif, weight 600) and Hanken Grotesk
  (body, 400–800). Lora is embedded in the deck and is the intended display
  face. Anton and Schibsted Grotesk are both retired.
- **Shape language:** 14px card radius, 20px pill radius, circular green
  numerals (the deck's `01/02/03` motif), dashed rails, 1px `--line` rules.
- **Tone:** light, approachable, friendly, easy — deliberately not a
  serious/corporate "AI vendor" feel, and explicitly not a flower-shop
  aesthetic despite the name.

## Product facts (for copy accuracy)

**The 5-step client journey** (steps 1–2 are pre-contract — they *are* the offer):
1. **Call harvest & analysis** — ingest best-client-filtered recordings; extract
   themes, pains, and language gaps.
2. **Findings report** — the hero deliverable. Designed report with verbatim
   customer quotes. **If the prospect doesn't proceed, they keep it.**
3. **Content audit** — existing site/content vs. how buyers actually talk.
4. **Roadmap & production** — brand voice, SEO/AEO standards, steady cadence.
5. **Optimization loop** — performance feeds back into what's written next.

**Two-pass analysis** (a real differentiator, worth featuring): calls are
analysed *alone* first to derive themes from raw data; only then is the
client's stated ICP/positioning loaded, to find the delta. Feeding both in
together would bias the model toward confirming what the client believes.

**Content Library V1 — four formats only:** How-To Guides, Articles,
Playbooks, CEO LinkedIn posts.

**Attribution rule (non-negotiable):** never published from a faceless company
account — always the CEO or a genuine in-house expert. Executive LinkedIn
posts are always copy-pasted by that person; Bloom never auto-posts to anyone's
personal account.

**Publishing flow:** drafted → QA + brand-voice gate → human approval in
Slack/Teams → scheduled → published → performance monitored. Approval schedules
a piece; it is never equivalent to instant publish. Revisions are capped at two
rounds before a human is pulled in.

**Architecture:** mechanical work (fetching, scanning, scheduling) runs on a
Mac mini installed at the client; anything a human reads, or that reasons from
evidence to a conclusion, runs on frontier models. Present this as a
quality/cost design choice — not as a competitor cost comparison.

## Things needing sign-off before they go on the site

- **Pricing.** Direction is a one-time implementation fee in the low thousands
  plus a **$4,000–$5,000/month** retainer. **Not currently published on the
  site.** Confirm exact numbers with Caleb before adding a pricing section.
- **RevBlack.** First real deployment and a paying client. A fabricated
  testimonial (a "Head of Marketing" quote, "12 hrs saved", "100%
  approval-gated", and a "HubSpot + Salesforce partner" tag) was removed in
  Aug 2026 — none of it was real. **The site currently carries no customer
  proof at all.** Do not re-add a RevBlack quote, logo, stat or partner tag
  without a real, approved, on-file source and Tate Stone's sign-off.
- **Tagline.** "Automation isn't enough, iteration is the only way to
  success..." reads as an internal thesis, not a headline. Not used on the
  site; the current H1 is built around the call-data → inbound-leads mechanism
  instead.

## Editing conventions

- Single-file static site. Prefer targeted edits over full-file rewrites.
  (`index.html` has been rewritten wholesale twice, both Aug 2026: once for the
  Anton/green-ink rebrand, then again for the deck palette + content-engine
  repositioning. Both were deliberate exceptions.)
- Keep `prefers-reduced-motion` working — it disables all animation and forces
  `.reveal` elements visible. Don't regress this.
- Test before pushing. Playwright + Chromium are available in Claude Code web
  sessions (`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; launch with
  `proxy: {server: 'http://127.0.0.1:40977'}` if you need network — note that
  claude.ai and runbloom.ai are blocked by the egress policy). Check 1280px
  and 390px for horizontal overflow, and check `reducedMotion:'reduce'`.

## Page structure (as of Aug 2026)

Nav · Hero (organic-inbound hook + live call-analysis panel) · The problem
(dark) · How it works (5 steps, auto-cycling, pre/post-contract tags) · Why
it's different (4 cards) · What you get (4 formats + publishing flow) · Who
it's for (ICP checklist) · 90-day rollout timeline · Final CTA · Footer.

The **90-day rollout** section mirrors the client-facing timeline artifact: 12
weeks across 6 phases (Audits & Roadmaps → Install → Content Generation →
Review Process → Publishing Process → Live), 47 items total, driven by a
`DATA` array in the inline `<script>`. **If the client timeline changes, update
that array to match.** The site version is read-only (accordion + scroll-driven
progress rail); the client version has checkboxes and shared state.

## Deployment

- Vercel project `bloom-landing` (team `calebsattler21-7077s-projects`),
  **already git-linked** to `calebsattler12/bloom-landingpage`. Pushes create
  deployments automatically — don't use one-off file-upload deploys.
- **Known issue:** the last `main` → production deploy is in a `BLOCKED` state,
  and production is still being served by an older manual upload. `runbloom.ai`
  also does not appear in the project's domain list via the API. Both need
  checking in the Vercel dashboard before a production publish will actually
  reach the live domain.

## SEO / AEO

See `SEO-NOTES.md` — currently a stub. Fill it in as work starts rather than
re-researching positioning from scratch each session.
