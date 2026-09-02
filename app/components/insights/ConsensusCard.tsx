'use client';

import * as React from 'react';
import { Flash } from '../ui/Icon';
import { RatingPill, BrokerMark } from './InsightCard';
import { brokerHref } from '@/data/brokers';
import * as D from '@/data/insights';
import type { Call, ConsensusEntry } from '@/data/insights';

const CALL_TONE: Record<Call, string> = {
  Buy: 'rating--positive', Hold: 'rating--warning', Sell: 'rating--negative',
};
const CALL_GLYPH: Record<Call, string> = { Buy: '↗', Hold: '—', Sell: '↘' };
const CALLS: Call[] = ['Buy', 'Hold', 'Sell'];

const COLUMNS = ['Broker', 'Consensus', 'Analyst', 'Target Price', 'Last Revision'];
/* Column alignment, matching the Figma header cells. */
const ALIGN = ['', 'ctable__cell--mid', 'ctable__cell--mid', 'ctable__cell--end', 'ctable__cell--end'];

/** Figma `Product Summary Container` — coverage split, contrarian flag, broker
 *  table. Counts and the headline verdict come from the rows, and the Buy /
 *  Hold / Sell pills filter the table to that call. */
export function ConsensusCard({ entry }: { entry: ConsensusEntry }) {
  const [only, setOnly] = React.useState<Call | null>(null);

  const rows = entry.rows;
  const counts = D.callCounts(rows);
  const verdict = D.consensusCall(rows);
  const dissent = D.contrarians(rows);
  const total = rows.length || 1;

  const shown = only ? rows.filter((r) => r.call === only) : rows;

  return (
    <section className="ccard">
      <div className="ccard__head">
        <div className="col" style={{ gap: 24 }}>
          <div className="quote">
            <img className="quote__art" src={entry.logo} alt="" aria-hidden />
            <div className="col" style={{ gap: 4 }}>
              <strong style={{ fontSize: 20, lineHeight: 1.49 }}>{entry.name}</strong>
              <span style={{ fontSize: 16, lineHeight: 1.49, color: 'var(--color-text-secondary)' }}>
                {rows.length} Brokers Covering
              </span>
            </div>
          </div>

          <div className="icard__pills">
            {CALLS.map((c) => (
              <button
                key={c}
                type="button"
                className={`rating rating--btn ${CALL_TONE[c]}`}
                aria-pressed={only === c}
                onClick={() => setOnly(only === c ? null : c)}
              >
                {CALL_GLYPH[c]} {c}: {counts[c]}
              </button>
            ))}
            {only && (
              <button className="resetlink" type="button" onClick={() => setOnly(null)}>Show all</button>
            )}
          </div>
        </div>

        <div className="ccard__verdict">
          <small>CONSENSUS</small>
          <strong className={`ccard__verdict--${verdict.toLowerCase()}`}>{verdict}</strong>
        </div>
      </div>

      {/* Segment widths are the share of coverage, so the bar always agrees
          with the counts and with the headline call. */}
      <div className="cbar" role="img"
           aria-label={`Coverage split: ${counts.Buy} buy, ${counts.Hold} hold, ${counts.Sell} sell`}>
        <span className="cbar__seg--buy"  style={{ width: `${(counts.Buy / total) * 100}%` }} />
        <span className="cbar__seg--hold" style={{ width: `${(counts.Hold / total) * 100}%` }} />
        <span className="cbar__seg--sell" style={{ width: `${(counts.Sell / total) * 100}%` }} />
      </div>

      {dissent.length > 0 && (
        <div className="callout">
          <Flash size={24} />
          <span>
            <strong>Contrarian View</strong>: {dissent.slice(0, 2).join(', ')}
            {dissent.length > 2 ? ` and ${dissent.length - 2} more` : ''}
            {' '}rate{dissent.length === 1 ? 's' : ''} {entry.symbol} differently from consensus
          </span>
        </div>
      )}

      <div className="ctable-scroll">
        <div className="ctable" role="table" aria-label="Broker consensus">
          {COLUMNS.map((c, i) => (
            <div key={c} className={`ctable__cell ctable__cell--head ${ALIGN[i]}`} role="columnheader">{c}</div>
          ))}
          {/* `.trow` is `display: contents` — the `role="row"` the cells were
              missing, and the hover target for the row highlight. */}
          {shown.map((r) => (
            <div className="trow" key={r.broker} role="row">
              <div className="ctable__cell" role="cell">
                <RatingPill tone="rating--neutral" href={brokerHref(r.broker)}
                            mark={<BrokerMark name={r.broker} />}>
                  <span style={{ fontWeight: 400, fontSize: 16, color: 'var(--color-text-primary)' }}>{r.broker}</span>
                </RatingPill>
              </div>
              <div className="ctable__cell ctable__cell--mid" role="cell">
                <RatingPill tone={CALL_TONE[r.call]}>{CALL_GLYPH[r.call]} {r.call}</RatingPill>
              </div>
              <div className="ctable__cell ctable__cell--mid" role="cell">{r.analyst}</div>
              <div className="ctable__cell ctable__cell--end tabular" role="cell">{r.target}</div>
              <div className="ctable__cell ctable__cell--end tabular" role="cell">{r.revised}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
