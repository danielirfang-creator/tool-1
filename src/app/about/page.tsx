import React from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { siteConfig } from '@/config/site';
import { ShieldCheck, Award, Calculator, Users, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { generateAboutPageSchema, generateBreadcrumbSchema, generateOrganizationSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About - Editorial Standards & Methodology',
  description: 'Learn about CraftCalc, our contractor-reviewed calculation methodology, editorial integrity, and our mission to simplify DIY project planning.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About CraftCalc - Editorial Standards & Methodology | CraftCalc',
    description: 'Learn about CraftCalc, our contractor-reviewed calculation methodology, editorial integrity, and our mission to simplify DIY project planning.',
    url: `${siteConfig.url}/about`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About CraftCalc - Editorial Standards & Methodology | CraftCalc',
    description: 'Learn about CraftCalc and our contractor-reviewed calculation methodology.',
  },
};

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
              About CraftCalc
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              CraftCalc is an independent, contractor-reviewed home improvement calculation platform.
              We build precision tools designed to prevent material shortages, save homeowners money, and eliminate guesswork from DIY projects.
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
                  Verified Panel
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{siteConfig.author.bio}</p>
              <p className="text-xs text-slate-600 pt-2 leading-relaxed">
                Our team consists of licensed general contractors, tile setters, and construction cost estimators with over 20 years of combined hands-on experience in residential and commercial remodeling.
              </p>
            </div>
          </div>

          {/* Principles */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Our 4 Engineering Principles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <Calculator className="w-4 h-4" />
                  Exact Packaging Physics
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Retailers sell in whole cartons, bags, and rolls. We calculate the exact mathematical coverage and round up to whole units so you never run short mid-project.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  Building Code Compliance
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All formulas adhere to standard International Residential Code (IRC) guidelines for minimum slab depths, mortar ratios, and expansion joint clearances.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <Users className="w-4 h-4" />
                  100% Free & Privacy-First
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Calculations execute entirely client-side in your browser. We never gate results behind paywalls or sell your dimensions.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <Award className="w-4 h-4" />
                  Regular Formula Audits
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We periodically update material coverage averages based on latest manufacturer product spec sheets from Home Depot, Lowe&apos;s, and direct trade distributors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
