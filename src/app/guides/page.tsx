import React from 'react';
import { createMetadata, generateBreadcrumbSchema, generateCollectionSchema } from '@/lib/seo';
import Link from 'next/link';
import { guidesRegistry } from '@/config/guides';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { BookOpen, Clock, Calendar, ArrowRight, CheckCircle2, ShieldCheck, Wrench } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata = createMetadata({
  title: 'DIY Planning & Material Estimating Guides',
  description: 'Expert trade guides, waste margin calculations, and material takeoff tutorials written by experienced builders and renovators.',
  path: '/guides'
});

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
            DIY Material Estimation & Trade Guides
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Detailed, research-backed guides on estimating formulas, waste margins, trowel sizes, concrete hydration, and material physics written by seasoned trade professionals.
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

        {/* Editorial Standards Overview */}
        <div className="my-12 p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-slate-700 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">
            About Our Trade Educational Library
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every renovation guide in the CraftCalc library is authored to bridge the gap between complex architectural engineering standards and practical on-site trade execution. Whether calculating diagonal flooring waste percentages, selecting ANSI A118 polymer-modified thinset mortars, or preparing multi-layered paver patio subbases, our mission is to eliminate material waste and prevent expensive remodeling callbacks.
          </p>
        </div>
      </div>
    </div>
  );
}
