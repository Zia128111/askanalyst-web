import * as React from 'react';
import { PageShell } from '../layout/PageShell';
import { Sparkle } from '../ui/Icon';
import { StandaloneFilterBar, type FilterState } from './InsightsFilters';

type FilterKey = keyof FilterState;
import * as D from '@/data/insights';

/** The four `Company / Detail / …` screens share everything above the tab body:
 *  hero banner, tab strip, company card and the filter row. */
export const INSIGHT_TABS = [
  { key: 'insights',  label: 'Insights',       href: '/company/insights' },
  { key: 'timeline',  label: 'Timeline',       href: '/company/timeline' },
  { key: 'reports',   label: 'Reports',        href: '/company/reports' },
  { key: 'consensus', label: 'Consensus View', href: '/company/consensus' },
];

export function InsightsShell({ tab, children, filters = true, omitFilters = [] }: {
  tab: string; children: React.ReactNode;
  /** Tabs that drive their own list render the filter row themselves. */
  filters?: boolean;
  /** Filter blocks this screen has no use for. */
  omitFilters?: FilterKey[];
}) {
  return (
    <PageShell navActive="AI Powered Insights">
      <div className="col" style={{ gap: 26 }}>
        <InsightsHero />

        <div className="col" style={{ gap: 26 }}>
          <InsightTabs active={tab} />
          {filters && <StandaloneFilterBar omit={omitFilters} />}
          {children}
        </div>
      </div>
    </PageShell>
  );
}

/** Figma `Insights Header Image` — the market sparkline sits behind at 15%. */
export function InsightsHero() {
  return (
    <section className="ihero">
      <img className="ihero__art" src="/logos/insights-hero-chart.png" alt="" aria-hidden />
      <div className="ihero__body">
        <h1 className="ihero__title">
          <Sparkle size={24} /> {D.hero.title}
        </h1>
        <p className="ihero__sub">{D.hero.subtitle}</p>
      </div>
      <span className="ihero__pill">
        <span className="ihero__dot" aria-hidden />
        {D.hero.pill}
      </span>
    </section>
  );
}

export function InsightTabs({ active }: { active: string }) {
  return (
    <div className="tabs" role="tablist" aria-label="Company detail views">
      {INSIGHT_TABS.map((t) => (
        <a key={t.key} className="tab" href={t.href} role="tab" aria-selected={t.key === active}>
          {t.label}
        </a>
      ))}
    </div>
  );
}
