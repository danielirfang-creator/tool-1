import React from 'react';
import { createMetadata, generateBreadcrumbSchema, generateCollectionSchema } from '@/lib/seo';
import Link from 'next/link';
import { getToolsByCluster } from '@/config/tools';
import { getGuidesByCluster } from '@/config/guides';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { Layers, ArrowRight, CheckCircle2, Ruler, ShieldCheck, Box } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata = createMetadata({
  title: 'Flooring Calculators & Waste Estimators',
  description: 'Precision flooring calculators for tile, hardwood, laminate, vinyl, grout, and subfloor materials with contractor waste margins.',
  path: '/calculators/flooring'
});

export default function FlooringClusterPage() {
  const tools = getToolsByCluster('flooring');
  const guides = getGuidesByCluster('flooring');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Calculators', item: '/calculators' },
    { name: 'Flooring Calculators', item: '/calculators/flooring' },
  ]);

  const collectionSchema = generateCollectionSchema({
    name: 'Flooring Calculators - Hardwood, Tile, Laminate & Grout Estimators',
    description: 'Contractor-grade flooring calculators. Estimate square footage, waste margins, tile layout patterns, grout bags, and underlayment rolls.',
    url: '/calculators/flooring',
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
            { name: 'Flooring Calculators', href: '/calculators/flooring' },
          ]}
        />

        {/* Cluster Hero */}
        <div className="max-w-3xl my-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <Layers className="w-3.5 h-3.5" />
            <span>Topical Cluster Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Flooring Calculators & Material Takeoff Tools
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Contractor-grade flooring calculators. Estimate square footage, waste margins, tile layout patterns, grout bags, and underlayment rolls with total precision.
          </p>
        </div>

        <AdSlot placement="header" />

        {/* Cluster Tools Grid */}
        <div className="my-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
            All Flooring Calculators ({tools.length} Tools)
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

        {/* Contractor Estimating Editorial Section */}
        <div className="my-12 p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Flooring Estimating Standards & Installation Physics
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Field takeoff practices for tile, hardwood, luxury vinyl plank (LVP), and laminate floors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Ruler className="w-4 h-4 text-emerald-600" />
                Waste Percentages by Layout Pattern
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard straight plank installations require an extra 10% allowance to compensate for end-of-row cuts and starter pieces. Diagonal 45-degree layouts require 15% due to non-reusable triangular edge scrap. Complex herringbone, chevron, or basketweave parquet patterns require 18% to 20% waste buffer.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Box className="w-4 h-4 text-emerald-600" />
                Carton Sizing & Packaging Physics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Flooring retailers and distributors never sell partial boxes. Always divide your gross square footage (net area + waste factor) by the specific carton yield (e.g., 22.4 sq ft/box) and round up to the next full carton integer. Running short by 5 sq ft risks severe color dye-lot mismatches.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Layers className="w-4 h-4 text-emerald-600" />
                Subfloor Prep & Underlayment
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Subfloors must be structurally sound and flat within 3/16 inch over a 10-foot span. For concrete slabs, install a 6-mil polyethylene vapor barrier with 8-inch tape-sealed seams. For tile installations, calculate 50lb thinset bags and cement backer board sheets based on notch trowel depth.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Acclimation & Expansion Clearances
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Solid hardwood, engineered wood, and laminate flooring must acclimate flat inside the climate-controlled installation area for at least 48 to 72 hours. Maintain a continuous 3/8-inch expansion gap along all perimeter walls, doorways, and vertical cabinets to prevent seasonal floor buckling.
              </p>
            </div>
          </div>
        </div>

        {/* Cluster Guides Section */}
        {guides.length > 0 && (
          <div className="my-12 pt-8 border-t border-slate-200">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
              Expert Guides for Flooring & Tile Installation
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
