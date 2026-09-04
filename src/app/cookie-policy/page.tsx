import React from 'react';
import { siteConfig } from '@/config/site';
import { createMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Cookie, ShieldCheck, Lock, Sliders, Info } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata = createMetadata({
  title: 'Cookie Policy & Local Storage',
  description: 'Comprehensive information on how CraftCalc uses essential cookies, local storage preferences, Google AdSense, and anonymous performance analytics.',
  path: '/cookie-policy'
});

export default function CookiePolicyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Cookie Policy', item: '/cookie-policy' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Cookie Policy', href: '/cookie-policy' }]} />

        <div className="my-8 p-6 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          <header className="border-b border-slate-100 pb-4 space-y-1">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
              <Cookie className="w-4 h-4" />
              <span>Transparent Data Notice</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Cookie Policy & Local Storage Practices
            </h1>
            <p className="text-xs text-slate-400">Effective Date: August 2026 | Last Reviewed: August 2026</p>
          </header>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-600" />
              1. What Are Cookies and Local Storage?
            </h2>
            <p>
              Cookies are small text files placed on your device by websites that you visit. They are widely used to make websites function efficiently, enhance user navigation, and provide reporting information to site owners. In addition to cookies, CraftCalc utilizes HTML5 browser Local Storage, which stores lightweight configuration preferences locally within your browser client.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              2. Specific Categories of Cookies We Use
            </h2>
            <div className="space-y-3 pt-1">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  Strictly Necessary & Functional Cookies
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  These cookies and local storage tokens are essential for core site navigation, security features, and remembering your unit system preferences (such as Imperial vs Metric units) across different calculator visits. They do not store personally identifiable data.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Advertising & Targeting Cookies (Google AdSense)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  CraftCalc partners with Google AdSense to serve relevant advertisements. Google may place cookies (such as DoubleClick cookies) to serve ads based on your prior visits to our website or other sites on the internet. You can opt out of personalized advertising by visiting Google Ad Settings.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Cookie className="w-3.5 h-3.5 text-emerald-600" />
                  Performance & Anonymous Analytics
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We use aggregated, anonymized web telemetry to understand which calculators are most popular, monitor page loading speeds, and detect client-side JavaScript errors. No personal dimensions, project addresses, or financial records are ever collected.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. How to Manage and Disable Cookies</h2>
            <p>
              Most modern web browsers allow you to control cookies through their settings preferences. You can configure your browser to notify you when you receive a cookie, giving you the chance to decide whether to accept it. You can also delete all existing cookies stored on your device at any time.
            </p>
            <p>
              Please note that if you choose to block strictly necessary cookies, some interactive features (such as retaining saved calculation unit toggles) may require manual re-selection upon page refresh.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Policy Updates & Inquiries</h2>
            <p>
              We may update this Cookie Policy periodically to reflect technological improvements, third-party vendor updates, or statutory regulatory requirements. For inquiries regarding our cookie management protocols, contact our privacy officer at {siteConfig.author.email}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
