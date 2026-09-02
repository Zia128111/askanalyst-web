# Ask Analyst — handoff to Claude Code
**Screen 1 of 7 complete and signed off.** 2026-09-01

---

## Where things are

Project root is **`D:\Claude for Design\01 Research Page\askanalyst-web\app`** — note the doubled
`app`, an artifact of how the zip was structured. Inside it, `app/` is the Next.js App Router
directory. Worth flattening (`askanalyst-web/` as root) before the project grows; nothing depends
on the current shape.

```
askanalyst-web/app/          ← project root (package.json lives here)
├── app/
│   ├── globals.css          tokens (generated) + primitives — DO NOT hand-edit the :root block
│   ├── layout.tsx
│   └── research/market/     ✅ Research / Detail / Market
├── components/
│   ├── layout/   Header · Logo · SiteNav · PageShell
│   ├── ui/       Card · Badge · Chip · Dropdown · Icon
│   └── research/ SectionHeader · StockCard · Sidenote · KeyLevelsTable · Sidebar
├── data/market.ts           page content, extracted verbatim from Figma
└── public/logos/            SVG assets
```

Run: `npm run dev` → http://localhost:3000/research/market

---

## ⚠️ Three wiring gaps — fix these first

New assets were added to `public/logos/` that the code doesn't reference yet:

| Asset present | Code expects | Fix |
|---|---|---|
| `psx-app.svg` | `/logos/psx-app.png` | change `PSX_APP_ART` in `components/research/Sidebar.tsx` |
| `ask-analyst.svg` | nothing — logo is hand-drawn inline SVG | swap the mark in `components/layout/Logo.tsx` for an `<img>` |
| `market.svg` (user's own export, 848B) | `/logos/market.svg` ✅ | already correct — **do not overwrite** |

`psx-app.svg` is **805 KB**, which is heavy for a sidebar image. Consider exporting it as PNG at 3×
(405×447) instead, or running it through SVGO.

---

## Design system — the rules that matter

Everything traces to the Figma variable collection **`Ask Analyst`** (138 variables, mode `Light`).

- **Never hard-code a colour.** Use `var(--color-*)`. The `:root` block in `globals.css` is
  generated from Figma — change the variable there, regenerate, don't patch the CSS.
- **Type**: 46 ramp classes match the Figma text styles 1:1 (`.heading-card-title`, `.body-paragraph`).
  Font is **Lato** throughout — the page is 100% Lato, no exceptions.
- **Numbers**: any price, ratio or percentage gets `.tabular` (tabular figures). Non-negotiable in
  a financial UI — columns misalign without it.
- `data/tokens.ts` exposes the same values to TS, including `chartSeries` as an ordered array.

### Semantic colour tones already established

| Tone | Use | Tokens |
|---|---|---|
| `positive` | gains, support levels | `bg/positive-faint` + `chart/series-2` + `text/positive` |
| `negative` | losses, resistance | `bg/negative-subtle` + `border/negative` + `text/negative` |
| `warning` | pending / caution | `bg/warning-subtle` + `accent/amber` + `text/amber` |
| `info` | neutral-informational | `bg/brand-tint-faint` + `accent/info` |

`Badge` and `LevelRow` both take these. `LevelRow` also has `muted` (`text/secondary`) for
inactive values like DGKC's broken 40-wema.

---

## Layout facts learned the hard way

These were all wrong on the first pass. Don't re-derive them:

1. **`Navigation` is `layoutPositioning: ABSOLUTE` at x=196, y=16** — it lives *inside* the 60px
   header, even though it's the last child in the Figma layer tree. It is not a footer.
2. **Content column is 1260 = left 955 + gap 16 + rail 289.** The Figma "header row" is a fixed
   160px frame containing a 190px sidebar card that overflows it — replicating that literally in
   CSS pushes everything down and creates a large dead gap. Use the single 2-column split.
3. **Key-levels table is a `GRID` frame**, 894 wide, two 447px columns, `counterAxisSpacing: 0` —
   cells touch, no gaps, shared hairline borders, filled header row.
4. Page title is single-line (`nowrap`) at 40px.

---

## Reading Figma without burning the rate limit

Seat is **Full on Pro: 200 tool calls/day, 15/min**. Reads are the expensive part.

- `get_metadata` on a whole screen blows the token limit — it returns 250 KB+.
- The reliable pattern is a **`use_figma` read script** that walks the tree and emits a compact
  semantic node: `{ n, txt, s (text style), fg/bg (token name), f (flex dir), gap, pad, w, h }`,
  collapsing `INSTANCE` nodes to `{ use: name }` and icon subtrees to `{ icon: WxH }`.
  A full screen comes back at ~30–50 KB that way.
- `use_figma` truncates its own output at 20 KB — export screen-by-screen, or section-by-section
  for the big ones.
- **Figma's asset CDN is blocked from the sandbox**, and `download_assets` only returns URLs.
  Hand-transcribing base64 is unreliable (it silently drops bytes mid-string).
  **Ask the user to export assets from Figma directly** — it takes them seconds and is exact.

---

## Remaining screens

| # | Figma frame | Node ID | Route | Status |
|---|---|---|---|---|
| 1 | `Research / Detail / Market` | `4804:449` | `/research/market` | ✅ done |
| 2 | `Research / Detail / Company` | `4805:1362` | `/research/company` | reuses rail, StockCard, SectionHeader; adds a financials table |
| 3 | `Company / Detail / Insight` | `4812:2592` | `/company/[symbol]/insight` | shared shell ↓ |
| 4 | `Company / Detail / Timeline` | `4893:1531` | `…/timeline` | **chart-heavy** — 85 vector nodes |
| 5 | `Company / Detail / Reports` | `4893:1800` | `…/reports` | |
| 6 | `Company / Detail / Consensus` | `4893:2059` | `…/consensus` | has a distribution bar |
| 7 | `Broker / Detail / Overview` | `4902:4488` | `/broker/[id]` | header differs from the shared one |

**Screens 3–6 share one shell**: Header → AI-Powered-Insights banner → nav → tabs
(Insights/Timeline/Reports/Consensus) → company card → filter bar → tab content.
Build the shell once as a layout, then four tab bodies.

### Assets still needed from Figma
**AKD Securities**, **JS Global**, **Lucky Cement**, **Kohat Cement** — `public/logos/`, SVG.

### Open decision
Charts (Timeline, Consensus) are static vector art in Figma. Either export them as SVG and drop
them in as images (fast, exact, static), or rebuild with a charting library against real data
(slower, live, responsive). `chartSeries` in `tokens.ts` has the correct 8-colour palette either way.

---

## Figma file state

Page `Research Page - Design` was cleaned before any code was written:

- 100% of fills (1,984) and strokes (624) bound to variables
- 98% of text carries a style (the 11 unstyled are legitimately mixed-run rich text)
- Components: `Header` (6 instances), `InsightActionBar` (9), `ShareButton`, `SourceButton`
- Old collections parked as `_deprecated …` — the live one is **`Ask Analyst`**
- Old SF Pro / IBM Plex text styles parked as `_deprecated/…`
- Screens renamed to the route convention (`Company / Detail / Insight`)

Reference docs in `01 Research Page/`: `NAMING-CONVENTION.md`, `RESEARCH-PAGE-STATUS.md`,
`LLM-Readiness-Audit.md` (note: the audit's opening numbers were later corrected — see the status file).
