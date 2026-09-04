import React from 'react';
import Link from 'next/link';
import { getGuideBySlug, guidesRegistry } from '@/config/guides';
import { getToolBySlug } from '@/config/tools';
import { siteConfig } from '@/config/site';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';
import { notFound } from 'next/navigation';
import { BookOpen, Clock, Calendar, CheckCircle2, ArrowRight, Calculator, User } from 'lucide-react';
import type { Metadata } from 'next';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo';

export async function generateStaticParams() {
  return guidesRegistry.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};

  const path = `/guides/${guide.slug}`;

  return {
    title: guide.title,
    description: guide.summary,
    keywords: guide.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${guide.title} | CraftCalc`,
      description: guide.summary,
      url: `${siteConfig.url}${path}`,
      type: 'article',
      publishedTime: guide.publishedDate,
      authors: [siteConfig.author.name],
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${guide.title} | CraftCalc`,
      description: guide.summary,
      images: [`${siteConfig.url}/og-image.png`],
    },
  };
}

const sectionHeadings = [
  "Core Principles & Technical Overview",
  "Site Evaluation & Takeoff Factors",
  "Material Specifications & Math Formulas",
  "Contractor Best Practices & Pro Tips",
  "Packaging Rules & Ordering Strategy",
  "Long-Term Maintenance & Field Preservation"
];

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return notFound();

  const relatedTool = getToolBySlug(guide.relatedToolSlug);

  const articleSchema = generateArticleSchema({
    title: guide.title,
    description: guide.summary,
    url: `/guides/${guide.slug}`,
    publishedDate: guide.publishedDate,
    readTime: guide.readTime,
    clusterName: guide.clusterName,
    keywords: guide.keywords,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Guides', item: '/guides' },
    { name: guide.title, item: `/guides/${guide.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                By {siteConfig.author.name}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {guide.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {guide.summary}
            </p>
          </header>

          <AdSlot placement="header" />

          {/* Connected Tool Card */}
          {relatedTool && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-950 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Interactive Tool
                </span>
                <div className="text-lg font-bold text-white">{relatedTool.name}</div>
                <p className="text-xs text-slate-300 max-w-md">{relatedTool.benefit}</p>
              </div>
              <Link
                href={`${relatedTool.clusterHref}/${relatedTool.slug}`}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-2 shrink-0 transition-colors shadow-md self-start sm:self-auto"
              >
                <Calculator className="w-4 h-4" />
                Launch Calculator
              </Link>
            </div>
          )}

          {/* Key Contractor Takeaways */}
          {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Key Takeaways: {guide.title.slice(0, 45)}
              </h2>
              <ul className="space-y-2">
                {guide.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Body Content */}
          <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            {guide.content.map((paragraph, idx) => (
              <section key={idx} className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {sectionHeadings[idx] || `Field Methodology Section ${idx + 1}`}
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  {paragraph}
                </p>
              </section>
            ))}
          </div>

          <AdSlot placement="footer" />
        </article>
      </div>
    </div>
  );
}
