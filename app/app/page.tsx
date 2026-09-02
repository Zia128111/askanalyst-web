import { redirect } from 'next/navigation';
/* The library is the landing screen, matching where the `Research Report` nav
   item goes — the two used to disagree, with `/` opening a single report. */
export default function Home() { redirect('/research'); }
// note: static export keeps this as a client-side redirect stub
