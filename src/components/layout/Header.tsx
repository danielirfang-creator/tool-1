'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { Hammer, Menu, X, Search, ChevronDown, Layers, Paintbrush, Trees, Home, ArrowRightLeft } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clusterDropdownOpen, setClusterDropdownOpen] = useState(false);
  const pathname = usePathname();

  const clusterIcons: Record<string, React.ReactNode> = {
    Flooring: <Layers className="w-4 h-4 text-emerald-600" />,
    Painting: <Paintbrush className="w-4 h-4 text-blue-600" />,
    'Concrete & Masonry': <Hammer className="w-4 h-4 text-amber-600" />,
    'Garden & Outdoors': <Trees className="w-4 h-4 text-green-600" />,
    'Rooms & Walls': <Home className="w-4 h-4 text-purple-600" />,
    Conversions: <ArrowRightLeft className="w-4 h-4 text-indigo-600" />,
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group focus:outline-none">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Hammer className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 block leading-none">
                  Craft<span className="text-emerald-600">Calc</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block mt-0.5">
                  DIY & Building Hub
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === '/' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>

              {/* Calculators Cluster Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setClusterDropdownOpen(!clusterDropdownOpen)}
                  onMouseEnter={() => setClusterDropdownOpen(true)}
                  aria-haspopup="true"
                  aria-expanded={clusterDropdownOpen}
                  aria-label="Calculator Categories"
                  className={`px-3 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1 transition-colors ${
                    pathname.startsWith('/calculators')
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  Calculators
                  <ChevronDown className="w-4 h-4" />
                </button>

                {clusterDropdownOpen && (
                  <div
                    onMouseLeave={() => setClusterDropdownOpen(false)}
                    className="absolute left-0 mt-1 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 grid gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Topical Categories</span>
                    </div>
                    {siteConfig.navigation.clusters.map((cluster) => (
                      <Link
                        key={cluster.name}
                        href={cluster.href}
                        onClick={() => setClusterDropdownOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-emerald-100 transition-colors">
                            {clusterIcons[cluster.name] || <Hammer className="w-4 h-4 text-emerald-600" />}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600">
                              {cluster.name}
                            </div>
                            <div className="text-xs text-slate-500 line-clamp-1">{cluster.description}</div>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          {cluster.count}
                        </span>
                      </Link>
                    ))}
                    <div className="pt-2 border-t border-slate-100 mt-1">
                      <Link
                        href="/calculators"
                        onClick={() => setClusterDropdownOpen(false)}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 text-center block py-1"
                      >
                        View All 33 Calculators →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/guides"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname.startsWith('/guides') ? 'text-emerald-600 bg-emerald-50' : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                Guides
              </Link>

              <Link
                href="/resources"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === '/resources' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                Resources
              </Link>

              <Link
                href="/about"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === '/about' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                About
              </Link>
            </nav>
          </div>

          {/* Quick Search Action & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/search"
              aria-label="Search all calculators and tools"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-sm font-medium transition-colors"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Search tools...</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <nav className="grid gap-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-semibold text-slate-900 hover:bg-slate-50"
            >
              Home
            </Link>
            <div className="py-2">
              <span className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Calculator Categories
              </span>
              {siteConfig.navigation.clusters.map((cluster) => (
                <Link
                  key={cluster.name}
                  href={cluster.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <span>{cluster.name}</span>
                  <span className="text-xs text-slate-400">{cluster.count} tools</span>
                </Link>
              ))}
            </div>
            <Link
              href="/guides"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-semibold text-slate-900 hover:bg-slate-50"
            >
              Informational Guides
            </Link>
            <Link
              href="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-semibold text-slate-900 hover:bg-slate-50"
            >
              Printable Resources
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-semibold text-slate-900 hover:bg-slate-50"
            >
              About & Methodology
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-semibold text-slate-900 hover:bg-slate-50"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
