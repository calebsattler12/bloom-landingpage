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

- **Palette:** accent `#12C4B4` (turquoise), background `#F4EFE3` (sand),
  ink `#0B0B0C`. This is the "5a — bright turquoise on sand" variant chosen
  from the original design exploration, deliberately kept "whisper-light"
  tropical, not beachy — should read as a credible B2B site.
- **Fonts:** Schibsted Grotesk (display/headings), Hanken Grotesk (body).
  These are the fonts from the *original* Claude Design source file — match
  them exactly, don't substitute.
- **Brand personality goal:** Bloom should read light, approachable, friendly,
  easy, fun — a deliberate contrast to the old "Verity" brand system (navy
  #0F2A3F, cream #F4F1E6, Jost all-caps, octagon motif), which was serious/
  authoritative. Do not pull the old Verity system back in.
- **No formal written brand voice guide exists yet.** If asked to brand-review
  content, treat the facts in this file as the closest thing to guidelines,
  plus general clarity/professionalism/compliance checks.

## Standing content mandate (important — currently NOT fully satisfied)

**All Bloom marketing materials, including this website, must lead hard with
token-cost optimization as the primary value proposition.** The pitch: local
inference eliminates the linear-scaling cloud API spend that cloud-only
competitors incur as usage grows. Data privacy/sovereignty is secondary,
supporting messaging — not the lead. (Exception: law firm outreach leads with
data sovereignty instead — not relevant to this site's current audience.)

As of the last review, the homepage hero leads with a "payroll" framing, not
the mandated token-cost framing, and the token-economics section is buried
mid-page. **This is a known open issue, not a design choice — fix it when
next doing meaningful copy work**, unless directed otherwise.

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

**The current site's "Meet the team" section only shows 6 of these 8 — Forms
QA and Outreach Specialist are missing.** Known gap, flagged in the last
brand review, not yet fixed per explicit instruction not to touch it further
for now.

## RevBlack (proof point) — be careful here

RevBlack is Bloom's first customer (a $15,000 POC, Tate Stone). Real,
documented facts:
- Goal: grow qualified inbound deals from 1–4/month to a consistent 8–15/month.
- RevBlack's own site (revblack.com) runs on Webflow, with HubSpot embedded
  for forms only — **not** a confirmed "HubSpot + Salesforce partner."

**The current site's testimonial quote ("It feels like we added a marketer...
12 hrs saved every week / 100% approval-gated") attributed to RevBlack's
"Head of Marketing" is fabricated / illustrative, not a real quote on file.**
Same for the "HubSpot + Salesforce partner" tag. This was flagged in the last
brand review as a high-severity issue and intentionally left unfixed for now
per explicit instruction — **do not remove this flag or treat it as resolved
without an explicit go-ahead.** If asked to do further copy work on the site,
surface this again rather than silently leaving it or silently fixing it.

## SEO / AEO

No tracking doc exists yet. When one is created (Google Drive or a file in
this repo, e.g. `SEO-NOTES.md`), read it for current keyword targets,
competitor gaps, and audit history instead of re-researching positioning from
scratch each session. Prefer periodic audits (e.g. monthly, using the
`marketing:seo-audit` skill) over continuous ad-hoc checking.

## Editing conventions

- This is a single-file static site. Make targeted edits (specific lines/
  sections), not full-file rewrites, to keep changes reviewable and cheap.
- Keep animations respecting `prefers-reduced-motion` (already implemented —
  don't regress this).
- Test locally by opening `index.html` directly in a browser before pushing.
