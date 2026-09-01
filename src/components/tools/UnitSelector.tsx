'use client';

import React from 'react';

interface UnitSelectorProps {
  unit: 'imperial' | 'metric';
  onChange: (unit: 'imperial' | 'metric') => void;
}

export function UnitSelector({ unit, onChange }: UnitSelectorProps) {
  return (
    <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
      <button
        type="button"
        onClick={() => onChange('imperial')}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
          unit === 'imperial'
            ? 'bg-white text-emerald-700 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        Imperial (Feet / Inches)
      </button>
      <button
        type="button"
        onClick={() => onChange('metric')}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
          unit === 'metric'
            ? 'bg-white text-emerald-700 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        Metric (Meters / CM)
      </button>
    </div>
  );
}
