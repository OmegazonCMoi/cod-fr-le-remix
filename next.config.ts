import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['hackoncod.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3000',
        pathname: '/images/**', 
      },
    ],
  },
};

export default nextConfig;
