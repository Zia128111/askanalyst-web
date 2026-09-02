import * as React from 'react';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Badge';
import { ArrowRight, Download, Document, Sparkle, Compare, Notes, Book } from '../ui/Icon';
import { CompanyArt } from '../ui/CompanyArt';

/* ---------- Figma `Company Card` (sidebar variant) ---------- */
export function CompanySidebarCard({ title, tags, cta, art, image, imageSize = 84, layout = 'stacked' }: {
  title: string; tags: string[]; cta: { label: string; icon?: React.ReactNode };
  art?: React.ReactNode; image?: string; imageSize?: number;
  /** `stacked` — artwork above centred text (Figma default, used by the promo).
   *  `inline`   — artwork left, title + tags right. CTA sits below in both. */
  layout?: 'stacked' | 'inline';
}) {
  const inline = layout === 'inline';
  const artwork = image
    ? <CompanyArt src={image} size={imageSize} fallback={art ?? <Book size={64} />} />
    : (art ?? <Book size={64} />);
  const text = (
    <div className={inline ? 'col' : 'col center'} style={{ gap: 8, minWidth: 0 }}>
      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, textAlign: inline ? 'left' : 'center' }}>{title}</h3>
      <div className="row" style={{ gap: 5, flexWrap: 'wrap' }}>{tags.map((t) => <Chip key={t}>{t}</Chip>)}</div>
    </div>
  );
  return (
    <Card>
      <div className={inline ? 'col' : 'col center'} style={{ gap: 16 }}>
        {inline
          ? <div className="row center" style={{ gap: 12, justifyContent: 'center' }}>{artwork}{text}</div>
          : <>{artwork}{text}</>}
        <button className="btn" style={{ width: '100%' }}>{cta.icon}{cta.label}</button>
      </div>
    </Card>
  );
}

/* ---------- Figma `More From Cement Section` ---------- */
export type RelatedCompany = { symbol: string; logo?: string };

export function RelatedList({ title, items }: { title: string; items: RelatedCompany[] }) {
  return (
    <Card>
      <div className="col" style={{ gap: 25 }}>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, lineHeight: '24px' }}>{title}</h3>
        <ul className="col" style={{ gap: 15 }}>
          {items.map((item, i) => (
            <li key={item.symbol} className="col" style={{ gap: 15 }}>
              <a href="#" className="row center" style={{ gap: 5 }}>
                <CompanyMark src={item.logo} alt={item.symbol} size={30} />
                <span style={{ fontSize: 18, padding: '5px' }}>{item.symbol}</span>
                <ArrowRight />
              </a>
              {i < items.length - 1 && <hr style={{ border: 0, borderTop: '1px solid var(--color-border-subtle)', margin: 0 }} />}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

/* ---------- Figma `Related Reports Section` ---------- */
export type RelatedReport = { source: string; date: string; title: string; logo?: string };

export function RelatedReports({ items, viewAllLabel }: { items: RelatedReport[]; viewAllLabel: string }) {
  return (
    <Card pad={false} className="card--pad" style={{ paddingBottom: 0 }}>
      <div className="col" style={{ gap: 25 }}>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, lineHeight: '24px' }}>Related Reports</h3>
        <ul className="col" style={{ gap: 18 }}>
          {items.map((r, i) => (
            <li key={r.title} className="col" style={{ gap: 18 }}>
              {/* Broker as a chip, date as plain text under the heading —
                  matching Trending This Week on the report library. */}
              <a href="#" className="col" style={{ gap: 5 }}>
                <div className="row center" style={{ gap: 5 }}>
                  <Chip icon={<CompanyMark src={r.logo} alt={r.source} size={12} fallback={<Document size={12} />} />}>{r.source}</Chip>
                </div>
                <span style={{ fontSize: 18, lineHeight: '24px', padding: 5 }}>{r.title}</span>
                <span className="rail__date" style={{ paddingLeft: 5 }}>{r.date}</span>
              </a>
              {i < items.length - 1 && <hr style={{ border: 0, borderTop: '1px solid var(--color-border-subtle)', margin: 0 }} />}
            </li>
          ))}
        </ul>
        <a href="#" className="row center" style={{
          gap: 9, justifyContent: 'center', padding: '18px 0',
          borderTop: '1px solid var(--color-border-subtle)',
          fontSize: 16, color: 'var(--color-text-near-black)',
        }}>
          {viewAllLabel} <ArrowRight />
        </a>
      </div>
    </Card>
  );
}

/* ---------- Figma `Disclaimer Section` ---------- */
export function DisclaimerCard({ href = '#' }: { href?: string }) {
  return (
    <Card pad={false} className="card--pad-lg">
      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.49 }}>
        <strong>Disclaimer:</strong> This page summarizes third-party research and does not constitute
        investment advice. AskAnalyst is a data platform and does not provide investment recommendations.
        Please consult your financial advisor before making investment decisions.
      </p>
      <a href={href} style={{ display: 'inline-block', marginTop: 12, fontSize: 16, color: 'var(--color-text-link)' }}>
        Click here to read the full report
      </a>
    </Card>
  );
}

/* ---------- Figma `Explore Section` ---------- */
const EXPLORE = [
  { label: 'Financial Statement', icon: <Document size={20} /> },
  { label: 'AI Insights',         icon: <Sparkle size={20} /> },
  { label: 'Peer Comparison',     icon: <Compare size={20} /> },
  { label: 'Notes & Disclosures', icon: <Notes size={20} /> },
];

export function ExploreCTA({ heading }: { heading: string }) {
  return (
    <Card pad={false} className="card--pad-lg" style={{ background: 'var(--color-bg-brand-subtle)' }}>
      <div className="col" style={{ gap: 20 }}>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.49 }}>
          <strong style={{ fontSize: 20 }}>{heading}</strong><br />
          Access 20 years of financial data, AI insights from annual reports, and peer comparison tools.
        </p>
        <div className="col" style={{ gap: 9 }}>
          {EXPLORE.map((e) => (
            <a key={e.label} href="#" className="btn" style={{
              justifyContent: 'space-between', padding: '14px 13px', borderRadius: 10,
            }}>
              <span className="row center" style={{ gap: 4 }}>{e.icon}{e.label}</span>
              <ArrowRight />
            </a>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.49, color: 'var(--color-text-secondary)' }}>
          Free account required to access full financial data.
        </p>
      </div>
    </Card>
  );
}

/* ---------- Figma `Trading in PSX made easy!` promo ----------
   Artwork: Figma `Layer 2` / `iPhone 16 Wrapper`, 135x149 — rendered at 84 so the
   inline layout leaves the title enough width to break over two lines, not three.
   Artwork lives at public/logos/psx-app.svg (vector — scales to any size). */
export const PSX_APP_ART = '/logos/psx-app.svg';

export function TradingPromo({ image = PSX_APP_ART }: { image?: string }) {
  return (
    <CompanySidebarCard
      title="Trading in PSX made easy!"
      tags={['Trading', 'PSX']}
      cta={{ label: 'Download App', icon: <Download size={16} /> }}
      image={image}
      imageSize={84}
      layout="inline"
    />
  );
}


/* ---------- logo primitive ----------
   SVGs exported from the Figma file into /public/logos.
   Falls back to a neutral square when a mark is missing. */
export function CompanyMark({ src, alt, size = 30, fallback }: {
  src?: string; alt: string; size?: number; fallback?: React.ReactNode;
}) {
  if (!src) {
    return (
      <>{fallback ?? (
        <span aria-hidden style={{
          width: size, height: size, borderRadius: 6, flex: 'none',
          background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border-subtle)',
        }} />
      )}</>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ width: size, height: size, flex: 'none', display: 'block', objectFit: 'contain' }}
    />
  );
}
