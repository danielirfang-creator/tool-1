import { toolsRegistry } from '@/config/tools';
import { guidesRegistry } from '@/config/guides';
import { siteConfig } from '@/config/site';

export async function GET() {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    '',
    '/calculators',
    '/calculators/flooring',
    '/calculators/painting',
    '/calculators/concrete-masonry',
    '/calculators/garden',
    '/calculators/rooms',
    '/calculators/conversions',
    '/guides',
    '/resources',
    '/search',
    '/about',
    '/contact',
    '/privacy-policy',
    '/cookie-policy',
    '/terms',
    '/disclaimer',
    '/sitemap',
  ];

  const liveTools = toolsRegistry.filter((t) => t.status === 'live');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
  ${liveTools
    .map(
      (tool) => `
  <url>
    <loc>${baseUrl}${tool.clusterHref}/${tool.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    )
    .join('')}
  ${guidesRegistry
    .map(
      (guide) => `
  <url>
    <loc>${baseUrl}/guides/${guide.slug}</loc>
    <lastmod>${guide.publishedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
