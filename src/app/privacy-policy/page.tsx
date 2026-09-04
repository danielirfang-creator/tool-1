import React from 'react';
import { siteConfig } from '@/config/site';
import { createMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ShieldCheck, Lock, Eye, Server, Cookie, HelpCircle, FileText, Globe } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata = createMetadata({
  title: 'Privacy Policy & Data Security',
  description: 'CraftCalc privacy policy. Transparent disclosures on client-side calculation processing, cookies, Google AdSense, and GDPR/CCPA compliance.',
  path: '/privacy-policy'
});

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Privacy Policy', item: '/privacy-policy' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Privacy Policy', href: '/privacy-policy' }]} />

        <div className="my-8 p-6 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          <header className="border-b border-slate-100 pb-4 space-y-1">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Data Protection & Privacy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Privacy Policy & Security Statement
            </h1>
            <p className="text-xs text-slate-400">Effective Date: August 2026 | Last Comprehensive Review: August 2026</p>
          </header>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              1. Overview & Data Minimization Philosophy
            </h2>
            <p>
              At CraftCalc ({siteConfig.url}), accessible from any modern web browser, the privacy of our visitors is of paramount importance. This Privacy Policy document outlines the types of information that are collected and recorded by CraftCalc and how we use, protect, and handle that information.
            </p>
            <p>
              Our engineering architecture is built upon a strict "data minimization" philosophy. Unlike many software platforms that transmit user inputs to remote databases, our interactive tools are designed to perform calculations entirely inside your web browser client using client-side JavaScript. This ensures your project data remains strictly confidential and private.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-600" />
              2. Information We Do Not Collect
            </h2>
            <p>
              When you use our construction calculators—including the flooring waste estimator, paint gallon calculator, concrete slab volume calculator, or patio paver planner—we do not collect, store, or transmit:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm text-slate-600">
              <li>Your physical job site address, home location, or property blueprints.</li>
              <li>Room dimensions, square footage measurements, or material cost figures.</li>
              <li>Personal financial accounts, credit card numbers, or billing addresses.</li>
              <li>Contractor bid estimates, client lists, or commercial project pricing.</li>
            </ul>
            <p>
              All mathematical equations, waste multipliers, and packaging conversions execute locally in your computer or mobile device memory and are immediately cleared when you close your browser tab.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-600" />
              3. Server Log Files & Network Infrastructure
            </h2>
            <p>
              Like most standard websites, CraftCalc follows a standard procedure of utilizing server log files provided by our global edge hosting infrastructure (such as Vercel and cloud CDN nodes). The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
            </p>
            <p>
              These logs are not linked to any information that is personally identifiable. The purpose of this information is strictly for analyzing technical trends, administering the site, tracking aggregate user movements across pages, preventing malicious DDoS cyber attacks, and diagnosing server software errors.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cookie className="w-4 h-4 text-emerald-600" />
              4. Cookies, Local Storage & Web Beacons
            </h2>
            <p>
              CraftCalc uses browser cookies and HTML5 Local Storage to remember functional user preferences (such as your preference between Imperial units like feet and inches, or Metric units like meters and millimeters) and to store cookie consent preferences. These cookies do not contain personal tracking data.
            </p>
            <p>
              Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
            </p>
            <p>
              Users may opt out of personalized advertising by visiting Google Ads Settings (https://www.google.com/settings/ads) or by visiting the Network Advertising Initiative opt-out page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              5. CCPA Privacy Rights (Do Not Sell My Personal Information)
            </h2>
            <p>
              Under the California Consumer Privacy Act (CCPA), California consumers have the right to request that a business disclose the categories and specific pieces of personal data that a business has collected about consumers, request that a business delete any personal data about the consumer, and request that a business that sells a consumer&apos;s personal data not sell that data.
            </p>
            <p>
              CraftCalc does not sell, rent, or trade personal consumer data to third parties. If you make a request regarding your data rights, we have one month to respond to you. If you would like to exercise any of these rights, please contact our privacy compliance officer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              6. GDPR Data Protection Rights (EEA Residents)
            </h2>
            <p>
              We want to make sure you are fully aware of all of your data protection rights under the General Data Protection Regulation (GDPR). Every user residing in the European Economic Area is entitled to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm text-slate-600">
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data under certain conditions.</li>
              <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
              <li><strong>The right to object to processing:</strong> You have the right to object to our processing of your personal data.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              7. Children&apos;s Information Protection
            </h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. CraftCalc does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe your child provided this information on our website, please contact us immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              8. Contacting Our Data Privacy Officer
            </h2>
            <p>
              If you have additional questions, require more information about our Privacy Policy, or wish to submit a data subject inquiry, do not hesitate to contact our editorial and legal team via email at <strong>{siteConfig.author.email}</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
