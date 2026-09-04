import React from 'react';
import { ToolMeta } from '@/config/tools';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { WorkedExample } from './WorkedExample';
import { DecisionTable } from './DecisionTable';
import { FaqSection } from './FaqSection';
import { RelatedTools } from './RelatedTools';
import { AdSlot } from '@/components/ads/AdSlot';
import { BookOpen, AlertCircle, ShieldAlert, Cpu } from 'lucide-react';
import { generateCalculatorSchema, generateBreadcrumbSchema, generateFaqSchema } from '@/lib/seo';

interface ToolPageLayoutProps {
  tool: ToolMeta;
  calculatorSlot: React.ReactNode;
}

export function ToolPageLayout({ tool, calculatorSlot }: ToolPageLayoutProps) {
  const breadcrumbItems = [
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

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Calculators', item: '/calculators' },
    { name: tool.clusterName, item: tool.clusterHref },
    { name: tool.name, item: `${tool.clusterHref}/${tool.slug}` },
  ]);

  const faqSchema = tool.faqs && tool.faqs.length > 0 ? generateFaqSchema(tool.faqs) : null;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      {/* Schema.org WebApplication structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      {/* Schema.org BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Schema.org FAQPage structured data */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* SECTION 1: HEADER */}
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

          {/* Interactive Calculator Slot */}
          <div className="w-full">
            {calculatorSlot}
          </div>
        </div>

        <AdSlot placement="header" />

        {/* SECTION 3, 4, 5: EDITORIAL CONTENT & SUPPORTING TABLES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Step-by-Step Instructions & Practical Logic */}
            <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-emerald-700">
                <BookOpen className="w-5 h-5" />
                <h2 className="text-xl font-bold text-slate-900">
                  How It Works: {tool.name.split('(')[0].trim()}
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 space-y-3">
                <p>
                  Accurate estimating requires accounting for both theoretical surface geometry and real-world manufacturer specifications.
                  When purchasing building materials, standard packaging (such as whole cartons, pre-mixed bags, or rolls) introduces fractional waste that must be rounded up to the nearest commercial sales unit.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <span className="font-bold text-slate-900 block">Core Contractor Rules Applied:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Dynamic cutting and breakage waste margins based on room/project complexity.</li>
                    <li>Automatic rounding to full retailer cartons to prevent mid-job shortfalls.</li>
                    <li>Imperial and metric conversion parity with precision rounding.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Decision Support Table */}
            {tool.decisionSupport && (
              <DecisionTable
                title={tool.decisionSupport.title}
                description={tool.decisionSupport.description}
                headers={tool.decisionSupport.headers}
                rows={tool.decisionSupport.rows}
                notes={tool.decisionSupport.notes}
              />
            )}

            {/* Worked Step Example */}
            {tool.workedExample && (
              <WorkedExample
                title={tool.workedExample.title}
                scenario={tool.workedExample.scenario}
                inputs={tool.workedExample.inputs}
                steps={tool.workedExample.steps}
                finalAnswer={tool.workedExample.finalAnswer}
                proTip={tool.workedExample.proTip}
              />
            )}

            {/* When NOT to Use / Edge Cases */}
            <section className="p-6 sm:p-8 rounded-2xl bg-amber-50/60 border border-amber-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-amber-800">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <h2 className="text-xl font-bold text-slate-900">
                  Key Factors for {tool.name.split('(')[0].trim()}
                </h2>
              </div>
              <div className="text-sm text-slate-700 space-y-2 leading-relaxed">
                <p>
                  While our formulas strictly follow IRC (International Residential Code) and ANSI standards, certain custom construction conditions require specialized engineering review:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 pl-2">
                  <li><strong>Extreme slopes & irregular curves:</strong> Non-rectangular perimeters require trapezoidal sub-sectioning.</li>
                  <li><strong>Heavy structural load-bearing applications:</strong> Commercial slabs over 3,000 PSI require soil compaction tests.</li>
                  <li><strong>Subfloor moisture & acclimation:</strong> Extreme humidity variations require dedicated expansion joints beyond base percentages.</li>
                </ul>
              </div>
            </section>

            {/* FAQs */}
            {tool.faqs && tool.faqs.length > 0 && (
              <FaqSection
                faqs={tool.faqs}
                title={`FAQs: ${tool.name.split('(')[0].trim()}`}
              />
            )}

            {/* Related Tools */}
            <section className="pt-6 border-t border-slate-200">
              <RelatedTools
                currentSlug={tool.slug}
                relatedSlugs={tool.relatedToolSlugs || []}
                toolName={tool.name.split('(')[0].trim()}
              />
            </section>
          </div>

          {/* Right Sidebar */}
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

            <AdSlot placement="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
