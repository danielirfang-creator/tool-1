import React from 'react';
import Link from 'next/link';
import { getToolsByCluster } from '@/config/tools';
import { getGuidesByCluster } from '@/config/guides';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { Paintbrush, ArrowRight, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Painting Calculators - Wall, Ceiling, Primer & Coverage Estimators',
  description: 'Calculate paint gallons, primer requirements, window/door deductions, and multi-coat spread rates for interior and exterior painting projects.',
};

export default function PaintingClusterPage() {
  const tools = getToolsByCluster('painting');
  const guides = getGuidesByCluster('painting');

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs
          items={[
            { name: 'Calculators', href: '/calculators' },
            { name: 'Painting', href: '/calculators/painting' },
          ]}
        />

        <div className="max-w-3xl my-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3 border border-blue-200">
            <Paintbrush className="w-3.5 h-3.5" />
            <span>Painting & Wall Coating Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Painting & Primer Calculators
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Estimate exact gallon cans, quarts, and 5-gallon pails for walls, ceilings, and trim.
            Includes automatic architectural deductions for standard windows, doors, and drywall absorption factors.
          </p>
        </div>

        <AdSlot placement="header" />

        <div className="my-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
            Painting Tools ({tools.length} Calculators)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`${tool.clusterHref}/${tool.slug}`}
                className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-bold text-blue-600 uppercase tracking-wider text-[10px]">
                      Painting Suite
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Live Calculator
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {tool.benefit}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-500 font-mono mb-3">
                    {tool.formula}
                  </div>
                  <div className="flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>Launch Calculator</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {guides.length > 0 && (
          <div className="my-12 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xl border-b border-slate-100 pb-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2>Painting Advice & Guides</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {guide.summary}
                    </p>
                  </div>
                  <div className="mt-4 text-xs font-bold text-blue-600 flex items-center justify-between">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
