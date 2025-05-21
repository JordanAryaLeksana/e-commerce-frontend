/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'itdevecs2025-2026.github.io',
        pathname: '/Images-frontend/**',
      },
    ],
  },
};

export default nextConfig;
