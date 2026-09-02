/* Next reads this as a function so it can see which phase it is running in.
   `phase-production-build` is the literal value of `PHASE_PRODUCTION_BUILD`
   from `next/constants`, inlined to keep this file import-free. */
const PRODUCTION_BUILD = 'phase-production-build';

/** @type {(phase: string) => import('next').NextConfig} */
export default (phase) => ({
  reactStrictMode: true,
  output: 'export',        // emits plain HTML into ./out — open directly in a browser
  optimizeFonts: false,    // don't inline Google Fonts at build time
  images: { unoptimized: true },

  /* `next build` and `next dev` used to share `.next`, so building while a dev
     server was up wiped its CSS chunk and the app served unstyled with
     `layout.css` 404ing — a "CSS regression" that was really a clobbered dev
     build. Pointing the production build at its own directory removes the
     collision: builds and dev servers now run at the same time, including from
     two different sessions on this folder.

     With `output: 'export'` the build writes the finished static site into
     `distDir` itself, so naming it `out` puts the export exactly where this
     project has always expected it — and leaves `.next` to the dev server. */
  distDir: phase === PRODUCTION_BUILD ? 'out' : '.next',
});
