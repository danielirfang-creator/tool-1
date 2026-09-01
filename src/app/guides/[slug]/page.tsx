import React from 'react';
import Link from 'next/link';
import { getGuideBySlug, guidesRegistry } from '@/config/guides';
import { getToolBySlug } from '@/config/tools';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { notFound } from 'next/navigation';
import { BookOpen, Clock, Calendar, CheckCircle2, ArrowRight, Calculator } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return guidesRegistry.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.summary,
    keywords: guide.keywords,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
  };
}

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return notFound();

  const relatedTool = getToolBySlug(guide.relatedToolSlug);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs
          items={[
            { name: 'Guides', href: '/guides' },
            { name: guide.title, href: `/guides/${guide.slug}` },
          ]}
        />

        <article className="my-6 space-y-8">
          {/* Article Header */}
          <header className="space-y-4 border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                {guide.clusterName}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {guide.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Published {guide.publishedDate}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {guide.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {guide.summary}
            </p>
          </header>

          <AdSlot placement="header" />

          {/* Key Takeaways Box */}
          <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Key Takeaways for Homeowners & DIYers</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-900">
              {guide.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Body Paragraphs */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            {guide.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <AdSlot placement="in-content" />

          {/* Connected Tool CTA */}
          {relatedTool && (
            <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Interactive Companion Tool
                </span>
                <h3 className="text-lg font-bold text-white">
                  Calculate Your Numbers with the {relatedTool.name}
                </h3>
                <p className="text-xs text-slate-400 max-w-lg">
                  Apply the formulas and recommendations in this guide instantly.
                </p>
              </div>
              <Link
                href={`${relatedTool.clusterHref}/${relatedTool.slug}`}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shrink-0 flex items-center gap-1.5 transition-colors shadow-md"
              >
                <Calculator className="w-4 h-4" />
                <span>Launch {relatedTool.name}</span>
              </Link>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
