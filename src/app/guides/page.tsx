import React from 'react';
import Link from 'next/link';
import { guidesRegistry } from '@/config/guides';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { BookOpen, Clock, ArrowRight, Check } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Improvement Guides & Material Estimating Advice',
  description: 'Expert trade guides for estimating material quantities, calculating cutting waste, choosing paint sheens, selecting tile trowels, and curing concrete.',
};

export default function GuidesIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Guides', href: '/guides' }]} />

        <div className="max-w-3xl my-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Contractor Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-1">
            DIY & Home Improvement Guides
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Practical, in-depth articles written to explain the mathematical rules, material tolerances,
            and real-world trade secrets behind accurate project planning.
          </p>
        </div>

        <AdSlot placement="header" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {guidesRegistry.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-semibold text-emerald-600 uppercase tracking-wider text-[10px]">
                    {guide.clusterName}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    {guide.readTime}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                  {guide.title}
                </h2>
                <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                  {guide.summary}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Key Takeaway:</span>
                  <p className="text-xs text-slate-700 line-clamp-2">
                    {guide.keyTakeaways[0]}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center justify-between">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
