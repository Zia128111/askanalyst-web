'use client';

import * as React from 'react';

/** Company mark that falls back to `alt` artwork when the file is not in
 *  `public/logos/` yet — same guard as `BrokerMark`, since the markup is
 *  server-rendered and a 404 fires before React hydrates. */
export function CompanyArt({ src, size = 84, fallback, className }: {
  src?: string; size?: number; fallback?: React.ReactNode; className?: string;
}) {
  const [failed, setFailed] = React.useState(false);
  const ref = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    setFailed(false);
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (!src || failed) return <>{fallback}</>;
  return (
    <img
      ref={ref}
      className={className}
      src={src}
      alt=""
      aria-hidden
      width={size}
      height={size}
      style={{ width: size, height: 'auto', maxWidth: '100%', display: 'block', objectFit: 'contain', flexShrink: 0 }}
      onError={() => setFailed(true)}
    />
  );
}
