import * as React from 'react';

export type LevelRow = { label: string; value: string; tone?: 'up' | 'down' | 'muted' };

/** Figma `Frame 41088` — GRID layout, 894 wide, two 447px columns, gap 0.
 *  Header cells carry bg/brand-subtle; every cell has a 1px indigo border. */
export function KeyLevelsTable({ rows }: { rows: LevelRow[] }) {
  return (
    <div className="levels" role="table" aria-label="Key levels">
      <div className="levels__cell levels__cell--head" role="columnheader">Level</div>
      <div className="levels__cell levels__cell--head levels__cell--num" role="columnheader">Price</div>
      {rows.map((r) => (
        <React.Fragment key={r.label}>
          <div className="levels__cell" role="cell">{r.label}</div>
          <div
            className={`levels__cell levels__cell--num ${r.tone ? `levels__cell--${r.tone}` : ''}`}
            role="cell"
          >
            {r.value}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
