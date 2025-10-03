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
  // Allow Cloudflare tunnel dev origins
  allowedDevOrigins: [
    'tomorrow-travelling-tap-round.trycloudflare.com',
  ],
};

export default nextConfig;
