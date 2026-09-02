import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { toolsRegistry, getToolBySlug } from '@/config/tools';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { UniversalCalculatorWidget } from '@/components/tools/UniversalCalculatorWidget';

interface ToolPageProps {
  params: {
    cluster: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  return toolsRegistry.map((tool) => ({
    cluster: tool.cluster,
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};

  return {
    title: `${tool.metaTitle} | CraftCalc`,
    description: tool.metaDescription,
    alternates: {
      canonical: `${tool.clusterHref}/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.metaTitle} | CraftCalc`,
      description: tool.metaDescription,
      url: `${tool.clusterHref}/${tool.slug}`,
      type: 'website',
    },
  };
}

export default function GenericToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  return <ToolPageLayout tool={tool} calculatorSlot={<UniversalCalculatorWidget tool={tool} />} />;
}
