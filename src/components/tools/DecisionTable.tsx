import React from 'react';
import { Table, Check } from 'lucide-react';

interface DecisionTableProps {
  title: string;
  description: string;
  headers: string[];
  rows: (string | number)[][];
  notes?: string[];
}

export function DecisionTable({
  title,
  description,
  headers,
  rows,
  notes,
}: DecisionTableProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
      <h2 className="flex items-center gap-2 text-slate-900 font-bold text-lg sm:text-xl border-b border-slate-100 pb-3">
        <Table className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>{title}</span>
      </h2>

      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>

      {/* Overflow table */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left text-xs sm:text-sm whitespace-nowrap sm:whitespace-normal">
          <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              {headers.map((h, idx) => (
                <th key={idx} className="py-3 px-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors">
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className={`py-3 px-4 ${
                      cellIdx === 0
                        ? 'font-bold text-slate-900'
                        : cellIdx === row.length - 1
                        ? 'font-semibold text-emerald-700'
                        : 'text-slate-600'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {notes && notes.length > 0 && (
        <ul className="space-y-1 text-xs text-slate-500 pt-2">
          {notes.map((note, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
