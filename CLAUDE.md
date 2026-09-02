# Ask Analyst — web frontend

Next.js 14 (App Router, TypeScript, `output: 'export'`) built from the Figma file
**`Ask Analyst - Design`**, file key `R2EFLBTI3TWPFzhYkQhPPX`.

The npm package lives in **`app/`**, not the repo root. Run everything from
`D:\Claude for Design\01 Research Page\askanalyst-web\app`.

---

## ⚠️ Read this before touching anything

1. **This IS a git repository** as of 2026‑09‑02 (branch `main`, first commit
   `88263dc`). History exists — use `git diff` before a risky edit and
   `git log --oneline` to see what moved. It now has a remote:
   `github.com/Zia128111/askanalyst-web`, **public**, and work goes straight to
   `main`. The repo being public is worth remembering before committing anything
   personal — `app/public/logos/avatar.png` is the user's own photo, pushed with
   their explicit go-ahead.
2. **A stale `askanalyst-web.zip` sits beside the folder** (written 2025‑09‑01
   16:59, before most of this work). Re‑extracting it silently destroys
   uncommitted work. Never suggest it as a recovery route — use git instead.
3. **`npm run build` is now safe to run while a dev server is up** (fixed
   2026‑09‑02). `next.config.mjs` is a phase function: the production build uses
   `distDir: 'out'` and `next dev` keeps `.next`, so they no longer share a
   directory. This used to wipe the dev server's CSS chunk and serve the app
   unstyled with `layout.css` 404ing — a "CSS regression" that was really a
   clobbered dev build. Three caveats:
   - With `output: 'export'` the build writes the finished site **into**
     `distDir`, which is why it is named `out` rather than something like
     `.next-build`. Don't "tidy" it back to `.next`.
   - Editing `next.config.mjs` restarts every dev server watching this folder,
     including another session's. They 404 briefly, then recover on their own.
   - **Two `next dev` processes must not share `.next`.** They overwrite each
     other's chunks and both start throwing `Cannot find module './819.js'` with
     webpack `ENOENT` renames; neither recovers while the other is running. The
     `distDir` split above fixed build-vs-dev, not dev-vs-dev — that is a
     separate fix in the same file: a dev server on a port other than 3000 gets
     `.next-dev-<port>`, so `npm run dev` keeps `.next` and a second session
     stays out of its way. If you hit this anyway, stop the extra server; the
     remaining one recompiles and recovers on its own. Deleting `.next` while a
     server is live does **not** help — it leaves that server serving 404s until
     it is restarted.

   For a types-only check `npx tsc --noEmit` is still fastest and touches
   neither directory.

## Running it

```bash
npm install          # in app/
npm run dev          # http://localhost:3000
```
`.claude/launch.json` (repo root) starts it via `npm --prefix app run dev`. It
carries `"autoPort": true` so a second session picks a free port instead of
colliding with a dev server already on 3000.

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
| `/broker/[slug]` | `Broker / Detail / Overview` 4902:4488 | ✅ one page per house, 14 built |

`/` is a redirect stub to **`/research`** (`app/app/page.tsx`) — the same place
the `Research Report` nav item goes. It used to point at `/research/market`, so
the root and the nav disagreed; the user chose the library on 2026‑09‑02.

Every Figma frame in the file is now built.

**Broker pages are reached by clicking a broker name**, not from the nav. Every
broker pill on an insight or report card, every row of `Top Brokers` in the
research rail, and the broker column of the consensus table now link to
`/broker/<slug>`. The slug is the logo key from `data/brokers.ts`, so the two
spellings of Alpha Capital land on one page rather than two.

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
| `data/reports.ts` | the Weekly Report + KOHC entries | the other 61 |
| `data/brokers.ts` | broker → logo filename registry | — |
| `data/broker.ts` | nothing authored — every figure is derived | — |

`data/reports.ts` was grown from 21 to 63 entries on 2026‑09‑02 so each of the
14 houses has a coverage record deep enough for its `/broker/<slug>` page to say
something. The added block is marked `── broker coverage fill ──` and follows
the same rules as the block above it.

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
- **All interaction lives in one `interaction` block in `globals.css`**, with its
  own `:root` for motion tokens (`--ease`, `--dur-1/2`, `--lift-sm/md`, `--ring`)
  — the generated Figma token block at the top of the file stays untouched.
  Nothing moves more than 3px or runs longer than 180ms; colour always carries
  the message and movement only reinforces it, so the whole layer degrades to
  plain colour changes under `prefers-reduced-motion`.
- **`.trow` is `display: contents`.** A CSS-grid table has no row box, so the
  four data tables (`.levels`, `.kdata`, `.fintable`, `.ctable`) wrap each row in
  a `.trow` that lays out nothing but still takes the hover — which is what
  drives the row highlight. It also gives the cells the `role="row"` they were
  missing, so the ARIA is now valid.
- **`SiteNav` is class-based, not inline-styled.** Inline styles cannot carry
  `:hover` or `:focus-visible`, the same reason the responsive rules are classes.
- **Broker rail panels never link out.** `RailMore` in `broker/BrokerRail.tsx` is
  a button that expands the panel in place, not an anchor. The only screen the
  Coverage panel could reach is `/company/consensus`, which cannot be filtered to
  one house — so a `View all Calls` link would land on more than it promised.
- **`INDEX_SYMBOLS` in `data/broker.ts` keeps `KSE100` out of coverage counts.**
  A report's `companies` field carries whatever the report is about, and for the
  weeklies and strategy notes that is the index. Without the filter a house that
  only writes weeklies "covers" KSE100 and it appears in Companies Covered.
- **The donut legend is `auto-fit`, not the two fixed columns Figma draws.**
  Figma's labels are single words; ours are report-type names, and
  `Analyst Briefing` clipped at half of the 289 rail.
- **`Avatar` (`layout/Avatar.tsx`)** is the header account mark. Drop
  `public/logos/avatar.png` (128×128) in and it appears; the grey Figma circle
  shows until then. Same mount-time 404 guard as `BrokerMark`.
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

Nothing is mid-flight. `/broker/[slug]` and the interaction layer are finished,
verified in the browser, and **built clean**: `npm run build` emits 23 pages into
`out/`, including all 14 broker pages.

A full audit ran on 2026‑09‑02 across all 22 routes: every route 200, no console
errors, no horizontal overflow at 1450 / 768 / 375, no missing assets, no dead
broker links. Four things it turned up were fixed (`KSE100` counted as a covered
company, a clipped donut label, the rail heading outranking its siblings, three
identical report titles on one broker page); the user chose to keep the search
box on the broker page rather than match the frame exactly.

**Ask the user what to build next.** The obvious candidates:
- Fix issue 1 above (timeline marker ↔ year mismatch).
- Make the remaining library cards clickable.
- Add a broker axis to the consensus screen, which would let the Coverage panel
  link out to genuinely filtered results.

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
