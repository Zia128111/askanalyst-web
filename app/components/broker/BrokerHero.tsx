import * as React from 'react';
import { BrokerMark } from '../ui/BrokerMark';
import * as B from '@/data/broker';
import type { BrokerProfile } from '@/data/broker';

/** Figma `Insights Header Image` (4902:4511) with the broker's own mark in
 *  place of the sparkle — same shell as the insights and library heroes, so the
 *  three landing screens read as one family. */
export function BrokerHero({ profile }: { profile: BrokerProfile }) {
  return (
    <section className="ihero">
      <img className="ihero__art" src="/logos/insights-hero-chart.png" alt="" aria-hidden />
      <div className="ihero__body bhero__body">
        <BrokerMark name={profile.name} className="bhero__mark" />
        <div className="col">
          <h1 className="ihero__title">{profile.name}</h1>
          <p className="ihero__sub">{B.brokerHeroSubtitle}</p>
        </div>
      </div>
      <span className="ihero__pill">
        <span className="ihero__dot" aria-hidden />
        {B.brokerHeroPill}
      </span>
    </section>
  );
}

function StatBlock({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="bstat">
      <strong className="bstat__value">{value}</strong>
      <span className="bstat__label">{label}</span>
    </div>
  );
}

/** `8` -> `08`. Figma pads the two smaller counts; anything past 99 is left be. */
const pad = (n: number) => (n < 10 ? `0${n}` : String(n));

/** Figma `Frame 41146` (4902:4523) — four equal blocks across the content
 *  column. Every figure is counted from this house's own reports, so the row
 *  never disagrees with the list below it. */
export function BrokerStats({ profile }: { profile: BrokerProfile }) {
  const plural = (n: number, one: string) => `${n} New ${one}${n === 1 ? '' : 's'}`;

  return (
    <div className="bstats">
      <StatBlock value={pad(profile.totalReports)} label="Total Reports" />
      <StatBlock value={pad(profile.reportTypes)} label="Report Types" />
      <StatBlock value={pad(profile.companiesCovered)} label="Companies Covered" />
      <StatBlock
        value={`Last ${profile.recentDays}D`}
        label={plural(profile.recentReports, 'Report')}
      />
    </div>
  );
}
