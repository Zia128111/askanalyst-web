import * as React from 'react';

export const PRIMARY_NAV = [
  'Market', 'Companies', 'Data Bank', 'Sector Fundamentals', 'Economy',
  'Media', 'Features', 'Calculator', 'Research Report', 'AI Powered Insights',
];

/** Nav items that have a screen built. Everything else is still a stub in the
 *  Figma file, so it stays inert rather than linking somewhere that 404s. */
export const NAV_HREF: Record<string, string> = {
  'Research Report': '/research',
  'AI Powered Insights': '/company/insights',
};

/** The pill nav from the Figma `Navigation` frame. `extra` adds screen-specific
 *  items. Styled by class rather than inline: an inline style cannot carry the
 *  `:hover` and `:focus-visible` states, which is the same reason the responsive
 *  rules live in `globals.css`. */
export function SiteNav({ active, extra = [] }: { active?: string; extra?: string[] }) {
  const items = [...PRIMARY_NAV, ...extra];
  return (
    <nav className="nav">
      {items.map((label) => {
        const on = label === active;
        return (
          <a
            key={label}
            className={`navitem${on ? ' navitem--on' : ''}`}
            href={NAV_HREF[label] ?? '#'}
            aria-current={on ? 'page' : undefined}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
