# Ask Analyst — Next.js frontend

> **Project state, decisions, known issues and next steps live in
> [`../CLAUDE.md`](../CLAUDE.md).** This file covers how to run the app, the
> token layer and the Figma ↔ code mapping only.

Generated from the Figma file `Ask Analyst - Design`, page **Research Page - Design**,
after the LLM-readiness cleanup. Every colour, size and spacing value traces back to a
variable in the Figma collection `Ask Analyst`.

## Run

```bash
npm install
npm run dev          # http://localhost:3000/research
```

## Static HTML export

`next.config.mjs` sets `output: 'export'`, so a build emits plain HTML:

```bash
npm run build        # writes ./out
npx serve out        # or any static server
```

**Open the HTML through a server, not by double-clicking the file.** Next emits
absolute asset paths (`/_next/...`), which `file://` cannot resolve — the page will
render unstyled if opened directly.

## Structure

```
app/
  globals.css              tokens (generated) + primitives
  layout.tsx               Lato webfont, root shell
  research/                report library · market · company detail
  company/                 insights · timeline · reports · consensus
components/
  layout/    Header · Logo · SiteNav · PageShell
  ui/        Card · Badge · Icon · FilterMenu · FilterRow · ShareDialog · BrokerMark · CompanyArt
  research/  SectionHeader · StockCard · Sidenote · KeyLevelsTable · ResultTables · NoteRef · Sidebar
  insights/  InsightsShell · InsightCard · InsightsFilters · ScopeBand · Timeline · ConsensusCard
  reports/   ReportCard · ReportsBrowser · ReportsRail
data/        page content — see CLAUDE.md for what is Figma-real vs placeholder
```

## Token layer

`app/globals.css` is generated from the Figma collection — do not hand-edit the
`:root` block. Change the variable in Figma and regenerate.

- 90 colour custom properties (`--color-text-primary`, `--color-chart-series-3`, …)
- spacing / radius / stroke / font-size scales
- 46 type-ramp classes matching the Figma text styles 1:1 (`.heading-card-title`, `.body-paragraph`)

## Figma ↔ code mapping

| Figma | Code |
|---|---|
| `Header` (component) | `components/layout/Header.tsx` |
| `Section Header` | `components/research/SectionHeader.tsx` |
| `StockCard` | `components/research/StockCard.tsx` |
| `Sidenote - n` | `components/research/Sidenote.tsx` |
| `Frame 41088` (Level/Price grid) | `components/research/KeyLevelsTable.tsx` |
| `More From Cement Section` | `RelatedList` |
| `Related Reports Section` | `RelatedReports` |
| `Disclaimer Section` | `DisclaimerCard` |
| `Explore Section` | `ExploreCTA` |
| `Trading in PSX made easy!` | `TradingPromo` |
| `Navigation` | `components/layout/SiteNav.tsx` |

## Known placeholders

- **The PSX promo artwork** is a gradient stand-in for the phone illustration.
- **Most page content is placeholder fill**, marked `"Placeholder entry."` in the
  data files — see CLAUDE.md for the real-vs-placeholder breakdown.

Company and broker logos are all present, and the price charts on the Timeline
tab are real inline SVG rather than the static art originally noted here.

## Screens

- [x] `Research / Report Library` → `/research`
- [x] `Research / Detail / Market` → `/research/market`
- [x] `Company / Detail / Insight` → `/company/insights`
- [x] `Company / Detail / Timeline` → `/company/timeline`
- [x] `Company / Detail / Reports` → `/company/reports`
- [x] `Company / Detail / Consensus` → `/company/consensus`
- [x] `Research / Detail / Company` → `/research/company`
- [ ] `Broker / Detail / Overview`

The four `Company / Detail` tabs share `components/insights/InsightsShell` (hero,
tab strip, company card, filter row) and land on `/research/market` via each
card's **Source** action.

## Logo assets — note on placement

The Figma-exported SVGs live at **`public/logos/`** (project root), not `app/public/logos/`.
Next.js only serves static files from a `public/` folder at the root, so anything under
`app/public/` is invisible at runtime. Files present:

Broker logos resolve by name through `data/brokers.ts` and render via
`components/ui/BrokerMark.tsx`; company marks go through `components/ui/CompanyArt.tsx`.
Both render nothing when a file is missing, so the registry can run ahead of the assets.
`CompanyMark` in `components/research/Sidebar.tsx` still serves the detail-page rails.

### Where to save each image

All artwork lives in **`public/logos/`**. The filename is what the code looks for — match it exactly
(lowercase, no spaces).

| What | Save as | Format | Size to export |
|---|---|---|---|
| Market icon (sidebar card) | `public/logos/market.svg` | **SVG** | any — it scales |
| PSX app artwork (promo card) | `public/logos/psx-app.svg` | **SVG** | any — it scales |

Both currently hold stand-ins: `market.svg` is the real `si:book-duotone` icon exported from Figma,
`psx-app.svg` is a gradient placeholder. Overwrite either and it picks up automatically — no code change.

If you'd rather use different filenames, they're set in one place each:
`page.tsx` (`image="/logos/market.svg"`) and `PSX_APP_ART` in `components/research/Sidebar.tsx`.

**Export settings in Figma:** select the layer → Export panel → `+` → choose SVG (vector) or PNG at 3x
(raster). For `psx-app.svg` select the `Layer 2` / `iPhone 16 Wrapper` group, not the whole card.

All company and broker logos referenced by the current screens are present.
Adding a new broker means dropping `<name>.svg` into `public/logos/` and adding
one line to `data/brokers.ts`.
