/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/guides/:slug*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
        },
      ],
    },
    {
      source: '/contact',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
        },
      ],
    },
    {
      source: '/calculators/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
        },
      ],
    },
  ],
};

export default nextConfig;
