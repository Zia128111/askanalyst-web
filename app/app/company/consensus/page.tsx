import * as React from 'react';
import { InsightsShell } from '@/components/insights/InsightsShell';
import { ConsensusBrowser } from '@/components/insights/InsightsFilters';
import * as D from '@/data/insights';

/* Figma `Company / Detail / Consensus` (4893:2059), extended to a list: one
   card per covered company, three at a time. */
export default function CompanyConsensusPage() {
  return (
    <InsightsShell tab="consensus" filters={false}>
      <ConsensusBrowser entries={D.consensusEntries} pageSize={3} />
    </InsightsShell>
  );
}
