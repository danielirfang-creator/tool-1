import React from 'react';
import { createMetadata, generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { toolsRegistry, getFeaturedTools } from '@/config/tools';
import { guidesRegistry } from '@/config/guides';
import { AdSlot } from '@/components/ads/AdSlot';
import {
  Hammer,
  Layers,
  Paintbrush,
  Trees,
  Home,
  ArrowRightLeft,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Search,
  BookOpen,
  HelpCircle,
  Clock,
} from 'lucide-react';

export const metadata = createMetadata({
  title: 'CraftCalc - Precision Home Improvement & DIY Calculators',
  description: '33 free contractor-grade DIY calculators. Calculate flooring, paint, concrete, garden materials, room square footage with real waste margins.',
  path: '/'
});

export default function HomePage() {
  const featuredTools = getFeaturedTools();
  const recentGuides = guidesRegistry.slice(0, 4);
  const websiteSchema = generateWebSiteSchema();
  const orgSchema = generateOrganizationSchema();

  const clusterIcons: Record<string, React.ReactNode> = {
    Flooring: <Layers className="w-6 h-6 text-emerald-600" />,
    Painting: <Paintbrush className="w-6 h-6 text-blue-600" />,
    'Concrete & Masonry': <Hammer className="w-6 h-6 text-amber-600" />,
    'Garden & Outdoors': <Trees className="w-6 h-6 text-green-600" />,
    'Rooms & Walls': <Home className="w-6 h-6 text-purple-600" />,
    Conversions: <ArrowRightLeft className="w-6 h-6 text-indigo-600" />,
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Schema.org WebSite & Organization structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* =========================================================================
          HERO SECTION: High Authority Headline, Subtitle & Fast Tool Search
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50/30 to-white pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-sm animate-in fade-in duration-300">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>33 Trade-Grade Home Improvement Calculators</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Stop Guessing Material Costs.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
              Calculate with Exact Precision.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Free, professional DIY calculators with real-world waste factors, box rounding, and step-by-step contractor methodology.
          </p>

          {/* Search Trigger Bar */}
          <div className="max-w-xl mx-auto pt-2">
            <Link
              href="/search"
              aria-label="Search all 33 DIY tools and calculators"
              className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-500 shadow-md hover:shadow-lg text-slate-500 hover:text-slate-700 transition-all text-sm group"
            >
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-emerald-600" />
                <span className="text-slate-600 font-medium">Search e.g. flooring boxes, tile grout, paint gallons...</span>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                Find Tool →
              </span>
            </Link>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Free & Client-Side</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Imperial & Metric Units</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified Contractor Formulas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Leaderboard Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot placement="header" />
      </div>

      {/* =========================================================================
          6 TOPICAL CLUSTERS DIRECTORY
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Topical Authority Hubs
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Browse by Project Category
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Explore focused calculator suites designed for every phase of home renovation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.navigation.clusters.map((cluster) => (
            <Link
              key={cluster.name}
              href={cluster.href}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
                    {clusterIcons[cluster.name] || <Hammer className="w-6 h-6 text-emerald-600" />}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                    {cluster.count} Tools
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {cluster.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {cluster.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                <span>Explore {cluster.name} Tools</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FEATURED CALCULATORS: Live Interactive Flooring Suite
          ========================================================================= */}
      <section className="bg-slate-50/70 border-y border-slate-200/60 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Flagship Launch Suite
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Featured Live Calculators
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Fully functional tools with live calculations, waste buffers, and decision support tables.
              </p>
            </div>
            <Link
              href="/calculators"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:shadow"
            >
              <span>View All 33 Calculators</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <div
                key={tool.slug}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                      {tool.clusterName}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    <Link href={`${tool.clusterHref}/${tool.slug}`} className="hover:text-emerald-700 transition-colors">
                      {tool.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {tool.benefit}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`${tool.clusterHref}/${tool.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Launch Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In-Content Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot placement="in-content" />
      </div>

      {/* =========================================================================
          INFORMATIONAL GUIDES SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Expert Contractor Advice
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Latest Renovation Guides
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Avoid costly ordering mistakes with our in-depth material estimating articles.
            </p>
          </div>
          <Link
            href="/guides"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
          >
            <span>Read All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-emerald-600">{guide.clusterName}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {guide.readTime}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {guide.summary}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center justify-between">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          WHY TRUST CRAFTCALC (E-E-A-T Authority & Trust Signals)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-850 text-white shadow-xl border border-slate-800">
          <div className="max-w-3xl space-y-4 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Contractor Accuracy Guarantee
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Why Craftsmen & DIYers Rely on CraftCalc
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Most online calculators give thin, single-number outputs that ignore manufacturer box sizes,
              material thicknesses, and pattern cutting waste. CraftCalc was engineered to solve real-world trade problems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-base font-bold text-white">Exact Carton Rounding</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Retailers sell in full cartons. We calculate fractional requirements and round up to whole cartons to guarantee zero project shortages.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-base font-bold text-white">Pattern Physics</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Herringbone, chevron, and diagonal patterns generate substantially more cut scrap. Our algorithms adjust waste margins dynamically.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-base font-bold text-white">Zero Thin Pages</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every calculator provides worked examples, formula breakdowns, limitation alerts, and comparison sizing tables.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
