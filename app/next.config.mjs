/* Next reads this as a function so it can see which phase it is running in.
   `phase-production-build` is the literal value of `PHASE_PRODUCTION_BUILD`
   from `next/constants`, inlined to keep this file import-free. */
const PRODUCTION_BUILD = 'phase-production-build';

/* Two `next dev` processes on this folder used to share `.next` and overwrite
   each other's chunks, which surfaces as `Cannot find module './819.js'` and
   webpack `ENOENT` rename errors — both servers 500 and neither recovers without
   a restart. A dev server started on a non-default port is a second session, so
   it gets its own directory and the plain `npm run dev` keeps `.next`.

   The name is fixed rather than per-port on purpose: Next appends the dist dir's
   types path to `tsconfig.json` include, so a per-port name would add a fresh
   line for every port ever used. One stable name means one committed line. A
   third concurrent dev server would collide with the second — at that point,
   stop one. */
const devDistDir = process.env.PORT && process.env.PORT !== '3000'
  ? '.next-dev-alt'
  : '.next';

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
     collision, so a build and a dev server can now run at the same time.

     With `output: 'export'` the build writes the finished static site into
     `distDir` itself, so naming it `out` puts the export exactly where this
     project has always expected it — and leaves `.next` to the dev server. */
  distDir: phase === PRODUCTION_BUILD ? 'out' : devDistDir,
});
