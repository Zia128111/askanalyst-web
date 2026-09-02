import * as React from 'react';
import { Header } from './Header';

/** Figma screen frame: VERTICAL, gap 34 below the header, 50px bottom padding,
 *  content column 1260 wide centred at x=90. */
export function PageShell({ children, navActive, navExtra }: {
  children: React.ReactNode; navActive?: string; navExtra?: string[];
}) {
  return (
    <div className="page">
      <Header navActive={navActive} navExtra={navExtra} />
      <main className="shell">{children}</main>
    </div>
  );
}
