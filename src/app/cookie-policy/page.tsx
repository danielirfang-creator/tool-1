import { siteConfig } from '@/config/site';
﻿import React from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Information about how CraftCalc uses essential cookies, local storage for unit preferences, and analytics tracking.',
  alternates: {
    canonical: '/cookie-policy',
  },
  openGraph: {
    title: 'Cookie Policy | CraftCalc',
    description: 'Information about how CraftCalc uses essential cookies, local storage for unit preferences, and analytics tracking.',
    url: `${siteConfig.url}/cookie-policy`,
    type: 'website',
  },
  twitter: {
    title: 'Cookie Policy | CraftCalc',
    description: 'Information about how CraftCalc uses essential cookies, local storage for unit preferences, and analytics tracking.',
  },
};


export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Cookie Policy', href: '/cookie-policy' }]} />

        <div className="my-8 p-6 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          <header className="border-b border-slate-100 pb-4 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Cookie Policy
            </h1>
            <p className="text-xs text-slate-400">Effective Date: August 2026</p>
          </header>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored in your web browser that allow our website or a third party to recognize you, remember your calculator preferences (e.g. Imperial vs Metric units), and make your next visit easier and more useful.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Categories of Cookies We Use</h2>
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">Essential Cookies</div>
                <div className="text-xs text-slate-600 mt-1">
                  Required for site navigation, security features, and storing your cookie consent preference in localStorage.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">Advertising & Targeting Cookies (Google AdSense)</div>
                <div className="text-xs text-slate-600 mt-1">
                  Placed by Google and its advertising partners to serve relevant advertisements based on your browsing behavior.
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Managing Your Cookie Choices</h2>
            <p>
              You can control and manage cookies through your browser settings. You can delete existing cookies and block new cookies at any time. For more information, consult your browser\'s help documentation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
