/* Research report library — the listing behind the `Research Report` nav item.
   The first entry is the real screen at /research/market (Figma
   `Research / Detail / Market`); everything else is PLACEHOLDER FILL so the
   filters, sort, grouping and paging have something to work on. Replace the
   placeholder block wholesale when a real report feed exists. */

export type Rating = 'Buy' | 'Hold' | 'Sell';

export type Report = {
  id: string;
  title: string;
  type: string;
  sector: string;
  broker: string;
  analyst: string;
  /** ISO date; the feed sorts and groups on this. */
  date: string;
  pages: number;
  /** PSX tickers the report covers. */
  companies: string[];
  rating?: Rating;
  target?: string;
  /** Implied upside in %, positive or negative. */
  upside?: number;
  summary: string;
  /** Set only where a detail screen exists. */
  href?: string;
  reads: number;
};

export const reportTypes = [
  'Weekly Technical', 'Result Preview', 'Result Review',
  'Initiation', 'Sector Report', 'Economy', 'Analyst Briefing',
];

export const sectors = [
  'Cement', 'Banks', 'E&P', 'Fertilizer', 'Power', 'Autos',
  'Technology', 'Oil Marketing', 'Macro',
];

export const ratings: Rating[] = ['Buy', 'Hold', 'Sell'];

export const sortOptions = [
  { value: 'newest',  label: 'Newest first' },
  { value: 'oldest',  label: 'Oldest first' },
  { value: 'reads',   label: 'Most read' },
  { value: 'upside',  label: 'Highest upside' },
];

export const reports: Report[] = [
  /* ── the one screen that exists ── */
  {
    id: 'weekly-pakistan-technicals',
    title: 'Weekly Report | Pakistan Technicals',
    type: 'Weekly Technical',
    sector: 'Macro',
    broker: 'Alpha Capital Pvt. Ltd.',
    analyst: 'Ahmed Khan',
    date: '2025-03-15',
    pages: 24,
    companies: ['KSE100', 'ATRL', 'ENGROH', 'DGKC'],
    summary:
      'First cyclical shift below the 40-wema on the KSE-100 since July 2023, with support ' +
      'mapped at 146,315 and key levels set out for ATRL, ENGROH and DGKC.',
    href: '/research/market',
    reads: 4820,
  },

  {
    id: 'kohc-2qfy26-results-review',
    title: 'KOHC: 2QFY26 Results Review',
    type: 'Result Review',
    sector: 'Cement',
    broker: 'Alpha Capital Pvt. Ltd.',
    analyst: 'Hassan Raza',
    date: '2025-10-24',
    pages: 24,
    companies: ['KOHC'],
    rating: 'Hold',
    target: '124',
    upside: 32,
    summary:
      'EPS clocks in at PKR 2.82, down 21% YoY. Gross margins compressed 10ppts on higher royalty ' +
      'and energy cost; Hold maintained on a Dec-26 target of PKR 124/share.',
    href: '/research/company',
    reads: 4110,
  },

  /* ── placeholder library ── */
  {
    id: 'luck-2qfy26-preview', title: 'Lucky Cement: Result Preview 2QFY26',
    type: 'Result Preview', sector: 'Cement', broker: 'AKD Securities',
    analyst: 'Research Team', date: '2025-03-14', pages: 8, companies: ['LUCK'],
    rating: 'Buy', target: '1,050', upside: 30,
    summary: 'Placeholder entry. PAT expected at PKR 8,624mn for the quarter, up 18.5% YoY.',
    reads: 3110,
  },
  {
    id: 'cement-demand-recovery', title: 'Cement Sector: Demand Recovery Ahead',
    type: 'Sector Report', sector: 'Cement', broker: 'Arif Habib Limited',
    analyst: 'Research Team', date: '2025-03-12', pages: 16, companies: ['LUCK', 'DGKC', 'MLCF', 'FCCL'],
    summary: 'Placeholder entry. North-region retention prices firm as dispatches stabilise.',
    reads: 2740,
  },
  {
    id: 'ogdc-initiation', title: 'OGDC: Initiating Coverage with Buy',
    type: 'Initiation', sector: 'E&P', broker: 'Topline Securities',
    analyst: 'Research Team', date: '2025-03-10', pages: 32, companies: ['OGDC'],
    rating: 'Buy', target: '245', upside: 22,
    summary: 'Placeholder entry. Coverage opened on reserve replacement and circular-debt easing.',
    reads: 2590,
  },
  {
    id: 'banks-margin-outlook', title: 'Banks: Margin Outlook After the Cut',
    type: 'Sector Report', sector: 'Banks', broker: 'JS Global',
    analyst: 'Research Team', date: '2025-03-08', pages: 21, companies: ['HBL', 'UBL', 'MCB', 'MEBL'],
    summary: 'Placeholder entry. Asset repricing lags deposits, compressing spreads into 2H.',
    reads: 3480,
  },
  {
    id: 'hbl-result-review', title: 'HBL: Result Review — Beat on Provisions',
    type: 'Result Review', sector: 'Banks', broker: 'AKD Securities',
    analyst: 'Research Team', date: '2025-03-06', pages: 9, companies: ['HBL'],
    rating: 'Buy', target: '178', upside: 18,
    summary: 'Placeholder entry. Lower provisioning carried the quarter; NII broadly in line.',
    reads: 1920,
  },
  {
    id: 'engroh-briefing', title: 'Engro Holdings: Analyst Briefing Takeaways',
    type: 'Analyst Briefing', sector: 'Fertilizer', broker: 'Topline Securities',
    analyst: 'Research Team', date: '2025-03-04', pages: 6, companies: ['ENGROH'],
    rating: 'Hold', target: '288', upside: 6,
    summary: 'Placeholder entry. Management guided to flat urea offtake with better gas availability.',
    reads: 1480,
  },
  {
    id: 'macro-inflation-march', title: 'Economy: Inflation Prints Below Consensus',
    type: 'Economy', sector: 'Macro', broker: 'Arif Habib Limited',
    analyst: 'Research Team', date: '2025-03-02', pages: 12, companies: [],
    summary: 'Placeholder entry. Headline CPI eased, opening room for a further policy cut.',
    reads: 5210,
  },
  {
    id: 'dgkc-preview', title: 'D.G. Khan Cement: Result Preview',
    type: 'Result Preview', sector: 'Cement', broker: 'JS Global',
    analyst: 'Research Team', date: '2025-02-27', pages: 7, companies: ['DGKC'],
    rating: 'Hold', target: '182', upside: 9,
    summary: 'Placeholder entry. Coal costs still the swing factor on gross margin.',
    reads: 1240,
  },
  {
    id: 'hubc-power', title: 'Hub Power: Cash Flows and the Payout Question',
    type: 'Result Review', sector: 'Power', broker: 'Alpha Capital Pvt. Ltd.',
    analyst: 'Research Team', date: '2025-02-25', pages: 14, companies: ['HUBC'],
    rating: 'Buy', target: '196', upside: 27,
    summary: 'Placeholder entry. Receivable recoveries underpin the dividend case.',
    reads: 2080,
  },
  {
    id: 'sys-tech-initiation', title: 'Systems Limited: Initiating with Hold',
    type: 'Initiation', sector: 'Technology', broker: 'BMA Capital',
    analyst: 'Research Team', date: '2025-02-21', pages: 28, companies: ['SYS'],
    rating: 'Hold', target: '420', upside: 4,
    summary: 'Placeholder entry. Growth intact but the multiple already reflects it.',
    reads: 1660,
  },
  {
    id: 'psx-weekly-feb-3', title: 'Weekly Report | Pakistan Technicals',
    type: 'Weekly Technical', sector: 'Macro', broker: 'Alpha Capital Pvt. Ltd.',
    analyst: 'Ahmed Khan', date: '2025-02-19', pages: 22, companies: ['KSE100'],
    summary: 'Placeholder entry. Index held the 40-wema through the week on thinner volume.',
    reads: 3960,
  },
  {
    id: 'indu-autos', title: 'Indus Motor: Volumes Turn the Corner',
    type: 'Result Review', sector: 'Autos', broker: 'Next Capital',
    analyst: 'Research Team', date: '2025-02-17', pages: 11, companies: ['INDU'],
    rating: 'Buy', target: '2,150', upside: 16,
    summary: 'Placeholder entry. Order backlog rebuilt as financing rates fell.',
    reads: 1130,
  },
  {
    id: 'pso-oms', title: 'PSO: Margin Reset in Oil Marketing',
    type: 'Sector Report', sector: 'Oil Marketing', broker: 'Optimus Capital',
    analyst: 'Research Team', date: '2025-02-13', pages: 18, companies: ['PSO', 'APL'],
    rating: 'Hold', target: '385', upside: 3,
    summary: 'Placeholder entry. OMC margins revised, inventory gains unlikely to repeat.',
    reads: 990,
  },
  {
    id: 'mlcf-preview', title: 'Maple Leaf Cement: Result Preview',
    type: 'Result Preview', sector: 'Cement', broker: 'Arif Habib Limited',
    analyst: 'Research Team', date: '2025-02-11', pages: 6, companies: ['MLCF'],
    rating: 'Buy', target: '96', upside: 19,
    summary: 'Placeholder entry. Efficiency gains from the new line flow through this quarter.',
    reads: 1410,
  },
  {
    id: 'ffc-fertilizer', title: 'Fauji Fertilizer: Payout Sustainability',
    type: 'Result Review', sector: 'Fertilizer', broker: 'Foundation Securities',
    analyst: 'Research Team', date: '2025-02-07', pages: 13, companies: ['FFC'],
    rating: 'Buy', target: '452', upside: 21,
    summary: 'Placeholder entry. Cash generation supports the payout through the cycle.',
    reads: 1780,
  },
  {
    id: 'macro-external', title: 'Economy: External Account Holds Up',
    type: 'Economy', sector: 'Macro', broker: 'Topline Securities',
    analyst: 'Research Team', date: '2025-02-05', pages: 15, companies: [],
    summary: 'Placeholder entry. Remittances and a narrower trade gap keep reserves building.',
    reads: 4370,
  },
  {
    id: 'chcc-briefing', title: 'Cherat Cement: Analyst Briefing Takeaways',
    type: 'Analyst Briefing', sector: 'Cement', broker: 'AKD Securities',
    analyst: 'Research Team', date: '2025-01-30', pages: 5, companies: ['CHCC'],
    rating: 'Buy', target: '272', upside: 24,
    summary: 'Placeholder entry. Utilisation guided higher on the back of export orders.',
    reads: 860,
  },
  {
    id: 'fccl-downgrade', title: 'Fauji Cement: Downgrade to Sell',
    type: 'Result Review', sector: 'Cement', broker: 'BMA Capital',
    analyst: 'Research Team', date: '2025-01-24', pages: 10, companies: ['FCCL'],
    rating: 'Sell', target: '27', upside: -12,
    summary: 'Placeholder entry. Valuation ran ahead of a softening margin outlook.',
    reads: 1520,
  },
  {
    id: 'banks-initiation-mebl', title: 'Meezan Bank: Initiating with Buy',
    type: 'Initiation', sector: 'Banks', broker: 'JS Global',
    analyst: 'Research Team', date: '2025-01-20', pages: 34, companies: ['MEBL'],
    rating: 'Buy', target: '318', upside: 25,
    summary: 'Placeholder entry. Deposit franchise and fee income drive the coverage case.',
    reads: 2960,
  },
];

/* ── right rail ── */

export const trending = reports
  .slice()
  .sort((a, b) => b.reads - a.reads)
  .slice(0, 5);

/** Report count per house, biggest first. */
export const topBrokers = Object.entries(
  reports.reduce<Record<string, number>>((acc, r) => {
    acc[r.broker] = (acc[r.broker] ?? 0) + 1;
    return acc;
  }, {}),
)
  .map(([broker, count]) => ({ broker, count }))
  .sort((a, b) => b.count - a.count);

/** Report count per sector, biggest first. */
export const sectorCounts = Object.entries(
  reports.reduce<Record<string, number>>((acc, r) => {
    acc[r.sector] = (acc[r.sector] ?? 0) + 1;
    return acc;
  }, {}),
)
  .map(([sector, count]) => ({ sector, count }))
  .sort((a, b) => b.count - a.count);

export const brokers = Array.from(new Set(reports.map((r) => r.broker))).sort();

export const hero = {
  title: 'Research Reports',
  subtitle: 'Every sell-side report on PSX names, filed and searchable in one place',
};
