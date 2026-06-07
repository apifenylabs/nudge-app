import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion", "@vercel/analytics", "@vercel/speed-insights"],
  },
};

export default nextConfig;
