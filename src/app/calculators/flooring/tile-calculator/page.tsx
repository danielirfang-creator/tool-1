import React from 'react';
import { getToolBySlug } from '@/config/tools';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { TileCalculatorUI } from '@/components/calculators/TileCalculatorUI';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const tool = getToolBySlug('tile-calculator');

export const metadata: Metadata = {
  title: tool?.metaTitle || 'Tile Calculator',
  description: tool?.metaDescription,
  keywords: tool?.keywords,
  alternates: {
    canonical: `/calculators/flooring/tile-calculator`,
  },
  openGraph: {
    title: tool?.metaTitle,
    description: tool?.metaDescription,
  },
};

export default function TileCalculatorPage() {
  if (!tool) return notFound();

  return (
    <ToolPageLayout
      tool={tool}
      calculatorSlot={<TileCalculatorUI />}
    />
  );
}
