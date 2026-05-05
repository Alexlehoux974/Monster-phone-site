import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Cloudinary fait déjà l'optimisation (f_auto,q_auto). On bypasse /_next/image
    // pour ne pas consommer le quota Vercel Image Optimization (5000 srcs/mois sur free)
    // qui retournait 402 et cassait l'affichage des images sur tout le site.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Allow Cloudflare tunnel for dev origins (IP removed for security)
  allowedDevOrigins: [
    'tomorrow-travelling-tap-round.trycloudflare.com',
  ],
  // Cache client-side : 60s dynamique, 5 min statique (ISR gère le server-side)
  experimental: {
    staleTimes: {
      dynamic: 60,
      static: 300,
    },
  },
  // Headers pour contrôler le cache
  async headers() {
    return [
      {
        // Pages produits statiques - désactiver COMPLÈTEMENT le cache
        source: '/produit/:slug',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'no-store',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'no-store',
          },
        ],
      },
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
        // API routes produits - AUCUN cache
        source: '/api/products/:slug',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      {
        // API similar products - AUCUN cache
        source: '/api/similar-products',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
// Force rebuild: Clear ALL Vercel cache - Thu Nov 14 2025 13:00:00 UTC
