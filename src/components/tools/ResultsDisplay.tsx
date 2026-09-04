'use client';

import React, { useState } from 'react';
import { Check, Copy, Printer, Info, FileText, Download } from 'lucide-react';
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

  const handleWhatsAppShare = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://tool-1-pied.vercel.app';
    const metricsList = secondaryMetrics
      .map((m) => `▫️ *${m.label}*: ${m.value}${m.subtext ? ` (${m.subtext})` : ''}`)
      .join('\n');

    const message = `📋 *CraftCalc Material & Cost Estimate*
━━━━━━━━━━━━━━━━━━━━
📌 *Total*: *${primaryValue}* ${primarySubtext ? `(${primarySubtext})` : ''}

📊 *Itemization*:
${metricsList}

🔗 *Open Calculator*: ${currentUrl}
✅ _Calculated via CraftCalc.app_`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
      {/* Top action header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
          Calculation Result
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {/* WhatsApp Instant Share */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
            title="Share estimate via WhatsApp"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.53 1.771.82 2.79.82 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.767-5.766zm3.377 8.204c-.149.422-.767.798-1.077.839-.311.042-.716.06-2.029-.485-1.554-.645-2.57-2.222-2.648-2.327-.078-.105-.629-.838-.629-1.599 0-.761.398-1.135.539-1.29.141-.155.309-.194.412-.194.103 0 .206.002.296.006.095.005.223-.036.348.265.129.311.442 1.079.481 1.157.039.078.065.169.013.272-.052.103-.078.168-.155.259-.078.091-.163.203-.233.272-.078.077-.16.161-.069.317.091.156.404.667.868 1.08 1.07.954 1.258.98 1.439.889.181-.091.776-.902.983-1.211.207-.311.414-.259.699-.155.284.103 1.801.849 2.111 1.004.31.155.517.233.595.362.078.13.078.751-.071 1.173zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.98-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
            </svg>
            <span>WhatsApp</span>
          </button>

          {/* Copy Summary */}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg transition-colors border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          {/* Print Sheet */}
          <button
            type="button"
            onClick={() => setIsPdfModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg transition-colors border border-slate-700"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-400" />
            <span>Print Sheet</span>
          </button>

          {/* Download PDF */}
          <button
            type="button"
            onClick={() => setIsPdfModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
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
