'use client';

import * as React from 'react';
import { Card } from '../ui/Card';
import { ArrowRight, Book } from '../ui/Icon';
import { BrokerMark } from '../ui/BrokerMark';
import { CompanyArt } from '../ui/CompanyArt';
import { ReportTypeDonut } from './ReportTypeDonut';
import type { BrokerProfile, BrokerCallRow } from '@/data/broker';
import type { Call } from '@/data/insights';

const CALL_TONE: Record<Call, string> = {
  Buy: 'rating--positive', Hold: 'rating--warning', Sell: 'rating--negative',
};
const CALL_GLYPH: Record<Call, string> = { Buy: '↗', Hold: '—', Sell: '↘' };

/** How many rows each panel shows before `View more` is pressed. */
const CALLS_SHOWN = 3;
const COMPANIES_SHOWN = 3;

/** Figma `View All Reports` (4901:4482) — a bottom-ruled footer control that
 *  reveals the rest of the panel's rows in place. It deliberately does not link
 *  out: the only screen it could reach is the consensus view, which cannot be
 *  filtered to one house, so the link would show more than it promised. */
function RailMore({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="brail__foot">
      <button className="brail__more" type="button" onClick={onClick}>
        {label} <ArrowRight />
      </button>
    </div>
  );
}

function CallRow({ row }: { row: BrokerCallRow }) {
  return (
    <li className="brail__row">
      <CompanyArt src={row.logo} size={32} className="brail__logo" fallback={<Book size={26} />} />
      <span className="col brail__rowbody">
        <span className="brail__rowtitle">{row.company}</span>
        <span className="brail__rowmeta tabular">
          {row.symbol} · TP {row.target} · {row.revised}
        </span>
      </span>
      <span className={`rating ${CALL_TONE[row.call]} brail__call`}>
        {CALL_GLYPH[row.call]} {row.call}
      </span>
    </li>
  );
}

/** Figma `Coverage` (4896:4326): who this house is, how its calls split, and the
 *  most recently revised of them. */
function CoveragePanel({ profile }: { profile: BrokerProfile }) {
  const [all, setAll] = React.useState(false);
  const { Buy, Hold, Sell } = profile.callCounts;

  /* Newest revision first — `DD/MM/YYYY` needs reordering before it sorts. */
  const calls = React.useMemo(() => {
    const stamp = (d: string) => d.split('/').reverse().join('');
    return profile.calls.slice().sort((a, b) => stamp(b.revised).localeCompare(stamp(a.revised)));
  }, [profile.calls]);

  const shown = all ? calls : calls.slice(0, CALLS_SHOWN);
  const more = calls.length - shown.length;

  return (
    <Card pad={false} className="card--pad-lg brail">
      <div className="col" style={{ gap: 22 }}>
        <div className="col" style={{ gap: 7 }}>
          <div className="row center" style={{ gap: 18 }}>
            <BrokerMark name={profile.name} className="brail__mark" />
            {/* h3 to sit level with the other two rail panels — the page `h1`
                already carries this name. */}
            <h3 className="brail__name">{profile.name}</h3>
          </div>
          {calls.length > 0 ? (
            <div className="brail__calls">
              <span className="rating rating--positive">↗ Buy: {Buy}</span>
              <span className="rating rating--warning">— Hold: {Hold}</span>
              <span className="rating rating--negative">↘ Sell: {Sell}</span>
            </div>
          ) : (
            <p className="brail__empty">No ratings on file for this house.</p>
          )}
        </div>

        {shown.length > 0 && (
          <ul className="brail__list">
            {shown.map((row) => <CallRow key={`${row.symbol}-${row.revised}`} row={row} />)}
          </ul>
        )}
      </div>

      {more > 0 && <RailMore label={`View all ${calls.length} Calls`} onClick={() => setAll(true)} />}
    </Card>
  );
}

/** Figma `Companies Covered Wrapper` (4902:4965). */
function CompaniesPanel({ profile }: { profile: BrokerProfile }) {
  const [all, setAll] = React.useState(false);
  const shown = all ? profile.companies : profile.companies.slice(0, COMPANIES_SHOWN);
  const more = profile.companies.length - shown.length;

  return (
    <Card pad={false} className="card--pad-lg brail">
      <div className="col" style={{ gap: 8 }}>
        <h3 className="brail__title">Companies Covered</h3>
        {shown.length === 0
          ? <p className="brail__empty">No single-company reports on file.</p>
          : (
            <ul className="brail__companies">
              {shown.map((c) => (
                <li key={c.ticker} className="brail__company">
                  <span className="brail__companyname">{c.name}</span>
                  <span className="rating rating--neutral">
                    {c.count} Report{c.count === 1 ? '' : 's'}
                  </span>
                </li>
              ))}
            </ul>
          )}
      </div>
      {more > 0 && <RailMore label="View more" onClick={() => setAll(true)} />}
    </Card>
  );
}

/** Figma `Frame 41161` (4902:5011). */
function ReportTypePanel({ profile }: { profile: BrokerProfile }) {
  return (
    <Card pad={false} className="card--pad-lg brail">
      <div className="col" style={{ gap: 20 }}>
        <h3 className="brail__title">Report Type</h3>
        <ReportTypeDonut types={profile.types} />
      </div>
    </Card>
  );
}

/** Figma `Akd Securities Wrapper 7` (4902:5191) — the whole right rail. */
export function BrokerRail({ profile }: { profile: BrokerProfile }) {
  return (
    <>
      <CoveragePanel profile={profile} />
      <CompaniesPanel profile={profile} />
      <ReportTypePanel profile={profile} />
    </>
  );
}
