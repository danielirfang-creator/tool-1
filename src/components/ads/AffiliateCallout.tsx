import React from 'react';
import { ShoppingBag, ExternalLink } from 'lucide-react';

interface AffiliateCalloutProps {
  title: string;
  description: string;
  items: {
    name: string;
    purpose: string;
    actionText: string;
    href: string;
  }[];
}

export function AffiliateCallout({ title, description, items }: AffiliateCalloutProps) {
  return (
    <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-emerald-200/60 shadow-sm">
      <div className="flex items-center gap-2 text-emerald-800 font-bold text-base mb-1">
        <ShoppingBag className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>{title}</span>
      </div>
      <p className="text-xs text-slate-600 mb-4">{description}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, idx) => (
          <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">{item.name}</div>
              <div className="text-[11px] text-slate-500 mt-1 leading-snug">{item.purpose}</div>
            </div>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-3 inline-flex items-center justify-between text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <span>{item.actionText}</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[10px] text-slate-400 italic">
        Editorial Disclosure: We recommend verified tools that help execute precise DIY projects. We may receive an affiliate commission at no cost to you.
      </div>
    </div>
  );
}
