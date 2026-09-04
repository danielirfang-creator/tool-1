import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { toolsRegistry } from '@/config/tools';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { Hammer, Layers, Paintbrush, Trees, Home, ArrowRightLeft, ArrowRight, Check } from 'lucide-react';
import type { Metadata } from 'next';
import { generateBreadcrumbSchema, generateCollectionSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'All 33 DIY Project Calculators',
  description: 'Browse all 33 professional DIY calculators across Flooring, Painting, Concrete, Garden, Rooms, and Unit Conversions with exact material estimators.',
  alternates: {
    canonical: '/calculators',
  },
  openGraph: {
    title: 'All 33 DIY Project Calculators | CraftCalc',
    description: 'Browse all 33 professional DIY calculators across Flooring, Painting, Concrete, Garden, Rooms, and Unit Conversions with exact material estimators.',
    url: `${siteConfig.url}/calculators`,
    type: 'website',
  },
  twitter: {
    title: 'All 33 DIY Project Calculators | CraftCalc',
    description: 'Browse all 33 professional DIY calculators across Flooring, Painting, Concrete, Garden, Rooms, and Unit Conversions.',
  },
};

export default function CalculatorsHubPage() {
  const clusterIcons: Record<string, React.ReactNode> = {
    flooring: <Layers className="w-5 h-5 text-emerald-600" />,
    painting: <Paintbrush className="w-5 h-5 text-blue-600" />,
    'concrete-masonry': <Hammer className="w-5 h-5 text-amber-600" />,
    garden: <Trees className="w-5 h-5 text-green-600" />,
    rooms: <Home className="w-5 h-5 text-purple-600" />,
    conversions: <ArrowRightLeft className="w-5 h-5 text-indigo-600" />,
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Calculators', item: '/calculators' },
  ]);

  const collectionSchema = generateCollectionSchema({
    name: 'CraftCalc DIY Calculators Directory',
    description: 'Complete directory of 33 trade-grade home improvement calculators.',
    url: '/calculators',
    items: toolsRegistry.map((t) => ({
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
        <Breadcrumbs items={[{ name: 'Calculators', href: '/calculators' }]} />

        {/* Header Hero */}
        <div className="max-w-3xl my-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Complete Tool Index
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-1">
            Home Improvement Calculators
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Choose from our 33 specialized calculators organized into 6 topical clusters.
            Every tool is client-side, privacy-focused, and verified with professional construction standards.
          </p>
        </div>

        <AdSlot placement="header" />

        {/* 6 Category Clusters List */}
        <div className="space-y-12 mt-8">
          {siteConfig.navigation.clusters.map((cluster) => {
            const clusterKey = cluster.href.split('/').pop() || '';
            const clusterTools = toolsRegistry.filter((t) => t.cluster === clusterKey);

            return (
              <section key={cluster.name} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                      {clusterIcons[clusterKey] || <Hammer className="w-5 h-5 text-emerald-600" />}
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        {cluster.name} Calculators
                      </h2>
                      <p className="text-xs text-slate-500">{cluster.description}</p>
                    </div>
                  </div>
                  <Link
                    href={cluster.href}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>View Category Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clusterTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={tool.status === 'live' ? `${tool.clusterHref}/${tool.slug}` : tool.clusterHref}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                            {tool.clusterName}
                          </span>
                          {tool.status === 'live' ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                              Live Calculator
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium text-[10px]">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                          {tool.benefit}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                        <span>{tool.status === 'live' ? 'Launch Tool' : 'Category Details'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
