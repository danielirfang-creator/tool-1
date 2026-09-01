import React from 'react';
import Link from 'next/link';
import { getToolsByCluster } from '@/config/tools';
import { getGuidesByCluster } from '@/config/guides';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { Layers, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flooring Calculators - Hardwood, Tile, Laminate & Waste Estimators',
  description: 'Complete suite of professional flooring calculators. Calculate square footage, box quantities, tile layouts, laminate underlayment, and waste buffers.',
};

export default function FlooringClusterPage() {
  const tools = getToolsByCluster('flooring');
  const guides = getGuidesByCluster('flooring');

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs
          items={[
            { name: 'Calculators', href: '/calculators' },
            { name: 'Flooring', href: '/calculators/flooring' },
          ]}
        />

        {/* Cluster Hero */}
        <div className="max-w-3xl my-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <Layers className="w-3.5 h-3.5" />
            <span>Topical Cluster Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Flooring Calculators & Estimation Tools
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Eliminate material shortages and box calculation errors. Whether you are laying engineered hardwood,
            large-format porcelain tile, click-lock laminate, luxury vinyl plank, or broadloom carpet,
            these contractor-verified calculators give exact purchase quantities.
          </p>
        </div>

        <AdSlot placement="header" />

        {/* Cluster Tools Grid */}
        <div className="my-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
            Flooring Calculators ({tools.length} Tools)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.slug}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-semibold text-emerald-600 uppercase tracking-wider text-[10px]">
                      Flooring Suite
                    </span>
                    {tool.status === 'live' ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                        Live Tool
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium text-[10px]">
                        Roadmap
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    <Link
                      href={tool.status === 'live' ? `/calculators/flooring/${tool.slug}` : '#'}
                      className="hover:text-emerald-700 transition-colors"
                    >
                      {tool.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {tool.benefit}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  {tool.status === 'live' ? (
                    <Link
                      href={`/calculators/flooring/${tool.slug}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>Open Calculator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <div className="text-xs text-center text-slate-400 font-medium py-2 bg-slate-50 rounded-xl">
                      Formula in Launch Registry
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supporting Flooring Guides */}
        {guides.length > 0 && (
          <div className="my-12 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xl border-b border-slate-100 pb-3">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h2>Essential Flooring Installation Guides</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/20 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {guide.summary}
                    </p>
                  </div>
                  <div className="mt-4 text-xs font-bold text-emerald-600 flex items-center justify-between">
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
