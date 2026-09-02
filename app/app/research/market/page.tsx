import * as React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { SectionHeader } from '@/components/research/SectionHeader';
import { CompanySidebarCard, RelatedList, RelatedReports, DisclaimerCard, ExploreCTA, TradingPromo }
  from '@/components/research/Sidebar';
import { StockCard, Price, CommentaryBlock, Paragraph } from '@/components/research/StockCard';
import { Sidenote } from '@/components/research/Sidenote';
import { KeyLevelsTable } from '@/components/research/KeyLevelsTable';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Eye } from '@/components/ui/Icon';
import * as D from '@/data/market';

/* Figma: content column 1260 = left 955 + gap 16 + rail 289.
   The right rail starts level with the title (Sidebar x=971 = 955+16). */
export default function MarketResearchPage() {
  return (
    <PageShell navActive="Research Report">
      <div className="layout">

        {/* ── left column: 955 at the 1260 breakpoint, fluid below ── */}
        <div className="layout__main col" style={{ gap: 8 }}>
          <SectionHeader {...D.meta} />

          <div className="col" style={{ gap: 23, marginTop: 7 }}>
            <Card pad={false} className="card--pad-lg">
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.49 }}>
                <strong style={{ fontSize: 28 }}>AI Insights</strong><br />
                {D.aiInsight}
              </p>
            </Card>

            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, lineHeight: '20.8px' }}>INDEX OVERVIEW</h2>

            <StockCard
              name="KSE-100 Index"
              price={<span style={{ fontSize: 20 }}>153,866</span>}
              badge={
                <div className="row between center" style={{ flex: 1 }}>
                  <Badge tone="negative">Downward Cyclical Shift</Badge>
                  <Badge tone="negative">-3,629</Badge>
                </div>
              }
            >
              <CommentaryBlock label="What Happened">
                <Paragraph notes={D.kseNoteRefs}>{D.kseWhatHappened}</Paragraph>
                <div className="col" style={{ gap: 7, marginTop: 7 }}>
                  <Sidenote index={1} term={D.sidenotes.wema.term}>{D.sidenotes.wema.body}</Sidenote>
                  <Sidenote index={2} term={D.sidenotes.resistance.term}>{D.sidenotes.resistance.body}</Sidenote>
                  <Sidenote index={3} term={D.sidenotes.support.term}>{D.sidenotes.support.body}</Sidenote>
                </div>
              </CommentaryBlock>

              <CommentaryBlock label="Key levels">
                {D.kseKeyLevels.map((p, i) => <Paragraph key={i} notes={D.kseNoteRefs}>{p}</Paragraph>)}
                <div style={{ marginTop: 7 }}>
                  <Sidenote index={4} term={D.sidenotes.retracement.term}>{D.sidenotes.retracement.body}</Sidenote>
                </div>
                <div style={{ marginTop: 12 }}>
                  <KeyLevelsTable rows={D.levelRows} />
                </div>
              </CommentaryBlock>
            </StockCard>

            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, lineHeight: '20.8px' }}>Individual Stocks</h2>

            {D.stocks.map((s) => (
              <StockCard
                key={s.name}
                name={s.name}
                price={<Price amount={s.price} />}
                badge={<Badge tone={s.badge.tone}>{s.badge.label}</Badge>}
              >
                <CommentaryBlock label="Analyst view">
                  {s.view.map((para, i) => <Paragraph key={i} notes={s.notes}>{para}</Paragraph>)}

                  <div className="col" style={{ gap: 7, marginTop: 7 }}>
                    {s.notes.map((n) => (
                      <Sidenote key={n.index} index={n.index} term={n.term}>{n.body}</Sidenote>
                    ))}
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <KeyLevelsTable rows={s.levels} />
                  </div>
                </CommentaryBlock>
              </StockCard>
            ))}
          </div>
        </div>

        {/* ── right rail: 289 beside the article, full width below 1024 ── */}
        <aside className="layout__rail col" style={{ gap: 16 }}>
          <CompanySidebarCard
            title="Market"
            tags={['Pakistan']}
            cta={{ label: 'View Market Profile', icon: <Eye size={16} /> }}
            image="/logos/market.svg"
            imageSize={84}
            layout="inline"
          />
          <TradingPromo />
          <RelatedList title="More Technical Reports" items={D.relatedTechnical} />
          <RelatedReports items={D.relatedReports} viewAllLabel="View all LUCK Research" />
          <DisclaimerCard />
          <ExploreCTA heading="Explore detailed reports on AskAnalyst" />
        </aside>
      </div>
    </PageShell>
  );
}
