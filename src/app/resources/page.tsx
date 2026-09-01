import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { FileText, Download, Printer, Table, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Printable DIY Resources, Cheat Sheets & Sizing Charts',
  description: 'Download and print free contractor cheat sheets, waste percentage tables, tile notch trowel charts, and imperial-to-metric conversion tables.',
};

export default function ResourcesPage() {
  const resources = [
    {
      title: 'Flooring Waste & Pattern Calculation Sheet',
      category: 'Flooring',
      format: 'Printable Reference Table',
      description: 'Quick reference matrix for straight-lay (10%), diagonal (15%), and herringbone (20%) cut allowances with box carton rounding rules.',
      linkHref: '/guides/flooring-waste-percentage-guide',
    },
    {
      title: 'Tile Notch Trowel & Thinset Coverage Matrix',
      category: 'Tiling',
      format: 'Specification Sheet',
      description: 'Standard trowel notch depths (1/4", 3/8", 1/2") and thinset mortar coverage rates per 50lb bag by tile dimension.',
      linkHref: '/guides/tile-trowel-size-thinset-guide',
    },
    {
      title: 'Concrete Slab Thickness & Rebar Spacing Standard',
      category: 'Concrete & Masonry',
      format: 'Job-Site Guide',
      description: 'Recommended slab thicknesses (4" vs 6"), rebar grid spacing (#3 vs #4), and 80lb bag yields per cubic yard.',
      linkHref: '/guides/concrete-curing-compressive-strength-guide',
    },
    {
      title: 'Paint Sheen & Square Foot Spread Chart',
      category: 'Painting',
      format: 'Color & Sheen Guide',
      description: 'Spread rate guide per 1-gallon can across Flat, Eggshell, Satin, and Semi-Gloss finishes on smooth and textured drywall.',
      linkHref: '/guides/paint-sheen-selection-guide',
    },
    {
      title: 'Carpentry Fractional Inches to MM Cheat Sheet',
      category: 'Conversions',
      format: 'Pocket Reference',
      description: 'Fast conversion table for 1/16", 1/8", 1/4", 1/2", and 3/4" fractions to exact decimal millimetres.',
      linkHref: '/guides/imperial-vs-metric-construction-conversions',
    },
    {
      title: 'Paver Patio Layer & Compaction Cross-Section',
      category: 'Garden & Outdoors',
      format: 'Architectural Detail',
      description: 'Step-by-step cross-section detailing native subgrade, 4" crushed stone base, 1" ASTM C33 bedding sand, and polymeric sand joints.',
      linkHref: '/guides/paver-patio-subbase-compaction-guide',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Resources', href: '/resources' }]} />

        <div className="max-w-3xl my-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Printable Toolkits
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-1">
            DIY Cheat Sheets & Reference Cards
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Quick-reference material cheat sheets and sizing matrices you can view on your mobile phone,
            bookmark, or print out for your job site.
          </p>
        </div>

        <AdSlot placement="header" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {resources.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-semibold text-emerald-600 uppercase tracking-wider text-[10px]">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium">
                    {item.format}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {item.title}
                </h2>
                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href={item.linkHref}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Resource Guide</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
