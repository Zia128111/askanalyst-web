import * as React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { ReportsBrowser } from '@/components/reports/ReportsBrowser';
import { ReportsRail } from '@/components/reports/ReportsRail';
import { Sparkle } from '@/components/ui/Icon';
import * as R from '@/data/reports';

/* Research report library — the landing screen under the `Research Report` nav
   item. Cards open the detail screens; today only the weekly technical has one. */
export default function ResearchReportsPage() {
  return (
    <PageShell navActive="Research Report">
      <div className="col" style={{ gap: 26 }}>
        <section className="ihero">
          <img className="ihero__art" src="/logos/insights-hero-chart.png" alt="" aria-hidden />
          <div className="ihero__body">
            <h1 className="ihero__title"><Sparkle size={24} /> {R.hero.title}</h1>
            <p className="ihero__sub">{R.hero.subtitle}</p>
          </div>
          <span className="ihero__pill">
            <span className="ihero__dot" aria-hidden />
            {R.reports.length} reports · {R.brokers.length} brokers
          </span>
        </section>

        <div className="layout">
          <div className="layout__main col" style={{ gap: 8 }}>
            <ReportsBrowser pageSize={6} />
          </div>
          <aside className="layout__rail col" style={{ gap: 16 }}>
            <ReportsRail />
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
