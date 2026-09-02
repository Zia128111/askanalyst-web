import * as React from 'react';
import { Card } from '../ui/Card';
import { withNoteRefs, type NoteRef } from './NoteRef';

/** Figma `StockCard` — instrument headline row + body. */
export function StockCard({ name, price, badge, children }: {
  name: string; price: React.ReactNode; badge?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <Card raised pad={false} className="card--pad-stock" style={{ borderRadius: 14 }}>
      <div className="col" style={{ gap: 19 }}>
        <div className="stock__head">
          <h2 style={{ margin: 0, fontSize: 21, fontWeight: 600, color: 'var(--color-text-near-black)' }}>{name}</h2>
          <div className="tabular" style={{ fontSize: 20, color: 'var(--color-text-near-black)' }}>{price}</div>
        </div>
        {badge && <div className="row" style={{ alignItems: 'flex-start', width: '100%' }}>{badge}</div>}
        <div className="col" style={{ gap: 15 }}>{children}</div>
      </div>
    </Card>
  );
}

/** `PKR 822.37` — the mixed-style price node in Figma: small unit, large figure. */
export function Price({ amount, currency = 'PKR' }: { amount: string; currency?: string }) {
  return (
    <span className="tabular">
      <span style={{ fontSize: 14 }}>{currency}</span>{' '}
      <span style={{ fontSize: 20 }}>{amount}</span>
    </span>
  );
}

/** A labelled prose block — Figma `… Block` with an `App` caption above the paragraph. */
export function CommentaryBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="col" style={{ gap: 7 }}>
      <span style={{ fontSize: 11, fontWeight: 700, lineHeight: '16.5px', color: 'var(--color-accent-info)' }}>
        {label}
      </span>
      {children}
    </div>
  );
}

/** Prose block. Pass `notes` and any matching marker digit in the text becomes
 *  a link to that `Sidenote`. */
export function Paragraph({ children, notes }: { children: React.ReactNode; notes?: NoteRef[] }) {
  const body = typeof children === 'string' ? withNoteRefs(children, notes) : children;
  return <p style={{ margin: 0, fontSize: 16, lineHeight: 1.49 }}>{body}</p>;
}
