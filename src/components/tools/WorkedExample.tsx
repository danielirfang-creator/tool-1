import React from 'react';
import { Calculator, CheckCircle2, Lightbulb } from 'lucide-react';

interface WorkedExampleProps {
  title: string;
  scenario: string;
  inputs: { label: string; value: string }[];
  steps: { step: string; calculation: string; result: string }[];
  finalAnswer: string;
  proTip?: string;
}

export function WorkedExample({
  title,
  scenario,
  inputs,
  steps,
  finalAnswer,
  proTip,
}: WorkedExampleProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
      <h2 className="flex items-center gap-2 text-slate-900 font-bold text-lg sm:text-xl border-b border-slate-100 pb-3">
        <Calculator className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>Worked Example: {title}</span>
      </h2>

      <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 leading-relaxed border border-slate-100">
        <span className="font-bold text-slate-900">Scenario: </span>
        {scenario}
      </div>

      {/* Inputs List */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Example Parameters</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {inputs.map((inp, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-slate-100/70 border border-slate-200/60">
              <div className="text-[10px] text-slate-500 font-medium">{inp.label}</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">{inp.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step by step calculation table */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Step-by-Step Calculation</div>
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Step</th>
                <th className="py-2.5 px-4">Formula / Calculation</th>
                <th className="py-2.5 px-4 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {steps.map((st, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-4 font-medium text-slate-900">{st.step}</td>
                  <td className="py-2.5 px-4 font-mono text-xs text-slate-600">{st.calculation}</td>
                  <td className="py-2.5 px-4 font-bold text-emerald-700 text-right">{st.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final Answer Highlight Box */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-sm font-semibold text-emerald-950">
          <span className="font-bold text-emerald-800">Final Recommendation: </span>
          {finalAnswer}
        </div>
      </div>

      {/* Pro Tip Callout */}
      {proTip && (
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-950">Pro Contractor Tip: </span>
            {proTip}
          </div>
        </div>
      )}
    </div>
  );
}
