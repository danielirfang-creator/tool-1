'use client';

import React, { useState } from 'react';
import { Check, Copy, Printer, Info, FileText } from 'lucide-react';
import { EstimatePDFModal } from './EstimatePDFModal';

export interface ResultMetric {
  label: string;
  value: string | number;
  subtext?: string;
  highlight?: boolean;
}

interface ResultsDisplayProps {
  primaryTitle: string;
  primaryValue: string;
  primarySubtext?: string;
  secondaryMetrics: ResultMetric[];
  assumptions: string[];
}

export function ResultsDisplay({
  primaryTitle,
  primaryValue,
  primarySubtext,
  secondaryMetrics,
  assumptions,
}: ResultsDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const handleCopy = () => {
    const text = `CraftCalc Results:
${primaryTitle}: ${primaryValue} ${primarySubtext || ''}
${secondaryMetrics.map((m) => `${m.label}: ${m.value} (${m.subtext || ''})`).join('\n')}
Assumptions: ${assumptions.join('; ')}
Calculated at: ${window.location.href}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
      {/* Top action header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
          Calculation Result
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsPdfModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Save PDF / Print Estimate</span>
          </button>
        </div>
      </div>

      {/* Primary Highlight Result Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 mb-6 text-center sm:text-left">
        <div className="text-xs font-bold uppercase tracking-wider text-emerald-400/90 mb-1">
          {primaryTitle}
        </div>
        <div className="text-3xl sm:text-5xl font-black text-white tracking-tight flex flex-wrap items-baseline gap-2 justify-center sm:justify-start">
          <span>{primaryValue}</span>
          {primarySubtext && (
            <span className="text-base sm:text-xl font-medium text-slate-300">
              {primarySubtext}
            </span>
          )}
        </div>
      </div>

      {/* Section 2: Secondary Metric Intelligence Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {secondaryMetrics.map((metric, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border transition-all ${
              metric.highlight
                ? 'bg-emerald-950/40 border-emerald-500/40'
                : 'bg-slate-800/60 border-slate-700/60'
            }`}
          >
            <div className="text-[11px] font-medium text-slate-400 truncate">{metric.label}</div>
            <div className="text-lg sm:text-xl font-bold text-white mt-0.5">{metric.value}</div>
            {metric.subtext && (
              <div className="text-[10px] text-slate-400 mt-0.5 truncate">{metric.subtext}</div>
            )}
          </div>
        ))}
      </div>

      {/* Assumptions & Integrity notes */}
      {assumptions.length > 0 && (
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-semibold text-slate-300 mb-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Assumptions & Calculation Logic:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
            {assumptions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Official Print & PDF Estimate Modal */}
      <EstimatePDFModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        primaryTitle={primaryTitle}
        primaryValue={primaryValue}
        primarySubtext={primarySubtext}
        secondaryMetrics={secondaryMetrics}
        assumptions={assumptions}
      />
    </div>
  );
}
