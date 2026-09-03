import { siteConfig } from '@/config/site';

export function buildCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/' || cleanPath === '') {
    return siteConfig.url;
  }
  return `${siteConfig.url}${cleanPath.replace(/\/$/, '')}`;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item.startsWith('http') ? item.item : buildCanonicalUrl(item.item),
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function generateFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export interface CalculatorAppSchemaProps {
  name: string;
  description: string;
  url: string;
  category: string;
}

export function generateCalculatorSchema({ name, description, url, category }: CalculatorAppSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: buildCanonicalUrl(url),
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/og-image.png`,
    },
  };
}

export interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  readTime: string;
  clusterName: string;
  keywords?: string[];
}

export function generateArticleSchema({
  title,
  description,
  url,
  publishedDate,
  readTime,
  clusterName,
  keywords,
}: ArticleSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: buildCanonicalUrl(url),
    datePublished: publishedDate,
    dateModified: publishedDate,
    articleSection: clusterName,
    keywords: keywords ? keywords.join(', ') : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': buildCanonicalUrl(url),
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/og-image.png`,
      },
    },
    image: `${siteConfig.url}/og-image.png`,
  };
}

export interface CollectionSchemaProps {
  name: string;
  description: string;
  url: string;
  items: Array<{ name: string; url: string; description?: string }>;
}

export function generateCollectionSchema({ name, description, url, items }: CollectionSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: buildCanonicalUrl(url),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        url: buildCanonicalUrl(item.url),
        description: item.description,
      })),
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/og-image.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/og-image.png`,
    description: siteConfig.description,
    sameAs: [
      'https://github.com/danielirfang-creator/tool-1',
    ],
  };
}

export function generateAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${siteConfig.name}`,
    description: siteConfig.description,
    url: buildCanonicalUrl('/about'),
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/og-image.png`,
    },
  };
}

export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${siteConfig.name}`,
    description: 'Get in touch with the CraftCalc editorial and engineering team for formula feedback and inquiries.',
    url: buildCanonicalUrl('/contact'),
  };
}
