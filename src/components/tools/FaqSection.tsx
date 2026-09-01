'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
  title?: string;
}

export function FaqSection({ faqs, title = 'Frequently Asked Questions' }: FaqSectionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    if (openIndexes.includes(idx)) {
      setOpenIndexes(openIndexes.filter((i) => i !== idx));
    } else {
      setOpenIndexes([...openIndexes, idx]);
    }
  };

  // Structured Data Schema for Google Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
      {/* FAQ Schema Injector */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex items-center gap-2 text-slate-900 font-bold text-lg sm:text-xl border-b border-slate-100 pb-3">
        <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>{title}</span>
      </div>

      <div className="divide-y divide-slate-200/80">
        {faqs.map((faq, idx) => {
          const isOpen = openIndexes.includes(idx);
          return (
            <div key={idx} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full flex items-center justify-between text-left font-bold text-slate-900 text-sm sm:text-base hover:text-emerald-700 transition-colors focus:outline-none gap-4"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1 pr-4 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
