/* Broker → logo filename. Drop an SVG into `public/logos/` with the filename
   listed here and it appears everywhere that broker is shown — no code change.
   A file that is not there yet simply renders nothing, so the list can run
   ahead of the assets.

   Present today: akd, arif-habib, js-global, topline.
   Still needed:  alpha-capital, bma-capital, foundation-securities,
                  insight-securities, intermarket-securities, next-capital,
                  optimus-capital, pearl-securities, taurus-securities,
                  vector-securities. */

export const BROKER_LOGO: Record<string, string> = {
  'AKD Securities': 'akd',
  /* Two spellings of the same house — one file covers both. */
  'Alpha Capital': 'alpha-capital',
  'Alpha Capital Pvt. Ltd.': 'alpha-capital',
  'Arif Habib Limited': 'arif-habib',
  'BMA Capital': 'bma-capital',
  'Foundation Securities': 'foundation-securities',
  'Insight Securities': 'insight-securities',
  'Intermarket Securities': 'intermarket-securities',
  'JS Global': 'js-global',
  'Next Capital': 'next-capital',
  'Optimus Capital': 'optimus-capital',
  'Pearl Securities': 'pearl-securities',
  'Taurus Securities': 'taurus-securities',
  'Topline Securities': 'topline',
  'Vector Securities': 'vector-securities',
};

/** Fallback for a house not in the map: `Foo & Co.` -> `foo-co`. */
function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function brokerLogoSrc(name: string) {
  return `/logos/${BROKER_LOGO[name] ?? slug(name)}.svg`;
}

/* ── URL identity ──
   The logo key doubles as the broker's URL slug, so the two spellings of Alpha
   Capital land on one page rather than two. Houses with no logo yet fall back
   to the slugified name — they still get a page, just no mark on it. */

export function brokerSlug(name: string) {
  return BROKER_LOGO[name] ?? slug(name);
}

export function brokerHref(name: string) {
  return `/broker/${brokerSlug(name)}`;
}
