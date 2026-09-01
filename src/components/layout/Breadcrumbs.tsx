import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbCrumb {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbCrumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-0">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 font-medium">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-emerald-600 transition-colors text-slate-600"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {isLast ? (
                <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-emerald-600 transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
