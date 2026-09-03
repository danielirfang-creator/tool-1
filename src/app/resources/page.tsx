import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { siteConfig } from '@/config/site';
import { FileText, Download, CheckCircle2, ShieldCheck, Printer, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { generateBreadcrumbSchema, generateCollectionSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'DIY Planning Printables & Material Reference Cheat Sheets',
  description: 'Download free printable material cheat sheets, waste percentage rules, unit conversion tables, and project planning checklists.',
  alternates: {
    canonical: '/resources',
  },
  openGraph: {
    title: 'DIY Planning Printables & Material Reference Cheat Sheets | CraftCalc',
    description: 'Download free printable material cheat sheets, waste percentage rules, unit conversion tables, and project planning checklists.',
    url: `${siteConfig.url}/resources`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DIY Planning Printables & Material Reference Cheat Sheets | CraftCalc',
    description: 'Download free printable material cheat sheets, waste percentage rules, and conversion tables.',
  },
};

export default function ResourcesPage() {
  const cheatSheets = [
    {
      title: 'Flooring Waste Percentage Quick Card',
      category: 'Flooring',
      desc: 'Pocket reference guide for straight, diagonal, herringbone, and multi-room flooring waste margins.',
      pages: '1 Page PDF Reference',
      items: ['Straight Plank: 5-8%', 'Diagonal 45°: 10-15%', 'Herringbone: 15-20%'],
    },
    {
      title: 'Tile Notch Trowel & Thinset Coverage Matrix',
      category: 'Flooring',
      desc: 'Match tile dimensions to square, U-notch, or V-notch trowel sizes with 50lb mortar bag coverage rates.',
      pages: '1 Page PDF Reference',
      items: ['1/4 x 1/4 Sq Notch: 85-95 sq ft', '1/2 x 1/2 Sq Notch: 40-50 sq ft'],
    },
    {
      title: 'Concrete Mix & Bag Estimating Chart',
      category: 'Concrete',
      desc: 'Quick table converting slab dimensions directly into 80lb & 60lb pre-mixed concrete bags.',
      pages: '1 Page PDF Reference',
      items: ['1 Cu Yd = 45 x 80lb bags', '1 Cu Yd = 60 x 60lb bags'],
    },
    {
      title: 'Interior Paint Sheen Selection & Primer Matrix',
      category: 'Painting',
      desc: 'Room-by-room guide comparing flat, eggshell, satin, and semi-gloss paint durability.',
      pages: '1 Page PDF Reference',
      items: ['Bathrooms: Satin/Semi-Gloss', 'Ceilings: Flat', 'Trim: Semi-Gloss'],
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Resources', item: '/resources' },
  ]);

  const collectionSchema = generateCollectionSchema({
    name: 'CraftCalc DIY Reference Resources',
    description: 'Printable DIY reference guides and estimating cheat sheets.',
    url: '/resources',
    items: cheatSheets.map((c) => ({
      name: c.title,
      url: '/resources',
      description: c.desc,
    })),
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Resources', href: '/resources' }]} />

        {/* Hero */}
        <div className="max-w-3xl my-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <FileText className="w-3.5 h-3.5" />
            <span>Printable Cheat Sheets</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            DIY Material Reference Resources
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Take contractor-verified conversion tables and estimating matrices to the job site.
            All cheat sheets are free and formatted for easy printing or mobile reading.
          </p>
        </div>

        {/* Cheat Sheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
          {cheatSheets.map((sheet, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-emerald-600 uppercase tracking-wider">
                    {sheet.category}
                  </span>
                  <span>{sheet.pages}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{sheet.title}</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{sheet.desc}</p>
                <div className="pt-2 space-y-1.5">
                  {sheet.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/calculators"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  View Calculator Tools
                </Link>
                <Link
                  href="/guides"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
                >
                  <span>Related Guides</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
