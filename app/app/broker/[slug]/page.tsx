import * as React from 'react';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { ReportsBrowser } from '@/components/reports/ReportsBrowser';
import { BrokerHero, BrokerStats } from '@/components/broker/BrokerHero';
import { BrokerRail } from '@/components/broker/BrokerRail';
import { brokerProfile, brokerSlugs } from '@/data/broker';

/* Figma `Broker / Detail / Overview` (4902:4488). One page per house that has
   filed a report or made a call — the target of every broker name in the app.
   `output: 'export'` means these are all built at compile time. */

/* `output: 'export'` ships exactly these slugs; anything else never exists in
   the built site. `notFound()` below covers the same case for the dev server. */
export function generateStaticParams() {
  return brokerSlugs.map((slug) => ({ slug }));
}

export default function BrokerOverviewPage({ params }: { params: { slug: string } }) {
  const profile = brokerProfile(params.slug);
  if (!profile) notFound();

  return (
    <PageShell navActive="Research Report">
      <div className="col" style={{ gap: 27 }}>
        <BrokerHero profile={profile} />
        <BrokerStats profile={profile} />

        {/* Figma `Path 672` — the full-width rule under the stat row. */}
        <hr className="brule" />

        <div className="layout">
          <div className="layout__main col" style={{ gap: 8 }}>
            <h2 className="bsection">Reports</h2>
            <ReportsBrowser scope={profile.reports} pageSize={6} />
          </div>
          <aside className="layout__rail col" style={{ gap: 16 }}>
            <BrokerRail profile={profile} />
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
