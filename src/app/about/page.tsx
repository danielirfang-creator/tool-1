import React from 'react';
import { createMetadata, generateAboutPageSchema, generateBreadcrumbSchema, generateOrganizationSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { siteConfig } from '@/config/site';
import { ShieldCheck, Award, Calculator, Users, CheckCircle, Wrench, FileCheck, Layers, BookOpen, Sparkles, Target, Compass } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata = createMetadata({
  title: 'About CraftCalc Estimating Methodology',
  description: 'Learn about our mission, editorial formula verification standards, and trade estimating panel at CraftCalc.',
  path: '/about'
});

export default function AboutPage() {
  const aboutSchema = generateAboutPageSchema();
  const orgSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'About', item: '/about' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'About', href: '/about' }]} />

        <div className="my-8 space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Our Mission & Standards
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              About CraftCalc Engineering & Methodology
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              CraftCalc is an independent, contractor-reviewed home improvement calculation platform.
              We build precision tools designed to prevent material shortages, save homeowners money, and eliminate guesswork from residential renovation takeoffs.
            </p>
          </div>

          {/* Author & Editorial Board Bio */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shrink-0 font-black text-2xl shadow-md">
              CC
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{siteConfig.author.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Verified Trade Panel
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{siteConfig.author.bio}</p>
              <p className="text-xs text-slate-600 pt-2 leading-relaxed">
                Our editorial board consists of licensed general contractors, tile setters, concrete masons, and professional cost estimators with over 20 years of combined hands-on trade experience in residential remodeling and light commercial construction across North America and Europe.
              </p>
            </div>
          </div>

          {/* The Problem We Solve */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 text-slate-700 text-sm leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              The Real Cost of Material Estimating Errors
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In residential remodeling, material estimation errors are among the most expensive mistakes a homeowner or contractor can make. Running short on hardwood planks mid-installation leads to costly work stoppages, dye-lot color mismatches, and expensive secondary freight shipping fees. Conversely, over-purchasing excessive materials locks up valuable project capital in unreturnable custom goods.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              CraftCalc was created to solve this problem by providing mathematical calculators that combine geometric formulas with real-world packaging rules, whole-carton rounding physics, and proven trade waste margins.
            </p>
          </div>

          {/* 4 Core Principles */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Our 4 Core Engineering Principles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <Calculator className="w-4 h-4" />
                  Exact Packaging Physics
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Retailers sell exclusively in whole cartons, 50lb bags, and rolls. We calculate the exact mathematical coverage and round up to whole units so you never run short mid-project.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  Building Code Compliance
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All formulas adhere to standard International Residential Code (IRC) and ANSI specifications for minimum slab depths, mortar ratios, and expansion joint clearances.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <Users className="w-4 h-4" />
                  100% Free & Privacy-First
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Calculations execute entirely client-side in your browser. We never gate results behind paywalls or transmit your room dimensions to external servers.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <Award className="w-4 h-4" />
                  Regular Formula Audits
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We periodically audit and calibrate material coverage averages based on latest manufacturer product spec sheets from Home Depot, Lowe&apos;s, and direct trade distributors.
                </p>
              </div>
            </div>
          </div>

          {/* Testing & Verification Protocol */}
          <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              Formula Testing & Verification Protocol
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Every calculator published on CraftCalc undergoes a rigorous three-stage verification process: first, mathematical derivation of physical volume formulas; second, calibration against manufacturer packaging yields (such as ANSI A118 thinset standards and ASTM C309 curing guidelines); and third, field validation on active residential remodeling job sites by our contractor panel.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              When building material specifications change—such as changes in bagged concrete coverage or thinner porcelain tile backer board specifications—our engineering team updates the corresponding formula constants to reflect current retail inventory.
            </p>
          </div>

          {/* Sustainability & Editorial Independence */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 text-slate-700 text-sm leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" />
              Editorial Independence & Environmental Sustainability
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Accurate material estimation plays a vital role in construction sustainability. Reducing scrap cuts and over-ordered building materials directly minimizes landfill waste and reduces transport emissions. CraftCalc remains 100% editorially independent, free of sponsored material bias, ensuring that our formulas reflect genuine job-site math.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
