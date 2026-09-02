import * as React from 'react';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Badge';
import { ArrowRight } from '../ui/Icon';
import { BrokerMark } from '../ui/BrokerMark';
import { ExploreCTA } from '../research/Sidebar';
import { longDate } from './ReportCard';
import * as R from '@/data/reports';

/** Right rail for the research library — mirrors the detail page's rail so the
 *  list and the report it opens read as one screen. */
export function ReportsRail() {
  return (
    <>
      <Card>
        <div className="col" style={{ gap: 20 }}>
          <h3 className="rail__title">Trending This Week</h3>
          <ol className="col rail__list" style={{ gap: 18, listStyle: 'none', margin: 0 }}>
            {R.trending.map((r, i) => (
              <li key={r.id} className="rail__row">
                <span className="rail__rank" aria-hidden>{i + 1}</span>
                {/* Broker as a chip above the title, as on the detail screen;
                    the date sits under the heading as plain text. */}
                <span className="col" style={{ gap: 6, minWidth: 0 }}>
                  <span className="row center rail__chips" style={{ gap: 5 }}>
                    <Chip icon={<BrokerMark name={r.broker} />}>{r.broker}</Chip>
                  </span>
                  {r.href
                    ? <a className="rail__link" href={r.href}>{r.title}</a>
                    : <span className="rail__link rail__link--plain">{r.title}</span>}
                  <span className="rail__date">{longDate(r.date)}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Card>

      <Card>
        <div className="col" style={{ gap: 20 }}>
          <h3 className="rail__title">Top Brokers</h3>
          <ul className="col rail__list" style={{ gap: 12, listStyle: 'none', margin: 0 }}>
            {R.topBrokers.slice(0, 6).map((b) => (
              <li key={b.broker} className="rail__between">
                <span className="row center" style={{ gap: 9, minWidth: 0 }}>
                  <BrokerMark name={b.broker} className="rail__mark" />
                  <span className="rail__name">{b.broker}</span>
                </span>
                <Chip>{b.count}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Card>
        <div className="col" style={{ gap: 20 }}>
          <h3 className="rail__title">Browse by Sector</h3>
          <div className="rail__sectors">
            {R.sectorCounts.map((s) => (
              <span key={s.sector} className="rail__sector">
                {s.sector} <em>{s.count}</em>
              </span>
            ))}
          </div>
          <a className="rail__all" href="#">All sectors <ArrowRight /></a>
        </div>
      </Card>

      <ExploreCTA heading="Explore detailed reports on AskAnalyst" />
    </>
  );
}
