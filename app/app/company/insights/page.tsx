import * as React from 'react';
import { InsightsShell } from '@/components/insights/InsightsShell';
import { InsightsBrowser } from '@/components/insights/InsightsFilters';
import * as D from '@/data/insights';

/* Figma `Company / Detail / Insight` (4812:2592). */
export default function CompanyInsightsPage() {
  return (
    <InsightsShell tab="insights" filters={false}>
      <InsightsBrowser items={D.insights} />
    </InsightsShell>
  );
}
