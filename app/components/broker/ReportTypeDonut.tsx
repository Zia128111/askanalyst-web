import * as React from 'react';
import type { Tally } from '@/data/broker';

/* Figma `Frame 41161` (4902:5011): a 160px ring with a 113px hole, and a
   two-column legend beneath it. The eight `--color-chart-series-*` tokens cover
   the eight report types the design draws; a ninth would wrap round to the
   first, which is why the legend always carries the label. */
const SERIES = [
  'var(--color-chart-series-1)', 'var(--color-chart-series-2)',
  'var(--color-chart-series-3)', 'var(--color-chart-series-4)',
  'var(--color-chart-series-5)', 'var(--color-chart-series-6)',
  'var(--color-chart-series-7)', 'var(--color-chart-series-8)',
];

const SIZE = 160;
/* Mid-line of the ring: halfway between the 160 outer and 113.23 inner edge. */
const R = 68.3;
const STROKE = 23.4;
const CIRCUMFERENCE = 2 * Math.PI * R;

export function ReportTypeDonut({ types }: { types: Tally<string>[] }) {
  const total = types.reduce((sum, t) => sum + t.count, 0);
  if (total === 0) return <p className="brail__empty">No reports on file.</p>;

  /* Walk the ring, laying each arc down where the last one ended. */
  let offset = 0;
  const arcs = types.map((t, i) => {
    const length = (t.count / total) * CIRCUMFERENCE;
    const arc = { key: t.key, count: t.count, colour: SERIES[i % SERIES.length], length, offset };
    offset += length;
    return arc;
  });

  return (
    <div className="col" style={{ gap: 20 }}>
      <svg
        className="donut"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`Reports by type: ${types.map((t) => `${t.count} ${t.key}`).join(', ')}`}
      >
        {/* -90° so the first segment starts at twelve o'clock. */}
        <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
          {arcs.map((a) => (
            <circle
              key={a.key}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke={a.colour}
              strokeWidth={STROKE}
              strokeDasharray={`${a.length} ${CIRCUMFERENCE - a.length}`}
              strokeDashoffset={-a.offset}
            />
          ))}
        </g>
      </svg>

      <ul className="donut__legend">
        {arcs.map((a) => (
          <li key={a.key} className="donut__key">
            <span className="donut__dot" style={{ background: a.colour }} aria-hidden />
            <span className="donut__count tabular">{a.count}</span>
            <span className="donut__label">{a.key}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
