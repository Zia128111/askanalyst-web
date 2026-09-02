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
    /* Was a second `Weekly Report | Pakistan Technicals`, which stacked three
       identical titles on the Alpha Capital page. Retyped so no broker page
       repeats a title; the real 15 Mar weekly keeps the Figma wording. */
    id: 'alpha-strategy-feb', title: 'Strategy: Index Levels Into 2H',
    type: 'Sector Report', sector: 'Macro', broker: 'Alpha Capital Pvt. Ltd.',
    analyst: 'Research Team', date: '2025-02-19', pages: 22, companies: ['KSE100'],
    summary: 'Placeholder entry. Index held the 40-wema through the period on thinner volume.',
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

  /* ── broker coverage fill ──
     PLACEHOLDER. Added so every house listed in `brokerHouses` has a coverage
     record deep enough for its /broker/<slug> page to say something. Same rules
     as the block above: generic desk name, never an invented analyst, and every
     body marked as placeholder so no fabricated call about a real PSX company
     can read as fact. Replace wholesale when a real report feed arrives. */
  {
    id: 'akd-luck-briefing', title: 'Lucky Cement: Analyst Briefing 2QFY26',
    type: 'Analyst Briefing', sector: 'Cement', broker: 'AKD Securities',
    analyst: 'Research Team', date: '2025-03-13', pages: 7, companies: ['LUCK'],
    rating: 'Buy', target: '1,050', upside: 30,
    summary: 'Placeholder entry. Renewables and UC3 efficiency gains carried the domestic result.',
    reads: 2260,
  },
  {
    id: 'akd-ppl-review', title: 'Pakistan Petroleum: Result Review',
    type: 'Result Review', sector: 'E&P', broker: 'AKD Securities',
    analyst: 'Research Team', date: '2025-02-24', pages: 10, companies: ['PPL'],
    rating: 'Buy', target: '212', upside: 24,
    summary: 'Placeholder entry. Flows held up while exploration spend stayed within guidance.',
    reads: 1870,
  },
  {
    id: 'akd-fertilizer-sector', title: 'Fertilizer: Urea Offtake Into the Rabi Season',
    type: 'Sector Report', sector: 'Fertilizer', broker: 'AKD Securities',
    analyst: 'Research Team', date: '2025-01-28', pages: 19, companies: ['FFC', 'EFERT', 'ENGRO'],
    summary: 'Placeholder entry. Channel inventory normalised ahead of the season.',
    reads: 2410,
  },
  {
    id: 'akd-mcb-preview', title: 'MCB Bank: Result Preview',
    type: 'Result Preview', sector: 'Banks', broker: 'AKD Securities',
    analyst: 'Research Team', date: '2024-12-18', pages: 6, companies: ['MCB'],
    rating: 'Hold', target: '268', upside: 5,
    summary: 'Placeholder entry. Fee income the swing item with spreads already compressed.',
    reads: 1340,
  },
  {
    id: 'alpha-macro-jan', title: 'Economy: Policy Rate and the Equity Bid',
    type: 'Economy', sector: 'Macro', broker: 'Alpha Capital Pvt. Ltd.',
    analyst: 'Research Team', date: '2025-01-31', pages: 21, companies: [],
    summary: 'Placeholder entry. Falling yields kept rotation running into equities.',
    reads: 3520,
  },
  {
    id: 'alpha-atrl-review', title: 'Attock Refinery: Margin Cycle Turns',
    type: 'Result Review', sector: 'Oil Marketing', broker: 'Alpha Capital Pvt. Ltd.',
    analyst: 'Research Team', date: '2025-01-16', pages: 13, companies: ['ATRL'],
    rating: 'Buy', target: '620', upside: 28,
    summary: 'Placeholder entry. Refining spreads widened enough to cover the deficit carry.',
    reads: 1780,
  },
  {
    id: 'alpha-macro-reserves', title: 'Economy: Reserve Build Continues',
    type: 'Economy', sector: 'Macro', broker: 'Alpha Capital Pvt. Ltd.',
    analyst: 'Research Team', date: '2024-12-06', pages: 14, companies: [],
    summary: 'Placeholder entry. Remittance inflows kept the external account in surplus.',
    reads: 4090,
  },
  {
    id: 'topline-mari-review', title: 'Mari Energies: Result Review',
    type: 'Result Review', sector: 'E&P', broker: 'Topline Securities',
    analyst: 'Research Team', date: '2025-03-07', pages: 11, companies: ['MARI'],
    rating: 'Buy', target: '682', upside: 21,
    summary: 'Placeholder entry. Wellhead performance ahead of plan on the flagship field.',
    reads: 2630,
  },
  {
    id: 'topline-ubl-initiation', title: 'United Bank: Initiating with Buy',
    type: 'Initiation', sector: 'Banks', broker: 'Topline Securities',
    analyst: 'Research Team', date: '2025-02-06', pages: 30, companies: ['UBL'],
    rating: 'Buy', target: '392', upside: 23,
    summary: 'Placeholder entry. Deposit mix and the international book drive the coverage case.',
    reads: 3010,
  },
  {
    id: 'topline-autos-sector', title: 'Autos: Financing Rates and the Volume Recovery',
    type: 'Sector Report', sector: 'Autos', broker: 'Topline Securities',
    analyst: 'Research Team', date: '2025-01-09', pages: 17, companies: ['INDU', 'HCAR'],
    summary: 'Placeholder entry. Lower auto-financing rates fed straight into bookings.',
    reads: 1560,
  },
  {
    id: 'topline-searl-preview', title: 'The Searle Company: Result Preview',
    type: 'Result Preview', sector: 'Technology', broker: 'Topline Securities',
    analyst: 'Research Team', date: '2024-11-22', pages: 6, companies: ['SEARL'],
    rating: 'Hold', target: '82', upside: 7,
    summary: 'Placeholder entry. Pricing relief helps, input costs still the constraint.',
    reads: 870,
  },
  {
    id: 'js-mebl-review', title: 'Meezan Bank: Result Review',
    type: 'Result Review', sector: 'Banks', broker: 'JS Global',
    analyst: 'Research Team', date: '2025-03-05', pages: 10, companies: ['MEBL'],
    rating: 'Buy', target: '318', upside: 25,
    summary: 'Placeholder entry. Current-account growth held the spread better than peers.',
    reads: 2880,
  },
  {
    id: 'js-chcc-preview', title: 'Cherat Cement: Result Preview',
    type: 'Result Preview', sector: 'Cement', broker: 'JS Global',
    analyst: 'Research Team', date: '2025-02-14', pages: 7, companies: ['CHCC'],
    rating: 'Buy', target: '272', upside: 24,
    summary: 'Placeholder entry. Export orders lift utilisation through the quarter.',
    reads: 1290,
  },
  {
    id: 'js-tech-sector', title: 'Technology: Export Receipts and the Rupee',
    type: 'Sector Report', sector: 'Technology', broker: 'JS Global',
    analyst: 'Research Team', date: '2025-01-21', pages: 20, companies: ['SYS', 'TRG'],
    summary: 'Placeholder entry. A stable rupee trims the translation tailwind on receipts.',
    reads: 2170,
  },
  {
    id: 'js-sngp-briefing', title: 'Sui Northern: Analyst Briefing Takeaways',
    type: 'Analyst Briefing', sector: 'Power', broker: 'JS Global',
    analyst: 'Research Team', date: '2024-12-11', pages: 5, companies: ['SNGP'],
    rating: 'Hold', target: '104', upside: 8,
    summary: 'Placeholder entry. Management guided to a slower recovery on the receivable stack.',
    reads: 1050,
  },
  {
    id: 'ahl-pol-review', title: 'Pakistan Oilfields: Result Review',
    type: 'Result Review', sector: 'E&P', broker: 'Arif Habib Limited',
    analyst: 'Research Team', date: '2025-03-03', pages: 9, companies: ['POL'],
    rating: 'Hold', target: '556', upside: 6,
    summary: 'Placeholder entry. Payout held; production decline still the medium-term question.',
    reads: 1620,
  },
  {
    id: 'ahl-banks-preview', title: 'Banks: 1Q Result Preview',
    type: 'Result Preview', sector: 'Banks', broker: 'Arif Habib Limited',
    analyst: 'Research Team', date: '2025-02-04', pages: 15, companies: ['HBL', 'UBL', 'BAFL', 'BAHL'],
    summary: 'Placeholder entry. Sector earnings expected flat sequentially on softer spreads.',
    reads: 2450,
  },
  {
    id: 'ahl-ilp-initiation', title: 'Interloop: Initiating with Buy',
    type: 'Initiation', sector: 'Technology', broker: 'Arif Habib Limited',
    analyst: 'Research Team', date: '2025-01-14', pages: 27, companies: ['ILP'],
    rating: 'Buy', target: '96', upside: 20,
    summary: 'Placeholder entry. Value-added mix and capacity additions anchor the thesis.',
    reads: 1930,
  },
  {
    id: 'ahl-macro-budget', title: 'Economy: Budget Preview',
    type: 'Economy', sector: 'Macro', broker: 'Arif Habib Limited',
    analyst: 'Research Team', date: '2024-11-29', pages: 18, companies: [],
    summary: 'Placeholder entry. Revenue measures and their likely sector incidence set out.',
    reads: 4640,
  },
  {
    id: 'bma-efert-review', title: 'Engro Fertilizers: Result Review',
    type: 'Result Review', sector: 'Fertilizer', broker: 'BMA Capital',
    analyst: 'Research Team', date: '2025-02-18', pages: 8, companies: ['EFERT'],
    rating: 'Hold', target: '204', upside: 5,
    summary: 'Placeholder entry. Gas availability improved; pricing power the open question.',
    reads: 1180,
  },
  {
    id: 'bma-power-sector', title: 'Power: Circular Debt and the Payout Gap',
    type: 'Sector Report', sector: 'Power', broker: 'BMA Capital',
    analyst: 'Research Team', date: '2024-12-20', pages: 22, companies: ['HUBC', 'SNGP', 'SSGC'],
    summary: 'Placeholder entry. Recovery pace decides whether payouts resume this cycle.',
    reads: 2020,
  },
  {
    id: 'optimus-apl-review', title: 'Attock Petroleum: Result Review',
    type: 'Result Review', sector: 'Oil Marketing', broker: 'Optimus Capital',
    analyst: 'Research Team', date: '2025-02-10', pages: 9, companies: ['APL'],
    rating: 'Buy', target: '648', upside: 17,
    summary: 'Placeholder entry. Volume share gains offset a thinner regulated margin.',
    reads: 940,
  },
  {
    id: 'optimus-cement-sector', title: 'Cement: Coal Costs Through the Cycle',
    type: 'Sector Report', sector: 'Cement', broker: 'Optimus Capital',
    analyst: 'Research Team', date: '2024-12-13', pages: 16, companies: ['LUCK', 'DGKC', 'PIOC'],
    summary: 'Placeholder entry. A 10% move in imported coal shifts sector margin near 1.4pp.',
    reads: 1360,
  },
  {
    id: 'next-hcar-review', title: 'Honda Atlas: Result Review',
    type: 'Result Review', sector: 'Autos', broker: 'Next Capital',
    analyst: 'Research Team', date: '2025-01-27', pages: 8, companies: ['HCAR'],
    rating: 'Hold', target: '336', upside: 4,
    summary: 'Placeholder entry. Volumes recovered off a low base; margin recovery lags.',
    reads: 780,
  },
  {
    id: 'next-pioc-preview', title: 'Pioneer Cement: Result Preview',
    type: 'Result Preview', sector: 'Cement', broker: 'Next Capital',
    analyst: 'Research Team', date: '2024-11-15', pages: 6, companies: ['PIOC'],
    rating: 'Buy', target: '158', upside: 15,
    summary: 'Placeholder entry. The expansion line runs at rate for a full quarter for the first time.',
    reads: 690,
  },
  {
    id: 'foundation-bafl-review', title: 'Bank Alfalah: Result Review',
    type: 'Result Review', sector: 'Banks', broker: 'Foundation Securities',
    analyst: 'Research Team', date: '2025-02-20', pages: 10, companies: ['BAFL'],
    rating: 'Buy', target: '92', upside: 19,
    summary: 'Placeholder entry. Deposit growth outpaced the sector with costs contained.',
    reads: 1240,
  },
  {
    id: 'foundation-macro-cpi', title: 'Economy: Policy Rate Path From Here',
    type: 'Economy', sector: 'Macro', broker: 'Foundation Securities',
    analyst: 'Research Team', date: '2024-12-02', pages: 11, companies: [],
    summary: 'Placeholder entry. Disinflation leaves room for one further cut this cycle.',
    reads: 3280,
  },
  {
    id: 'intermarket-luck-review', title: 'Lucky Cement: Result Review',
    type: 'Result Review', sector: 'Cement', broker: 'Intermarket Securities',
    analyst: 'Research Team', date: '2025-03-11', pages: 11, companies: ['LUCK'],
    rating: 'Buy', target: '1,010', upside: 26,
    summary: 'Placeholder entry. Consolidated earnings landed within the forecast range.',
    reads: 2140,
  },
  {
    id: 'intermarket-ogdc-preview', title: 'OGDC: Result Preview',
    type: 'Result Preview', sector: 'E&P', broker: 'Intermarket Securities',
    analyst: 'Research Team', date: '2025-02-01', pages: 7, companies: ['OGDC'],
    rating: 'Buy', target: '238', upside: 20,
    summary: 'Placeholder entry. Recoveries against the circular-debt stack drive the print.',
    reads: 1490,
  },
  {
    id: 'intermarket-bahl-initiation', title: 'Bank AL Habib: Initiating with Buy',
    type: 'Initiation', sector: 'Banks', broker: 'Intermarket Securities',
    analyst: 'Research Team', date: '2024-12-16', pages: 26, companies: ['BAHL'],
    rating: 'Buy', target: '186', upside: 22,
    summary: 'Placeholder entry. A branch-led deposit franchise carries the coverage case.',
    reads: 1610,
  },
  {
    id: 'taurus-fccl-review', title: 'Fauji Cement: Result Review',
    type: 'Result Review', sector: 'Cement', broker: 'Taurus Securities',
    analyst: 'Research Team', date: '2025-02-26', pages: 8, companies: ['FCCL'],
    rating: 'Sell', target: '27', upside: -12,
    summary: 'Placeholder entry. Valuation ran ahead of a softening margin outlook.',
    reads: 830,
  },
  {
    id: 'taurus-searl-briefing', title: 'The Searle Company: Analyst Briefing Takeaways',
    type: 'Analyst Briefing', sector: 'Technology', broker: 'Taurus Securities',
    analyst: 'Research Team', date: '2025-01-07', pages: 5, companies: ['SEARL'],
    rating: 'Hold', target: '84', upside: 3,
    summary: 'Placeholder entry. Volume recovery guided as gradual with pricing held flat.',
    reads: 720,
  },
  {
    id: 'taurus-macro-external', title: 'Economy: Current Account in Focus',
    type: 'Economy', sector: 'Macro', broker: 'Taurus Securities',
    analyst: 'Research Team', date: '2024-11-19', pages: 10, companies: [],
    summary: 'Placeholder entry. Import cover improved on a narrower goods deficit.',
    reads: 2560,
  },
  {
    id: 'insight-nbp-review', title: 'National Bank: Result Review',
    type: 'Result Review', sector: 'Banks', broker: 'Insight Securities',
    analyst: 'Research Team', date: '2025-02-23', pages: 9, companies: ['NBP'],
    rating: 'Hold', target: '148', upside: 6,
    summary: 'Placeholder entry. Pension provisioning remains the overhang on the case.',
    reads: 910,
  },
  {
    id: 'insight-ssgc-preview', title: 'Sui Southern: Result Preview',
    type: 'Result Preview', sector: 'Power', broker: 'Insight Securities',
    analyst: 'Research Team', date: '2025-01-13', pages: 6, companies: ['SSGC'],
    rating: 'Sell', target: '18', upside: -9,
    summary: 'Placeholder entry. UFG losses continue to weigh on the recovery path.',
    reads: 640,
  },
  {
    id: 'insight-cement-sector', title: 'Cement: Dispatch Trends Into Year End',
    type: 'Sector Report', sector: 'Cement', broker: 'Insight Securities',
    analyst: 'Research Team', date: '2024-12-04', pages: 14, companies: ['LUCK', 'MLCF', 'CHCC'],
    summary: 'Placeholder entry. Local dispatches steadied while exports stayed soft.',
    reads: 1170,
  },
  {
    id: 'pearl-engro-review', title: 'Engro Corporation: Result Review',
    type: 'Result Review', sector: 'Fertilizer', broker: 'Pearl Securities',
    analyst: 'Research Team', date: '2025-03-01', pages: 10, companies: ['ENGRO'],
    rating: 'Hold', target: '312', upside: 7,
    summary: 'Placeholder entry. Polymer strength partly offset thinner fertilizer margins.',
    reads: 1080,
  },
  {
    id: 'pearl-trg-initiation', title: 'TRG Pakistan: Initiating with Hold',
    type: 'Initiation', sector: 'Technology', broker: 'Pearl Securities',
    analyst: 'Research Team', date: '2025-01-24', pages: 24, companies: ['TRG'],
    rating: 'Hold', target: '58', upside: 2,
    summary: 'Placeholder entry. The holding-company discount offsets an operating recovery.',
    reads: 1350,
  },
  {
    id: 'pearl-weekly-dec', title: 'Weekly Report | Pakistan Technicals',
    type: 'Weekly Technical', sector: 'Macro', broker: 'Pearl Securities',
    analyst: 'Research Team', date: '2024-12-09', pages: 19, companies: ['KSE100'],
    summary: 'Placeholder entry. Momentum indicators cooled after a six-week advance.',
    reads: 2740,
  },
  {
    id: 'vector-nrl-review', title: 'National Refinery: Result Review',
    type: 'Result Review', sector: 'Oil Marketing', broker: 'Vector Securities',
    analyst: 'Research Team', date: '2025-02-08', pages: 8, companies: ['NRL'],
    rating: 'Hold', target: '392', upside: 4,
    summary: 'Placeholder entry. Upgrade project timing still governs the earnings profile.',
    reads: 760,
  },
  {
    id: 'vector-akbl-preview', title: 'Askari Bank: Result Preview',
    type: 'Result Preview', sector: 'Banks', broker: 'Vector Securities',
    analyst: 'Research Team', date: '2025-01-02', pages: 6, companies: ['AKBL'],
    rating: 'Buy', target: '58', upside: 18,
    summary: 'Placeholder entry. Investment book repricing supports the coming quarter.',
    reads: 700,
  },
  {
    id: 'vector-ep-sector', title: 'E&P: Recoveries and the Dividend Question',
    type: 'Sector Report', sector: 'E&P', broker: 'Vector Securities',
    analyst: 'Research Team', date: '2024-11-26', pages: 15, companies: ['OGDC', 'PPL', 'POL'],
    summary: 'Placeholder entry. Cash recoveries decide whether payouts normalise this year.',
    reads: 1890,
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
