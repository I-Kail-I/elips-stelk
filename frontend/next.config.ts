import type { NextConfig } from 'next';

const API_URL: string = process.env.NEXT_PUBLIC_API_URL ?? '';
const API_PREFIX: string = process.env.NEXT_PUBLIC_API_PREFIX ?? '';

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: `${API_PREFIX}/:path*`,
        destination: `${API_URL}/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/api/uploads_folder/**',
      },
    ],
  },
};

export default nextConfig;
