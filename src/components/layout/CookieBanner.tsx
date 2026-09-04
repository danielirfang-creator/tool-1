'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem('craftcalc_cookie_consent');
    if (consent === null) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('craftcalc_cookie_consent', 'accepted');
    setAccepted(true);
  };

  const handleDecline = () => {
    localStorage.setItem('craftcalc_cookie_consent', 'declined');
    setAccepted(true);
  };

  if (!mounted || accepted) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-800 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            We use cookies and anonymous browser storage to calculate your results, personalize content, and analyze site traffic in compliance with Google AdSense and privacy policies. Learn more in our{' '}
            <Link href="/privacy-policy" className="text-emerald-400 underline hover:text-emerald-300">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/cookie-policy" className="text-emerald-400 underline hover:text-emerald-300">
              Cookie Policy
            </Link>.
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={handleDecline}
            aria-label="Accept essential cookies only"
            className="min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors w-full md:w-auto"
          >
            Essential Only
          </button>
          <button
            onClick={handleAccept}
            aria-label="Accept all cookies"
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-600 text-xs font-semibold text-white hover:bg-emerald-500 shadow-md transition-colors w-full md:w-auto"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
