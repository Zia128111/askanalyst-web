import * as React from 'react';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Badge';
import { CompanyArt } from '../ui/CompanyArt';
import { Book } from '../ui/Icon';
import * as D from '@/data/insights';
import type { Insight } from '@/data/insights';

/** What the band summarises when no single company is in scope — each tab
 *  reports on its own content rather than on broker ratings. */
export type Rollup =
  | { kind: 'consensus' }
  | { kind: 'insights'; items: Insight[] }
  | { kind: 'reports'; items: Insight[] }
  | { kind: 'timeline' };

/** `1,050` -> 1050. */
const num = (s: string) => Number(s.replace(/,/g, ''));

/** Only LUCK carries a live quote today; everything else shows coverage only. */
function priceOf(symbol: string): number | undefined {
  return symbol === D.company.symbol ? num(D.quote.price) : undefined;
}

function nameOf(symbol: string) {
  const entry = D.consensusEntries.find((e) => e.symbol === symbol);
  if (entry) return { name: entry.name, logo: entry.logo };
  const listed = D.psxCompanies.find((c) => c.value === symbol);
  /* `LUCK — Lucky Cement` -> `Lucky Cement`. */
  return { name: listed ? listed.label.split('—').pop()!.trim() : symbol, logo: undefined };
}

function Stat({ label, value, tone }: { label: string; value: React.ReactNode; tone?: string }) {
  return (
    <div className="scope__stat">
      <span className="scope__statlabel">{label}</span>
      <strong className="scope__statvalue" style={tone ? { color: tone } : undefined}>{value}</strong>
    </div>
  );
}

/** A three-part share bar with its own caption. */
function SplitBar({ label, parts, caption }: {
  label: string;
  parts: { className: string; value: number }[];
  caption: string;
}) {
  const total = parts.reduce((s, p) => s + p.value, 0) || 1;
  return (
    <div className="scope__splitwrap">
      <span className="scope__statlabel">{label}</span>
      <div className="cbar" role="img" aria-label={caption}>
        {parts.map((p) => (
          <span key={p.className} className={p.className} style={{ width: `${(p.value / total) * 100}%` }} />
        ))}
      </div>
      <span className="scope__sub">{caption}</span>
    </div>
  );
}

/** Sits under the tab strip and describes whatever the filters have in scope:
 *  one company gets its identity and coverage, otherwise the tab summarises
 *  the research it is showing. */
export function ScopeBand({ symbols, rollup = { kind: 'consensus' } }: {
  symbols: string[];
  rollup?: Rollup;
}) {
  if (symbols.length === 0) return null;
  if (symbols.length === 1) return <SingleCompany symbol={symbols[0]} />;
  return <Card pad={false} className="card--pad"><div className="scope"><RollupBody rollup={rollup} symbols={symbols} /></div></Card>;
}

function SingleCompany({ symbol }: { symbol: string }) {
  const entry = D.consensusEntries.find((e) => e.symbol === symbol);
  const { name, logo } = nameOf(symbol);
  const price = priceOf(symbol);

  const rows = entry?.rows ?? [];
  const verdict = rows.length ? D.consensusCall(rows) : undefined;
  const avgTarget = rows.length
    ? rows.reduce((sum, r) => sum + num(r.target), 0) / rows.length
    : undefined;
  const upside = price && avgTarget ? ((avgTarget - price) / price) * 100 : undefined;

  const VERDICT_TONE: Record<string, string> = {
    Buy: 'var(--color-text-positive-strong)',
    Hold: 'var(--color-text-warning)',
    Sell: 'var(--color-text-negative)',
  };

  return (
    <Card pad={false} className="card--pad">
      <div className="scope">
        <div className="scope__id">
          <CompanyArt src={logo} size={56} fallback={<Book size={40} />} />
          <div className="col" style={{ gap: 6 }}>
            <h2 className="ccompany__name" style={{ padding: 0 }}>{name}</h2>
            <div className="ccompany__tags">
              <Chip>{symbol}</Chip>
              {entry && <Chip>Cement</Chip>}
              <Chip>Pakistan</Chip>
            </div>
          </div>
        </div>

        <div className="scope__stats">
          {price !== undefined && (
            <Stat label="Price" value={<span className="tabular">PKR {price.toFixed(2)}</span>} />
          )}
          {verdict
            ? <>
                <Stat label="Consensus" value={verdict} tone={VERDICT_TONE[verdict]} />
                <Stat label="Brokers" value={<span className="tabular">{rows.length}</span>} />
                <Stat label="Avg target" value={<span className="tabular">{avgTarget!.toFixed(0)}</span>} />
                {upside !== undefined && (
                  <Stat
                    label="Implied upside"
                    value={<span className="tabular">{upside >= 0 ? '+' : ''}{upside.toFixed(1)}%</span>}
                    tone={upside >= 0 ? 'var(--color-text-positive)' : 'var(--color-text-negative)'}
                  />
                )}
              </>
            : <Stat label="Coverage" value="No brokers covering" />}
        </div>
      </div>
    </Card>
  );
}

function Head({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="scope__id">
      <div className="col" style={{ gap: 6 }}>
        <h2 className="ccompany__name" style={{ padding: 0 }}>{title}</h2>
        <span className="scope__sub">{sub}</span>
      </div>
    </div>
  );
}

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

function RollupBody({ rollup, symbols }: { rollup: Rollup; symbols: string[] }) {
  if (rollup.kind === 'consensus') {
    const entries = D.consensusEntries.filter((e) => symbols.includes(e.symbol));
    const rows = entries.flatMap((e) => e.rows);
    const houses = new Set(rows.map((r) => r.broker)).size;
    const v = entries.map((e) => D.consensusCall(e.rows));
    const c = {
      Buy: v.filter((x) => x === 'Buy').length,
      Hold: v.filter((x) => x === 'Hold').length,
      Sell: v.filter((x) => x === 'Sell').length,
    };
    return (
      <>
        <Head title={plural(entries.length, 'company', 'companies')}
              sub={`${plural(rows.length, 'broker call')} from ${plural(houses, 'house')}`} />
        <div className="scope__stats">
          <SplitBar
            label="Consensus split"
            parts={[
              { className: 'cbar__seg--buy',  value: c.Buy },
              { className: 'cbar__seg--hold', value: c.Hold },
              { className: 'cbar__seg--sell', value: c.Sell },
            ]}
            caption={`${c.Buy} Buy · ${c.Hold} Hold · ${c.Sell} Sell`}
          />
        </div>
      </>
    );
  }

  if (rollup.kind === 'timeline') {
    const events = D.timelineEvents;
    const years = events.map((e) => e.date.slice(-4));
    const tally = years.reduce<Record<string, number>>((a, y) => { a[y] = (a[y] ?? 0) + 1; return a; }, {});
    const busiest = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
    const houses = new Set(events.map((e) => e.broker)).size;
    return (
      <>
        <Head title="All companies"
              sub={`${plural(events.length, 'event')} from ${plural(houses, 'house')}`} />
        <div className="scope__stats">
          <Stat label="Coverage" value={<span className="tabular">{years.slice().sort()[0]}–{years.slice().sort().pop()}</span>} />
          <Stat label="Busiest year" value={<span className="tabular">{busiest[0]} ({busiest[1]})</span>} />
        </div>
      </>
    );
  }

  const items = rollup.items;
  const houses = new Set(items.map((i) => i.broker)).size;

  if (rollup.kind === 'insights') {
    const c = {
      Positive: items.filter((i) => i.sentiment === 'Positive').length,
      Neutral:  items.filter((i) => i.sentiment === 'Neutral').length,
      Negative: items.filter((i) => i.sentiment === 'Negative').length,
    };
    const themes = items.flatMap((i) => i.tags)
      .reduce<Record<string, number>>((a, t) => { a[t] = (a[t] ?? 0) + 1; return a; }, {});
    const top = Object.entries(themes).sort((a, b) => b[1] - a[1])[0];
    return (
      <>
        <Head title="All companies"
              sub={`${plural(items.length, 'insight')} from ${plural(houses, 'broker')}`} />
        <div className="scope__stats">
          {top && <Stat label="Top theme" value={<span style={{ color: 'var(--color-text-link)' }}>{top[0]}</span>} />}
          <SplitBar
            label="Sentiment"
            parts={[
              { className: 'cbar__seg--buy',  value: c.Positive },
              { className: 'cbar__seg--neu',  value: c.Neutral },
              { className: 'cbar__seg--sell', value: c.Negative },
            ]}
            caption={`${c.Positive} Positive · ${c.Neutral} Neutral · ${c.Negative} Negative`}
          />
        </div>
      </>
    );
  }

  /* reports */
  const byType = items.reduce<Record<string, number>>((a, i) => { a[i.category] = (a[i.category] ?? 0) + 1; return a; }, {});
  const types = Object.entries(byType).sort((a, b) => b[1] - a[1]).slice(0, 3);
  return (
    <>
      <Head title="All companies"
            sub={`${plural(items.length, 'report')} from ${plural(houses, 'broker')}`} />
      <div className="scope__stats">
        {types.map(([type, n]) => (
          <Stat key={type} label={type} value={<span className="tabular">{n}</span>} />
        ))}
      </div>
    </>
  );
}
