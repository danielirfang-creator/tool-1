import React from 'react';
import { createMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import Link from 'next/link';
import { toolsRegistry } from '@/config/tools';
import { guidesRegistry } from '@/config/guides';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Map, Calculator, BookOpen, Compass, ShieldCheck, Layers } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata = createMetadata({
  title: 'HTML Sitemap & Complete Tool Directory',
  description: 'Complete index of all 33 calculators, 6 category hubs, 8 renovation guides, and resources on CraftCalc.',
  path: '/sitemap'
});

export default function SitemapPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Sitemap', item: '/sitemap' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Sitemap', href: '/sitemap' }]} />

        <div className="max-w-3xl my-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Site Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            CraftCalc Complete HTML Sitemap
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Quickly navigate every trade calculator, educational guide, category hub, and technical page across the CraftCalc network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
          {/* Main Pages */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h2 className="flex items-center gap-2 font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Main CraftCalc Navigation Hubs</span>
            </h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="text-slate-700 hover:text-emerald-600 font-medium">
                  Homepage (CraftCalc Pro Hub)
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="text-slate-700 hover:text-emerald-600 font-medium">
                  All Calculators Directory
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-slate-700 hover:text-emerald-600 font-medium">
                  DIY & Estimation Guides
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-slate-700 hover:text-emerald-600 font-medium">
                  Printable Reference Sheets
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-slate-700 hover:text-emerald-600 font-medium">
                  Live Calculator Search
                </Link>
              </li>
            </ul>
          </div>

          {/* 6 Category Clusters */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h2 className="flex items-center gap-2 font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Renovation Category Estimator Hubs</span>
            </h2>
            <ul className="space-y-2 text-xs">
              {siteConfig.navigation.clusters.map((c) => (
                <li key={c.name}>
                  <Link href={c.href} className="text-slate-700 hover:text-emerald-600 font-medium">
                    {c.name} ({c.count} Tools)
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h2 className="flex items-center gap-2 font-bold text-slate-900 text-base border-b border-slate-100 pb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Legal, Trust & Compliance Pages</span>
            </h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-slate-700 hover:text-emerald-600 font-medium">
                  About & Methodology
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-700 hover:text-emerald-600 font-medium">
                  Contact Editorial Team
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-700 hover:text-emerald-600 font-medium">
                  Privacy Policy (GDPR / CCPA)
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-slate-700 hover:text-emerald-600 font-medium">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-700 hover:text-emerald-600 font-medium">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-slate-700 hover:text-emerald-600 font-medium">
                  Material Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* All Calculators List */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <h2 className="flex items-center gap-2 font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <span>All 33 Trade Calculators in Registry</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {toolsRegistry.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.status === 'live' ? `${tool.clusterHref}/${tool.slug}` : tool.clusterHref}
                className="p-3 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between text-xs text-slate-700 hover:text-emerald-700 transition-colors"
              >
                <span className="font-semibold">{tool.name}</span>
                <span className="text-[10px] text-slate-400 font-normal uppercase">
                  {tool.clusterName}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Sitemap Architectural Structure */}
        <div className="my-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 text-slate-700 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900">
            Sitemap Organization & Indexing Structure
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            CraftCalc organizes tools through a structured topical cluster hierarchy. Each parent cluster hub serves as a central clearinghouse linking related interactive calculators, contractor takeoff matrices, and educational guides. This clear navigational structure ensures fast discoverability for both search engine web crawlers and trade users looking for immediate calculations.
          </p>
        </div>
      </div>
    </div>
  );
}
