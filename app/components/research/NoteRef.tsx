import * as React from 'react';

export type NoteRef = { index: number; term: string };

/* A marker is a bare single digit surrounded by whitespace — "the 40-wema 1 in
   July". Only digits that match a note passed in for this card become links, so
   stray numerals in the prose are never touched. The space before the marker is
   dropped: the digit renders as a superscript, footnote-style. */
const MARKER = /(?:^|\s)(\d)(?=\s|$)/g;

export function withNoteRefs(text: string, notes: NoteRef[] = []): React.ReactNode {
  if (!notes.length) return text;
  const byIndex = new Map(notes.map((n) => [n.index, n]));

  const out: React.ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  for (const m of text.matchAll(MARKER)) {
    const digit = Number(m[1]);
    const note = byIndex.get(digit);
    if (!note) continue;

    const numAt = m.index! + m[0].length - 1;        // the digit itself
    const lead = text.slice(cursor, m.index! === 0 ? 0 : numAt - 1); // prose up to the space
    const take = anchorLength(lead, note.term);      // trailing chars the link swallows

    out.push(lead.slice(0, lead.length - take));
    out.push(
      <a
        key={`ref-${digit}-${key++}`}
        className="noteref"
        href={`#note-${digit}`}
        aria-label={`Jump to note ${digit}: ${note.term}`}
        title={note.term}
      >
        {take > 0 && <span className="noteref__term">{lead.slice(lead.length - take)}</span>}
        <span className="noteref__num">{digit}</span>
      </a>,
    );
    cursor = numAt + 1;
  }

  if (!out.length) return text;
  out.push(text.slice(cursor));
  return out;
}

/** How much of the text before a marker belongs to the link: the note's own
 *  term where the prose spells it out verbatim ("Positive Divergence 5"),
 *  otherwise just the word the marker hangs off ("supports 9", whose note is
 *  filed under a different name). */
function anchorLength(lead: string, term: string): number {
  const lower = lead.toLowerCase();
  const t = term.toLowerCase();
  if (t && lower.endsWith(t)) {
    const before = lead[lead.length - t.length - 1];
    if (before === undefined || /\s/.test(before)) return term.length;
  }
  const word = /\S+$/.exec(lead);
  return word ? word[0].length : 0;
}
