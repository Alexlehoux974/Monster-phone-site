import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/Alexlehoux974/Monster-Phone-Images/**',
      },
    ],
  },
};

export default nextConfig;
