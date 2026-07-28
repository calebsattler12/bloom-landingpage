# Bloom Website

Marketing site for Bloom, deployed at [runbloom.ai](https://runbloom.ai).

## Setup (one-time)

1. **Create a GitHub repo** (e.g. `bloom-website`) and push this folder to it:
   ```
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```
2. **Connect it to Vercel**: in the `bloom-landing` Vercel project →
   Settings → Git → Connect Repository → select this repo.
3. From now on, every push to `main` auto-deploys to `runbloom.ai`. No more
   manual file-upload deploys needed.

## Working with Claude Code

Open this folder in Claude Code. It reads `CLAUDE.md` automatically, which
has the brand palette/fonts, the product's 8-agent roster, known open issues
(a content-mandate gap and a fabricated-testimonial flag — see `CLAUDE.md`
for details), and editing conventions. Ask it to make targeted edits, fix
links, or work through SEO/AEO changes — it'll commit and push once you've
connected a remote.

## Files

- `index.html` — the entire site (single static file, inline CSS/JS)
- `CLAUDE.md` — context for Claude Code (brand, product facts, open issues)
- `SEO-NOTES.md` — SEO/AEO tracking (empty stub — fill in as work starts)
