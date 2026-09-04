import React from 'react';
import { siteConfig } from '@/config/site';
import { createMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FileText, ShieldAlert, Scale, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata = createMetadata({
  title: 'Terms of Service & Usage Agreement',
  description: 'CraftCalc terms of service, material estimation disclaimers, intellectual property rules, and acceptable usage guidelines.',
  path: '/terms'
});

export default function TermsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Terms of Service', item: '/terms' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Terms of Service', href: '/terms' }]} />

        <div className="my-8 p-6 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          <header className="border-b border-slate-100 pb-4 space-y-1">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              <span>Legal Agreement</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Terms of Service & Usage Agreement
            </h1>
            <p className="text-xs text-slate-400">Effective Date: August 2026 | Version 2.4</p>
          </header>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or using the CraftCalc web application ({siteConfig.url}), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, along with our Privacy Policy, Cookie Policy, and Material Disclaimer. If you do not agree to these terms, please discontinue use of this service immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Estimation Purpose & Professional Disclaimer</h2>
            <p>
              CraftCalc provides mathematical calculation tools, material formulas, conversion tables, and educational remodeling guides intended solely for general estimation and planning purposes. Construction site conditions, environmental factors, subfloor variations, installer skill levels, and manufacturer batch tolerances vary widely.
            </p>
            <p>
              Calculations generated on CraftCalc do not constitute architectural blueprints, structural engineering calculations, or professional contractor bids. Users are advised to physically verify all measurements on the job site and consult licensed contractors before placing non-refundable bulk material orders.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Intellectual Property Rights</h2>
            <p>
              All software algorithms, client-side scripts, interactive user interfaces, logos, brand assets, and original editorial articles published on CraftCalc are the exclusive intellectual property of CraftCalc and are protected by international copyright, trademark, and unfair competition laws.
            </p>
            <p>
              You are granted a limited, revocable, non-exclusive license to use the calculators for personal and commercial job planning. You may not scrape, reverse-engineer, redistribute, or replicate our proprietary calculation engines without express written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, CraftCalc, its founders, contributors, and technical partners shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of, or inability to use, our calculation tools—including, but not limited to, material shortfalls, over-purchases, or structural installation errors.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. Governing Law & Contact</h2>
            <p>
              These Terms shall be governed by and construed in accordance with standard commercial trade laws. If you have questions regarding these terms, contact our legal counsel at {siteConfig.author.email}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
