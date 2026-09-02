import * as React from 'react';

/** Figma `Frame 41090` — Key Data. Two label/value pairs per row sitting under
 *  one header band, on the same ruled treatment as the other data tables. */
export function KeyDataTable({ rows }: {
  rows: { label: string; value: string; tone?: 'up' | 'down' }[];
}) {
  return (
    <div className="kdata" role="table" aria-label="Key data">
      <div className="ctable__cell ctable__cell--head ctable__cell--sm kdata__head" role="columnheader">
        Key Data
      </div>
      {rows.map((r) => (
        <React.Fragment key={r.label}>
          <div className="ctable__cell ctable__cell--sm" role="rowheader">{r.label}</div>
          <div
            className={`ctable__cell ctable__cell--sm ctable__cell--end tabular${r.tone ? ` levels__cell--${r.tone}` : ''}`}
            role="cell"
          >
            {r.value}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

/** Figma `Frame 41088` — the quarterly results table. Scrolls inside its own
 *  box on narrow screens rather than crushing seven columns. */
export function FinancialTable({ columns, rows }: {
  columns: string[];
  rows: { label: string; cells: string[]; strong?: boolean }[];
}) {
  return (
    <div className="ctable-scroll">
      <div className="fintable" role="table" aria-label="Quarterly results">
        {columns.map((c, i) => (
          <div
            key={c + i}
            className={`ctable__cell ctable__cell--head ctable__cell--sm${i ? ' ctable__cell--end' : ''}`}
            role="columnheader"
          >
            {c}
          </div>
        ))}
        {rows.map((r) => (
          <React.Fragment key={r.label}>
            <div className={`ctable__cell ctable__cell--sm${r.strong ? ' ctable__cell--strong' : ''}`} role="rowheader">
              {r.label}
            </div>
            {r.cells.map((v, i) => (
              <div
                key={`${r.label}-${i}`}
                className={`ctable__cell ctable__cell--sm ctable__cell--end tabular${r.strong ? ' ctable__cell--strong' : ''}`}
                role="cell"
              >
                {v}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
