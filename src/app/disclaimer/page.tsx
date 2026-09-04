import React from 'react';
import { siteConfig } from '@/config/site';
import { createMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ShieldAlert, AlertTriangle, Ruler, Hammer, PhoneCall } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata = createMetadata({
  title: 'Material Estimating Disclaimer',
  description: 'Important material disclaimer regarding contractor verification, building code compliance, subfloor tolerances, and manufacturer variations.',
  path: '/disclaimer'
});

export default function DisclaimerPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Disclaimer', item: '/disclaimer' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Disclaimer', href: '/disclaimer' }]} />

        <div className="my-8 p-6 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          <header className="border-b border-slate-100 pb-4 space-y-1">
            <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Important Notice</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Material Estimating & Construction Disclaimer
            </h1>
            <p className="text-xs text-slate-400">Effective Date: August 2026 | Technical Revision 3.1</p>
          </header>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm font-semibold leading-relaxed">
              CraftCalc tools provide mathematical estimates based on standard trade conventions and average product specifications. They do not replace on-site physical measurements, engineering load calculations, or local municipal building code inspections.
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Hammer className="w-4 h-4 text-emerald-600" />
              1. No Professional Contractor Relationship
            </h2>
            <p>
              The use of CraftCalc calculation algorithms does not establish a contractual, structural, architectural, or professional engineering relationship. All calculations must be physically verified on the job site using calibrated measuring equipment prior to purchasing materials or commencing demolition.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Ruler className="w-4 h-4 text-emerald-600" />
              2. Material Tolerances & Manufacturer Dye-Lot Variations
            </h2>
            <p>
              Building product manufacturers produce items in distinct production runs (kiln batches, dye lots, and lumber mills). Nominal measurements frequently differ from actual surfaced dimensions (for instance, a nominal 2x4 stud measures 1.5" × 3.5").
            </p>
            <p>
              Material yield can be impacted by subfloor unevenness, wall out-of-squareness, trowel notch wear, and installer cutting technique. Always order sufficient waste allowance (typically 10% to 15%) to avoid running short mid-installation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              3. Underground Utility Safety Notice (811 Call-Before-You-Dig)
            </h2>
            <p>
              Before conducting any outdoor excavation (such as post hole digging for fences, foundation footing trenching, or paver patio excavation), always call 811 (or your local utility location agency) to mark buried electric, gas, water, and fiber-optic communication lines. Never begin digging until utility markings are verified.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Local Building Code Precedence</h2>
            <p>
              Municipal building regulations, frost line depth requirements, seismic strapping codes, and fire-resistance ratings vary significantly by jurisdiction. Local building code requirements always take precedence over general online estimates.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
