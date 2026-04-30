import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Claudinary configurations
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  },

  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/static/:path*`,
      },
      {
        source: '/ingest/:path*',
        destination: `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/:path*`,
      },
    ]
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
