import React from 'react';
import { createMetadata, generateBreadcrumbSchema, generateCollectionSchema } from '@/lib/seo';
import Link from 'next/link';
import { guidesRegistry } from '@/config/guides';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { BookOpen, Clock, Calendar, ArrowRight, CheckCircle2, ShieldCheck, Wrench, Layers, Ruler, FileCheck } from 'lucide-react';
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

        {/* Educational Methodology & Planning Section */}
        <div className="my-12 p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              The Science of Material Takeoffs: Why Renovation Math Matters
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bridging the gap between theoretical blueprints and physical job-site execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Ruler className="w-4 h-4 text-emerald-600" />
                Waste Factors & Layout Geometry
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Material waste is not random scrap; it is directly governed by room geometry and pattern angle. Straight plank flooring produces reusable offcuts, keeping waste around 10%. In contrast, 45-degree diagonal lines or herringbone miters produce unusable triangular end cuts, requiring 15% to 20% waste buffer.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Layers className="w-4 h-4 text-emerald-600" />
                Mortar & Thinset Thickness Physics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Trowel notch depth dictates the final collapsed mortar bed thickness beneath ceramic and porcelain tiles. Using undersized notches leads to hollow tiles that crack under impact, while oversized notches cause mortar to squeeze through grout joints, creating hours of tedious cleanup.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Wrench className="w-4 h-4 text-emerald-600" />
                Concrete Hydration vs Drying
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Concrete achieves compressive strength through a continuous chemical reaction between water and Portland cement crystals. Maintaining moisture for 7 days attains 70% of design strength, whereas premature evaporation permanently weakens slabs and causes unsightly surface crazing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Packaging Rules & Dye-Lot Integrity
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Flooring, drywall, and tiles are packaged in discrete unit batches. Calculating exact net area and dividing by carton yield ensures you order full cartons with matched dye lots, avoiding noticeable shade differences between production batches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
