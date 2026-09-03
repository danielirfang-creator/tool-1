import React from 'react';
import Link from 'next/link';
import { getToolsByCluster } from '@/config/tools';
import { getGuidesByCluster } from '@/config/guides';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { ArrowRightLeft, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import { generateBreadcrumbSchema, generateCollectionSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Construction Trade Converters - Feet, Meters, Sq Ft, Liters & Gallons',
  description: 'Instant 2-way trade conversion tools for building materials. Convert feet to meters, inches to mm, square feet to square meters, liters to gallons.',
  alternates: {
    canonical: '/calculators/conversions',
  },
  openGraph: {
    title: 'Construction Trade Converters - Feet, Meters, Sq Ft, Liters & Gallons | CraftCalc',
    description: 'Instant 2-way trade conversion tools for building materials. Convert feet to meters, inches to mm, square feet to square meters, liters to gallons.',
    url: `${siteConfig.url}/calculators/conversions`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Construction Trade Converters - Feet, Meters, Sq Ft, Liters & Gallons | CraftCalc',
    description: 'Instant 2-way trade conversion tools for building materials. Convert feet to meters, inches to mm, square feet to square meters, liters to gallons.',
  },
};

export default function ConversionsClusterPage() {
  const tools = getToolsByCluster('conversions');
  const guides = getGuidesByCluster('conversions');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Calculators', item: '/calculators' },
    { name: 'Construction Trade Converters', item: '/calculators/conversions' },
  ]);

  const collectionSchema = generateCollectionSchema({
    name: 'Construction Trade Converters - Feet, Meters, Sq Ft, Liters & Gallons',
    description: 'Instant 2-way trade conversion tools for building materials. Convert feet to meters, inches to mm, square feet to square meters, liters to gallons.',
    url: '/calculators/conversions',
    items: tools.map((t) => ({
      name: t.name,
      url: `${t.clusterHref}/${t.slug}`,
      description: t.benefit,
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
        <Breadcrumbs
          items={[
            { name: 'Calculators', href: '/calculators' },
            { name: 'Construction Trade Converters', href: '/calculators/conversions' },
          ]}
        />

        {/* Cluster Hero */}
        <div className="max-w-3xl my-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Topical Cluster Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Construction & Trade Unit Converters
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Instant 2-way trade conversion tools for building materials. Convert feet to meters, inches to mm, square feet to square meters, liters to gallons.
          </p>
        </div>

        <AdSlot placement="header" />

        {/* Cluster Tools Grid */}
        <div className="my-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
            Calculators in this Suite ({tools.length} Tools)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`${tool.clusterHref}/${tool.slug}`}
                className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-bold text-emerald-600 uppercase tracking-wider">
                      {tool.clusterName}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Live Calculator
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {tool.benefit}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                    Launch Calculator →
                  </span>
                  <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Cluster Guides Section */}
        {guides.length > 0 && (
          <div className="my-12 pt-8 border-t border-slate-200">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
              Expert Guides for Construction Trade Converters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="p-5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {guide.readTime} • Published {guide.publishedDate}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
