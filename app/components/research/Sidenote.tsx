import * as React from 'react';

/** Figma `Sidenote - n` — numbered glossary note used through the technical commentary. */
export function Sidenote({ index, term, children }: {
  index: number; term: string; children: React.ReactNode;
}) {
  return (
    <aside className="sidenote" id={`note-${index}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="sidenote__marker">{index}</span>
        <span className="sidenote__term">{term}</span>
      </div>
      <p className="sidenote__body" style={{ margin: 0 }}>{children}</p>
    </aside>
  );
}
