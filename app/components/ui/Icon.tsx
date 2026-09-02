/* Icon set extracted from the Figma file.
   Names mirror the Figma layer names (iconify ids) so design ↔ code stay traceable. */
import * as React from 'react';

type Props = React.SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number) => ({
  width: size, height: size, viewBox: '0 0 24 24',
  fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
});

export const ChevronDown = ({ size = 16, ...p }: Props) => (
  <svg {...base(size)} {...p}><path d="m6 9 6 6 6-6" /></svg>
);
export const ArrowRight = ({ size = 14, ...p }: Props) => (
  <svg {...base(size)} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ size = 14, ...p }: Props) => (
  <svg {...base(size)} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const Download = ({ size = 16, ...p }: Props) => (
  <svg {...base(size)} {...p}><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" /></svg>
);
export const Share = ({ size = 16, ...p }: Props) => (
  <svg {...base(size)} {...p}><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 15V3m0 0L8 7m4-4 4 4" /></svg>
);
export const Bell = ({ size = 16, ...p }: Props) => (
  <svg {...base(size)} {...p}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8M13.7 21a2 2 0 0 1-3.4 0" /></svg>
);
export const Document = ({ size = 16, ...p }: Props) => (
  <svg {...base(size)} {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
);
export const Eye = ({ size = 16, ...p }: Props) => (
  <svg {...base(size)} {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
export const Filter = ({ size = 18, ...p }: Props) => (
  <svg {...base(size)} {...p}><path d="M3 5h18l-7 8v6l-4 2v-8Z" /></svg>
);
export const Compare = ({ size = 20, ...p }: Props) => (
  <svg {...base(size)} {...p}><path d="M8 3v18M16 3v18M3 8h5M16 16h5" /></svg>
);
export const Notes = ({ size = 20, ...p }: Props) => (
  <svg {...base(size)} {...p}><path d="M5 3h11l4 4v14H5z" /><path d="M9 9h7M9 13h7M9 17h4" /></svg>
);
export const Sparkle = ({ size = 24, ...p }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2l1.9 5.6L19.5 9l-5.6 1.9L12 16.5l-1.9-5.6L4.5 9l5.6-1.4z" />
    <path d="M18.5 14l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z" opacity=".7" />
  </svg>
);
export const Book = ({ size = 24, ...p }: Props) => (
  <svg {...base(size)} {...p}><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22z" /></svg>
);
/** Figma `mdi:flash` — the contrarian-view marker on the Consensus screen. */
export const Flash = ({ size = 24, ...p }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M7 2h9l-3.2 6H18l-9 14 2-9H6.5z" />
  </svg>
);

/* ── share targets (Figma `Share_Popup`, 6148:9076) ──
   Brand glyphs, drawn filled so they read at 24px inside the tinted discs. */
export const TwitterBird = ({ size = 24, ...p }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M23.6 4.9a9.6 9.6 0 0 1-2.7.8 4.7 4.7 0 0 0 2.1-2.6 9.4 9.4 0 0 1-3 1.1 4.7 4.7 0 0 0-8 4.3A13.3 13.3 0 0 1 2.3 3.6a4.7 4.7 0 0 0 1.4 6.3 4.6 4.6 0 0 1-2.1-.6v.1a4.7 4.7 0 0 0 3.7 4.6 4.7 4.7 0 0 1-2.1.1 4.7 4.7 0 0 0 4.4 3.2A9.4 9.4 0 0 1 .9 19.3a13.2 13.2 0 0 0 7.2 2.1c8.6 0 13.3-7.1 13.3-13.3v-.6a9.5 9.5 0 0 0 2.2-2.6z" />
  </svg>
);
export const FacebookF = ({ size = 24, ...p }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M15.1 8.4V6.6c0-.9.2-1.3 1.5-1.3h1.6V2.1C17.7 2 16.9 2 16 2c-2.8 0-4.6 1.7-4.6 4.8v1.6H8.6v3.4h2.8V22h3.7V11.8h2.8l.4-3.4h-3.2z" />
  </svg>
);
export const RedditAlien = ({ size = 24, ...p }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M22 12.1a2.2 2.2 0 0 0-3.7-1.6 10.7 10.7 0 0 0-5.6-1.8l1-4.4 3 .7a1.6 1.6 0 1 0 .2-1.1l-3.5-.8a.6.6 0 0 0-.7.4l-1.1 5.2a10.7 10.7 0 0 0-5.7 1.8A2.2 2.2 0 1 0 3.4 14a3.9 3.9 0 0 0 0 .6c0 3.1 3.6 5.7 8.1 5.7s8.1-2.6 8.1-5.7a3.9 3.9 0 0 0 0-.6 2.2 2.2 0 0 0 2.4-1.9zM7.4 13.7a1.6 1.6 0 1 1 3.2 0 1.6 1.6 0 0 1-3.2 0zm8.9 4.3c-1.1 1.1-3.2 1.2-3.8 1.2s-2.7-.1-3.8-1.2a.4.4 0 0 1 .6-.6c.7.7 2.2.9 3.2.9s2.5-.2 3.2-.9a.4.4 0 0 1 .6.6zm-.3-2.7a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2z" />
  </svg>
);
export const WhatsAppGlyph = ({ size = 24, ...p }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.1-.8 1-1 1.2-.3.2-.6 0a8.2 8.2 0 0 1-2.4-1.4 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5a.6.6 0 0 0 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4 3.4 3.4 0 0 0-1.1 2.6 6 6 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6 8 8 0 0 0 1.7.6 4.2 4.2 0 0 0 1.9.1 3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.5zM12 2a10 10 0 0 0-8.6 15.1l-1.3 4.6 4.8-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
  </svg>
);
export const Copy = ({ size = 16, ...p }: Props) => (
  <svg {...base(size)} {...p}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v7A2.5 2.5 0 0 0 5.5 15" />
  </svg>
);
