import React from 'react';
import { createMetadata, generateBreadcrumbSchema, generateCollectionSchema } from '@/lib/seo';
import Link from 'next/link';
import { getToolsByCluster } from '@/config/tools';
import { getGuidesByCluster } from '@/config/guides';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { Trees, ArrowRight, CheckCircle2, ShieldCheck, Ruler, Box } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata = createMetadata({
  title: 'Garden & Outdoor Living Calculators',
  description: 'Calculators for outdoor living projects. Estimate mulch, topsoil, gravel, paver patios, fencing, deck boards, and retaining walls.',
  path: '/calculators/garden'
});

export default function GardenClusterPage() {
  const tools = getToolsByCluster('garden');
  const guides = getGuidesByCluster('garden');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Calculators', item: '/calculators' },
    { name: 'Garden Calculators', item: '/calculators/garden' },
  ]);

  const collectionSchema = generateCollectionSchema({
    name: 'Garden & Outdoor Calculators - Mulch, Gravel, Decking & Patio Estimators',
    description: 'Professional outdoor living calculators. Estimate bulk mulch yards, gravel subbases, fence post holes, deck boards, and polymeric sand.',
    url: '/calculators/garden',
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
            { name: 'Garden Calculators', href: '/calculators/garden' },
          ]}
        />

        {/* Cluster Hero */}
        <div className="max-w-3xl my-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <Trees className="w-3.5 h-3.5" />
            <span>Topical Cluster Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Garden & Hardscape Estimating Calculators
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Calculators for outdoor living projects. Estimate bulk mulch cubic yards, topsoil, crushed gravel, paver patios, fencing materials, deck framing, and retaining walls.
          </p>
        </div>

        <AdSlot placement="header" />

        {/* Cluster Tools Grid */}
        <div className="my-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
            All Garden & Hardscape Calculators ({tools.length} Tools)
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
              Hardscape & Landscape Material Takeoff Standards
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Field estimating rules for paver bases, bulk aggregate, mulch, fencing, and deck carpentry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Ruler className="w-4 h-4 text-emerald-600" />
                Bulk Material Compaction Allowance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When ordering crushed stone base, gravel, or topsoil in bulk cubic yards, always add a 12% to 15% compaction buffer. Loose aggregate compresses under heavy mechanical plate compactors. One cubic yard covers 108 square feet at 3 inches of depth or 81 square feet at 4 inches of depth.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Box className="w-4 h-4 text-emerald-600" />
                Mulch & Soil Bag Conversions
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Retail bags of landscape mulch are sold in 2 cubic foot or 3 cubic foot bags. Exactly 13.5 bags of 2 cu ft mulch or 9 bags of 3 cu ft mulch equal one cubic yard. Applying a 2-inch to 3-inch depth provides weed suppression while preserving natural soil moisture.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Patio Subbase Layering Profile
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A long-lasting paver patio requires 4 to 6 inches of compacted dense-graded road base, a non-woven geotextile soil stabilization fabric, 1 inch of ASTM C33 coarse concrete sand, and spiked edge restraints to prevent lateral shifting and sunken paver tracks over winter freeze cycles.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Trees className="w-4 h-4 text-emerald-600" />
                Fence & Post Hole Depth Rules
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fence post holes must extend below the local winter frost line (typically 24 to 36 inches deep) to prevent frost heaving. The hole diameter should be 3 times the width of the post (e.g., a 12-inch diameter hole for a 4x4 post), filled with fast-setting concrete poured around crushed gravel drainage bases.
              </p>
            </div>
          </div>
        </div>

        {/* Cluster Guides Section */}
        {guides.length > 0 && (
          <div className="my-12 pt-8 border-t border-slate-200">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
              Expert Guides for Garden & Hardscape Projects
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
