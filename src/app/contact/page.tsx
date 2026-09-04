import React from 'react';
import { createMetadata, generateBreadcrumbSchema, generateContactPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { siteConfig } from '@/config/site';
import { Mail, MessageSquare, ShieldCheck, HelpCircle, Wrench, Clock, FileCheck, PhoneCall } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata = createMetadata({
  title: 'Contact CraftCalc Support & Editorial',
  description: 'Get in touch with the CraftCalc editorial and engineering team for formula feedback, bug reports, contractor inquiries, and partnership requests.',
  path: '/contact'
});

export default function ContactPage() {
  const contactSchema = generateContactPageSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Contact', item: '/contact' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Contact', href: '/contact' }]} />

        <div className="my-8 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Contact Support & Editorial Team
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              We welcome direct feedback, formula audit suggestions, feature requests, and trade partnership proposals from licensed contractors, trade estimators, and DIY homeowners.
            </p>
          </div>

          {/* Main Contact Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-bold text-slate-900">Direct Editorial Email</h2>
                <p className="text-xs text-slate-500">For general inquiries, formula suggestions, corrections, and developer support:</p>
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 underline pt-1 block"
                >
                  {siteConfig.author.email}
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-800 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-bold text-slate-900">Response Turnaround Time</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our engineering and editorial review team reviews all incoming inquiries within 24 to 48 business hours. For urgent bug reports or calculation formula discrepancies, please include the specific tool URL and example input values so our trade panel can replicate the mathematical result immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Inquiry Categories Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              How We Can Assist You
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                  <Wrench className="w-4 h-4" />
                  Formula Corrections
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If you notice regional code differences, packaging size updates, or specific manufacturer yield adjustments, send us your product spec sheets.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  New Tool Requests
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Need a specialized trade calculator for roofing shingles, electrical conduit fill, or framing lumber? Submit your calculation workflow to our team.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  Trade Partnerships
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We collaborate with building material manufacturers, trade schools, and contractor associations for verified educational content and tools.
                </p>
              </div>
            </div>
          </div>

          {/* Submission Guidelines */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-slate-700 text-sm leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              Formula Submission & Verification Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When reporting mathematical discrepancies or submitting new formulas for inclusion in our calculators, please include relevant technical references such as ANSI, ASTM, or IRC code citations, manufacturer specification PDFs, and physical test data. Our technical reviewing committee will evaluate all proposed adjustments against current ASTM testing standards before deploying updates to our live production engines.
            </p>
          </div>

          {/* Frequently Asked Support Questions */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-slate-700 text-sm leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">
              Frequently Asked Support Questions
            </h2>
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Are CraftCalc calculators free for professional commercial estimators?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yes, 100% of our calculation tools, formula matrices, and printable cheat sheets are completely free to use for both DIY homeowners and professional general contractors preparing client bids.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">How do you account for regional building code differences?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our baseline algorithms reflect International Residential Code (IRC) standards. When regional variations exist (such as frost line depth or seismic strapping), our tools provide adjustable input sliders for localized job site customization.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Can I request a custom calculation tool for my specialty trade?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Absolutely. If your trade requires custom dimensional takeoffs (such as HVAC duct sizing, electrical load balancing, or specialized roofing pitch multipliers), email our editorial team with your specification sheets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
