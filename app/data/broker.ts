/* Broker profile — everything the `/broker/<slug>` screen shows, derived from
   the report library and the consensus tables rather than stored separately.
   Nothing here is authored: change a report's broker in `reports.ts` and the
   counts, the companies-covered list and the report-type donut all follow.

   Figma `Broker / Detail / Overview` (4902:4488). The frame's headline numbers
   (127 / 08 / 45 / 5 new) are the designer's illustrative figures; these are the
   real counts for whichever house is in view, so the stat row always agrees
   with the cards underneath it. */

import { brokerSlug } from './brokers';
import * as R from './reports';
import * as D from './insights';
import type { Report } from './reports';
import type { BrokerCall } from './insights';

/** `LUCK` -> `Lucky Cement`. Falls back to the ticker when it is not listed. */
export function companyName(ticker: string): string {
  const listed = D.psxCompanies.find((c) => c.value === ticker);
  /* `LUCK — Lucky Cement` -> `Lucky Cement`. */
  return listed ? listed.label.split('—').pop()!.trim() : ticker;
}

/* A report's `companies` field carries whatever the report is about, which for
   the weeklies and strategy notes is the index rather than a listed name. Those
   are not companies, so they are kept out of the Companies Covered count and
   list — otherwise a broker that only writes weeklies "covers" KSE100. */
const INDEX_SYMBOLS = new Set(['KSE100']);
const isCompany = (ticker: string) => !INDEX_SYMBOLS.has(ticker);

export type Tally<K extends string> = { key: K; count: number };

function tally<T>(items: T[], key: (item: T) => string): Tally<string>[] {
  const counts = items.reduce<Record<string, number>>((acc, item) => {
    const k = key(item);
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .map(([k, count]) => ({ key: k, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}

/** A call this house has on record, with the company it belongs to. */
export type BrokerCallRow = BrokerCall & { symbol: string; company: string; logo: string };

export type BrokerProfile = {
  slug: string;
  name: string;
  /** Every library report filed by this house, newest first. */
  reports: Report[];
  totalReports: number;
  reportTypes: number;
  companiesCovered: number;
  /** Reports filed within a week of this house's own newest — see `recentDays`. */
  recentReports: number;
  recentDays: number;
  /** Companies covered, most-reported first. */
  companies: { ticker: string; name: string; count: number }[];
  /** Report count by type, biggest first — drives the donut. */
  types: Tally<string>[];
  /** Ratings this house carries across the consensus tables. */
  calls: BrokerCallRow[];
  callCounts: { Buy: number; Hold: number; Sell: number };
};

const RECENT_DAYS = 7;

/** Houses with a page: anyone who has filed a report or made a call. */
const namesWithReports = R.reports.map((r) => r.broker);
const namesWithCalls = D.consensusEntries.flatMap((e) => e.rows.map((r) => r.broker));

/** One entry per slug — the two spellings of Alpha Capital collapse into one. */
const bySlug = new Map<string, string>();
for (const name of [...namesWithReports, ...namesWithCalls]) {
  /* Keep the first spelling seen; report data leads, so that is the one the
     library already shows. */
  if (!bySlug.has(brokerSlug(name))) bySlug.set(brokerSlug(name), name);
}

export const brokerSlugs = Array.from(bySlug.keys()).sort();

export function brokerProfile(slug: string): BrokerProfile | undefined {
  const name = bySlug.get(slug);
  if (!name) return undefined;

  /* Match on slug, not name, so `Alpha Capital` and `Alpha Capital Pvt. Ltd.`
     both land in the same profile. */
  const reports = R.reports
    .filter((r) => brokerSlug(r.broker) === slug)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  /* The library is a fixed historical extract, so "last 7 days" is measured
     back from this house's own newest report rather than from today —
     measuring from `Date.now()` would read zero for every broker. */
  const anchor = reports.length ? Date.parse(reports[0].date) : 0;
  const recentReports = reports.filter(
    (r) => (anchor - Date.parse(r.date)) / 86_400_000 < RECENT_DAYS,
  ).length;

  const tickers = tally(
    reports.flatMap((r) => r.companies).filter(isCompany),
    (t) => t,
  );

  const calls: BrokerCallRow[] = D.consensusEntries.flatMap((entry) =>
    entry.rows
      .filter((row) => brokerSlug(row.broker) === slug)
      .map((row) => ({ ...row, symbol: entry.symbol, company: entry.name, logo: entry.logo })),
  );

  return {
    slug,
    name,
    reports,
    totalReports: reports.length,
    reportTypes: new Set(reports.map((r) => r.type)).size,
    companiesCovered: tickers.length,
    recentReports,
    recentDays: RECENT_DAYS,
    companies: tickers.map((t) => ({ ticker: t.key, name: companyName(t.key), count: t.count })),
    types: tally(reports, (r) => r.type),
    calls,
    callCounts: {
      Buy: calls.filter((c) => c.call === 'Buy').length,
      Hold: calls.filter((c) => c.call === 'Hold').length,
      Sell: calls.filter((c) => c.call === 'Sell').length,
    },
  };
}

/** Figma `Insights Header Image` copy — the same line for every house. */
export const brokerHeroSubtitle = 'Research reports and market insights';
export const brokerHeroPill = 'Sell Side Research';
