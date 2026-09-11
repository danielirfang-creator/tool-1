import React from 'react';
import { createMetadata, generateBreadcrumbSchema, generateCollectionSchema } from '@/lib/seo';
import Link from 'next/link';
import { getToolsByCluster } from '@/config/tools';
import { getGuidesByCluster } from '@/config/guides';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { Shield, ArrowRight, CheckCircle2, ShieldCheck, Ruler, Box, HardHat } from 'lucide-react';

export const metadata = createMetadata({
  title: 'Roofing & Siding Calculators - Shingles, Squares, Pitch & Vinyl',
  description: 'Free contractor roofing and siding calculators. Calculate roof pitch slope multipliers, roofing squares, shingle bundles, underlayment rolls, and siding boxes.',
  path: '/calculators/roofing-siding'
});

export default function RoofingSidingClusterPage() {
  const tools = getToolsByCluster('roofing-siding');
  const guides = getGuidesByCluster('roofing-siding');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Calculators', item: '/calculators' },
    { name: 'Roofing & Siding Calculators', item: '/calculators/roofing-siding' },
  ]);

  const collectionSchema = generateCollectionSchema({
    name: 'Roofing & Siding Calculators - Shingles, Squares, Underlayment & Siding',
    description: 'Contractor roofing and siding calculators. Calculate architectural shingle bundles, slope pitch multipliers, underlayment rolls, and vinyl siding squares with waste.',
    url: '/calculators/roofing-siding',
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
            { name: 'Roofing & Siding', href: '/calculators/roofing-siding' },
          ]}
        />

        {/* Cluster Hero */}
        <div className="max-w-3xl my-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <Shield className="w-3.5 h-3.5" />
            <span>Topical Cluster Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Roofing & Siding Material Calculators
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Calculate roof pitch multipliers, roofing squares, architectural shingle bundles (3 bundles/square), underlayment rolls, starter strips, and vinyl siding cartons.
          </p>
        </div>

        <AdSlot placement="header" />

        {/* Cluster Tools Grid */}
        <div className="my-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
            Roofing & Siding Calculators ({tools.length} Tools)
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
              Roofing Pitch & Exterior Siding Takeoff Standards
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Contractor standards for roof squares, pitch multiplier calculations, and vinyl siding overlap expansion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Ruler className="w-4 h-4 text-emerald-600" />
                Roofing Squares Definition
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                In roofing, 1 "Square" equals exactly 100 square feet of sloped roof area (10 ft × 10 ft). Standard architectural shingles are packaged at 3 bundles per square, meaning each bundle covers approximately 33.3 square feet.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Box className="w-4 h-4 text-emerald-600" />
                Pitch & Slope Multipliers
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Roof pitch determines the true surface area. A common 6/12 pitch has a multiplier of 1.118 (a 2,000 sq ft flat footprint equals 2,236 sq ft of pitched surface). Steeper 8/12 pitches increase surface area by 20.2% (1.202 multiplier).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Underlayment & Ice/Water Shield
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Synthetic roof underlayment rolls cover 10 squares (1,000 sq ft) per roll with superior tear resistance compared to traditional 15lb/30lb asphalt felt. Self-adhering Ice & Water shield must be placed 3 to 6 feet up eaves and in valleys.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <HardHat className="w-4 h-4 text-emerald-600" />
                Vinyl Siding Packaging & Accessories
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vinyl siding is shipped in 2-square cartons (200 sq ft per box). Always calculate 10ft starter strips along all bottom foundation perimeters and 12.5ft J-channels around the perimeter of all window and door casings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
