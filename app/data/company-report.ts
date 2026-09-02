/* Content extracted verbatim from Figma `Research / Detail / Company`
   (node 4805:1362) — the KOHC 2QFY26 results review. */

export const meta = {
  title: 'KOHC: 2QFY26 Results Review',
  subtitle: 'EPS clocks in at PKR 2.82, down by 21% YoY',
  analyst: 'Hassan Raza',
  date: '24 October 2025',
  pages: '24 pages',
  broker: 'Alpha Capital Pvt. Ltd',
};

export const aiInsights = [
  'On a sequential basis, earnings declined by 12% QoQ. Net revenue increased 2% QoQ reflecting ' +
  'increase of 5% QoQ growth in local dispatches. Gross margins declined by 2ppts QoQ, reflecting ' +
  'upward pressure on coal costs due to Afghan border closure.',
  "We maintain a 'Hold' recommendation on the stock based on our Dec-26 price target (PT) of PKR 124/share.",
];

export const company = {
  name: 'Kohat Cement Company Limited',
  symbol: 'KOHC',
  logo: '/logos/kohc.svg',
  price: 'PKR 94.00',
  rating: 'Hold | TP: PKR 124',
  chips: ['Cement', 'Pakistan'],
};

/** Figma `Frame 41090` — two label/value pairs per row under one header band. */
export const keyData: { label: string; value: string; tone?: 'up' | 'down' }[] = [
  { label: 'Target Price',  value: 'PKR 124' },
  { label: 'Current Price', value: 'PKR 94' },
  { label: 'Upside',        value: '32%', tone: 'up' },
  { label: 'Div. Yield',    value: '0%' },
  { label: '12M High/Low',  value: '127 / 66' },
  { label: 'Market Cap',    value: 'PKR 85.9bn' },
];

export const sidenotes = {
  eps: {
    term: 'EPS',
    body: 'Earnings Per Share — net profit divided by outstanding shares. A key measure of per-share profitability.',
  },
  grossMargins: {
    term: 'Gross Margins',
    body: 'The percentage of revenue remaining after deducting cost of goods sold. Declining margins mean costs are outpacing revenue growth.',
  },
};

/** Marker → note, for the numbered references in the prose. */
export const noteRefs = [
  { index: 1, term: sidenotes.eps.term },
  { index: 2, term: sidenotes.grossMargins.term },
];

export const quarterlyResults = [
  'KOHC announced its 2QFY26 results wherein the company reported an EPS 1 of PKR 2.82, down by 21% YoY.',
  'Net sales for 2QFY26 clocked in at PKR 10.5bn, flattish YoY. The 9% YoY growth in local dispatches ' +
  'to ~0.7mn tons is offset by a decline in net retention due to greater pricing pressure in the KP region.',
];

export const marginCompression = [
  "Gross margins 2 for 2QFY26 clocked in at 32%, down 10 ppts YoY reflecting normalization from elevated " +
  "SPLY levels when KOHC's regional prices of PKR 1,476/bag were above the northern average of PKR 1,459/bag. " +
  'The margin compression is driven by higher royalty charge and energy cost. The limestone royalty increased ' +
  'to PKR 350/ton for FY26 from PKR 250/ton for FY25.',
];

export const otherIncome = [
  'Other income declined by 27% YoY from PKR 1.6bn to PKR 1.2bn in 2QFY26 reflecting lower interest rates. ' +
  'However, the effective annualized interest rate on short-term investments clocked in at 14%, greater than ' +
  'the average interest rate of ~10.5% during the quarter, indicating mark to market gains on investments.',
  'On a sequential basis, earnings declined by 12% QoQ. Net revenue increased 2% QoQ reflecting increase of ' +
  "5% QoQ growth in local dispatches. Gross margins declined by 2ppts QoQ, reflecting upward pressure on coal " +
  "costs due to Afghan border closure. We maintain a 'Hold' recommendation on the stock based on our Dec-26 " +
  'price target (PT) of PKR 124/share.',
];

/** Figma `Frame 41088` — the results table. `strong` marks the summary lines. */
export const financials = {
  columns: ['PKR mn', '2QFY25', '2QFY26', 'YoY', '1HFY25', '1HFY26', 'YoY'],
  rows: [
    { label: 'Sales',        cells: ['10,580', '10,457', '-1%',  '20,663', '20,744', '0%'] },
    { label: 'Cost of Sales', cells: ['6,115', '7,068',  '16%',  '11,885', '13,867', '17%'] },
    { label: 'Gross Profit', cells: ['4,465', '3,389',  '-24%', '8,778',  '6,877',  '-22%'], strong: true },
    { label: 'Other Income', cells: ['1,585', '1,157',  '-27%', '3,056',  '2,624',  '-14%'] },
    { label: 'Finance Cost', cells: ['94',    '42',     '-55%', '210',    '82',     '-61%'] },
    { label: 'PBT',          cells: ['5,429', '4,012',  '-26%', '10,589', '8,499',  '-20%'], strong: true },
    { label: 'Net Income',   cells: ['3,446', '2,596',  '-25%', '6,885',  '5,540',  '-20%'], strong: true },
    { label: 'EPS',          cells: ['3.52',  '2.82',   '-21%', '7.12',   '6.03',   '-15%'], strong: true },
  ],
};

export const tags = '#KOHC #cement #results #earnings';

/* ── right rail ── */

export const relatedCement = [
  { symbol: 'DGKC', logo: '/logos/dgkc.svg' },
  { symbol: 'MLCF', logo: '/logos/mlcf.svg' },
  { symbol: 'FCCL', logo: '/logos/fccl.svg' },
  { symbol: 'CHCC', logo: '/logos/chcc.svg' },
  { symbol: 'PIOC', logo: '/logos/pioc.svg' },
];

export const relatedReports = [
  { source: 'Topline Securities', logo: '/logos/topline.svg',    date: 'Feb 12, 2025', title: 'KOHC: Q2 Result Update' },
  { source: 'Arif Habib Ltd',     logo: '/logos/arif-habib.svg', date: 'Mar 01, 2025', title: 'Cement Sector: Demand Outlook' },
  { source: 'Topline Securities', logo: '/logos/topline.svg',    date: 'Feb 12, 2025', title: 'KOHC: Pre-Result Expectations Q3' },
];
