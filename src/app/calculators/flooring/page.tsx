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
              <Link
                key={tool.slug}
                href={`${tool.clusterHref}/${tool.slug}`}
                className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-bold text-emerald-600 uppercase tracking-wider text-[10px]">
                      Flooring Suite
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Live Calculator
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {tool.benefit}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                    <span>Launch Calculator</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
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
