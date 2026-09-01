import React from 'react';
import { getToolBySlug } from '@/config/tools';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { FlooringCalculatorUI } from '@/components/calculators/FlooringCalculatorUI';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const tool = getToolBySlug('flooring-calculator');

export const metadata: Metadata = {
  title: tool?.metaTitle || 'Flooring Calculator',
  description: tool?.metaDescription,
  keywords: tool?.keywords,
  alternates: {
    canonical: `/calculators/flooring/flooring-calculator`,
  },
  openGraph: {
    title: tool?.metaTitle,
    description: tool?.metaDescription,
  },
};

export default function FlooringCalculatorPage() {
  if (!tool) return notFound();

  return (
    <ToolPageLayout
      tool={tool}
      calculatorSlot={<FlooringCalculatorUI />}
    />
  );
}
