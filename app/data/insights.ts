/* Content extracted verbatim from Figma `Company / Detail / Insight · Timeline ·
   Reports · Consensus` (nodes 4812:2592, 4893:1531, 4893:1800, 4893:2059). */

export type Sentiment = 'Positive' | 'Negative' | 'Neutral';

export const company = {
  name: 'Lucky Cement',
  symbol: 'LUCK',
  logo: '/logos/luck.svg',
  chips: ['AKD Securities', 'Risk Factor', 'Negative', '2025'],
};

export const hero = {
  title: 'AI-Powered Insights',
  subtitle: 'Key findings extracted from broker research reports using AI analysis',
  pill: 'Sell Side Research',
};

/* The `Frame 41152` filter row — presentational in Figma, no menus attached. */
export const filters = ['All Reports', 'LUCK', 'All Brokers', 'All Sentiments', 'Last 30 Days', '25 Results', 'Keyword'];

export type Insight = {
  /** PSX ticker this insight belongs to. Absent means the company in view —
     every entry today is LUCK. Set it once coverage spans more names. */
  symbol?: string;
  category: string;
  sentiment: Sentiment;
  broker: string;
  source: string;
  title: string;
  summary: string;
  tags: string[];
};

export const insights: Insight[] = [
  {
    category: 'Rating & Valuation',
    sentiment: 'Positive',
    broker: 'AKD Securities',
    source: 'Investment Thesis - p.2 2025-03-15',
    title: 'LUCK: Upgrade to Buy with 30% Upside',
    summary:
      'Analyst upgrades from Hold to Buy with revised TP of PKR 1,050, implying 30% upside. ' +
      'Valuation based on 8.5x FY26E EV/EBITDA, justified by capacity expansion and export growth.',
    tags: ['#valuation', '#upgrade', '#buy', '#cement'],
  },
  {
    category: 'Risk Factors',
    sentiment: 'Negative',
    broker: 'AKD Securities',
    source: 'Risk Factors - p.14 2025-03-15',
    title: 'LUCK: Regulatory Risk from New Carbon Tax',
    summary:
      'Proposed carbon tax of PKR 500/ton on cement could reduce EBITDA margins by 2.1pp if fully ' +
      'implemented. Management has not yet confirmed pass-through pricing ability.',
    tags: ['#carbon-tax', '#regulation', '#cement', '#margins'],
  },
  {
    category: 'Catalysts',
    sentiment: 'Neutral',
    broker: 'Topline Securities',
    source: 'Upcoming Events - p.1 2025-03-14',
    title: 'LUCK: Board Meeting on March 28 for Dividend',
    summary:
      'Board of Directors meeting scheduled for March 28 to consider interim dividend. Consensus ' +
      'expects PKR 12/share. Announcement could trigger short-term price movement.',
    tags: ['#dividend', '#board-meeting', '#cement'],
  },
];

export const reports: Insight[] = [
  {
    category: 'Rating & Valuation',
    sentiment: 'Positive',
    broker: 'AKD Securities',
    source: 'Investment Thesis - p.2 2025-03-15',
    title: 'Result Preview 2QFY26',
    summary:
      'Lucky Cement Limited is expected to report a PAT of PKR 8,624 million (EPS: PKR 5.9) for 2QFY26, ' +
      'marking an 18.5% YoY increase, with consolidated EPS at PKR 15.68.',
    tags: ['#valuation', '#upgrade', '#buy', '#cement'],
  },
  {
    category: 'Risk Factors',
    sentiment: 'Negative',
    broker: 'AKD Securities',
    source: 'Risk Factors - p.14 2025-03-15',
    title: 'Analyst Briefing 2QFY26 Highlights',
    summary:
      'Lucky Cement saw strong domestic growth and efficiency gains from renewables and UC3 tech, but ' +
      'exports and some segments faced pressure, with overall stability supported by solid pricing and cash reserves.',
    tags: ['#carbon-tax', '#regulation', '#cement', '#margins'],
  },
  {
    category: 'Catalysts',
    sentiment: 'Neutral',
    broker: 'Topline Securities',
    source: 'Upcoming Events - p.1 2025-03-14',
    title: '2QFY26 EPS at PkR 15.44/sh, up by 6/3% YoY/QoQ',
    summary:
      'Lucky Cement (LUCK) recorded consolidated earnings available to equity owners of PkR 22.6bn ' +
      '(EPS: PkR 15.44) in 2QFY26 compared to earnings of PkR 21.4bn in 2QFY25 (EPS: PkR 14.63). ' +
      'This takes 1HFY26 EPS to PkR 30.45, up 13% YoY. Consolidated earnings remained in line with our expectations.',
    tags: ['#dividend', '#board-meeting', '#cement'],
  },
];

/* Further pages of the Reports tab, revealed by `View More`. PLACEHOLDER FILL —
   the three above are the ones drawn in Figma (node 4893:1800). */
export const moreReports: Insight[] = [
  {
    category: 'Rating & Valuation', sentiment: 'Positive', broker: 'JS Global', source: 'Investment Thesis - p.4 2025-03-12',
    title: 'Valuation re-rating on capacity ramp',
    summary: 'Placeholder entry. Model rolled forward to FY27E with the South line at full utilisation.',
    tags: ['#valuation', '#capacity', '#cement'],
  },
  {
    category: 'Catalysts', sentiment: 'Neutral', broker: 'Arif Habib Limited', source: 'Upcoming Events - p.2 2025-03-11',
    title: 'Cement dispatches due mid-month',
    summary: 'Placeholder entry. Monthly APCMA dispatch numbers are the next scheduled data point.',
    tags: ['#dispatches', '#cement', '#data'],
  },
  {
    category: 'Risk Factors', sentiment: 'Negative', broker: 'Topline Securities', source: 'Risk Factors - p.9 2025-03-10',
    title: 'Coal price sensitivity revisited',
    summary: 'Placeholder entry. A 10% move in imported coal shifts gross margin by roughly 1.4pp.',
    tags: ['#coal', '#margins', '#cement'],
  },
  {
    category: 'Rating & Valuation', sentiment: 'Neutral', broker: 'AKD Securities', source: 'Investment Thesis - p.6 2025-03-08',
    title: 'Peer comparison across the north',
    summary: 'Placeholder entry. Relative multiples reviewed against the northern cement peer set.',
    tags: ['#valuation', '#peers', '#cement'],
  },
  {
    category: 'Catalysts', sentiment: 'Positive', broker: 'JS Global', source: 'Upcoming Events - p.3 2025-03-06',
    title: 'Export order book commentary',
    summary: 'Placeholder entry. Management flagged a firmer order book on Central Asian routes.',
    tags: ['#exports', '#cement', '#orders'],
  },
  {
    category: 'Risk Factors', sentiment: 'Negative', broker: 'Arif Habib Limited', source: 'Risk Factors - p.11 2025-03-04',
    title: 'PKR volatility on imported inputs',
    summary: 'Placeholder entry. Currency moves continue to feed through to landed input costs.',
    tags: ['#currency', '#margins', '#cement'],
  },
];

/** Everything the Reports tab can page through. */
export const allReports: Insight[] = [...reports, ...moreReports];

/* ── Timeline tab ── */

export const timelineYears = [
  '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026',
];

export type TimelineEvent = {
  /** PSX ticker; absent means the company in view. */
  symbol?: string;
  /** `DD-MM-YYYY`; the year drives which rail entry the event belongs to. */
  date: string;
  broker: string;
  sentiment: Sentiment;
  title: string;
  body: string;
};

/* The two 2025 entries are the ones drawn in Figma (node 4893:1531). Everything
   else is PLACEHOLDER FILL so each year on the rail has something to open —
   replace wholesale when real coverage history is wired in. */
export const timelineEvents: TimelineEvent[] = [
  {
    date: '04-06-2026', broker: 'JS Global',
    sentiment: 'Positive',
    title: 'Target price revised to 465',
    body: 'Placeholder entry. Last revision on record, matching the consensus table.',
  },
  {
    date: '17-02-2026', broker: 'AKD Securities',
    sentiment: 'Neutral',
    title: 'Rating held at Hold',
    body: 'Placeholder entry. View unchanged pending the next capacity update.',
  },
  {
    date: '15-03-2025',
    broker: 'AKD Securities',
    sentiment: 'Positive',
    title: 'LUCK: Upgrade to Buy with 30% Upside',
    body:
      'Analyst upgrades from Hold to Buy with revised TP of PKR 1,050, implying 30% upside. ' +
      'Valuation based on 8.5x FY26E EV/EBITDA, justified by capacity expansion and export growth.',
  },
  {
    date: '15-03-2025',
    broker: 'AKD Securities',
    sentiment: 'Positive',
    title: 'Regulatory Risk from New Carbon Tax',
    body:
      'Proposed carbon tax of PKR 500/ton on cement could reduce EBITDA margins by 2.1pp if fully ' +
      'implemented. Management has not yet confirmed pass-through pricing ability.',
  },

  /* ── placeholder history ── */
  {
    date: '28-02-2025', broker: 'Topline Securities',
    sentiment: 'Neutral',
    title: 'Interim dividend expectation held',
    body: 'Placeholder entry. Payout assumption unchanged ahead of the March board meeting.',
  },
  {
    date: '11-02-2025', broker: 'JS Global',
    sentiment: 'Positive',
    title: 'Retention prices firm in the north',
    body: 'Placeholder entry. Regional pricing held through the quarter despite softer dispatches.',
  },
  {
    date: '24-01-2025', broker: 'AKD Securities',
    sentiment: 'Negative',
    title: 'Export volumes trimmed on freight costs',
    body: 'Placeholder entry. Higher outbound freight weighed on the export estimate for the year.',
  },
  {
    date: '09-01-2025', broker: 'Topline Securities',
    sentiment: 'Positive',
    title: 'Target price raised after capacity review',
    body: 'Placeholder entry. Revised model reflects the commissioned South line running at rate.',
  },
  {
    date: '18-12-2024', broker: 'JS Global',
    sentiment: 'Neutral',
    title: 'Coverage transferred to new analyst',
    body: 'Placeholder entry. Rating and target carried over unchanged at handover.',
  },
  {
    date: '20-11-2024', broker: 'Topline Securities',
    sentiment: 'Neutral',
    title: 'Coverage maintained at Hold',
    body: 'Placeholder entry. Target price left unchanged pending clarity on export volumes.',
  },
  {
    date: '02-05-2024', broker: 'JS Global',
    sentiment: 'Positive',
    title: 'Capacity expansion on track',
    body: 'Placeholder entry. Greenfield line commissioning reported on schedule.',
  },
  {
    date: '14-09-2023', broker: 'AKD Securities',
    sentiment: 'Negative',
    title: 'Margin pressure from coal costs',
    body: 'Placeholder entry. Imported coal prices weighed on gross margin during the quarter.',
  },
  {
    date: '08-02-2023', broker: 'Topline Securities',
    sentiment: 'Neutral',
    title: 'Sector view unchanged',
    body: 'Placeholder entry. Demand outlook held flat across the cement complex.',
  },
  {
    date: '17-06-2022', broker: 'JS Global',
    sentiment: 'Positive',
    title: 'Export volumes ahead of estimate',
    body: 'Placeholder entry. Central Asian shipments outpaced the prior forecast.',
  },
  {
    date: '11-10-2021', broker: 'AKD Securities',
    sentiment: 'Positive',
    title: 'Initiating coverage with Buy',
    body: 'Placeholder entry. Coverage opened on capacity and cost-efficiency thesis.',
  },
  {
    date: '23-04-2020', broker: 'Topline Securities',
    sentiment: 'Negative',
    title: 'Estimates cut on demand slowdown',
    body: 'Placeholder entry. Construction activity slowed sharply during the period.',
  },
  {
    date: '30-07-2019', broker: 'JS Global',
    sentiment: 'Neutral',
    title: 'Result in line with expectations',
    body: 'Placeholder entry. Earnings landed within the forecast range.',
  },
  {
    date: '05-05-2017', broker: 'Topline Securities',
    sentiment: 'Neutral',
    title: 'Sector initiation — cement',
    body: 'Placeholder entry. Coverage opened across the cement complex.',
  },
  {
    date: '19-09-2016', broker: 'JS Global',
    sentiment: 'Positive',
    title: 'Capacity utilisation at multi-year high',
    body: 'Placeholder entry. Plant utilisation ran ahead of the sector average.',
  },
  {
    date: '12-03-2018', broker: 'AKD Securities',
    sentiment: 'Positive',
    title: 'Upgraded on pricing power',
    body: 'Placeholder entry. Retention prices improved across the north region.',
  },
];

/** `15-03-2025` -> `2025`. */
export function eventYear(e: TimelineEvent): string {
  return e.date.slice(-4);
}

export const timelineEventsByYear = (year: string) =>
  timelineEvents.filter((e) => eventYear(e) === year);

/** Rail opens on the most recent year that actually has coverage. */
export const timelineActiveYear =
  timelineYears.filter((y) => timelineEvents.some((e) => eventYear(e) === y)).pop()
  ?? timelineYears[timelineYears.length - 1];

export const quote = {
  price: '346.49',
  change: '-15.81 (-4.36%)',
  direction: 'down' as const,
};

export const timeframes = ['5', '15', '30', '1H', '5H', '1D', '1W', '1M'];
export const activeTimeframe = '5';

/* One series per timeframe. Every series ends on the same last print (346.49) —
   the traded price does not depend on which window you are looking at, only the
   change over that window does. Placeholder data; swap for a real tick feed. */
export const priceSeriesByTimeframe: Record<string, number[]> = {
  '5': [362.1, 358.4, 361.0, 355.2, 350.8, 353.6, 349.1, 344.7, 347.9, 343.2, 345.0, 346.49],
  '15': [371.5, 366.2, 369.8, 362.4, 358.1, 361.7, 356.3, 359.9, 352.6, 348.4, 351.0, 346.8,
         344.2, 347.5, 343.9, 346.49],
  '30': [383.0, 377.6, 380.2, 372.8, 368.4, 371.1, 364.7, 367.3, 360.9, 356.5, 359.2, 353.8,
         350.4, 354.0, 348.6, 351.2, 345.8, 349.4, 344.0, 346.49],
  '1H': [396.4, 390.1, 393.7, 385.2, 379.8, 383.5, 375.9, 379.4, 371.0, 366.7, 369.3, 362.8,
         358.4, 361.9, 355.5, 359.0, 352.6, 356.1, 349.7, 353.2, 347.8, 351.3, 344.9, 346.49],
  '5H': [412.8, 405.3, 409.0, 398.6, 392.1, 396.4, 387.0, 391.3, 381.9, 376.4, 380.1, 372.7,
         367.2, 371.5, 363.1, 367.4, 359.0, 363.3, 355.9, 359.2, 352.8, 356.1, 350.7, 354.0,
         348.6, 351.9, 345.5, 346.49],
  '1D': [318.2, 322.7, 319.4, 325.9, 331.2, 327.8, 334.1, 330.6, 337.9, 342.3, 338.8, 345.1,
         341.6, 348.9, 353.2, 349.7, 356.0, 352.5, 359.8, 355.3, 362.6, 358.1, 365.4, 360.9,
         368.2, 363.7, 359.1, 354.6, 350.0, 345.4, 348.8, 346.49],
  '1W': [289.5, 295.2, 291.8, 298.4, 304.1, 300.7, 307.3, 313.0, 309.6, 316.2, 322.9, 319.5,
         326.1, 332.8, 329.4, 336.0, 342.7, 339.3, 345.9, 352.6, 349.2, 355.8, 362.5, 359.1,
         365.7, 372.4, 369.0, 375.6, 371.2, 366.8, 362.4, 358.0, 353.6, 349.2, 344.8, 346.49],
  '1M': [268.3, 274.9, 271.5, 278.1, 284.8, 281.4, 288.0, 294.7, 291.3, 297.9, 304.6, 301.2,
         307.8, 314.5, 311.1, 317.7, 324.4, 321.0, 327.6, 334.3, 330.9, 337.5, 344.2, 340.8,
         347.4, 354.1, 350.7, 357.3, 364.0, 360.6, 367.2, 373.9, 369.4, 363.8, 358.2, 352.6,
         349.0, 351.4, 344.2, 346.49],
};

/** The five-minute window is what the Figma frame shows. */
export const priceSeries = priceSeriesByTimeframe[activeTimeframe];

/** Where along a series the coverage markers sit, as fractions of its length. */
export const priceMarkPoints = [0.34, 0.62, 0.88];

/* ── Consensus tab ── */

export type BrokerCall = {
  broker: string;
  call: 'Buy' | 'Hold' | 'Sell';
  analyst: string;
  target: string;
  revised: string;
};

/* Broker coverage per company. Counts, the headline verdict and the split bar
   are all derived from these rows — change a call and the card follows.
   LUCK's first two rows are the ones drawn in Figma; everything else is
   PLACEHOLDER FILL and carries a generic desk name, not a named analyst. */

export type Call = BrokerCall['call'];

/** Compact row builder for the placeholder coverage. */
const row = (broker: string, call: Call, target: string, revised: string): BrokerCall =>
  ({ broker, call, analyst: 'Research Team', target, revised });

export type ConsensusEntry = {
  symbol: string;
  name: string;
  /** Company mark, not a broker logo — these live in public/logos already. */
  logo: string;
  rows: BrokerCall[];
};

export const consensusEntries: ConsensusEntry[] = [
  {
    symbol: 'LUCK', name: 'Lucky Cement', logo: '/logos/luck.svg',
    rows: [
      { broker: 'JS Global',      call: 'Buy',  analyst: 'Hassan Raza', target: '465', revised: '04/06/2026' },
      { broker: 'AKD Securities', call: 'Hold', analyst: 'Hassan Raza', target: '465', revised: '04/06/2026' },
      row('Topline Securities', 'Buy',  '512', '12/05/2026'),
      row('Arif Habib Limited', 'Buy',  '498', '28/04/2026'),
      row('Alpha Capital',      'Hold', '452', '15/04/2026'),
      row('Intermarket Securities', 'Buy', '505', '02/04/2026'),
      row('Optimus Capital',    'Sell', '410', '20/03/2026'),
      row('BMA Capital',        'Buy',  '488', '10/03/2026'),
      row('Foundation Securities', 'Hold', '470', '26/02/2026'),
      row('Next Capital',       'Buy',  '495', '14/02/2026'),
    ],
  },
  {
    symbol: 'DGKC', name: 'D.G. Khan Cement', logo: '/logos/dgkc.svg',
    rows: [
      row('AKD Securities',     'Hold', '182', '02/06/2026'),
      row('Topline Securities', 'Hold', '176', '21/05/2026'),
      row('JS Global',          'Buy',  '198', '09/05/2026'),
      row('Alpha Capital',      'Hold', '174', '18/04/2026'),
      row('BMA Capital',        'Sell', '158', '30/03/2026'),
      row('Next Capital',       'Hold', '180', '12/03/2026'),
    ],
  },
  {
    symbol: 'MLCF', name: 'Maple Leaf Cement', logo: '/logos/mlcf.svg',
    rows: [
      row('Arif Habib Limited', 'Buy',  '92', '28/05/2026'),
      row('JS Global',          'Buy',  '96', '14/05/2026'),
      row('AKD Securities',     'Buy',  '90', '29/04/2026'),
      row('Optimus Capital',    'Hold', '84', '08/04/2026'),
      row('Taurus Securities',  'Buy',  '94', '19/03/2026'),
    ],
  },
  {
    symbol: 'FCCL', name: 'Fauji Cement', logo: '/logos/fccl.svg',
    rows: [
      row('Topline Securities', 'Sell', '28', '25/05/2026'),
      row('BMA Capital',        'Sell', '27', '11/05/2026'),
      row('AKD Securities',     'Hold', '31', '22/04/2026'),
      row('Insight Securities', 'Sell', '26', '02/04/2026'),
    ],
  },
  {
    symbol: 'CHCC', name: 'Cherat Cement', logo: '/logos/chcc.svg',
    rows: [
      row('JS Global',          'Buy',  '265', '30/05/2026'),
      row('Arif Habib Limited', 'Buy',  '272', '16/05/2026'),
      row('Alpha Capital',      'Hold', '248', '27/04/2026'),
      row('AKD Securities',     'Buy',  '268', '07/04/2026'),
      row('Vector Securities',  'Buy',  '260', '15/03/2026'),
    ],
  },
  {
    symbol: 'PIOC', name: 'Pioneer Cement', logo: '/logos/pioc.svg',
    rows: [
      row('AKD Securities',     'Hold', '146', '26/05/2026'),
      row('Topline Securities', 'Hold', '142', '10/05/2026'),
      row('Next Capital',       'Buy',  '158', '23/04/2026'),
      row('Pearl Securities',   'Hold', '144', '05/04/2026'),
    ],
  },
];

export function callCounts(rows: BrokerCall[]) {
  return {
    Buy:  rows.filter((r) => r.call === 'Buy').length,
    Hold: rows.filter((r) => r.call === 'Hold').length,
    Sell: rows.filter((r) => r.call === 'Sell').length,
  };
}

/** The most-held call. Ties fall to the more constructive side, Buy > Hold > Sell. */
export function consensusCall(rows: BrokerCall[]): Call {
  const c = callCounts(rows);
  return (['Buy', 'Hold', 'Sell'] as Call[]).reduce((best, k) => (c[k] > c[best] ? k : best), 'Buy');
}

/** Houses whose call differs from the consensus — the contrarian flag. */
export function contrarians(rows: BrokerCall[]): string[] {
  const verdict = consensusCall(rows);
  return rows.filter((r) => r.call !== verdict).map((r) => r.broker);
}

/** Every company the product holds coverage for — what `All Companies` means. */
export const coveredSymbols = consensusEntries.map((e) => e.symbol);

export const consensusOptions: Call[] = ['Buy', 'Hold', 'Sell'];

/* ── filter option lists ──
   Static reference data standing in for a securities/broker master. Swap for a
   real feed when one exists; the filter logic reads whatever is listed here. */

export const reportTypes = ['Rating & Valuation', 'Risk Factors', 'Catalysts'];

/** PSX tickers used to populate the company filter. */
export const psxCompanies: { value: string; label: string }[] = [
  { value: 'LUCK',   label: 'LUCK — Lucky Cement' },
  { value: 'DGKC',   label: 'DGKC — D.G. Khan Cement' },
  { value: 'MLCF',   label: 'MLCF — Maple Leaf Cement' },
  { value: 'FCCL',   label: 'FCCL — Fauji Cement' },
  { value: 'CHCC',   label: 'CHCC — Cherat Cement' },
  { value: 'PIOC',   label: 'PIOC — Pioneer Cement' },
  { value: 'KOHC',   label: 'KOHC — Kohat Cement' },
  { value: 'OGDC',   label: 'OGDC — Oil & Gas Development' },
  { value: 'PPL',    label: 'PPL — Pakistan Petroleum' },
  { value: 'POL',    label: 'POL — Pakistan Oilfields' },
  { value: 'MARI',   label: 'MARI — Mari Energies' },
  { value: 'PSO',    label: 'PSO — Pakistan State Oil' },
  { value: 'APL',    label: 'APL — Attock Petroleum' },
  { value: 'ATRL',   label: 'ATRL — Attock Refinery' },
  { value: 'NRL',    label: 'NRL — National Refinery' },
  { value: 'HBL',    label: 'HBL — Habib Bank' },
  { value: 'UBL',    label: 'UBL — United Bank' },
  { value: 'MCB',    label: 'MCB — MCB Bank' },
  { value: 'NBP',    label: 'NBP — National Bank of Pakistan' },
  { value: 'BAFL',   label: 'BAFL — Bank Alfalah' },
  { value: 'BAHL',   label: 'BAHL — Bank AL Habib' },
  { value: 'MEBL',   label: 'MEBL — Meezan Bank' },
  { value: 'AKBL',   label: 'AKBL — Askari Bank' },
  { value: 'FABL',   label: 'FABL — Faysal Bank' },
  { value: 'ENGRO',  label: 'ENGRO — Engro Corporation' },
  { value: 'ENGROH', label: 'ENGROH — Engro Holdings' },
  { value: 'FFC',    label: 'FFC — Fauji Fertilizer' },
  { value: 'EFERT',  label: 'EFERT — Engro Fertilizers' },
  { value: 'HUBC',   label: 'HUBC — Hub Power' },
  { value: 'SNGP',   label: 'SNGP — Sui Northern Gas' },
  { value: 'SSGC',   label: 'SSGC — Sui Southern Gas' },
  { value: 'SYS',    label: 'SYS — Systems Limited' },
  { value: 'TRG',    label: 'TRG — TRG Pakistan' },
  { value: 'INDU',   label: 'INDU — Indus Motor Company' },
  { value: 'HCAR',   label: 'HCAR — Honda Atlas Cars' },
  { value: 'SEARL',  label: 'SEARL — The Searle Company' },
  { value: 'ILP',    label: 'ILP — Interloop' },
  { value: 'NESTLE', label: 'NESTLE — Nestlé Pakistan' },
  { value: 'COLG',   label: 'COLG — Colgate-Palmolive Pakistan' },
  { value: 'PAKT',   label: 'PAKT — Pakistan Tobacco' },
];

/** Pakistani sell-side houses covering PSX names. */
export const brokerHouses = [
  'AKD Securities', 'Topline Securities', 'Arif Habib Limited', 'JS Global',
  'Alpha Capital', 'Intermarket Securities', 'Optimus Capital', 'BMA Capital',
  'Foundation Securities', 'Insight Securities', 'Next Capital', 'Taurus Securities',
  'Sherman Securities', 'Ismail Iqbal Securities', 'Vector Securities',
  'Darson Securities', 'Pearl Securities', 'Abbasi & Company',
];

export const sentimentOptions: Sentiment[] = ['Positive', 'Negative', 'Neutral'];

/** Value is the window in days used by the period filter. */
export const periodOptions = [
  { value: '1',  label: 'Daily' },
  { value: '7',  label: '7 Days' },
  { value: '30', label: '30 Days' },
];

export const resultOptions = ['25', '50', '100'];

/** Every hashtag used across insights and reports, de-duplicated. */
export const keywordOptions = Array.from(
  new Set([...insights, ...reports].flatMap((i) => i.tags)),
).sort();
