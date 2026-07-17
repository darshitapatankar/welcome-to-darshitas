import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [{ hostname: "framerusercontent.com" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
