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
};

export default nextConfig;
