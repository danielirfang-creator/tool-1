import { toolsRegistry } from '@/config/tools';
import { guidesRegistry } from '@/config/guides';
import { siteConfig } from '@/config/site';

export async function GET() {
  const baseUrl = siteConfig.url;

  // Curated static indexable pages (Excluding /search and utility non-indexables)
  const staticRoutes = [
    { path: '', priority: '1.0', changefreq: 'daily', lastmod: '2026-09-02' },
    { path: '/calculators', priority: '0.9', changefreq: 'weekly', lastmod: '2026-09-02' },
    { path: '/calculators/flooring', priority: '0.8', changefreq: 'weekly', lastmod: '2026-09-02' },
    { path: '/calculators/painting', priority: '0.8', changefreq: 'weekly', lastmod: '2026-09-02' },
    { path: '/calculators/concrete-masonry', priority: '0.8', changefreq: 'weekly', lastmod: '2026-09-02' },
    { path: '/calculators/garden', priority: '0.8', changefreq: 'weekly', lastmod: '2026-09-02' },
    { path: '/calculators/rooms', priority: '0.8', changefreq: 'weekly', lastmod: '2026-09-02' },
    { path: '/calculators/conversions', priority: '0.8', changefreq: 'weekly', lastmod: '2026-09-02' },
    { path: '/guides', priority: '0.8', changefreq: 'weekly', lastmod: '2026-09-02' },
    { path: '/resources', priority: '0.7', changefreq: 'monthly', lastmod: '2026-09-02' },
    { path: '/about', priority: '0.6', changefreq: 'monthly', lastmod: '2026-09-02' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly', lastmod: '2026-09-02' },
    { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly', lastmod: '2026-09-02' },
    { path: '/cookie-policy', priority: '0.3', changefreq: 'yearly', lastmod: '2026-09-02' },
    { path: '/terms', priority: '0.3', changefreq: 'yearly', lastmod: '2026-09-02' },
    { path: '/disclaimer', priority: '0.3', changefreq: 'yearly', lastmod: '2026-09-02' },
    { path: '/sitemap', priority: '0.5', changefreq: 'weekly', lastmod: '2026-09-02' },
  ];

  const liveTools = toolsRegistry.filter((t) => t.status === 'live');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('')}
  ${liveTools
    .map(
      (tool) => `
  <url>
    <loc>${baseUrl}${tool.clusterHref}/${tool.slug}</loc>
    <lastmod>2026-09-02</lastmod>
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
