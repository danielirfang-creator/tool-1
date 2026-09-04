import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata = createMetadata({
  title: 'Search All DIY Calculators & Tools',
  description: 'Search our complete index of 33 professional material calculators, unit converters, and trade estimation guides.',
  path: '/search', noIndex: true
});

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
