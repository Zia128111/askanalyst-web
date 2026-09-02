import * as React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { SectionHeader } from '@/components/research/SectionHeader';
import { CompanySidebarCard, RelatedList, RelatedReports, DisclaimerCard, ExploreCTA, TradingPromo }
  from '@/components/research/Sidebar';
import { StockCard, CommentaryBlock, Paragraph } from '@/components/research/StockCard';
import { Sidenote } from '@/components/research/Sidenote';
import { KeyDataTable, FinancialTable } from '@/components/research/ResultTables';
import { Card } from '@/components/ui/Card';
import { Eye } from '@/components/ui/Icon';
import * as D from '@/data/company-report';

/* Figma `Research / Detail / Company` (4805:1362) — the KOHC results review.
   Same 1260 column as the market screen: article 955 + gap 16 + rail 289. */
export default function CompanyReportPage() {
  return (
    <PageShell navActive="Research Report">
      <div className="layout">

        <div className="layout__main col" style={{ gap: 8 }}>
          <SectionHeader
            title={D.meta.title}
            subtitle={D.meta.subtitle}
            analyst={D.meta.analyst}
            date={D.meta.date}
            pages={D.meta.pages}
            broker={D.meta.broker}
          />

          <div className="col" style={{ gap: 23, marginTop: 7 }}>
            <Card pad={false} className="card--pad-lg">
              <div className="col" style={{ gap: 12 }}>
                <strong style={{ fontSize: 28, lineHeight: 1.2 }}>AI Insights</strong>
                {D.aiInsights.map((p, i) => (
                  <p key={i} style={{ margin: 0, fontSize: 16, lineHeight: 1.49 }}>{p}</p>
                ))}
              </div>
            </Card>

            <StockCard
              name={D.company.name}
              price={<span style={{ fontSize: 20 }}>{D.company.price}</span>}
              badge={<span className="rating rating--positive">{D.company.rating}</span>}
            >
              <KeyDataTable rows={D.keyData} />

              <CommentaryBlock label="Quarterly Results">
                <Paragraph notes={D.noteRefs}>{D.quarterlyResults[0]}</Paragraph>
                <div style={{ marginTop: 7 }}>
                  <Sidenote index={1} term={D.sidenotes.eps.term}>{D.sidenotes.eps.body}</Sidenote>
                </div>
                <div style={{ marginTop: 7 }}>
                  <Paragraph notes={D.noteRefs}>{D.quarterlyResults[1]}</Paragraph>
                </div>
              </CommentaryBlock>

              <CommentaryBlock label="Margin Compression">
                <Paragraph notes={D.noteRefs}>{D.marginCompression[0]}</Paragraph>
                <div style={{ marginTop: 7 }}>
                  <Sidenote index={2} term={D.sidenotes.grossMargins.term}>{D.sidenotes.grossMargins.body}</Sidenote>
                </div>
              </CommentaryBlock>

              <CommentaryBlock label="Other Income & Sequential Performance">
                {D.otherIncome.map((p, i) => <Paragraph key={i} notes={D.noteRefs}>{p}</Paragraph>)}
                <div style={{ marginTop: 12 }}>
                  <FinancialTable columns={D.financials.columns} rows={D.financials.rows} />
                </div>
                <p className="rtags">{D.tags}</p>
              </CommentaryBlock>
            </StockCard>
          </div>
        </div>

        <aside className="layout__rail col" style={{ gap: 16 }}>
          <CompanySidebarCard
            title={D.company.name}
            tags={D.company.chips}
            cta={{ label: 'View Company Profile', icon: <Eye size={16} /> }}
            image={D.company.logo}
            imageSize={64}
            layout="inline"
          />
          <TradingPromo />
          <RelatedList title="More from Cement Sector" items={D.relatedCement} />
          <RelatedReports items={D.relatedReports} viewAllLabel="View all KOHC Research" />
          <DisclaimerCard />
          <ExploreCTA heading={`Explore ${D.company.name} on AskAnalyst`} />
        </aside>
      </div>
    </PageShell>
  );
}
