import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Search DIY Calculators & Renovation Guides - CraftCalc',
  description: 'Search through 33 trade-grade home improvement calculators and comprehensive material estimating guides.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/search',
  },
  openGraph: {
    title: 'Search DIY Calculators & Renovation Guides | CraftCalc',
    description: 'Search through 33 trade-grade home improvement calculators and comprehensive material estimating guides.',
    url: `${siteConfig.url}/search`,
    type: 'website',
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
