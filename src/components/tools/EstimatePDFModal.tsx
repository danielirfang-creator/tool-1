'use client';

import React, { useState } from 'react';
import { ResultMetric } from './ResultsDisplay';
import {
  Printer,
  FileText,
  X,
  ShieldCheck,
  Hammer,
  Calendar,
  User,
  Building,
  Download,
  Loader2,
  Sparkles,
} from 'lucide-react';

interface EstimatePDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'pdf' | 'print';
  primaryTitle: string;
  primaryValue: string;
  primarySubtext?: string;
  secondaryMetrics: ResultMetric[];
  assumptions: string[];
}

export function EstimatePDFModal({
  isOpen,
  onClose,
  primaryTitle,
  primaryValue,
  primarySubtext,
  secondaryMetrics,
  assumptions,
}: EstimatePDFModalProps) {
  const [projectName, setProjectName] = useState('Home Renovation Project');
  const [clientName, setClientName] = useState('');
  const [contractorName, setContractorName] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [estimateDate] = useState(() =>
    new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      const card = document.getElementById('printable-estimate-card');
      if (!card) {
        window.print();
        return;
      }

      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(card, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const margin = 10;
      const pdfWidth = 210 - margin * 2;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, Math.min(pdfHeight, 277));

      const cleanName = (projectName || 'Estimate').replace(/[^a-zA-Z0-9-_ ]/g, '').trim().replace(/\s+/g, '-');
      pdf.save(`CraftCalc-${cleanName}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleWhatsAppShare = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://tool-1-pied.vercel.app';
    const metricsList = secondaryMetrics
      .map((m) => `▫️ *${m.label}*: ${m.value}${m.subtext ? ` (${m.subtext})` : ''}`)
      .join('\n');

    const message = `📋 *CraftCalc Material & Cost Estimate*
━━━━━━━━━━━━━━━━━━━━
📌 *Project*: ${projectName || 'Renovation Estimate'}
${clientName ? `👤 *Client*: ${clientName}\n` : ''}${contractorName ? `🏗️ *Estimator*: ${contractorName}\n` : ''}⭐ *Total*: *${primaryValue}* ${primarySubtext ? `(${primarySubtext})` : ''}

📊 *Itemization*:
${metricsList}
${customNotes ? `\n📝 *Notes*: ${customNotes}\n` : ''}
🔗 *Online Calculator*: ${currentUrl}
✅ _Contractor verified via CraftCalc.app_`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 print:static print:p-0 print:m-0 print:bg-transparent print:backdrop-blur-none print:overflow-visible">
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col print:static print:max-w-none print:max-h-none print:border-none print:shadow-none print:bg-transparent print:overflow-visible print:my-0">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70 text-white shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Official Estimate & Material Sheet
              </h3>
              <p className="text-xs text-slate-400">
                Direct PDF file download & physical printer receipt
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Editor & Live Preview */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 text-slate-100 print:block print:p-0 print:m-0 print:bg-transparent print:overflow-visible">
          {/* Left Column: Custom Project Controls & Action Buttons */}
          <div className="lg:col-span-4 space-y-4 print:hidden">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Project Details
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Project / Room Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Master Bedroom Flooring"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Client Name (Optional)
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Contractor / Estimator (Optional)
              </label>
              <div className="relative">
                <Building className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={contractorName}
                  onChange={(e) => setContractorName(e.target.value)}
                  placeholder="e.g. Apex Builders"
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Additional Notes
              </label>
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Includes 10% waste buffer for diagonal herringbone pattern."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
              />
            </div>

            {/* ACTION BUTTONS: PDF, WHATSAPP, PRINT */}
            <div className="pt-2 space-y-2">
              {/* Button 1: Direct PDF File Download */}
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-50"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating PDF File...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download PDF File (.pdf)</span>
                  </>
                )}
              </button>

              {/* Button 2: WhatsApp Share */}
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.53 1.771.82 2.79.82 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.767-5.766zm3.377 8.204c-.149.422-.767.798-1.077.839-.311.042-.716.06-2.029-.485-1.554-.645-2.57-2.222-2.648-2.327-.078-.105-.629-.838-.629-1.599 0-.761.398-1.135.539-1.29.141-.155.309-.194.412-.194.103 0 .206.002.296.006.095.005.223-.036.348.265.129.311.442 1.079.481 1.157.039.078.065.169.013.272-.052.103-.078.168-.155.259-.078.091-.163.203-.233.272-.078.077-.16.161-.069.317.091.156.404.667.868 1.08 1.07.954 1.258.98 1.439.889.181-.091.776-.902.983-1.211.207-.311.414-.259.699-.155.284.103 1.801.849 2.111 1.004.31.155.517.233.595.362.078.13.078.751-.071 1.173zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.98-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                </svg>
                <span>Share via WhatsApp</span>
              </button>

              {/* Button 3: Direct Printer Sheet */}
              <button
                type="button"
                onClick={handlePrint}
                className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Print to Printer (1 Page)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Printable Sheet Preview */}
          <div className="lg:col-span-8 print:w-full print:p-0 print:m-0">
            <div
              id="printable-estimate-card"
              className="bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 text-left print:p-4 print:border-none print:shadow-none print:w-full print:m-0"
            >
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-slate-900 pb-3 mb-4 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                      <Hammer className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-lg font-black tracking-tight text-slate-900">
                      Craft<span className="text-emerald-600">Calc</span>
                    </span>
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                    Material & Cost Estimating Certificate
                  </div>
                </div>

                <div className="text-right sm:text-right text-xs text-slate-600 space-y-0.5">
                  <div className="font-bold text-slate-900 text-xs">
                    {projectName || 'Project Estimate'}
                  </div>
                  <div className="flex items-center sm:justify-end gap-1 text-[10px] text-slate-500">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{estimateDate}</span>
                  </div>
                </div>
              </div>

              {/* Meta Info Bar (Client / Contractor) */}
              {(clientName || contractorName) && (
                <div className="grid grid-cols-2 gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs mb-4">
                  {clientName && (
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">
                        Prepared For
                      </span>
                      <span className="font-bold text-slate-900 text-xs">{clientName}</span>
                    </div>
                  )}
                  {contractorName && (
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">
                        Prepared By
                      </span>
                      <span className="font-bold text-slate-900 text-xs">{contractorName}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Primary Total Highlight Banner */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900 text-white mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                    {primaryTitle}
                  </div>
                  <div className="text-xl sm:text-3xl font-black text-white mt-0.5">
                    {primaryValue}
                  </div>
                </div>
                {primarySubtext && (
                  <div className="text-xs font-medium text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                    {primarySubtext}
                  </div>
                )}
              </div>

              {/* Secondary Breakdown Table */}
              <div className="mb-4">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Detailed Itemization & Quantities
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                        <th className="p-2">Metric / Material</th>
                        <th className="p-2 text-right">Calculated Quantity</th>
                        <th className="p-2 text-right">Specification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {secondaryMetrics.map((m, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                          <td className="p-2 font-medium text-slate-800">{m.label}</td>
                          <td className="p-2 font-bold text-slate-900 text-right">{m.value}</td>
                          <td className="p-2 text-slate-500 text-right text-[11px]">{m.subtext || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notes or Assumptions */}
              {(customNotes || assumptions.length > 0) && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 mb-4">
                  {customNotes && (
                    <div>
                      <div className="font-bold text-slate-800 text-[11px]">Project Notes:</div>
                      <p className="text-slate-600 italic text-[11px]">{customNotes}</p>
                    </div>
                  )}

                  {assumptions.length > 0 && (
                    <div>
                      <div className="font-bold text-slate-800 text-[11px]">
                        Technical Assumptions & Algorithms:
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[10px]">
                        {assumptions.map((a, idx) => (
                          <li key={idx}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Document Certificate Footer */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[9px] text-slate-500 gap-1">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Calculated via Verified Construction Algorithms • CraftCalc.app</span>
                </div>
                <div className="text-slate-400">
                  Document ID: CC-{Date.now().toString(36).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
