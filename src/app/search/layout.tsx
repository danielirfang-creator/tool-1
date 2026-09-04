import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Search All DIY Calculators & Tools',
  description: 'Search and find free material calculators for flooring, tile, paint, concrete, garden, and room renovations on CraftCalc.',
  alternates: {
    canonical: '/search',
  },
  openGraph: {
    title: 'Search All DIY Calculators & Tools | CraftCalc',
    description: 'Search and find free material calculators for flooring, tile, paint, concrete, garden, and room renovations on CraftCalc.',
    url: `${siteConfig.url}/search`,
    type: 'website',
  },
  twitter: {
    title: 'Search All DIY Calculators & Tools | CraftCalc',
    description: 'Search and find free material calculators for flooring, tile, paint, concrete, garden, and room renovations on CraftCalc.',
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
