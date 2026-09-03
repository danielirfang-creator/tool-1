import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { toolsRegistry, getToolBySlug } from '@/config/tools';
import { siteConfig } from '@/config/site';
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

  const path = `${tool.clusterHref}/${tool.slug}`;

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${tool.metaTitle} | CraftCalc`,
      description: tool.metaDescription,
      url: `${siteConfig.url}${path}`,
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${tool.name} - CraftCalc`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.metaTitle} | CraftCalc`,
      description: tool.metaDescription,
      images: [`${siteConfig.url}/og-image.png`],
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
