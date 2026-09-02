import * as React from 'react';

/** Ask Analyst mark — the 14-vector `Group 3` from the Figma header, exported as
 *  one SVG lockup (mark + wordmark) at public/logos/ask-analyst.svg, 93x36. */
export const LOGO_SRC = '/logos/ask-analyst.svg';

const ASPECT = 93 / 36;

export function Logo({ height = 36 }: { height?: number }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Ask Analyst"
      height={height}
      width={Math.round(height * ASPECT)}
      style={{ display: 'block' }}
    />
  );
}
