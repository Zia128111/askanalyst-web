import * as React from 'react';

export type BadgeTone = 'positive' | 'negative' | 'warning' | 'info' | 'neutral' | 'brand';

export function Badge({ tone = 'neutral', children, icon }: {
  tone?: BadgeTone; children: React.ReactNode; icon?: React.ReactNode;
}) {
  return <span className={`badge badge--${tone}`}>{icon}{children}</span>;
}

/** Analyst sentiment — maps 1:1 to the Figma `Insight Rating` block. */
export function SentimentBadge({ value }: { value: 'Positive' | 'Negative' | 'Neutral' }) {
  const tone: BadgeTone = value === 'Positive' ? 'positive' : value === 'Negative' ? 'negative' : 'neutral';
  const glyph = value === 'Positive' ? '↗' : value === 'Negative' ? '↘' : '→';
  return <Badge tone={tone}>{glyph} {value}</Badge>;
}

export function Chip({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return <span className="chip">{icon}{children}</span>;
}
