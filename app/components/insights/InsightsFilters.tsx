'use client';

import * as React from 'react';
import { FilterMenu, type Option } from '../ui/FilterMenu';
import { FilterRow, type FilterField } from '../ui/FilterRow';
import { ArrowRight } from '../ui/Icon';
import { InsightCard } from './InsightCard';
import { ConsensusCard } from './ConsensusCard';
import { ScopeBand } from './ScopeBand';
import * as D from '@/data/insights';
import type { Insight } from '@/data/insights';

/* Every axis that can sensibly hold several values is an array. `period` and
   `results` stay single: one date window, one page size. */
export type FilterState = {
  report: string[]; company: string[]; broker: string[];
  sentiment: string[]; keyword: string[];
  /** Consensus tab only — swaps in for `sentiment` there. */
  consensus: string[];
  period: string; results: string;
};

/** `''` means "no choice made" — the menu shows its resting Figma label. */
export const NO_FILTERS: FilterState = {
  report: [], company: [], broker: [], sentiment: [], keyword: [], consensus: [],
  period: '', results: '25',
};

const opts = (values: string[], allLabel: string): Option[] => [
  { value: '', label: allLabel },
  ...values.map((v) => ({ value: v, label: v })),
];

const REPORT_OPTS    = opts(D.reportTypes, 'All Reports');
const BROKER_OPTS    = opts(D.brokerHouses, 'All Brokers');
const SENTIMENT_OPTS = opts(D.sentimentOptions, 'All Sentiments');
const KEYWORD_OPTS   = opts(D.keywordOptions, 'Any Keyword');
const CONSENSUS_OPTS = opts(D.consensusOptions, 'All Consensus');
const COMPANY_OPTS: Option[] = [{ value: '', label: 'All Companies' }, ...D.psxCompanies];
const PERIOD_OPTS: Option[]  = [{ value: '', label: 'Last 30 Days' }, ...D.periodOptions];
const RESULT_OPTS: Option[]  = D.resultOptions.map((n) => ({ value: n, label: `${n} Results` }));

/** `Investment Thesis - p.2 2025-03-15` -> Date. Undefined when absent. */
function sourceDate(source: string): Date | undefined {
  const m = /(\d{4})-(\d{2})-(\d{2})/.exec(source);
  return m ? new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`) : undefined;
}

/** Newest item in the set — the period window is measured back from here rather
 *  than from today, since the content is a fixed historical extract. */
function newest(items: Insight[]): number {
  return items.reduce((max, i) => {
    const d = sourceDate(i.source)?.getTime();
    return d && d > max ? d : max;
  }, 0);
}

/** An empty axis matches everything. Several picks on one axis widen it; the
 *  axes still narrow each other. */
const anyOf = (picked: string[], value: string) => picked.length === 0 || picked.includes(value);

export function applyFilters(items: Insight[], f: FilterState): Insight[] {
  const anchor = newest(items);
  const keywords = f.keyword.map((k) => k.replace(/^#/, '').toLowerCase());

  let out = items.filter((i) => {
    if (!anyOf(f.report, i.category)) return false;
    if (!anyOf(f.broker, i.broker)) return false;
    if (!anyOf(f.sentiment, i.sentiment)) return false;
    if (!anyOf(f.company, i.symbol ?? D.company.symbol)) return false;
    if (f.period) {
      const d = sourceDate(i.source)?.getTime();
      if (!d) return false;
      const days = (anchor - d) / 86_400_000;
      if (days >= Number(f.period)) return false;
    }
    if (keywords.length) {
      const hay = `${i.title} ${i.summary} ${i.tags.join(' ')}`.toLowerCase();
      if (!keywords.some((k) => hay.includes(k))) return false;
    }
    return true;
  });

  const limit = Number(f.results) || 25;
  if (out.length > limit) out = out.slice(0, limit);
  return out;
}

/** The blocks the funnel can show or hide, in Figma order. */
export const FILTER_FIELDS: { key: keyof FilterState; label: string }[] = [
  { key: 'report',    label: 'All Reports' },
  { key: 'company',   label: 'All Companies' },
  { key: 'broker',    label: 'All Brokers' },
  { key: 'sentiment', label: 'All Sentiments' },
  { key: 'consensus', label: 'Consensus View' },
  { key: 'period',    label: 'Last 30 Days' },
  { key: 'results',   label: '25 Results' },
  { key: 'keyword',   label: 'Keyword' },
];

/** Figma `Frame 41152`, wired up: each block opens a real menu, and the shared
 *  funnel chooses which blocks are on show. */
export function FilterBar({ value, onChange, omit = [] }: {
  value: FilterState; onChange: (next: FilterState) => void;
  /** Blocks this screen has no use for — dropped from the row and the funnel. */
  omit?: (keyof FilterState)[];
}) {
  const setMulti = (k: 'report' | 'company' | 'broker' | 'sentiment' | 'consensus' | 'keyword') =>
    (v: string[]) => onChange({ ...value, [k]: v });
  /* One window, one page size — these two stay single-select. */
  const setOne = (k: 'period' | 'results') => (v: string[]) => onChange({ ...value, [k]: v[0] ?? '' });

  const menus: Record<keyof FilterState, React.ReactNode> = {
    report:    <FilterMenu multiple label="All Reports"    options={REPORT_OPTS}    values={value.report}    onChange={setMulti('report')}    searchable searchPlaceholder="Search report types…" />,
    company:   <FilterMenu multiple label="All Companies"  options={COMPANY_OPTS}   values={value.company}   onChange={setMulti('company')}   searchable searchPlaceholder="Search PSX companies…" />,
    broker:    <FilterMenu multiple label="All Brokers"    options={BROKER_OPTS}    values={value.broker}    onChange={setMulti('broker')}    searchable searchPlaceholder="Search brokers…" />,
    sentiment: <FilterMenu multiple label="All Sentiments" options={SENTIMENT_OPTS} values={value.sentiment} onChange={setMulti('sentiment')} />,
    consensus: <FilterMenu multiple label="Consensus View" options={CONSENSUS_OPTS} values={value.consensus} onChange={setMulti('consensus')} />,
    keyword:   <FilterMenu multiple label="Keyword"        options={KEYWORD_OPTS}   values={value.keyword}   onChange={setMulti('keyword')}   searchable searchPlaceholder="Search keywords…" />,
    period:    <FilterMenu label="Last 30 Days" options={PERIOD_OPTS} values={value.period ? [value.period] : []}   onChange={setOne('period')} />,
    results:   <FilterMenu label="25 Results"   options={RESULT_OPTS} values={value.results ? [value.results] : []} onChange={setOne('results')} />,
  };

  const fields: FilterField[] = FILTER_FIELDS
    .filter((f) => !omit.includes(f.key))
    .map((f) => ({ key: f.key, label: f.label, menu: menus[f.key] }));

  /* Hiding a block clears it, so a filter can never narrow the list from
     somewhere the reader cannot see. */
  return (
    <FilterRow
      fields={fields}
      onHide={(k) => onChange({ ...value, [k]: NO_FILTERS[k as keyof FilterState] })}
    />
  );
}

/** Filter row plus the list it drives — the Insights and Reports tab bodies.
 *  `pageSize` turns on paging: only that many cards show until View More is
 *  pressed, which reveals the next batch. */
export function InsightsBrowser({ items, alert = true, pageSize, omit = [], rollup = 'insights' }: {
  items: Insight[]; alert?: boolean; pageSize?: number; omit?: (keyof FilterState)[];
  /** Which tab this is, so the scope band can summarise the right thing. */
  rollup?: 'insights' | 'reports';
}) {
  const [filters, setFilters] = React.useState<FilterState>(NO_FILTERS);
  const [shown, setShown] = React.useState(pageSize ?? Infinity);

  const pool = React.useMemo(() => applyFilters(items, filters), [items, filters]);
  /* A new filter selection starts the list again from the first page. */
  React.useEffect(() => { setShown(pageSize ?? Infinity); }, [filters, pageSize]);

  const cards = pool.slice(0, shown);
  const more = pool.length - cards.length;

  const reset = () => { setFilters(NO_FILTERS); setShown(pageSize ?? Infinity); };

  /* Named companies define the scope; `All Companies` describes the whole
     covered universe rather than the one name this extract happens to hold. */
  const scope = filters.company.length ? filters.company : D.coveredSymbols;

  return (
    <div className="col" style={{ gap: 26 }}>
      <ScopeBand symbols={scope} rollup={{ kind: rollup, items: pool }} />
      {/* `consensus` belongs to the Consensus tab only. */}
      <FilterBar value={filters} onChange={setFilters} omit={[...omit, 'consensus']} />

      <div className="col" style={{ gap: 23 }}>
        {cards.length !== items.length && (
          <p className="resultcount">
            Showing {cards.length} of {items.length}
            {pool.length !== items.length && (
              <button className="resetlink" type="button" onClick={reset}>Clear filters</button>
            )}
          </p>
        )}

        {cards.map((item) => <InsightCard key={item.title} item={item} alert={alert} />)}

        {cards.length === 0 && (
          <p className="emptystate">
            No results match these filters.{' '}
            <button className="resetlink" type="button" onClick={reset}>Clear filters</button>
          </p>
        )}

        {more > 0 && (
          <button className="viewmore" type="button"
                  onClick={() => setShown((n) => n + (pageSize ?? 0))}>
            View More <ArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}

/** The same row on tabs with no list bound to it (Timeline, Consensus). */
export function StandaloneFilterBar({ omit = [] }: { omit?: (keyof FilterState)[] }) {
  const [filters, setFilters] = React.useState<FilterState>(NO_FILTERS);
  const scope = filters.company.length ? filters.company : D.coveredSymbols;
  return (
    <div className="col" style={{ gap: 26 }}>
      <ScopeBand symbols={scope} rollup={{ kind: 'timeline' }} />
      <FilterBar value={filters} onChange={setFilters} omit={[...omit, 'consensus']} />
    </div>
  );
}

/* ── Consensus tab ── */

export function applyConsensusFilters(entries: D.ConsensusEntry[], f: FilterState): D.ConsensusEntry[] {
  let out = entries.filter((e) => {
    if (!anyOf(f.company, e.symbol)) return false;
    if (!anyOf(f.consensus, D.consensusCall(e.rows))) return false;
    if (f.broker.length && !e.rows.some((r) => f.broker.includes(r.broker))) return false;
    return true;
  });
  const limit = Number(f.results) || 25;
  if (out.length > limit) out = out.slice(0, limit);
  return out;
}

/** Filter row plus the company consensus cards it drives. */
export function ConsensusBrowser({ entries, pageSize = 3 }: {
  entries: D.ConsensusEntry[]; pageSize?: number;
}) {
  const [filters, setFilters] = React.useState<FilterState>(NO_FILTERS);
  const [shown, setShown] = React.useState(pageSize);

  const pool = React.useMemo(() => applyConsensusFilters(entries, filters), [entries, filters]);
  React.useEffect(() => { setShown(pageSize); }, [filters, pageSize]);

  const cards = pool.slice(0, shown);
  const more = pool.length - cards.length;
  const reset = () => { setFilters(NO_FILTERS); setShown(pageSize); };

  return (
    <div className="col" style={{ gap: 26 }}>
      <ScopeBand symbols={pool.map((e) => e.symbol)} rollup={{ kind: 'consensus' }} />
      {/* This tab has no sentiment or keyword axis — coverage is filtered by
          the consensus call instead. */}
      <FilterBar value={filters} onChange={setFilters}
                 omit={['sentiment', 'keyword', 'report', 'period']} />

      <div className="col" style={{ gap: 23 }}>
        {cards.length !== entries.length && (
          <p className="resultcount">
            Showing {cards.length} of {entries.length}
            {pool.length !== entries.length && (
              <button className="resetlink" type="button" onClick={reset}>Clear filters</button>
            )}
          </p>
        )}

        {cards.map((e) => <ConsensusCard key={e.symbol} entry={e} />)}

        {cards.length === 0 && (
          <p className="emptystate">
            No companies match these filters.{' '}
            <button className="resetlink" type="button" onClick={reset}>Clear filters</button>
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
