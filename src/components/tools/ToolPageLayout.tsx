import React from 'react';
import { ToolMeta } from '@/config/tools';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { WorkedExample } from './WorkedExample';
import { DecisionTable } from './DecisionTable';
import { FaqSection } from './FaqSection';
import { RelatedTools } from './RelatedTools';
import { AdSlot } from '@/components/ads/AdSlot';
import { BookOpen, AlertCircle, ShieldAlert, Cpu } from 'lucide-react';
import { generateCalculatorSchema } from '@/lib/seo';

interface ToolPageLayoutProps {
  tool: ToolMeta;
  calculatorSlot: React.ReactNode;
}

export function ToolPageLayout({ tool, calculatorSlot }: ToolPageLayoutProps) {
  const breadcrumbs = [
    { name: 'Calculators', href: '/calculators' },
    { name: tool.clusterName, href: tool.clusterHref },
    { name: tool.name, href: `${tool.clusterHref}/${tool.slug}` },
  ];

  const appSchema = generateCalculatorSchema({
    name: tool.metaTitle,
    description: tool.metaDescription,
    url: `${tool.clusterHref}/${tool.slug}`,
    category: tool.clusterName,
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      {/* Schema.org WebApplication structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* =========================================================================
            SECTION 1 & 2: ABOVE THE FOLD & RESULT INTELLIGENCE (Calculator + Output)
            ========================================================================= */}
        <div className="pt-2 pb-8">
          <div className="max-w-3xl mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>{tool.clusterName} Professional Estimator</span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {tool.name}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {tool.benefit}
            </p>
          </div>

          {/* Interactive Calculator + Result Intelligence Engine Slot */}
          <div className="w-full">
            {calculatorSlot}
          </div>
        </div>

        {/* Top Ad Slot (CLS Safe) */}
        <AdSlot placement="header" />

        {/* Main Content Sections 3 to 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          <div className="lg:col-span-8 space-y-10">

            {/* =====================================================================
                SECTION 3: HOW IT WORKS, FORMULAS & METHODOLOGY
                ===================================================================== */}
            <section aria-labelledby="how-it-works-heading" className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xl border-b border-slate-100 pb-3">
                <BookOpen className="w-5 h-5 text-emerald-600 shrink-0" />
                <h2 id="how-it-works-heading">How the Calculation Works</h2>
              </div>

              {/* Verified Mathematical Formula Box */}
              <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs sm:text-sm border border-slate-800 space-y-1">
                <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Formula</div>
                <div className="text-emerald-300 font-bold overflow-x-auto py-1">{tool.formula}</div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {tool.formulaDescription}
              </p>

              {/* Methodology steps */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Contractor Calculation Methodology
                </h3>
                <ol className="space-y-2.5 text-sm text-slate-700">
                  {tool.methodology.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Limitations & Real-world Trade Nuances */}
              {tool.limitations.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-amber-950">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Real-World Construction Limitations</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-amber-800">
                    {tool.limitations.map((lim, idx) => (
                      <li key={idx}>{lim}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* =====================================================================
                SECTION 4: WORKED REALISTIC EXAMPLE
                ===================================================================== */}
            <section aria-labelledby="worked-example-heading">
              <WorkedExample {...tool.workedExample} />
            </section>

            {/* In-Content Ad Slot */}
            <AdSlot placement="in-content" />

            {/* =====================================================================
                SECTION 5: DECISION SUPPORT & REFERENCE TABLES
                ===================================================================== */}
            <section aria-labelledby="decision-support-heading">
              <DecisionTable {...tool.decisionSupport} />
            </section>

            {/* =====================================================================
                SECTION 6: FAQ & CLUSTER JOURNEY INTERNAL LINKS
                ===================================================================== */}
            <section aria-labelledby="faq-heading">
              <FaqSection faqs={tool.faqs} />
            </section>

            <section aria-labelledby="related-tools-heading">
              <RelatedTools relatedSlugs={tool.relatedToolSlugs} currentSlug={tool.slug} />
            </section>
          </div>

          {/* Right Sidebar: Quick Summary & Ads */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                Tool Quick Info
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Category</span>
                  <span className="font-semibold text-slate-800">{tool.clusterName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Input Units</span>
                  <span className="font-semibold text-slate-800">Imperial (Feet/Inches) & Metric (Meters/CM)</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Verified By</span>
                  <span className="font-semibold text-emerald-700">CraftCalc Trade Estimating Panel</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Last Formula Audit</span>
                  <span className="font-semibold text-slate-800">August 2026</span>
                </div>
              </div>
            </div>

            {/* Sidebar Ad Placement (CLS Safe) */}
            <AdSlot placement="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
