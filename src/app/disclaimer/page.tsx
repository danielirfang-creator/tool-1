import { siteConfig } from '@/config/site';
﻿import React from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ShieldAlert } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Material Estimator Disclaimer - CraftCalc',
  description: 'Important disclaimer regarding material estimates, waste percentage variances, and structural engineering limitations.',
  alternates: {
    canonical: '/disclaimer',
  },
  openGraph: {
    title: 'Material Estimator Disclaimer - CraftCalc | CraftCalc',
    description: 'Important disclaimer regarding material estimates, waste percentage variances, and structural engineering limitations.',
    url: `${siteConfig.url}/disclaimer`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Material Estimator Disclaimer - CraftCalc | CraftCalc',
    description: 'Important disclaimer regarding material estimates, waste percentage variances, and structural engineering limitations.',
  },
};


export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Disclaimer', href: '/disclaimer' }]} />

        <div className="my-8 p-6 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          <header className="border-b border-slate-100 pb-4 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Material & Construction Disclaimer
            </h1>
            <p className="text-xs text-slate-400">Effective Date: August 2026</p>
          </header>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm font-semibold leading-relaxed">
              CraftCalc tools provide mathematical estimates based on standard trade conventions. They do not replace on-site physical measurements, engineering load calculations, or local municipal building codes.
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. No Professional Contractor Relationship</h2>
            <p>
              The use of CraftCalc tools does not constitute a contractual, architectural, or professional engineering relationship. All calculations should be physically verified on the job site with calibrated measuring equipment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Material Tolerance & Dye-Lot Variations</h2>
            <p>
              Manufacturers produce building materials in distinct production batches (dye lots, kiln runs, and dye baths). Small variations in thickness, nominal sizing, and color sheen occur. Always inspect delivered materials prior to cutting or installation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Safety Warning & 811 Call-Before-You-Dig</h2>
            <p>
              Before conducting any outdoor excavation (such as post hole digging, foundation footing trenching, or paver patio excavation), always call 811 (or your local utility location service) to mark buried electric, gas, and water lines.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
