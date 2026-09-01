import React from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Mail, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - CraftCalc Support & Feedback',
  description: 'Get in touch with the CraftCalc engineering team for tool requests, formula corrections, partnership inquiries, or general support.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Contact', href: '/contact' }]} />

        <div className="my-8 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Contact CraftCalc
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Have feedback on a calculator formula? Want to suggest a new DIY estimation tool?
              Our trade editorial team is here to assist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Email Editorial Team</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                For formula audit questions, bug reports, and commercial licensing inquiries:
              </p>
              <div className="pt-2 font-mono text-sm font-bold text-emerald-700">
                editorial@craftcalcpro.com
              </div>
            </div>

            {/* Response Time Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Support Inquiries</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                We review contractor feedback and user calculation queries on a continuous basis.
                Typical response time is within 1 to 2 business days.
              </p>
              <div className="pt-2 text-xs font-semibold text-slate-500">
                Mon - Fri, 9:00 AM - 5:00 PM EST
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
