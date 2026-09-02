import * as React from 'react';
import { Download, Eye, Document } from '../ui/Icon';
import { ShareButton } from '../ui/ShareDialog';

/** Figma `Section Header` — title, analyst/date/page meta, action buttons. */
export function SectionHeader({ title, subtitle, analyst, date, pages, broker = 'Alpha Capital Pvt. Ltd.', actions = true }: {
  title: string;
  /** One-line standfirst under the title, used by the results-review screen. */
  subtitle?: string;
  analyst: string; date: string; pages: string;
  /** House credited on the first action button. */
  broker?: string;
  actions?: boolean;
}) {
  return (
    <div className="col" style={{ gap: 16 }}>
      <div className="col" style={{ gap: 6 }}>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-standfirst">{subtitle}</p>}
      </div>

      <div className="row center" style={{ gap: 10, flexWrap: 'wrap', color: 'var(--color-text-muted)', fontSize: 14 }}>
        <span>{analyst}</span>
        <Dot /><span>{date}</span>
        <Dot /><span>{pages}</span>
      </div>

      {actions && (
        <div className="row center" style={{ gap: 5, flexWrap: 'wrap' }}>
          <button className="btn"><Eye size={16} /> {broker}</button>
          <button className="btn"><Document size={16} /> View Full Report (PDF)</button>
          <button className="btn"><Download size={16} /> Download PDF</button>
          <ShareButton title={title} />
        </div>
      )}
    </div>
  );
}

function Dot() {
  return <span aria-hidden style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--color-brand-primary)' }} />;
}
