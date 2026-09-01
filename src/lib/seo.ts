import { siteConfig } from '@/config/site';

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
      item: item.item.startsWith('http') ? item.item : siteConfig.url + item.item,
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
    '@type': 'SoftwareApplication',
    name,
    description,
    url: url.startsWith('http') ? url : siteConfig.url + url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export interface HowToStep {
  name: string;
  text: string;
}

export function generateHowToSchema(name: string, description: string, steps: HowToStep[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
