import React from 'react';
import Link from 'next/link';
import { getToolsByCluster } from '@/config/tools';
import { getGuidesByCluster } from '@/config/guides';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { Trees, ArrowRight, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Garden & Outdoor Calculators - Gravel, Mulch, Soil, Turf & Patios',
  description: 'Calculate tons of crushed gravel, mulch yards/bags, raised bed soil, sod pallets, fence pickets, and interlocking paver patios.',
};

export default function GardenClusterPage() {
  const tools = getToolsByCluster('garden');
  const guides = getGuidesByCluster('garden');

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs
          items={[
            { name: 'Calculators', href: '/calculators' },
            { name: 'Garden & Outdoors', href: '/calculators/garden' },
          ]}
        />

        <div className="max-w-3xl my-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold mb-3 border border-green-200">
            <Trees className="w-3.5 h-3.5" />
            <span>Landscaping & Outdoor Living Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Garden & Outdoor Calculators
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Plan hardscaping and landscaping projects with precision.
            Calculate gravel tons, bulk mulch cubic yards, organic topsoil bags, sod rolls, privacy fences, and paver patio bases.
          </p>
        </div>

        <AdSlot placement="header" />

        <div className="my-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
            Landscaping & Outdoor Suite ({tools.length} Tools)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.slug}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-green-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-semibold text-green-600 uppercase tracking-wider text-[10px]">
                      Outdoor Suite
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium text-[10px]">
                      In Registry
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{tool.name}</h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {tool.benefit}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 font-mono">
                    {tool.formula}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {guides.length > 0 && (
          <div className="my-12 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xl border-b border-slate-100 pb-3">
              <BookOpen className="w-5 h-5 text-green-600" />
              <h2>Hardscaping & Landscape Guides</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="p-4 rounded-xl border border-slate-200 hover:border-green-500 hover:bg-green-50/20 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {guide.summary}
                    </p>
                  </div>
                  <div className="mt-4 text-xs font-bold text-green-600 flex items-center justify-between">
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
