/* Content extracted verbatim from Figma `Research / Detail / Market`. */

export const meta = {
  title: 'Weekly Report | Pakistan Technicals',
  analyst: 'Ahmed Khan',
  date: 'March 15, 2025',
  pages: '24 pages',
};

export const aiInsight =
  'AKD Securities upgrades Lucky Cement from Hold to Buy with a revised target price of PKR 1,050, ' +
  'implying 30% upside. The upgrade is driven by the company’s new Greenfield capacity coming online ' +
  'in the South region, which has already boosted market share to 34%. Export revenue surged 23% YoY on ' +
  'Central Asian expansion. Gross margins recovered to 28.5% through product mix optimization. The analyst ' +
  'values LUCK at 8.5x FY26E EV/EBITDA, a premium to the sector average of 6.2x, justified by superior ROE ' +
  'and capacity utilization. Key risks include the proposed carbon tax and PKR volatility impacting imported coal costs.';

export const kseWhatHappened =
  'Since gaining above the 40-wema 1 in July 2023, the last two weeks have witnessed the first cyclical ' +
  'shift below this key average. The shift occurred after a downside gap from 161,476–162,953 that sits ' +
  'above the 40-wema. This gap now stands as a key resistance 2 — the index must close above it to ' +
  're-establish support 3 above the average. Immediate resistance is at the 40-wema itself (158,055).';

export const kseKeyLevels = [
  'Two uptrends define the downside picture. The broader trend from the January 2023 low at 35,153, and the ' +
  'more recent move from 101,599 (May ’25) to the peak at 191,032. The latter has undergone a 50% ' +
  'retracement 4 to 146,315 — this defines the current support area.',
  'A weekly close below 146,315 would deepen the correction towards 135,762 (61.8% retracement of ' +
  '101,599–191,032). This level also coincides with the 38.2% retracement of the broader 35,153–191,032 ' +
  'trend at 132,626 — creating a cluster of support.',
  'Short-term expected range: 146,315–158,000. An expanding cyclical shift on the downside would look ' +
  'towards 132,626–135,762.',
];

export const levelRows = [
  { label: 'Downside gap (resistance zone)',                     value: '161,476 – 162,953', tone: 'down' as const },
  { label: 'Immediate resistance (40-wema)',                     value: '158,055',                tone: 'down' as const },
  { label: 'Current support (50% of 101,599–191,032)',      value: '146,315',                tone: 'up'   as const },
  { label: 'Next support (61.8% of 101,599–191,032)',       value: '135,762',                tone: 'up'   as const },
  { label: 'Broader trend support (38.2% of 35,153–191,032)', value: '132,626',              tone: 'up'   as const },
  { label: 'Short-term range',                                   value: '146,315 – 158,000', tone: 'down' as const },
];

/* ── individual stocks: three cards, in Figma order ── */

export type Stock = {
  name: string;
  price: string;
  badge: { label: string; tone: 'positive' | 'warning' | 'info' };
  view: string[];
  notes: { index: number; term: string; body: string }[];
  levels: { label: string; value: string; tone?: 'up' | 'down' | 'muted' }[];
};

export const stocks: Stock[] = [
  {
    name: 'Attock Refinery Ltd. (ATRL)',
    price: '822.37',
    badge: { label: 'Positive Divergence', tone: 'positive' },
    view: [
      'Strong positive divergence 5 to broader market weakness — the stock firmly holds onto the 40-wema (707.00) and its rising trend-line 6 over the last two weeks. LUCK has also marginally closed above the December high of 775.75, which is the resistance to hold above.',
      'With short-term risk below 750.00, price would look to retest levels around 881.00–886.00.',
    ],
    notes: [
      { index: 5, term: 'Positive Divergence', body: 'When a stock holds firm or rises while the broader market is falling — a sign of relative strength and independent buying interest.' },
      { index: 6, term: 'Trend-line', body: 'A straight line connecting successive lows (uptrend) or highs (downtrend) on a chart. It represents the direction and speed of the prevailing trend.' },
    ],
    levels: [
      { label: '40-wema support',               value: '707.00',          tone: 'up' },
      { label: 'Resistance to hold (Dec high)', value: '775.75',          tone: 'down' },
      { label: 'Short-term risk',               value: 'Below 750.00',    tone: 'down' },
      { label: 'Upside retest target',          value: '881.00 – 886.00', tone: 'up' },
    ],
  },
  {
    name: 'Engro Holdings Ltd. (ENGROH)',
    price: '271.00',
    badge: { label: 'Breakout Pending', tone: 'warning' },
    view: [
      'Trending action remains steadfast as levels hold firmly onto the 40-wema (235.00) over the last two weeks. The challenge is to overcome and sustain above the January high of 287.88 for the trend to continue towards 336.00–360.00 over the short term.',
      'The significance of this level is emphasized by harmonious double tops 7 on both the RSI and MACD 8 — momentum has peaked at the same level twice without breaking higher.',
      'A prudent approach would be to buy into closings above 287.88, with two risk levels defined at 263.30 and 250.00 depending on the risk profile of the investor.',
    ],
    notes: [
      { index: 7, term: 'double tops',  body: 'A chart pattern where the price or indicator reaches the same peak twice without surpassing it — often signals that upward momentum is stalling.' },
      { index: 8, term: 'RSI and MACD', body: 'Momentum indicators measuring the speed and strength of price movement. They can confirm the price trend or diverge from it, providing early warning signals.' },
    ],
    levels: [
      { label: '40-wema support',                      value: '235.00',          tone: 'up' },
      { label: 'Key resistance (Jan high / breakout)', value: '287.88',          tone: 'down' },
      { label: 'Upside target on breakout',            value: '336.00 – 360.00', tone: 'up' },
      { label: 'Risk level 1',                         value: '263.30',          tone: 'down' },
      { label: 'Risk level 2',                         value: '250.00',          tone: 'down' },
    ],
  },
  {
    name: 'D.G. Khan Cement Co. Ltd. (DGKC)',
    price: '166.32',
    badge: { label: 'Approaching Key Support', tone: 'info' },
    view: [
      'Following a sharp fall below the 40-wema (202.74), price is approaching a key support area at the bullish trend-line around 152.00. The rising trend from 40.30 to 275.75 retraces 50% at 158.00, creating a cluster of supports 9 in the 152.00–158.00 zone.',
      'The report suggests looking to buy into levels from 158.00–152.00, with risk below 147.00. Short-term upside levels to target would be 181.00–185.00.',
    ],
    notes: [
      { index: 9, term: 'Support Cluster', body: 'When multiple independent support levels — such as a trend-line and a Fibonacci retracement — converge at the same price zone. This overlap tends to make the support more significant.' },
    ],
    levels: [
      { label: '40-wema (broken)',                                        value: '202.74',          tone: 'muted' },
      { label: 'Support cluster (trend-line + 50% of 40.30–275.75)',  value: '152.00 – 158.00', tone: 'up' },
      { label: 'Risk level',                                              value: 'Below 147.00',    tone: 'down' },
      { label: 'Short-term upside target',                                value: '181.00 – 185.00', tone: 'up' },
    ],
  },
];

export const sidenotes = {
  wema: { term: '40-WEMA', body: 'The 40-week exponential moving average — a long-term average of closing prices that smooths out short-term noise. When price is above it, the broader trend is positive; when below, negative.' },
  resistance: { term: 'Resistance', body: 'A price level where selling pressure has historically been strong enough to prevent further advance.' },
  support: { term: 'Support', body: 'A price level where buying interest has historically been strong enough to prevent further decline.' },
  retracement: { term: 'Retracement', body: 'A partial reversal of a prior move, measured using Fibonacci ratios (38.2%, 50%, 61.8%). A 50% retracement means the price has given back half of the preceding move.' },
};

/* Marker -> note for the KSE-100 card. Its sidenotes are keyed by name rather
   than carrying an index, unlike the per-stock `notes` arrays. */
export const kseNoteRefs = [
  { index: 1, term: sidenotes.wema.term },
  { index: 2, term: sidenotes.resistance.term },
  { index: 3, term: sidenotes.support.term },
  { index: 4, term: sidenotes.retracement.term },
];

export const relatedTechnical = [
  { symbol: 'DGKC', logo: '/logos/dgkc.svg' },
  { symbol: 'MLCF', logo: '/logos/mlcf.svg' },
  { symbol: 'FCCL', logo: '/logos/fccl.svg' },
  { symbol: 'CHCC', logo: '/logos/chcc.svg' },
  { symbol: 'PIOC', logo: '/logos/pioc.svg' },
];

export const relatedReports = [
  { source: 'Topline Securities', logo: '/logos/topline.svg',     date: 'Feb 12, 2025', title: 'Lucky Cement: Q2 Result Update' },
  { source: 'Arif Habib Ltd',     logo: '/logos/arif-habib.svg',  date: 'Mar 01, 2025', title: 'Cement Sector: Demand Recovery Ahead' },
  { source: 'Topline Securities', logo: '/logos/topline.svg',     date: 'Feb 12, 2025', title: 'Lucky Cement: Pre-Result Expectations Q3' },
];
