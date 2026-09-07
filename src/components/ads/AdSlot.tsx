'use client';

import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  placement: 'header' | 'in-content' | 'sidebar' | 'footer';
  className?: string;
}

export function AdSlot({ placement, className = '' }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = containerRef.current;
    if (!current) return;

    if (placement === 'sidebar') {
      // 300x250 Adsterra Iframe Banner
      current.innerHTML = `
        <iframe
          width="300"
          height="250"
          frameborder="0"
          scrolling="no"
          style="border:none;overflow:hidden;width:300px;height:250px;"
          srcdoc="<!DOCTYPE html><html><head><base target='_blank'/></head><body style='margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;'><script type='text/javascript'>atOptions = {'key' : '81b960fa6e87eca5f29e7b1f410b73fe','format' : 'iframe','height' : 250,'width' : 300,'params' : {}};</script><script type='text/javascript' src='https://www.highrevenueformat.com/81b960fa6e87eca5f29e7b1f410b73fe/invoke.js'></script></body></html>"
        ></iframe>
      `;
    } else {
      // Native Banner
      current.innerHTML = '';
      const adDiv = document.createElement('div');
      adDiv.id = 'container-32de9c9985738b309dc4df40eb329aa1';

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl31226248.profitableratecpmnetwork.com/32de9c9985738b309dc4df40eb329aa1/invoke.js';

      current.appendChild(adDiv);
      current.appendChild(script);
    }

    return () => {
      if (current) {
        current.innerHTML = '';
      }
    };
  }, [placement]);

  return (
    <div
      className={`my-6 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-2 text-center transition-all ${className}`}
      aria-label="Advertisement"
    >
      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
        Sponsored / Advertisement
      </span>
      <div
        ref={containerRef}
        className={`w-full flex justify-center items-center ${
          placement === 'sidebar' ? 'min-h-[250px] min-w-[300px]' : 'min-h-[60px]'
        }`}
      />
    </div>
  );
}
