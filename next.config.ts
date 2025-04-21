import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://abc.pehlighiza.akdndhrc.com/api/:path*',
      },
    ];
  },
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  
};

export default nextConfig;
