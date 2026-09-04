import React from 'react';
import Link from 'next/link';
import { toolsRegistry } from '@/config/tools';
import { ArrowRight, Compass } from 'lucide-react';

interface RelatedToolsProps {
  relatedSlugs: string[];
  currentSlug: string;
  toolName?: string;
}

export function RelatedTools({ relatedSlugs, currentSlug, toolName }: RelatedToolsProps) {
  const tools = toolsRegistry.filter(
    (t) => relatedSlugs.includes(t.slug) && t.slug !== currentSlug
  );

  if (tools.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 sm:p-8 shadow-sm space-y-4">
      <h2 className="flex items-center gap-2 text-slate-900 font-bold text-lg sm:text-xl border-b border-slate-200/80 pb-3">
        <Compass className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>{toolName ? `Related Calculators & Next Steps for ${toolName}` : 'Next Steps in Your Project'}</span>
      </h2>

      <p className="text-xs sm:text-sm text-slate-600">
        Planning a comprehensive renovation? Continue your estimate with these connected cluster tools:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/calculators/${tool.cluster}/${tool.slug}`}
            className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                {tool.clusterName}
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 mt-1 transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-snug">
                {tool.benefit}
              </p>
            </div>
            <div className="mt-4 inline-flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Open Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
