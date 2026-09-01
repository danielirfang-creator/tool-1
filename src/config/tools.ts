import { ToolMeta } from './tools/types';
import { flooringTools } from './tools/flooring';
import { paintingTools } from './tools/painting';
import { concreteTools } from './tools/concrete';
import { gardenTools } from './tools/garden';
import { roomTools } from './tools/rooms';
import { conversionTools } from './tools/conversions';

export * from './tools/types';

export const toolsRegistry: ToolMeta[] = [
  ...flooringTools,
  ...paintingTools,
  ...concreteTools,
  ...gardenTools,
  ...roomTools,
  ...conversionTools,
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return toolsRegistry.find((t) => t.slug === slug);
}

export function getToolsByCluster(cluster: string): ToolMeta[] {
  return toolsRegistry.filter((t) => t.cluster === cluster);
}

export function getFeaturedTools(): ToolMeta[] {
  return toolsRegistry.filter((t) => t.status === 'live');
}
