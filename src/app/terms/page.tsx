import { siteConfig } from '@/config/site';
﻿import React from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service and usage conditions for CraftCalc home improvement calculators and estimating tools.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service | CraftCalc',
    description: 'Terms of service and usage conditions for CraftCalc home improvement calculators and estimating tools.',
    url: `${siteConfig.url}/terms`,
    type: 'website',
  },
  twitter: {
    title: 'Terms of Service | CraftCalc',
    description: 'Terms of service and usage conditions for CraftCalc home improvement calculators and estimating tools.',
  },
};


export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Terms of Service', href: '/terms' }]} />

        <div className="my-8 p-6 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          <header className="border-b border-slate-100 pb-4 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-400">Effective Date: August 2026</p>
          </header>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using CraftCalc, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Informational & Estimation Purpose Only</h2>
            <p>
              All calculator results, sizing tables, and construction guidance provided on this website are intended solely for general estimation and planning purposes. Construction site conditions, manufacturer variations, and local building codes vary. Always verify final material orders with a licensed contractor or building inspector before purchasing materials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Intellectual Property</h2>
            <p>
              The original software code, user interface designs, custom mathematical algorithms, and editorial articles on CraftCalc are the exclusive intellectual property of CraftCalc and are protected by applicable copyright and trademark laws.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
