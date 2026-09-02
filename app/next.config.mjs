/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',        // emits plain HTML into ./out — open directly in a browser
  optimizeFonts: false,    // don't inline Google Fonts at build time
  images: { unoptimized: true },
};
export default nextConfig;
