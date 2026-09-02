import * as React from 'react';
import { Bell, Document } from '../ui/Icon';
import { ShareButton } from '../ui/ShareDialog';
import { BrokerMark } from '../ui/BrokerMark';
import type { Insight, Sentiment } from '@/data/insights';

/* Re-exported so the card family keeps a single import point. */
export { BrokerMark };

/** Where a card's `Source` action leads — the research detail screen. */
export const SOURCE_HREF = '/research/market';

const SENTIMENT_GLYPH: Record<Sentiment, string> = { Positive: '↗', Negative: '↘', Neutral: '—' };
const SENTIMENT_TONE: Record<Sentiment, string> = {
  Positive: 'rating--positive', Negative: 'rating--negative', Neutral: 'rating--neutral',
};

/** Figma `Insight Rating` pill. `mark` is the 12px glyph or broker logo. */
export function RatingPill({ tone, mark, children }: {
  tone: string; mark?: React.ReactNode; children: React.ReactNode;
}) {
  return <span className={`rating ${tone}`}>{mark}{children}</span>;
}

export function SentimentPill({ value }: { value: Sentiment }) {
  return (
    <span className={`rating ${SENTIMENT_TONE[value]}`}>
      {SENTIMENT_GLYPH[value]} {value}
    </span>
  );
}

/** Figma `Summary Text` — the card shared by the Insights and Reports tabs.
 *  Reports drops the Alert action, matching node 4893:1800. */
export function InsightCard({ item, alert = true }: { item: Insight; alert?: boolean }) {
  return (
    <article className="icard">
      <div className="icard__meta">
        <div className="icard__pills">
          <RatingPill tone="rating--brand" mark={<Document size={12} />}>{item.category}</RatingPill>
          <SentimentPill value={item.sentiment} />
          <RatingPill tone="rating--neutral" mark={<BrokerMark name={item.broker} />}>
            {item.broker}
          </RatingPill>
        </div>
        <span className="icard__source">{item.source}</span>
      </div>

      <div className="col">
        <h3 className="icard__title">{item.title}</h3>
        <p className="icard__summary">{item.summary}</p>
      </div>

      <div className="icard__foot">
        <span className="icard__tags">{item.tags.join(' ')}</span>
        <div className="icard__actions">
          {alert && (
            <button className="iaction" type="button"><Bell size={20} /> Alert</button>
          )}
          <ShareButton title={item.title} variant="action" />
          <a className="iaction" href={SOURCE_HREF}><Document size={20} /> Source</a>
        </div>
      </div>
    </article>
  );
}
