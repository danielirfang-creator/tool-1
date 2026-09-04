import React from 'react';
import { createMetadata, generateBreadcrumbSchema, generateContactPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { siteConfig } from '@/config/site';
import { Mail, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata = createMetadata({
  title: 'Contact CraftCalc Support',
  description: 'Get in touch with the CraftCalc editorial and engineering team for formula feedback, bug reports, and contractor partnerships.',
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Contact', href: '/contact' }]} />

        <div className="my-8 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Contact Us
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              We welcome feedback from contractors, homeowners, and trade professionals.
              If you notice a formula discrepancy or want to request a new calculator, reach out below.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-bold text-slate-900">Email Support</h2>
                <p className="text-xs text-slate-500">For general inquiries, corrections, and feedback:</p>
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
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-bold text-slate-900">Response Time</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our engineering and editorial team reviews incoming inquiries within 24–48 business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
