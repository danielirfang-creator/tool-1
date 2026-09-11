import React from 'react';
import { createMetadata, generateBreadcrumbSchema, generateCollectionSchema } from '@/lib/seo';
import Link from 'next/link';
import { getToolsByCluster } from '@/config/tools';
import { getGuidesByCluster } from '@/config/guides';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { Square, ArrowRight, CheckCircle2, ShieldCheck, Ruler, Box, HardHat } from 'lucide-react';

export const metadata = createMetadata({
  title: 'Drywall & Framing Calculators - Sheetrock, Mud, Studs & Plates',
  description: 'Free contractor drywall and wall framing calculators. Calculate 4x8/4x12 drywall sheets, joint compound pails, tape, 2x4/2x6 studs, and plates with waste.',
  path: '/calculators/drywall-framing'
});

export default function DrywallFramingClusterPage() {
  const tools = getToolsByCluster('drywall-framing');
  const guides = getGuidesByCluster('drywall-framing');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Calculators', item: '/calculators' },
    { name: 'Drywall & Framing Calculators', item: '/calculators/drywall-framing' },
  ]);

  const collectionSchema = generateCollectionSchema({
    name: 'Drywall & Framing Calculators - Sheets, Studs, Mud & Fasteners',
    description: 'Contractor drywall and wall framing calculators. Calculate 4x8 and 4x12 drywall sheets, joint compound mud pails, 2x4/2x6 studs at 16" and 24" OC, and plates.',
    url: '/calculators/drywall-framing',
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
            { name: 'Drywall & Framing', href: '/calculators/drywall-framing' },
          ]}
        />

        {/* Cluster Hero */}
        <div className="max-w-3xl my-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <Square className="w-3.5 h-3.5" />
            <span>Topical Cluster Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Drywall & Wall Framing Calculators
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Estimate 4x8 and 4x12 drywall sheet counts, joint compound (mud) buckets, tape rolls, 2x4 and 2x6 wall studs, double top plates, and corner assemblies with precision.
          </p>
        </div>

        <AdSlot placement="header" />

        {/* Cluster Tools Grid */}
        <div className="my-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
            Drywall & Framing Calculators ({tools.length} Tools)
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
              Drywall Takeoff & Framing Engineering Standards
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Industry conventions for residential partition framing, drywall hanging orientation, and finishing mud pails.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Ruler className="w-4 h-4 text-emerald-600" />
                Sheet Size Selection (4x8 vs 4x12)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                4x8 sheets (32 sq ft) are standard for residential DIY projects due to manageable weight (~50 lbs per sheet). 4x12 sheets (48 sq ft) are used by professional drywall contractors to eliminate up to 25% of butt joint taping on walls longer than 12 feet.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Box className="w-4 h-4 text-emerald-600" />
                Joint Compound (Mud) & Tape Ratios
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Estimate 1 standard 4.5-gallon (50 lb) pail of all-purpose joint compound for every 500 square feet of drywall across embedding, fill, and finish skim coats. A standard 250 ft roll of paper or fiberglass mesh tape covers approximately 400 square feet of drywall joints.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                16" vs 24" On-Center Stud Framing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                16" on-center framing is standard for load-bearing walls and walls supporting heavy tile or cabinetry. 24" on-center (advanced framing) reduces lumber usage and improves thermal envelope insulation for non-load-bearing partition walls.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <HardHat className="w-4 h-4 text-emerald-600" />
                Precut Stud Heights & Plate Setup
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard precut studs measure 92-5/8 inches. Combined with a single 1.5-inch bottom sill plate and a 3-inch double top plate (total 4.5 inches of plate lumber), the framed wall measures exactly 97-1/8 inches to accommodate standard 8ft drywall with 1/2-inch floor expansion clearance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
