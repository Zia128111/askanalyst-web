import * as React from 'react';
import { Logo } from './Logo';
import { SiteNav } from './SiteNav';
import { ChevronDown } from '../ui/Icon';

/** Figma component `Header` — 1440×60.
 *  `Navigation` sits at x=196 y=16 in the frame; here it flows after the logo
 *  with a 69px offset, which lands on the same x at 1440 and adapts below. */
export function Header({ navActive, navExtra }: { navActive?: string; navExtra?: string[] }) {
  return (
    <header className="header__bar">
      <div className="header__inner">
        <div className="header__logo">
          <Logo />
        </div>

        <div className="header__nav">
          <SiteNav active={navActive} extra={navExtra} />
        </div>

        <div className="header__actions">
          <span aria-hidden style={{
            width: 33, height: 33, borderRadius: 999,
            background: 'var(--color-bg-subtle)',
            border: '1px solid var(--color-border-subtle)', display: 'inline-block',
          }} />
          <ChevronDown size={12} />
        </div>
      </div>
    </header>
  );
}
