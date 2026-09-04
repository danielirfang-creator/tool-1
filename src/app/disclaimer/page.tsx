import React from 'react';
import { siteConfig } from '@/config/site';
import { createMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ShieldAlert, AlertTriangle, Ruler, Hammer, PhoneCall, HardHat, FileCheck, CheckCircle2 } from 'lucide-react';
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
              <span>Important Material Notice</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Material Takeoff & Construction Disclaimer
            </h1>
            <p className="text-xs text-slate-400">Effective Date: August 2026 | Technical Revision 3.2</p>
          </header>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm font-semibold leading-relaxed">
              CraftCalc tools provide mathematical estimates based on industry-standard trade conventions and typical manufacturer product yields. They are intended for preliminary project budgeting and do not substitute for on-site physical measurements, structural engineering analysis, or local municipal building inspections.
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Hammer className="w-4 h-4 text-emerald-600" />
              1. No Contractor, Engineering, or Architectural Relationship
            </h2>
            <p>
              The use of CraftCalc calculation software, algorithms, or written guides does not create a contractor-client, architect-client, or professional engineering relationship. All calculation outputs must be physically confirmed on the job site using calibrated laser distance measurers, leveling equipment, and steel tape measures before placing non-refundable wholesale material orders.
            </p>
            <p>
              Neither CraftCalc nor its editorial board guarantees that mathematical calculations will perfectly match field outcomes, as actual installation yields are subject to human craftsmanship, environmental humidity, subfloor deflection, and cutting technique.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Ruler className="w-4 h-4 text-emerald-600" />
              2. Material Tolerances, Kiln Runs & Dye-Lot Variations
            </h2>
            <p>
              Building material manufacturers produce flooring, ceramic tiles, concrete pavers, and brick masonry in distinct production runs known as dye lots or kiln batches. Minor variations in actual dimensions (for example, nominal 2x4 framing lumber measures 1.5&quot; × 3.5&quot; surfaced) and color shades are inherent to the manufacturing process.
            </p>
            <p>
              Running short mid-installation frequently forces homeowners to purchase materials from a subsequent production lot, resulting in noticeable shade mismatches. We strongly recommend ordering an extra 10% to 15% waste margin (and 18% to 20% for herringbone patterns) to protect against lot discrepancies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              3. Underground Utility Safety Notice (811 Call-Before-You-Dig)
            </h2>
            <p>
              Prior to conducting any outdoor excavation, fence post digging, footing trenching, or patio grading, always call 811 (or your regional utility location service) several business days before digging. Buried electrical lines, natural gas mains, fiber-optic communication conduits, and water pipes can be buried just inches below ground surface. Striking an underground line can cause severe physical injury, massive utility fines, and catastrophic property damage.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <HardHat className="w-4 h-4 text-emerald-600" />
              4. Personal Protective Equipment (PPE) & Job Site Safety
            </h2>
            <p>
              All DIY and trade construction activities carry inherent physical hazards. Always wear appropriate Personal Protective Equipment (PPE), including ANSI-certified safety glasses, OSHA-approved N95 or P100 respirators when cutting silica-bearing concrete, masonry, or drywall, heavy-duty leather work gloves, and steel-toed footwear. Never operate power saws, plate compactors, or mixing equipment without reading the manufacturer operating manuals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              5. Local Building Code Precedence & Permit Compliance
            </h2>
            <p>
              Municipal building codes, frost line depth mandates, seismic bracing rules, and structural load ratings differ across countries, states, and individual cities. Local municipal codes and building inspector directives always supersede general online formulas. Always verify whether your remodeling project requires a municipal building permit before commencing demolition.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
