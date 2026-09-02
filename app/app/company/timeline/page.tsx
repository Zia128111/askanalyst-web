import * as React from 'react';
import { InsightsShell } from '@/components/insights/InsightsShell';
import { Timeline, PricePanel } from '@/components/insights/Timeline';

/* Figma `Company / Detail / Timeline` (4893:1531) — event rail left, price right.
   No keyword filter here — the rail is browsed by year, not by search. */
export default function CompanyTimelinePage() {
  return (
    <InsightsShell tab="timeline" omitFilters={['keyword']}>
      <div className="tlsplit">
        <div className="tlsplit__rail"><Timeline /></div>
        <div className="tlsplit__chart"><PricePanel /></div>
      </div>
    </InsightsShell>
  );
}
