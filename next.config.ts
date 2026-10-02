import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Gzip/Brotli compression for all text assets
  compress: true,

  // Remove X-Powered-By header for security and byte savings
  poweredByHeader: false,

  // Image optimization with modern formats and caching
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },

  // Tree-shake large packages automatically for smaller client bundles
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // Cache headers for static assets and images
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/logo-transparent.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

