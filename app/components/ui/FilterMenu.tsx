'use client';

import * as React from 'react';
import { ChevronDown } from './Icon';

export type Option = { value: string; label: string; hint?: string };

/** Closes a popover on outside pointer-down or Escape. */
export function useDismissable(
  root: React.RefObject<HTMLElement>, open: boolean, close: () => void,
) {
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close, root]);
}

/** A dropdown that actually opens: optional search box, scrollable option list,
 *  click-outside and Escape to dismiss. Styled as the Figma filter block.
 *
 *  `values` is always an array. In single mode picking an option replaces the
 *  selection and closes; in `multiple` mode options toggle and the panel stays
 *  open so several can be picked in one go. The first option — the `All …`
 *  entry, whose value is `''` — always means "clear the selection". */
export function FilterMenu({
  label, options, values, onChange,
  searchable = false, searchPlaceholder = 'Search…', multiple = false,
}: {
  /** Shown when nothing is picked — the Figma resting label, e.g. `All Brokers`. */
  label: string;
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  multiple?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const root = React.useRef<HTMLDivElement>(null);
  useDismissable(root, open, () => setOpen(false));

  const q = query.trim().toLowerCase();
  const shown = q
    ? options.filter((o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q))
    : options;

  const pick = (value: string) => {
    if (value === '') { onChange([]); setOpen(false); return; }
    if (!multiple) { onChange([value]); setOpen(false); return; }
    onChange(values.includes(value) ? values.filter((v) => v !== value) : [...values, value]);
  };

  /* One pick shows its name; several show the first plus a counter. */
  const buttonText = (() => {
    if (values.length === 0) return label;
    const first = options.find((o) => o.value === values[0])?.label ?? values[0];
    return values.length === 1 ? first : `${first} +${values.length - 1}`;
  })();

  return (
    <div className="fmenu" ref={root}>
      <button
        className="dropdown dropdown--lg"
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => { setOpen((o) => !o); setQuery(''); }}
      >
        <span className="dropdown__text">{buttonText}</span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="fmenu__panel" role="listbox" aria-multiselectable={multiple || undefined} aria-label={label}>
          {searchable && (
            <input
              className="fmenu__search"
              type="search"
              autoFocus
              value={query}
              placeholder={searchPlaceholder}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          {shown.length === 0 && <p className="fmenu__empty">No matches</p>}
          {shown.map((o) => {
            const on = o.value === '' ? values.length === 0 : values.includes(o.value);
            return (
              <button
                key={o.value}
                className="fmenu__opt"
                type="button"
                role="option"
                aria-selected={on}
                onClick={() => pick(o.value)}
              >
                <span>{o.label}</span>
                {multiple && o.value !== '' && (
                  <span className={on ? 'fmenu__tick fmenu__tick--on' : 'fmenu__tick'} aria-hidden>
                    {on ? '✓' : ''}
                  </span>
                )}
                {o.hint && <span className="fmenu__hint">{o.hint}</span>}
              </button>
            );
          })}
          {multiple && values.length > 0 && (
            <div className="fmenu__foot">
              <button className="resetlink" type="button" onClick={() => { onChange([]); }}>
                Clear {values.length} selected
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
