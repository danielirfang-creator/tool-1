'use client';

import React from 'react';

interface WasteFactorSelectorProps {
  value: number;
  onChange: (val: number) => void;
  options?: { percent: number; label: string; desc: string }[];
}

export function WasteFactorSelector({
  value,
  onChange,
  options = [
    { percent: 5, label: '5% Minimal', desc: 'Simple rectangular area, expert installer' },
    { percent: 10, label: '10% Standard', desc: 'Recommended standard for straight patterns' },
    { percent: 15, label: '15% Diagonal', desc: 'Diagonal pattern or rooms with closets' },
    { percent: 20, label: '20% Complex', desc: 'Herringbone, chevron, or multi-room cuts' },
  ],
}: WasteFactorSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <label className="font-semibold text-slate-700">Recommended Waste & Cutting Buffer</label>
        <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
          +{value}% Selected
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map((opt) => {
          const isSelected = value === opt.percent;
          return (
            <button
              key={opt.percent}
              type="button"
              onClick={() => onChange(opt.percent)}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className={`text-xs font-bold ${isSelected ? 'text-emerald-800' : 'text-slate-800'}`}>
                {opt.label}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 leading-tight line-clamp-2">
                {opt.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
