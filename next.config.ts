import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimasi Image
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression
  compress: true,

  // Optimasi bundle
  productionBrowserSourceMaps: false,

  // Experimental optimizations
  experimental: {
    optimizePackageImports: ['@react-icons'],
  },
};

export default nextConfig;
