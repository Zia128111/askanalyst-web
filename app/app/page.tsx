import { redirect } from 'next/navigation';
export default function Home() { redirect('/research/market'); }
// note: static export keeps this as a client-side redirect stub
