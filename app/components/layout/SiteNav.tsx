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

/** The pill nav from the Figma `Navigation` frame. `extra` adds screen-specific items. */
export function SiteNav({ active, extra = [] }: { active?: string; extra?: string[] }) {
  const items = [...PRIMARY_NAV, ...extra];
  return (
    <nav style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      {items.map((label) => {
        const on = label === active;
        return (
          <a
            key={label}
            href={NAV_HREF[label] ?? '#'}
            style={{
              padding: '4px 12px',
              borderRadius: 'var(--radius-xs)',
              fontSize: 11,
              fontWeight: on ? 700 : 400,
              whiteSpace: 'nowrap',
              background: on ? 'var(--color-brand-primary)' : 'transparent',
              color: on ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
              border: `1px solid ${on ? 'var(--color-brand-primary)' : 'var(--color-border-subtle)'}`,
            }}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
