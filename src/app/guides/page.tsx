import React from 'react';
import Link from 'next/link';
import { guidesRegistry } from '@/config/guides';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { generateBreadcrumbSchema, generateCollectionSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'DIY & Home Renovation Estimating Guides - CraftCalc',
  description: 'In-depth contractor guides to calculating flooring waste, thinset trowel sizes, laminate expansion gaps, and paint sheen selection.',
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'DIY & Home Renovation Estimating Guides | CraftCalc',
    description: 'In-depth contractor guides to calculating flooring waste, thinset trowel sizes, laminate expansion gaps, and paint sheen selection.',
    url: `${siteConfig.url}/guides`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DIY & Home Renovation Estimating Guides | CraftCalc',
    description: 'In-depth contractor guides to calculating flooring waste, thinset trowel sizes, laminate expansion gaps, and paint sheen selection.',
  },
};

export default function GuidesIndexPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Guides', item: '/guides' },
  ]);

  const collectionSchema = generateCollectionSchema({
    name: 'CraftCalc Material Estimating Guides',
    description: 'Educational articles on building material math, waste percentages, and installation planning.',
    url: '/guides',
    items: guidesRegistry.map((g) => ({
      name: g.title,
      url: `/guides/${g.slug}`,
      description: g.summary,
    })),
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Guides', href: '/guides' }]} />

        {/* Hero */}
        <div className="max-w-3xl my-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Contractor Reference Library</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            DIY Material Estimation Guides
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Detailed, research-backed guides on estimating formulas, waste margins, trowel sizes, and material physics.
          </p>
        </div>

        <AdSlot placement="header" />

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {guidesRegistry.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-bold text-emerald-600 uppercase tracking-wider">
                    {guide.clusterName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {guide.readTime}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                  {guide.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {guide.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                <span>Read Full Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
