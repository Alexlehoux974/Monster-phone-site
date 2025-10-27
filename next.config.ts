import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Allow Cloudflare tunnel and direct IP dev origins
  allowedDevOrigins: [
    'tomorrow-travelling-tap-round.trycloudflare.com',
    '193.203.191.71',
  ],
  // Headers pour contrôler le cache
  async headers() {
    return [
      {
        // Pages produits - désactiver le cache
        source: '/produit-supabase/:slug',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
        ],
      },
      {
        // API routes produits - cache court avec revalidation
        source: '/api/products/:slug',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=120',
          },
        ],
      },
      {
        // API similar products - cache court
        source: '/api/similar-products',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=120',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
