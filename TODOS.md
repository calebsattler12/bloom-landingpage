# Bloom site rebuild — TODOS and redirects

## Owner actions required

1. **Set Vercel env var** `NOTIFY_EMAIL=caleb@runbloom.ai` on the `bloom-landing` project (used by `/api/snapshot` and `/api/loom-teardown`). Confirm Formsubmit accepts that address if this is the first send.
2. Confirm public pricing: replace `TODO_STARTING_PRICE`, `TODO_LEVEL_1_VOLUME`, `TODO_LEVEL_2_VOLUME`, `TODO_LEVEL_3_VOLUME`.
3. Confirm case study: replace `TODO_CASE_STUDY` / `TODO_CASE_METRIC`.
4. Confirm chart data or keep “Example” labels (`TODO_CHART_DATA` if replacing sample-shaped charts).
5. Fill resource article `TODO_CONTENT` bodies and featured images, then remove `noindex` and add them to `sitemap.xml` / `llms.txt` / nav.
6. Optional legal review of Privacy / Terms (`TODO_LEGAL_REVIEW` if adding Terms).

## Deleted URLs → 301 targets

| Old URL | Redirect |
|---|---|
| `/get-started.html`, `/get-started` | `/snapshot/` |
| `/pitch-deck.html`, `/pitch-deck` | `/` |
| `/90-day-timeline.html`, `/90-day-timeline` | `/` |
| `/90-day-example.html`, `/90-day-example` | `/` |
| `/sitemap.html` | `/` |
| `/icp-findings-example.html`, `/icp-findings-example` | `/snapshot/` |
| `/win-loss-example.html`, `/win-loss-example` | `/snapshot/` |
| `/events-partnerships-example.html`, `/events-partnerships-example` | `/snapshot/` |
| `/teams`, `/teams/`, `/teams/*` | `/` |
| `/gsc`, `/gsc/`, `/gsc/*` | `/` |
| `/ga4`, `/ga4/`, `/ga4/*` | `/` |
| `/preview`, `/preview/`, `/blue-variation*` | `/` (existing) |

Masked ICP / win-loss / events samples were **deleted** (old offer framing). Sample free snapshot remains at `/snapshot/sample/`.

## Resource scaffolds (noindex, not in sitemap)

- `/resources/how-many-pages-does-a-20-person-b2b-company-need-to-show-up-in-ai-search/` — TODO_CONTENT
- `/resources/what-is-zero-click-search/` — TODO_CONTENT
- `/resources/are-keywords-still-important-to-improve-my-websites-seo/` — TODO_CONTENT
- `/resources/` index — TODO_CONTENT

## Client logos

Present in `/logos/clients/` (manifest-driven): Coa Wealth, Curant AI, RevBlack, Diversifi. Add more files and update `/logos/clients/manifest.js`.
