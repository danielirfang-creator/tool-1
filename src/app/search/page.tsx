'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { toolsRegistry } from '@/config/tools';
import { guidesRegistry } from '@/config/guides';
import { Search, Calculator, BookOpen, ArrowRight, Layers, Tag } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedCluster, setSelectedCluster] = useState<string>('all');

  const filteredTools = useMemo(() => {
    return toolsRegistry.filter((tool) => {
      const matchesCluster = selectedCluster === 'all' || tool.cluster === selectedCluster;
      const q = query.toLowerCase().trim();
      if (!q) return matchesCluster;
      const matchesText =
        tool.name.toLowerCase().includes(q) ||
        tool.benefit.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesCluster && matchesText;
    });
  }, [query, selectedCluster]);

  const filteredGuides = useMemo(() => {
    return guidesRegistry.filter((guide) => {
      const matchesCluster = selectedCluster === 'all' || guide.cluster === selectedCluster;
      const q = query.toLowerCase().trim();
      if (!q) return matchesCluster;
      const matchesText =
        guide.title.toLowerCase().includes(q) ||
        guide.summary.toLowerCase().includes(q) ||
        guide.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesCluster && matchesText;
    });
  }, [query, selectedCluster]);

  const clusters = [
    { id: 'all', name: 'All Categories' },
    { id: 'flooring', name: 'Flooring' },
    { id: 'painting', name: 'Painting' },
    { id: 'concrete-masonry', name: 'Concrete & Masonry' },
    { id: 'garden', name: 'Garden & Outdoors' },
    { id: 'rooms', name: 'Rooms & Walls' },
    { id: 'conversions', name: 'Conversions' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Search', href: '/search' }]} />

        <div className="max-w-3xl mx-auto text-center my-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Search Calculators & Guides
          </h1>
          <p className="text-sm text-slate-600">
            Find the exact calculator, material formula, or renovation guide in our database.
          </p>

          {/* Search Input Box */}
          <div className="relative pt-2">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-5" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keyword, e.g. tile boxes, paint gallons, concrete bags..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 font-medium text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-sm transition-all"
              autoFocus
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
            {clusters.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCluster(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCluster === c.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-5xl mx-auto space-y-10 pt-4">
          {/* Calculators Results */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
              <h2 className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <Calculator className="w-5 h-5 text-emerald-600" />
                <span>Calculators ({filteredTools.length})</span>
              </h2>
            </div>

            {filteredTools.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                No calculators match your search query. Try broadening your keywords.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.status === 'live' ? `${tool.clusterHref}/${tool.slug}` : tool.clusterHref}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-semibold text-emerald-600 uppercase tracking-wider">
                          {tool.clusterName}
                        </span>
                        {tool.status === 'live' ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                            Live Tool
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium text-[10px]">
                            In Hub
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {tool.benefit}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                      <span>{tool.status === 'live' ? 'Launch Calculator' : 'View Category'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Guides Results */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
              <h2 className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span>Supporting Guides ({filteredGuides.length})</span>
              </h2>
            </div>

            {filteredGuides.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                No guides match your search query.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-semibold text-emerald-600 mb-1">
                        {guide.clusterName} • {guide.readTime}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                        {guide.summary}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center justify-between">
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
