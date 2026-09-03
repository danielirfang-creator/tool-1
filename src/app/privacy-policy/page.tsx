import { siteConfig } from '@/config/site';
﻿import React from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - CraftCalc',
  description: 'CraftCalc privacy policy. Learn how we handle client-side calculator data, browser cookies, and Google Analytics in compliance with GDPR and CCPA.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy - CraftCalc | CraftCalc',
    description: 'CraftCalc privacy policy. Learn how we handle client-side calculator data, browser cookies, and Google Analytics in compliance with GDPR and CCPA.',
    url: `${siteConfig.url}/privacy-policy`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - CraftCalc | CraftCalc',
    description: 'CraftCalc privacy policy. Learn how we handle client-side calculator data, browser cookies, and Google Analytics in compliance with GDPR and CCPA.',
  },
};


export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Privacy Policy', href: '/privacy-policy' }]} />

        <div className="my-8 p-6 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          <header className="border-b border-slate-100 pb-4 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400">Last updated: August 2026</p>
          </header>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Introduction</h2>
            <p>
              At CraftCalc, we value your privacy and are committed to protecting any information collected when you visit our website. This Privacy Policy details our practices concerning data collection, third-party advertising partners, cookies, and your privacy rights under GDPR and CCPA regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Calculator Data Privacy (Client-Side Processing)</h2>
            <p>
              All calculator computations (including room dimensions, material costs, waste factors, and unit selections) are executed exclusively within your browser using client-side JavaScript. We do not transmit, log, or store your room measurements on external servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Google AdSense & Third-Party Advertising</h2>
            <p>
              We use third-party advertising companies, including Google AdSense, to serve ads when you visit our website. These companies may use cookies and web beacons to collect non-personally identifiable information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
            </p>
            <p>
              Google uses the DoubleClick DART cookie. You may opt out of the use of the DART cookie by visiting the{' '}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-emerald-600 underline"
              >
                Google Ad and Content Network Privacy Policy
              </a>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Cookies & Web Beacons</h2>
            <p>
              We use cookies to store information about visitor preferences, record user-specific information on which pages the user accesses or visits, and customize web page content based on visitors\' browser type or other information that the visitor sends via their browser.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. GDPR & CCPA Rights</h2>
            <p>
              If you are a resident of the European Economic Area (EEA) or California, you have specific rights regarding your personal data: the right to access, rectify, or erase your data, and the right to opt out of the sale or sharing of your personal information. To exercise these rights, please contact us at editorial@craftcalcpro.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
