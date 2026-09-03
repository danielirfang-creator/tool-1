import { siteConfig } from '@/config/site';

export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /search
Disallow: /api/

Sitemap: ${siteConfig.url}/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
