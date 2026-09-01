import React from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { siteConfig } from '@/config/site';
import { ShieldCheck, Award, Calculator, Users, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About CraftCalc - Editorial Standards & Calculation Methodology',
  description: 'Learn about CraftCalc, our contractor-reviewed calculation methodology, editorial integrity, and our mission to simplify DIY project planning.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
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
                  {siteConfig.author.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {siteConfig.author.bio}
              </p>
            </div>
          </div>

          {/* Calculation Methodology & Quality Principles */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Our 4 Quality Pillars
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>1. Real-World Packaging Physics</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Building materials are rarely sold in loose decimals. We translate theoretical net areas into real-world packaging constraints: full cartons of laminate, 50lb bags of thinset, 80lb bags of concrete, and broadloom roll widths.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>2. Dynamic Waste Factoring</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every pattern produces different offcut ratios. A herringbone floor or cathedral ceiling produces drastically higher cutting scrap than a simple straight-lay run. Our calculators account for these geometric realities.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>3. Complete Transparency</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We display the exact mathematical formulas, assumption criteria, and limitation notices on every calculator page so you understand exactly how your estimate was generated.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>4. 100% Client-Side Privacy</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your project measurements and financial budget estimates are processed instantaneously in your browser. We never log or store your room dimensions on external databases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
