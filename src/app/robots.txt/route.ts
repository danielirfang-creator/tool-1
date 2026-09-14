import { siteConfig } from '@/config/site';

export async function GET() {
  const robots = `# AI Search Engines & LLM Crawlers (Explicit Permissions)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: cohere-ai
Allow: /

# SEO & Audit Crawlers (Polite Rate Limits to prevent timeouts)
User-agent: AhrefsSiteAudit
Allow: /
Crawl-delay: 2

User-agent: AhrefsBot
Allow: /
Crawl-delay: 2

User-agent: SemrushBot
Allow: /
Crawl-delay: 2

User-agent: SemrushBot-SA
Allow: /
Crawl-delay: 2

User-agent: DotBot
Allow: /
Crawl-delay: 2

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# General Search Crawlers
User-agent: *
Allow: /
Disallow: /api/
Disallow: /search

Sitemap: ${siteConfig.url}/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
