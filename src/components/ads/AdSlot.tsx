import React from 'react';
import { siteConfig } from '@/config/site';

interface AdSlotProps {
  placement: 'header' | 'in-content' | 'sidebar' | 'footer';
  className?: string;
}

export function AdSlot({ placement, className = '' }: AdSlotProps) {
  if (!siteConfig.adsense.enabled) return null;

  // Responsive reserved heights to eliminate Cumulative Layout Shift (CLS)
  const formatStyles: Record<string, { minHeight: string; label: string }> = {
    header: { minHeight: 'min-h-[90px]', label: 'Top Leaderboard Ad' },
    'in-content': { minHeight: 'min-h-[250px]', label: 'In-Article Ad' },
    sidebar: { minHeight: 'min-h-[300px]', label: 'Sidebar Display Ad' },
    footer: { minHeight: 'min-h-[90px]', label: 'Bottom Banner Ad' },
  };

  const current = formatStyles[placement] || formatStyles['in-content'];

  return (
    <aside
      aria-label="Advertisement"
      className={`w-full my-6 flex flex-col items-center justify-center bg-slate-50 border border-dashed border-slate-300/80 rounded-2xl p-4 text-center transition-all ${current.minHeight} ${className}`}
    >
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
        Advertisement
      </span>
      {/* Live Google AdSense Container Placeholder */}
      <div className="w-full flex flex-col items-center justify-center text-slate-400 text-xs">
        <div className="text-slate-500 font-medium">{current.label}</div>
        <div className="text-[11px] text-slate-400 mt-1">Google AdSense Reserved Unit ({placement})</div>
      </div>
    </aside>
  );
}
