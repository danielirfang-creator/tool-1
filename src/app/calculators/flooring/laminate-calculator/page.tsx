import React from 'react';
import { getToolBySlug } from '@/config/tools';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { LaminateCalculatorUI } from '@/components/calculators/LaminateCalculatorUI';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const tool = getToolBySlug('laminate-calculator');

export const metadata: Metadata = {
  title: tool?.metaTitle || 'Laminate Calculator',
  description: tool?.metaDescription,
  keywords: tool?.keywords,
  alternates: {
    canonical: `/calculators/flooring/laminate-calculator`,
  },
  openGraph: {
    title: tool?.metaTitle,
    description: tool?.metaDescription,
  },
};

export default function LaminateCalculatorPage() {
  if (!tool) return notFound();

  return (
    <ToolPageLayout
      tool={tool}
      calculatorSlot={<LaminateCalculatorUI />}
    />
  );
}
