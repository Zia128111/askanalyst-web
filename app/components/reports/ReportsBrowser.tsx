'use client';

import * as React from 'react';
import { FilterMenu, type Option } from '../ui/FilterMenu';
import { FilterRow, type FilterField } from '../ui/FilterRow';
import { ArrowRight } from '../ui/Icon';
import { ReportCard } from './ReportCard';
import * as R from '@/data/reports';
import type { Report } from '@/data/reports';

/* Content axes take several picks; the window, page size and sort order are
   single by nature. */
type State = {
  q: string;
  type: string[]; company: string[]; broker: string[]; sector: string[]; rating: string[];
  period: string; results: string; sort: string;
};

const NONE: State = {
  q: '', type: [], company: [], broker: [], sector: [], rating: [],
  period: '', results: '25', sort: 'newest',
};

const opts = (values: string[], all: string): Option[] =>
  [{ value: '', label: all }, ...values.map((v) => ({ value: v, label: v }))];

const TYPE_OPTS    = opts(R.reportTypes, 'All Types');
const SECTOR_OPTS  = opts(R.sectors, 'All Sectors');
const BROKER_OPTS  = opts(R.brokers, 'All Brokers');
const RATING_OPTS  = opts(R.ratings, 'Any Rating');
const RESULT_OPTS: Option[] = ['25', '50', '100'].map((n) => ({ value: n, label: `${n} Results` }));
const SORT_OPTS: Option[]   = R.sortOptions;
const PERIOD_OPTS: Option[] = [
  { value: '',    label: 'All Time' },
  { value: '7',   label: 'Last 7 Days' },
  { value: '30',  label: 'Last 30 Days' },
  { value: '90',  label: 'Last 90 Days' },
];
/** Tickers that actually appear in the library, so no option returns nothing. */
const COMPANY_OPTS: Option[] = [
  { value: '', label: 'All Companies' },
  ...Array.from(new Set(R.reports.flatMap((r) => r.companies))).sort().map((v) => ({ value: v, label: v })),
];

/** The newest report in the set anchors the date windows — the library is a
 *  fixed historical extract, so measuring back from today would empty it. */
const ANCHOR = Math.max(...R.reports.map((r) => Date.parse(r.date)));

/** An empty axis matches everything; several picks widen that axis. */
const anyOf = (picked: string[], value?: string) =>
  picked.length === 0 || (value !== undefined && picked.includes(value));

function applyFilters(items: Report[], f: State): Report[] {
  const q = f.q.trim().toLowerCase();

  const out = items.filter((r) => {
    if (!anyOf(f.type, r.type)) return false;
    if (!anyOf(f.sector, r.sector)) return false;
    if (!anyOf(f.broker, r.broker)) return false;
    if (!anyOf(f.rating, r.rating)) return false;
    if (f.company.length && !r.companies.some((c) => f.company.includes(c))) return false;
    if (f.period) {
      const days = (ANCHOR - Date.parse(r.date)) / 86_400_000;
      if (days >= Number(f.period)) return false;
    }
    if (q) {
      const hay = `${r.title} ${r.summary} ${r.broker} ${r.analyst} ${r.sector} ${r.companies.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  out.sort((a, b) => {
    switch (f.sort) {
      case 'oldest': return Date.parse(a.date) - Date.parse(b.date);
      case 'reads':  return b.reads - a.reads;
      case 'upside': return (b.upside ?? -Infinity) - (a.upside ?? -Infinity);
      default:       return Date.parse(b.date) - Date.parse(a.date);
    }
  });

  const limit = Number(f.results) || 25;
  return out.length > limit ? out.slice(0, limit) : out;
}

/** `2025-03-15` -> `March 2025`. The library spans months rather than days, so
 *  the feed breaks on month rather than Today / This Week. */
function monthOf(iso: string) {
  return new Date(`${iso}T00:00:00Z`)
    .toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

function groupByMonth(items: Report[]) {
  const groups: { label: string; items: Report[] }[] = [];
  for (const r of items) {
    const label = monthOf(r.date);
    const last = groups[groups.length - 1];
    if (last && last.label === label) last.items.push(r);
    else groups.push({ label, items: [r] });
  }
  return groups;
}

/** `scope` narrows the library to one house before the filters run — the broker
 *  detail screen passes its own reports in. The broker block then drops out of
 *  the filter row, since a filter that can only widen past the scope would lie
 *  about what the list contains. */
export function ReportsBrowser({ pageSize = 6, scope }: {
  pageSize?: number; scope?: Report[];
}) {
  const [f, setF] = React.useState<State>(NONE);
  const [shown, setShown] = React.useState(pageSize);

  const source = scope ?? R.reports;
  const pool = React.useMemo(() => applyFilters(source, f), [source, f]);
  React.useEffect(() => { setShown(pageSize); }, [f, pageSize]);

  const cards = pool.slice(0, shown);
  /* Month headers only make sense while the feed is in date order. */
  const grouped = f.sort === 'newest' || f.sort === 'oldest';
  const groups = grouped ? groupByMonth(cards) : [{ label: '', items: cards }];
  const more = pool.length - cards.length;

  const setMulti = (k: 'type' | 'company' | 'broker' | 'sector' | 'rating') =>
    (v: string[]) => setF((prev) => ({ ...prev, [k]: v }));
  const setOne = (k: 'period' | 'results' | 'sort') =>
    (v: string[]) => setF((prev) => ({ ...prev, [k]: v[0] ?? '' }));
  const setQ = (v: string) => setF((prev) => ({ ...prev, q: v }));
  const reset = () => { setF(NONE); setShown(pageSize); };
  const filtered = pool.length !== source.length || f.q.trim() !== '';

  const fields: FilterField[] = [
    { key: 'type',    label: 'All Types',     menu: <FilterMenu multiple label="All Types"     options={TYPE_OPTS}    values={f.type}    onChange={setMulti('type')} searchable searchPlaceholder="Search report types…" /> },
    { key: 'company', label: 'All Companies', menu: <FilterMenu multiple label="All Companies" options={COMPANY_OPTS} values={f.company} onChange={setMulti('company')} searchable searchPlaceholder="Search tickers…" /> },
    { key: 'sector',  label: 'All Sectors',   menu: <FilterMenu multiple label="All Sectors"   options={SECTOR_OPTS}  values={f.sector}  onChange={setMulti('sector')} searchable searchPlaceholder="Search sectors…" /> },
    { key: 'broker',  label: 'All Brokers',   menu: <FilterMenu multiple label="All Brokers"   options={BROKER_OPTS}  values={f.broker}  onChange={setMulti('broker')} searchable searchPlaceholder="Search brokers…" /> },
    { key: 'rating',  label: 'Any Rating',    menu: <FilterMenu multiple label="Any Rating"    options={RATING_OPTS}  values={f.rating}  onChange={setMulti('rating')} /> },
    { key: 'period',  label: 'All Time',      menu: <FilterMenu label="All Time"   options={PERIOD_OPTS} values={f.period ? [f.period] : []}   onChange={setOne('period')} /> },
    { key: 'results', label: '25 Results',    menu: <FilterMenu label="25 Results" options={RESULT_OPTS} values={f.results ? [f.results] : []} onChange={setOne('results')} /> },
  ].filter((field) => !(scope && field.key === 'broker'));

  return (
    <div className="col" style={{ gap: 20 }}>
      <label className="rsearch">
        <span className="rsearch__icon" aria-hidden>⌕</span>
        <input
          type="search"
          value={f.q}
          placeholder="Search reports, tickers, analysts…"
          aria-label="Search research reports"
          onChange={(e) => setQ(e.target.value)}
        />
        {f.q && (
          <button className="rsearch__clear" type="button" aria-label="Clear search"
                  onClick={() => setQ('')}>×</button>
        )}
      </label>

      <FilterRow fields={fields} onHide={(k) => setF((prev) => ({ ...prev, [k]: NONE[k as keyof State] }))} />

      <div className="rhead">
        <p className="resultcount">
          Showing {cards.length} of {source.length} reports
          {filtered && <button className="resetlink" type="button" onClick={reset}>Clear all</button>}
        </p>
        <FilterMenu label="Newest first" options={SORT_OPTS} values={[f.sort]} onChange={setOne('sort')} />
      </div>

      <div className="col" style={{ gap: 23 }}>
        {groups.map((g) => (
          <React.Fragment key={g.label || 'all'}>
            {g.label && <h2 className="rgroup">{g.label}</h2>}
            {g.items.map((r) => <ReportCard key={r.id} report={r} />)}
          </React.Fragment>
        ))}

        {cards.length === 0 && (
          <p className="emptystate">
            No reports match this search.{' '}
            <button className="resetlink" type="button" onClick={reset}>Clear all</button>
          </p>
        )}

        {more > 0 && (
          <button className="viewmore" type="button" onClick={() => setShown((n) => n + pageSize)}>
            Load More <ArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}
