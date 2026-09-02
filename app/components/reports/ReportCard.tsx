import * as React from 'react';
import { RatingPill } from '../insights/InsightCard';
import { BrokerMark } from '../ui/BrokerMark';
import { Download, Document } from '../ui/Icon';
import { ShareButton } from '../ui/ShareDialog';
import type { Report, Rating } from '@/data/reports';

const RATING_TONE: Record<Rating, string> = {
  Buy: 'rating--positive', Hold: 'rating--warning', Sell: 'rating--negative',
};
const RATING_GLYPH: Record<Rating, string> = { Buy: '↗', Hold: '—', Sell: '↘' };

/** `2025-03-15` -> `15 Mar 2025`. */
export function longDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

/** One row of the research library. Built on the `.icard` shell so it sits in
 *  the same family as the insight and report cards on the company screens. */
export function ReportCard({ report }: { report: Report }) {
  const { rating, upside } = report;

  return (
    <article className="icard rcard">
      <div className="icard__meta">
        <div className="icard__pills">
          <RatingPill tone="rating--brand" mark={<Document size={12} />}>{report.type}</RatingPill>
          <RatingPill tone="rating--neutral" mark={<BrokerMark name={report.broker} />}>
            {report.broker}
          </RatingPill>
          {rating && (
            <RatingPill tone={RATING_TONE[rating]}>{RATING_GLYPH[rating]} {rating}</RatingPill>
          )}
        </div>
        <span className="icard__source">{longDate(report.date)} · {report.pages} pages</span>
      </div>

      <div className="col">
        {report.href
          ? <h3 className="icard__title"><a className="rcard__link" href={report.href}>{report.title}</a></h3>
          : <h3 className="icard__title">{report.title}</h3>}
        <p className="icard__summary">{report.summary}</p>
      </div>

      <div className="icard__foot">
        <div className="rcard__meta">
          {report.companies.length > 0 && (
            <span className="rcard__tickers">
              {report.companies.map((c) => <span key={c} className="rcard__ticker">{c}</span>)}
            </span>
          )}
          <span className="rcard__by">{report.sector} · {report.analyst}</span>
          {rating && report.target && (
            <span className="rcard__target tabular">
              TP {report.target}
              {typeof upside === 'number' && (
                <em className={upside >= 0 ? 'rcard__up' : 'rcard__down'}>
                  {upside >= 0 ? '+' : ''}{upside}%
                </em>
              )}
            </span>
          )}
        </div>

        <div className="icard__actions">
          <button className="iaction" type="button"><Download size={20} /> PDF</button>
          <ShareButton title={report.title} url={report.href} variant="action" />
          {report.href && (
            <a className="iaction" href={report.href}><Document size={20} /> Open</a>
          )}
        </div>
      </div>
    </article>
  );
}
