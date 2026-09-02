'use client';

import * as React from 'react';

/** Drop the account photo here and it appears — no code change.
 *
 *  File:  `app/public/logos/avatar.png`
 *  Size:  128×128, square (it renders at 33px, so this covers 3× displays)
 *
 *  Change the extension below if the artwork is really an SVG rather than a
 *  photo. Until the file exists the grey Figma placeholder circle shows instead,
 *  so a missing asset never renders as a broken image. */
export const AVATAR_SRC = '/logos/avatar.png';

/** Figma `Ellipse 6` — the 33px account mark in the header. Same mount-time
 *  re-check as `BrokerMark`: the markup is server-rendered, so a 404 fires
 *  before React hydrates and `onError` alone would never run. */
export function Avatar({ src = AVATAR_SRC, size = 33 }: { src?: string; size?: number }) {
  const [failed, setFailed] = React.useState(false);
  const ref = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    setFailed(false);
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (failed) {
    return <span className="avatar avatar--empty" style={{ width: size, height: size }} aria-hidden />;
  }

  return (
    <img
      ref={ref}
      className="avatar"
      style={{ width: size, height: size }}
      src={src}
      alt=""
      aria-hidden
      onError={() => setFailed(true)}
    />
  );
}
