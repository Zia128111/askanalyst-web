import * as React from 'react';
import { InsightsShell } from '@/components/insights/InsightsShell';
import { InsightsBrowser } from '@/components/insights/InsightsFilters';
import * as D from '@/data/insights';

/* Figma `Company / Detail / Reports` (4893:1800) — same card as Insights minus
   the Alert action. Three show at a time; View More pages through the rest. */
export default function CompanyReportsPage() {
  return (
    <InsightsShell tab="reports" filters={false}>
      <InsightsBrowser items={D.allReports} alert={false} pageSize={3} rollup="reports" />
    </InsightsShell>
  );
}
