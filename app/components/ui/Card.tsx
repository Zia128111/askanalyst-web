import * as React from 'react';

export function Card({ children, pad = true, raised = false, style, className = '' }: {
  children: React.ReactNode; pad?: boolean; raised?: boolean;
  style?: React.CSSProperties; className?: string;
}) {
  return (
    <section
      className={['card', pad ? 'card--pad' : '', raised ? 'card--raised' : '', className].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
    </section>
  );
}
