import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The development badge sits directly over the portfolio's fixed mobile
  // contact bar. Compile and runtime errors are still surfaced by Next.js.
  devIndicators: false,
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [{ hostname: "framerusercontent.com" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
