import React from 'react';
import Link from 'next/link';
import { Hammer, Home, Search, Compass, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The requested calculator or guide page could not be found. Explore our 33 DIY material estimators or search our directory.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50/50 py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <Hammer className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">404 Error</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The calculator or guide URL you requested does not exist or may have moved.
            Use the links below to find the estimation tool you need.
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Link
            href="/"
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/search"
            className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search All Calculators</span>
          </Link>
          <Link
            href="/calculators"
            className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Browse All 6 Categories</span>
          </Link>
          <Link
            href="/guides"
            className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Renovation Guides</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
