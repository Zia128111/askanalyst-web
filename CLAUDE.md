# Ask Analyst — web frontend

Next.js 14 (App Router, TypeScript, `output: 'export'`) built from the Figma file
**`Ask Analyst - Design`**, file key `R2EFLBTI3TWPFzhYkQhPPX`.

The npm package lives in **`app/`**, not the repo root. Run everything from
`D:\Claude for Design\01 Research Page\askanalyst-web\app`.

---

## ⚠️ Read this before touching anything

1. **This IS a git repository** as of 2026‑09‑02 (branch `main`, first commit
   `88263dc`). History exists — use `git diff` before a risky edit and
   `git log --oneline` to see what moved. There is **no remote**, so the only
   copy still lives on this disk; pushing somewhere is worth doing.
2. **A stale `askanalyst-web.zip` sits beside the folder** (written 2025‑09‑01
   16:59, before most of this work). Re‑extracting it silently destroys
   uncommitted work. Never suggest it as a recovery route — use git instead.
3. **Never run `npm run build` while the dev server is running.** They share
   `.next`; building wipes the dev server's CSS chunk and the app serves
   unstyled with `layout.css` 404ing — it looks like a CSS regression but is a
   clobbered dev build. Correct sequence:
   `preview_stop` → `npm run build` → `rm -rf .next` → `preview_start`.
   For a types-only check use `npx tsc --noEmit`, which leaves `.next` alone.

## Running it

```bash
npm install          # in app/
npm run dev          # http://localhost:3000
```
`.claude/launch.json` (repo root) starts it via `npm --prefix app run dev`.

---

## Current objective

Build out the Ask Analyst product surface from Figma, screen by screen, keeping
one coherent design system. Screens are traced from Figma where a frame exists
and designed in-system where one does not.

### Screens built

| Route | Figma frame / origin | State |
|---|---|---|
| `/research` | none — designed in-system | Research report library (listing) |
| `/research/market` | `Research / Detail / Market` 4804:449 | Weekly technical report |
| `/research/company` | `Research / Detail / Company` 4805:1362 | KOHC results review |
| `/company/insights` | `Company / Detail / Insight` 4812:2592 | ✅ |
| `/company/timeline` | `Company / Detail / Timeline` 4893:1531 | ✅ |
| `/company/reports` | `Company / Detail / Reports` 4893:1800 | ✅ |
| `/company/consensus` | `Company / Detail / Consensus` 4893:2059 | ✅ multi-company list |

`/` is a redirect stub to `/research/market` (`app/app/page.tsx`). Note this
predates the library at `/research`, which is now the nav landing for Research
Report — so the site root and the nav item go to different places. Left as-is;
worth confirming with the user which they want.

Not built yet: **`Broker / Detail / Overview`** (Figma 4902:4488).

Nav wiring (`components/layout/SiteNav.tsx`): only two items link anywhere —
`Research Report → /research`, `AI Powered Insights → /company/insights`. The
other eight are `#` on purpose because those screens don't exist; don't point
them somewhere that 404s.

---

## Design system rules (learned the hard way)

- **`app/globals.css` `:root` is generated from the Figma variable collection.**
  Do not hand-edit the token block. Every colour these screens need already
  exists — check before inventing one.
- **All card outlines are `--color-border-brand` (#1485FF).** Figma specs
  `--color-border-grey-1` (#B9B9B9) for `Summary Text` / `.icard`, but the user
  chose theme consistency over the file. A comment in `globals.css` records
  this so nobody "corrects" it back.
- **Tables** (`.levels`, `.ctable`, `.kdata`, `.fintable`) share one ruled
  treatment: header band `--color-bg-brand-subtle` with an indigo bottom rule,
  body rows with brand-blue hairlines, **no vertical rules, no outer frame**.
- **Brand colours for share targets are the networks' own** (#1DA1F2, #1877F2,
  #FF4500, #25D366) and deliberately sit outside the token set.
- Inline styles can't carry media queries — anything responsive must be a class.

### Responsive breakpoints (`globals.css`)

`1320` shell gutters · `1200` nav tightens · `1023` right rail drops below ·
`900` title steps down / timeline splits · `640` single column, compact padding.

`.layout__main` uses `flex: 1 1 0` so at the 1260 shell it computes to exactly
the Figma 955 (1260 − 16 gap − 289 rail) and narrows on its own below that.

---

## Data: what is real vs placeholder

**Only a small slice is real Figma content.** Everything else is fill I wrote so
interactions had something to act on. Placeholder bodies literally start with
`"Placeholder entry."` (24 in `insights.ts`, 19 in `reports.ts`).

| File | Real | Placeholder |
|---|---|---|
| `data/market.ts` | all of it (Figma) | — |
| `data/company-report.ts` | all of it (Figma KOHC) | — |
| `data/insights.ts` | 3 insights, 3 reports, 2 timeline events (2025), 2 LUCK broker rows | extra timeline years, `moreReports`, 5 of 6 `consensusEntries`, price series, PSX + broker lists |
| `data/reports.ts` | the Weekly Report + KOHC entries | the other 19 |
| `data/brokers.ts` | broker → logo filename registry | — |

**Rules for placeholder data**
- Never let fabricated broker calls about real PSX companies read as fact.
- Added broker rows use `analyst: 'Research Team'`, never invented person names.
- Replace placeholder blocks **wholesale** when real feeds arrive; don't edit
  them piecemeal.
- `psxCompanies` and `brokerHouses` are a static stand-in for a securities /
  broker master — worth checking against the real list before production.

### Dates are historical on purpose

The extract ends 15 Mar 2025 (plus a 24 Oct 2025 KOHC report). Anything
date-relative measures back from **the newest item in the set**, not from today
— measuring from `Date.now()` would empty every list. This is why:
- the research library groups by **month** ("MARCH 2025"), not Today/This Week;
- the period filters use an `ANCHOR` constant.

---

## Key implementation decisions

- **`FilterRow` (`ui/FilterRow.tsx`) owns the funnel** — the show/hide control
  and visibility state. Used by both the company tabs and the research library
  so the funnel exists once. Hiding a block **clears its value**, so a filter
  can never narrow a list from a control the reader can't see.
- **`FilterMenu` (`ui/FilterMenu.tsx`) is multi-select.** `values: string[]`
  always. `multiple` keeps the panel open and toggles; single mode replaces and
  closes. The `''` option means "clear". Picks within one filter are OR'd; the
  filters AND together (`anyOf` helper in both browsers).
  **Deliberately single-select:** date window, results-per-page, sort order.
- **`ScopeBand` (`insights/ScopeBand.tsx`)** replaced the old static company
  card. It describes the current filter scope:
  - one company → identity, price, consensus, brokers, avg target, implied upside
  - several / All Companies → per-tab roll-up (see below)
  - a company with no coverage → identity + "No brokers covering"
  Only LUCK has a price, so other companies show coverage stats without price or
  upside rather than inventing a number.
- **Per-tab roll-ups**: Insights → sentiment split + top theme; Timeline →
  coverage span + busiest year; Reports → count by report type; Consensus →
  Buy/Hold/Sell split. The generic consensus roll-up was wrong on the other
  three tabs because those tabs aren't about ratings.
- **`BrokerMark` / `CompanyArt`** resolve logos by name via `data/brokers.ts`
  and render **nothing** when the file is missing. They re-check the element on
  mount because the markup is server-rendered — a 404 fires before React
  hydrates, so `onError` alone never runs.
- **`NoteRef` (`research/NoteRef.tsx`)** turns bare digits in prose into
  footnote links. Match rule is deliberately narrow: a single digit surrounded
  by whitespace **and** matching a note passed in for that card, so the many
  numerals in the prose (161,476–162,953, 50%, July 2023) can't be caught. It
  links the preceding term too, falling back to the single preceding word.
- **Charts are real inline SVG**, not the placeholder the old README described.
  `Timeline.tsx` maps a series through a Catmull-Rom curve; the y-axis is
  computed per timeframe.
- **`ShareDialog`** is one component with two triggers: `variant="icon"` (report
  headers) and `variant="action"` (cards). Cards pass their own `url`.
  Clipboard has a three-step fallback — API, `execCommand`, then "Press Ctrl+C"
  with the field selected — because `writeText` rejects on non-HTTPS origins.

---

## Known issues / unfinished

1. **Timeline chart markers map to events by position, not date.** With the rail
   on 2025 a marker tooltip can show a 2026 event. Fix = lift the selected year
   out of `Timeline` so `PricePanel` can filter to the same year (~20 lines).
2. **Only the Weekly Report and KOHC cards link to detail pages.** The other 19
   library rows render their titles as plain text. Deliberate — the alternative
   was dead links. Offer to point them all at a detail page if the user wants a
   clickable demo.
3. **Filter visibility choices don't persist** across reloads, and each tab
   keeps its own state.
4. **`components/ui/Dropdown.tsx` is now unused** — `FilterMenu` replaced it.
   Safe to delete; left in place because `.dropdown` / `.dropdown--lg` CSS is
   still used by `FilterMenu`'s button.
5. **Insight/report/timeline data is LUCK-only**, so those tabs' counts don't
   move with the company filter. `Insight` and `TimelineEvent` now take an
   optional `symbol` — set it and the scope band adapts with no code change.
6. **Keyword filter is hidden on Timeline and Consensus.** The Consensus one was
   my misread of a screenshot; the user never asked for it. Restoring it is
   deleting `omitFilters` / the `omit` entry on that page.

---

## Next task

Nothing is mid-flight — the last change (card Share buttons opening the share
dialog) is finished, verified and built clean.

**Ask the user what to build next.** The obvious candidates:
- `Broker / Detail / Overview` (Figma 4902:4488) — the last unbuilt frame.
- Fix issue 1 above (timeline marker ↔ year mismatch).
- Make the remaining library cards clickable.

---

## Working practice that has been effective

- **Verify in the browser, don't assert.** Read computed styles and geometry via
  `javascript_tool` rather than trusting a screenshot — screenshots in this pane
  are often a stale frame, and several "bugs" turned out to be mid-scroll reads.
- Synthetic coordinate clicks frequently miss; drive links via a DOM `.click()`
  on the element and check `location.pathname` after.
- After every change: `npx tsc --noEmit`, then check at **1450 / 768 / 375** for
  horizontal overflow (`scrollWidth > clientWidth`).
- The user reviews by clicking elements in the running app and sending the
  selected element. Expect tight, iterative, visual feedback — make the smallest
  change that satisfies it and say what else it affected.
- When the user's instruction conflicts with the Figma file, **the user wins**,
  but say which one you followed and why.
