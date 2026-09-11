import React from 'react';
import { createMetadata, generateBreadcrumbSchema, generateCollectionSchema } from '@/lib/seo';
import Link from 'next/link';
import { getToolsByCluster } from '@/config/tools';
import { getGuidesByCluster } from '@/config/guides';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { Columns, ArrowRight, CheckCircle2, ShieldCheck, Ruler, Box, HardHat } from 'lucide-react';

export const metadata = createMetadata({
  title: 'Fencing & Decking Calculators - Fence Posts, Pickets, Deck Boards & Joists',
  description: 'Free contractor fence and deck material calculators. Calculate 4x4 posts, 2x4 rails, pickets, concrete bags, composite/wood deck boards, joists, and fasteners.',
  path: '/calculators/fencing-decking'
});

export default function FencingDeckingClusterPage() {
  const tools = getToolsByCluster('fencing-decking');
  const guides = getGuidesByCluster('fencing-decking');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Calculators', item: '/calculators' },
    { name: 'Fencing & Decking Calculators', item: '/calculators/fencing-decking' },
  ]);

  const collectionSchema = generateCollectionSchema({
    name: 'Fencing & Decking Calculators - Posts, Pickets, Deck Boards & Joists',
    description: 'Contractor fence and deck calculators. Calculate 4x4 fence posts, 2x4 rails, 5.5" pickets, concrete bags, composite deck boards, 12"/16" OC joists, and fasteners.',
    url: '/calculators/fencing-decking',
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
            { name: 'Fencing & Decking', href: '/calculators/fencing-decking' },
          ]}
        />

        {/* Cluster Hero */}
        <div className="max-w-3xl my-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <Columns className="w-3.5 h-3.5" />
            <span>Topical Cluster Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Fencing & Decking Material Calculators
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Accurately calculate 4x4 posts, 2x4 horizontal rails, dog-ear pickets, post-hole concrete bags, composite & wood deck boards, framing joists, and hidden fastener boxes.
          </p>
        </div>

        <AdSlot placement="header" />

        {/* Cluster Tools Grid */}
        <div className="my-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
            Fencing & Decking Calculators ({tools.length} Tools)
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
              Fence Structure & Deck Framing Engineering Standards
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Contractor standards for post hole depth, frost lines, composite joist spacing, and ledger flashing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Ruler className="w-4 h-4 text-emerald-600" />
                Post Hole Depth & Frost Line Rule
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fence posts must be set at a depth of 1/3 to 1/2 of the above-ground post height (typically 30–36 inches for 6ft privacy fences) and extend below the local frost line to eliminate winter ground heaving. Use 2 bags (50lb fast-setting) per hole.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Box className="w-4 h-4 text-emerald-600" />
                2-Rail vs 3-Rail Privacy Fencing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                6ft wood privacy fences strictly require 3 horizontal 2x4 rails (top, middle, and bottom). Installing only 2 rails on 6ft fences allows cedar/pine pickets to warp and curl severely under summer sun exposure.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Composite Joist Spacing (12" vs 16" OC)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                While standard treated lumber supports 16" on-center joist spacing, composite decking (Trex, TimberTech) requires 12" on-center framing for diagonal patterns and eliminates deck board sponginess.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <HardHat className="w-4 h-4 text-emerald-600" />
                Deck Ledger Board Flashing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                90% of structural deck collapses occur at the ledger board connection. Install continuous Z-flashing and membrane tape over the ledger board and fasten with 1/2-inch hot-dipped galvanized or structural ledger screws staggered into house rim joists.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
