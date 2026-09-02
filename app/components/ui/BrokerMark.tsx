'use client';

import * as React from 'react';
import { brokerLogoSrc } from '@/data/brokers';

/** 12px broker logo, resolved from the house name. Renders nothing when the
 *  file is not in `public/logos/` yet, so a missing asset shows as a plain
 *  text pill rather than a broken image. */
export function BrokerMark({ name, className = 'rating__mark' }: {
  name?: string; className?: string;
}) {
  const [failed, setFailed] = React.useState(false);
  const ref = React.useRef<HTMLImageElement>(null);

  /* The markup is server-rendered, so a missing file 404s before React
     hydrates and `onError` never fires. Re-check the element on mount. */
  React.useEffect(() => {
    setFailed(false);
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [name]);

  if (!name || failed) return null;
  return (
    <img
      ref={ref}
      className={className}
      src={brokerLogoSrc(name)}
      alt=""
      aria-hidden
      onError={() => setFailed(true)}
    />
  );
}
