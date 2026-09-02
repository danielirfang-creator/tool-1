import React from 'react';
import { siteConfig } from '@/config/site';

interface AdSlotProps {
  placement: 'header' | 'in-content' | 'sidebar' | 'footer';
  className?: string;
}

export function AdSlot({ placement, className = '' }: AdSlotProps) {
  return null;
}
