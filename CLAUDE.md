# Bloom Website — Context for Claude Code

This file is read automatically by Claude Code. It exists so edits, SEO work,
and link fixes don't require re-deriving context (and re-burning tokens)
every session.

## What this is

The marketing site for **Bloom** (formerly Verity), an AI VP of Marketing
product by Syncro Labs. Single static page, deployed to Vercel at
**runbloom.ai**. No build step — `index.html` is the entire site (inline CSS
and JS, Google Fonts loaded via CDN).

## Deployment

- Hosted on Vercel, project name `bloom-landing`.
- Once this repo is connected via Vercel's Git integration (Project Settings →
  Git → Connect Repository), every push to `main` auto-deploys. Do not use
  one-off file-upload deploys once this is connected — just edit, commit, push.
- Domain `runbloom.ai` is attached in the Vercel dashboard already.

## Brand facts (use these, don't re-invent them)

- **Palette (synced to the 90-day rollout timeline artifact, Aug 2026):**
  ```
  --turquoise:      #12C4B4   accent
  --turquoise-dark: #0B948A   eyebrows, tags, gradient starts, link hover
  --sand:           #F4EFE3   page background
  --sand-deep:      #E9E1CE   inset panels, rails, muted avatars
  --ink:            #16231F   text + dark sections (green-black, NOT #0B0B0C)
  --ink-soft:       #4A5B55   muted text (green-gray, NOT #6C6C72)
  --line:           rgba(22,35,31,0.14)
  --paper:          #FFFFFF   cards
  ```
  These live as CSS custom properties on `:root` in `index.html` — change them
  there and the whole page follows. Deliberately "whisper-light" tropical, not
  beachy — should read as a credible B2B site.
- **Fonts:** **Anton** (display/headings, always uppercase, weight 400) and
  Hanken Grotesk (body, 400–800). Anton replaced Schibsted Grotesk in Aug 2026
  to match the rollout timeline artifact. Match these exactly, don't substitute.
- **Shape language (also from the timeline):** 14px card radius, 20px pill
  radius, 2px solid ink for major dividers, dashed rails
  (`repeating-linear-gradient`), circular nodes with 3px ink borders,
  turquoise-dark → turquoise gradients for progress fills.
- **Brand personality goal:** Bloom should read light, approachable, friendly,
  easy, fun — a deliberate contrast to the old "Verity" brand system (navy
  #0F2A3F, cream #F4F1E6, Jost all-caps, octagon motif), which was serious/
  authoritative. Do not pull the old Verity system back in.
- **No formal written brand voice guide exists yet.** If asked to brand-review
  content, treat the facts in this file as the closest thing to guidelines,
  plus general clarity/professionalism/compliance checks.

## Standing content mandate

**All Bloom marketing materials, including this website, must lead hard with
token-cost optimization as the primary value proposition.** The pitch: local
inference eliminates the linear-scaling cloud API spend that cloud-only
competitors incur as usage grows. Data privacy/sovereignty is secondary,
supporting messaging — not the lead. (Exception: law firm outreach leads with
data sovereignty instead — not relevant to this site's current audience.)

**Status: satisfied as of Aug 2026.** The hero now leads with "A whole
marketing team. None of the token bill." and the token-economics section is
the first full section below the fold. The old "payroll" framing is gone.
Keep it this way.

## Product facts (for copy accuracy)

Bloom is an 8-agent system:
1. AI VP of Marketing (orchestrator — briefs the team, never sends anything itself)
2. QA Gate (Quality Assurance Agent — checks every draft/finding/report before it reaches the digest)
3. Research Agent (mines sales calls + public data)
4. Content Agent (drafts LinkedIn/website/email copy — routes to Claude/cloud even in production, since output is public-facing)
5. SEO/AEO Agent (competitive query + AI-search visibility monitoring)
6. Analytics Agent (weekly plain-English traffic + deal report)
7. Forms QA Agent (Phase 2 — tests site forms on a schedule)
8. Outreach Specialist Agent (Phase 2)

**The site's "Meet the team" section still shows only 6 of these 8 — Forms QA
and Outreach Specialist (both Phase 2) are missing.** Known gap, still open as
of Aug 2026 per the standing instruction not to touch it. Surface it, don't
silently fix it.

## RevBlack (proof point) — be careful here

RevBlack is Bloom's first customer (a $15,000 POC, Tate Stone). Real,
documented facts:
- Goal: grow qualified inbound deals from 1–4/month to a consistent 8–15/month.
- RevBlack's own site (revblack.com) runs on Webflow, with HubSpot embedded
  for forms only — **not** a confirmed "HubSpot + Salesforce partner."

**RESOLVED (Aug 2026): the fabricated RevBlack testimonial has been removed
from the site.** The quote ("It feels like we added a marketer... 12 hrs saved
every week / 100% approval-gated") attributed to a RevBlack "Head of
Marketing", and the "HubSpot + Salesforce partner" tag, were never real — both
were flagged as high-severity in the brand review and the whole social-proof
section was deleted on Caleb's explicit instruction.

**The site now carries no customer proof at all.** Do not re-add a RevBlack
quote, logo, stat, or partner tag without a real, approved, on-file source.
If a proof section is wanted, use only documented facts (first customer, $15K
POC, goal of 1–4 → 8–15 qualified inbound deals/month) and get sign-off from
Tate Stone before publishing anything attributed to RevBlack.

## SEO / AEO

No tracking doc exists yet. When one is created (Google Drive or a file in
this repo, e.g. `SEO-NOTES.md`), read it for current keyword targets,
competitor gaps, and audit history instead of re-researching positioning from
scratch each session. Prefer periodic audits (e.g. monthly, using the
`marketing:seo-audit` skill) over continuous ad-hoc checking.

## Editing conventions

- This is a single-file static site. Make targeted edits (specific lines/
  sections), not full-file rewrites, to keep changes reviewable and cheap.
  (`index.html` was rewritten wholesale once, Aug 2026, for the Anton + green-ink
  rebrand — that was a deliberate exception, not the norm.)
- Keep animations respecting `prefers-reduced-motion` (already implemented —
  don't regress this).
- Test locally by opening `index.html` directly in a browser before pushing.
  Playwright + Chromium are available in Claude Code web sessions
  (`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, launch through
  `proxy: {server: process.env.HTTPS_PROXY}` if you need network). Check both
  1280px and 390px widths for horizontal overflow, and check
  `reducedMotion:'reduce'`.

## Page structure (as of Aug 2026)

Nav · Hero (token-cost lead + live agent digest) · Token economics (dark) ·
Integration strip · **How Bloom works** (6-step closed loop, auto-cycling) ·
The team · Coworker demo (dark) · **90-day rollout timeline** · What you get ·
Final CTA · Footer.

The 90-day rollout section mirrors the client-facing timeline artifact: 12
weeks across 6 phases (Audits & Roadmaps → Install → Content Generation →
Review Process → Publishing Process → Live), 47 checklist items total, driven
by a `DATA` array in the inline `<script>`. **If the client timeline changes,
update that array to match.** Site version is read-only (accordion + scroll-driven
progress rail); the client version is the one with checkboxes and shared state.
