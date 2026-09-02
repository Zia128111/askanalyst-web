'use client';

import * as React from 'react';
import { ArrowUpRight, Copy, Share, TwitterBird, FacebookF, RedditAlien, WhatsAppGlyph } from './Icon';

/* Figma `Share_Popup` (6148:9076). Brand colours are the networks' own, so they
   sit outside the Ask Analyst token set by design. */
const TARGETS = [
  {
    key: 'x', label: 'X.com', color: '#1DA1F2',
    icon: <TwitterBird size={24} />,
    href: (u: string, t: string) => `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
  },
  {
    key: 'facebook', label: 'Facebook', color: '#1877F2',
    icon: <FacebookF size={24} />,
    href: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${u}`,
  },
  {
    key: 'reddit', label: 'Reddit', color: '#FF4500',
    icon: <RedditAlien size={24} />,
    href: (u: string, t: string) => `https://www.reddit.com/submit?url=${u}&title=${t}`,
  },
  {
    key: 'whatsapp', label: 'WhatsApp', color: '#25D366',
    icon: <WhatsAppGlyph size={24} />,
    href: (u: string, t: string) => `https://wa.me/?text=${t}%20${u}`,
  },
];

/** Opens the Figma share dialog. `icon` is the square control in a report
 *  header; `action` is the inline Share button used on cards. Pass `url` to
 *  share a specific item rather than the page being viewed. */
export function ShareButton({ title, url, variant = 'icon' }: {
  title: string; url?: string; variant?: 'icon' | 'action';
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {variant === 'icon' ? (
        <button className="btn btn--icon" type="button" aria-label="Share" aria-haspopup="dialog"
                onClick={() => setOpen(true)}>
          <ArrowUpRight size={16} />
        </button>
      ) : (
        <button className="iaction" type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}>
          <Share size={20} /> Share
        </button>
      )}
      {open && <ShareDialog title={title} url={url} onClose={() => setOpen(false)} />}
    </>
  );
}

function ShareDialog({ title, url: href, onClose }: {
  title: string; url?: string; onClose: () => void;
}) {
  const [url, setUrl] = React.useState('');
  const [note, setNote] = React.useState('');
  const panel = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const field = React.useRef<HTMLInputElement>(null);

  /* Resolved on open — a card shares its own item, a header shares the page. */
  React.useEffect(() => {
    setUrl(href ? new URL(href, window.location.origin).href : window.location.href);
  }, [href]);

  React.useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  /* The Clipboard API needs a secure origin and a focused document, so it can
     reject on a plain-http deploy. Fall back to selecting the field, then tell
     the reader what to press rather than failing silently. */
  const copy = async () => {
    const say = (m: string) => { setNote(m); setTimeout(() => setNote(''), 2200); };
    try {
      await navigator.clipboard.writeText(url);
      say('Link copied');
      return;
    } catch { /* fall through */ }

    field.current?.select();
    try {
      if (document.execCommand('copy')) { say('Link copied'); return; }
    } catch { /* fall through */ }
    say('Press Ctrl+C to copy');
  };

  const enc = encodeURIComponent(url);
  const encTitle = encodeURIComponent(title);

  return (
    <div className="sharescrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sharedlg" role="dialog" aria-modal="true" aria-labelledby="share-title" ref={panel}>
        <button className="sharedlg__x" type="button" aria-label="Close" ref={closeRef} onClick={onClose}>×</button>

        <div className="sharedlg__head">
          <h2 id="share-title" className="sharedlg__title">Share this article</h2>
          <p className="sharedlg__sub">If you like this article share it with your friends.</p>
        </div>

        <ul className="sharedlg__targets">
          {TARGETS.map((t) => (
            <li key={t.key}>
              <a
                className="sharedlg__target"
                href={t.href(enc, encTitle)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ['--brand' as string]: t.color }}
              >
                <span className="sharedlg__disc" aria-hidden>{t.icon}</span>
                <span className="sharedlg__label">{t.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="sharedlg__url">
          <input ref={field} readOnly value={url} aria-label="Article link"
                 onFocus={(e) => e.currentTarget.select()} />
          <button type="button" onClick={copy} aria-label="Copy link" title="Copy link">
            <Copy size={16} />
          </button>
        </div>
        <span className="sharedlg__copied" role="status">{note}</span>
      </div>
    </div>
  );
}
