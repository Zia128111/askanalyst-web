'use client';

import * as React from 'react';
import { RatingPill, BrokerMark, SentimentPill } from './InsightCard';
import * as D from '@/data/insights';

/** Figma timeline rail — years on the left, dated event cards down the track.
 *  Picking a year swaps the track to that year's coverage. */
export function Timeline() {
  const [year, setYear] = React.useState(D.timelineActiveYear);
  const events = React.useMemo(() => D.timelineEventsByYear(year), [year]);

  return (
    <div className="tl">
      {/* The wrapper takes its height from the track beside it; the rail inside
          fills that box and scrolls, so the years never run past the last card. */}
      <div className="tl__yearsbox">
      <div className="tl__years" role="tablist" aria-label="Coverage year">
        {D.timelineYears.map((y) => {
          const on = y === year;
          const count = D.timelineEventsByYear(y).length;
          return (
            <button
              key={y}
              type="button"
              role="tab"
              aria-selected={on}
              className={on ? 'tl__year tl__year--on' : 'tl__year'}
              onClick={() => setYear(y)}
            >
              {y}
              {count > 0 && <span className="tl__year-dot" aria-hidden />}
            </button>
          );
        })}
      </div>
      </div>

      {events.length === 0 ? (
        <p className="tl__empty">No coverage recorded in {year}.</p>
      ) : (
        <ol className="tl__track" style={{ listStyle: 'none', margin: 0 }}>
          {events.map((e, i) => (
            <li key={`${e.title}-${i}`} className="tl__event">
              <span className="tl__date">{e.date}</span>
              <div className="tl__card">
                <div className="icard__pills">
                  <RatingPill tone="rating--neutral" mark={<BrokerMark name={e.broker} />}>{e.broker}</RatingPill>
                  <SentimentPill value={e.sentiment} />
                </div>
                <h4>{e.title}</h4>
                <p>{e.body}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/* ── price panel ── */

const W = 720;
const H = 300;
const TICKS = 7;

/** Seven axis labels bracketing the series, rounded to a clean 5. */
function axisFor(series: number[]): number[] {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const pad = (max - min) * 0.12 || 10;
  const lo = Math.floor((min - pad) / 5) * 5;
  const hi = Math.ceil((max + pad) / 5) * 5;
  return Array.from({ length: TICKS }, (_, i) => Math.round(hi - (i * (hi - lo)) / (TICKS - 1)));
}

/** Maps the series onto the viewBox using that timeframe's own axis band. */
function pointsFor(series: number[], axis: number[]) {
  const hi = axis[0];
  const lo = axis[axis.length - 1];
  const step = W / (series.length - 1);
  return series.map((v, i) => ({ x: i * step, y: H - ((v - lo) / (hi - lo)) * H, v }));
}

/** Catmull-Rom through the points, emitted as a cubic path — the Figma line is
 *  a smooth curve, not a polyline. */
function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

export function PricePanel() {
  const [tf, setTf] = React.useState(D.activeTimeframe);
  /* `open` is what is on screen; `pinned` says a click put it there, so moving
     the pointer away leaves it alone. Hover opens, click pins. */
  const [openMark, setOpenMark] = React.useState<number | null>(0);
  const [pinned, setPinned] = React.useState(true);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = React.useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }, []);
  /* Small grace period so the pointer can travel from marker to card. */
  const scheduleClose = React.useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMark(null), 160);
  }, [cancelClose]);
  React.useEffect(() => cancelClose, [cancelClose]);

  const series = D.priceSeriesByTimeframe[tf] ?? D.priceSeries;
  const axis = React.useMemo(() => axisFor(series), [series]);
  const pts = React.useMemo(() => pointsFor(series, axis), [series, axis]);
  const line = React.useMemo(() => smoothPath(pts), [pts]);
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;

  /* Change is measured across the visible window, so it moves with the
     timeframe while the last traded price stays put. */
  const first = series[0];
  const last = series[series.length - 1];
  const delta = last - first;
  const pct = (delta / first) * 100;
  const down = delta < 0;
  const changeText = `${delta >= 0 ? '+' : ''}${delta.toFixed(2)} (${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%)`;
  const tone = down ? 'var(--color-text-negative)' : 'var(--color-text-positive)';

  /* One marker per recent piece of coverage, spaced along the window. */
  const marks = D.priceMarkPoints
    .map((f) => Math.round(f * (series.length - 1)))
    .slice(0, D.timelineEvents.length);

  const openIndex = openMark !== null && openMark < marks.length ? openMark : null;
  const tipPoint = openIndex !== null ? pts[marks[openIndex]] : null;
  const tipEvent = openIndex !== null ? D.timelineEvents[openIndex] : null;

  return (
    <div className="pricepanel">
      <div className="quote">
        <img className="quote__art" src={D.company.logo} alt="" aria-hidden />
        <div className="col" style={{ gap: 4 }}>
          <strong style={{ fontSize: 20, lineHeight: 1.49 }}>{D.company.name}</strong>
          <span className="quote__now tabular">
            {last.toFixed(2)}
            <span style={{ fontSize: 12, color: tone }}>{down ? '↘' : '↗'} {changeText}</span>
          </span>
        </div>
      </div>

      <div className="tfchips">
        {D.timeframes.map((t) => (
          <button
            key={t}
            className="tfchip"
            type="button"
            aria-pressed={t === tf}
            onClick={() => { setTf(t); setOpenMark(0); }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="chartwrap">
        <svg className="chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img"
             aria-label={`${D.company.name} price over ${tf}, ${changeText}`}>
          <defs>
            <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="var(--color-chart-line-blue-1)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--color-chart-line-blue-1)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#priceFill)" />
          <path d={line} fill="none" stroke="var(--color-chart-line-blue-1)" strokeWidth="3"
                vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
          {marks.map((p, i) => (
            <circle
              key={`${tf}-${p}`}
              className="chart__mark"
              cx={pts[p].x} cy={pts[p].y}
              r={openIndex === i ? 7 : 5}
              fill="var(--color-chart-line-blue-1)"
              stroke="var(--color-bg-surface)" strokeWidth="2"
              onMouseEnter={() => { cancelClose(); setOpenMark(i); }}
              onMouseLeave={() => { if (!pinned) scheduleClose(); }}
              onClick={() => {
                if (pinned && openIndex === i) { setPinned(false); setOpenMark(null); }
                else { cancelClose(); setPinned(true); setOpenMark(i); }
              }}
            >
              <title>{D.timelineEvents[i]?.title ?? 'Coverage'}</title>
            </circle>
          ))}
        </svg>

        <div className="chart__axis tabular" aria-hidden>
          {axis.map((v) => <span key={v}>{v}</span>)}
        </div>

        {/* Opens on the marker you click; click the same marker again to close. */}
        {tipPoint && tipEvent && (
          <div
            className="chart__tip"
            onMouseEnter={cancelClose}
            onMouseLeave={() => { if (!pinned) scheduleClose(); }}
            style={{
              left: `${Math.min(Math.max((tipPoint.x / W) * 100 - 8, 2), 52)}%`,
              top: `${Math.min(Math.max((tipPoint.y / H) * 100 + 5, 2), 52)}%`,
            }}
          >
            <button className="chart__tipclose" type="button" aria-label="Close"
                    onClick={() => { setPinned(false); setOpenMark(null); }}>×</button>
            <span className="chart__tipdate">{tipEvent.date}</span>
            <span className="quote__now tabular" style={{ fontSize: 13 }}>
              {pts[marks[openIndex!]].v.toFixed(2)}
              <span style={{ fontSize: 9, color: tone }}>{down ? '↘' : '↗'} {changeText}</span>
            </span>
            <div className="icard__pills" style={{ gap: 4 }}>
              <RatingPill tone="rating--neutral" mark={<BrokerMark name={tipEvent.broker} />}>
                {tipEvent.broker}
              </RatingPill>
              <SentimentPill value={tipEvent.sentiment} />
            </div>
            <h5>{tipEvent.title}</h5>
            <p>{tipEvent.body}</p>
          </div>
        )}
      </div>
    </div>
  );
}
