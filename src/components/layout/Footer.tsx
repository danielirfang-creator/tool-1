import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Hammer, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Upper Footer: Clusters & Directory Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                <Hammer className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Craft<span className="text-emerald-400">Calc</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Free, contractor-verified DIY calculators. Material calculations, waste factor algorithms,
              and step-by-step guidance for flooring, painting, concrete, landscaping, and room planning.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 p-3 rounded-xl border border-slate-700/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Independent formulas tested against international construction codes.</span>
            </div>
          </div>

          {/* Calculator Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Calculator Hubs</h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.navigation.clusters.map((cluster) => (
                <li key={cluster.name}>
                  <Link
                    href={cluster.href}
                    className="text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{cluster.name}</span>
                    <span className="text-[10px] text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded">
                      {cluster.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides & Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Guides & Advice</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/guides/flooring-waste-percentage-guide" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Flooring Waste Rules
                </Link>
              </li>
              <li>
                <Link href="/guides/tile-trowel-size-thinset-guide" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Tile Trowel & Thinset Guide
                </Link>
              </li>
              <li>
                <Link href="/guides/laminate-acclimation-expansion-gap-guide" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Laminate Acclimation
                </Link>
              </li>
              <li>
                <Link href="/guides/paint-sheen-selection-guide" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Paint Sheen Reference
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Printable Cheat Sheets
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Legal & Trust</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  About & Methodology
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Material Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  HTML Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} CraftCalc. All rights reserved. Precision home improvement tools.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built for DIYers & builders with accuracy & care</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
