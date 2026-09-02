'use client';

import * as React from 'react';
import { useDismissable } from './FilterMenu';
import { Filter } from './Icon';

export type FilterField = {
  key: string;
  /** Name shown in the funnel's show/hide list. */
  label: string;
  menu: React.ReactNode;
};

/** The Figma `Frame 41152` filter row: a funnel that chooses which blocks are
 *  on show, followed by the blocks themselves. Visibility lives here; `onHide`
 *  lets the owner clear the value of a block that has just been hidden, so a
 *  filter can never narrow a list from somewhere the reader cannot see. */
export function FilterRow({ fields, onHide }: {
  fields: FilterField[];
  onHide?: (key: string) => void;
}) {
  const [hidden, setHidden] = React.useState<ReadonlySet<string>>(new Set());
  const [open, setOpen] = React.useState(false);
  const root = React.useRef<HTMLDivElement>(null);
  useDismissable(root, open, () => setOpen(false));

  const toggle = (key: string) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
        onHide?.(key);
      }
      return next;
    });
  };

  const hiddenCount = fields.filter((f) => hidden.has(f.key)).length;

  return (
    <div className="filterbar">
      <div className="fmenu" ref={root}>
        <button
          className="filterbar__icon"
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={hiddenCount ? `Choose filters (${hiddenCount} hidden)` : 'Choose filters'}
          title="Choose filters"
          onClick={() => setOpen((o) => !o)}
        >
          <Filter size={18} />
          {hiddenCount > 0 && <span className="filterbar__count">{hiddenCount}</span>}
        </button>

        {open && (
          <div className="fmenu__panel fmenu__panel--left">
            <p className="fmenu__caption">Show filters</p>
            {fields.map((f) => (
              <label key={f.key} className="fmenu__opt">
                <span>{f.label}</span>
                <input type="checkbox" checked={!hidden.has(f.key)} onChange={() => toggle(f.key)} />
              </label>
            ))}
            <div className="fmenu__foot">
              <button className="resetlink" type="button" onClick={() => setHidden(new Set())}>
                Show all
              </button>
            </div>
          </div>
        )}
      </div>

      {fields.filter((f) => !hidden.has(f.key)).map((f) => (
        <React.Fragment key={f.key}>{f.menu}</React.Fragment>
      ))}
    </div>
  );
}
