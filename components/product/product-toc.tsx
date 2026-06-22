'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';

interface TocItem {
  id: string;
  label: string;
}

export function ProductToc() {
  const t = useTranslations('product.toc');
  const items: TocItem[] = [
    { id: 'ai', label: t('ai') },
    { id: 'quotation', label: t('quotation') },
    { id: 'modules', label: t('modules') },
    { id: 'replaces', label: t('replaces') },
    { id: 'deployment', label: t('deployment') },
    { id: 'whitelabel', label: t('whitelabel') },
    { id: 'stack', label: t('stack') },
  ];

  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // pick the topmost visible
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Desktop sidebar */}
      <nav
        aria-label="On this page"
        className="sticky top-24 hidden lg:block"
      >
        <ul className="flex flex-col gap-1 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  'block rounded-md px-3 py-1.5 transition-colors',
                  active === item.id
                    ? 'text-foreground bg-surface'
                    : 'text-foreground-muted hover:text-foreground hover:bg-surface/40',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile pill nav */}
      <div className="bg-background/80 sticky top-16 z-30 -mx-5 mb-8 overflow-x-auto border-y border-border px-5 py-2 backdrop-blur lg:hidden">
        <ul className="flex w-max items-center gap-1.5 text-xs">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  'inline-flex h-7 items-center whitespace-nowrap rounded-full px-3 transition-colors',
                  active === item.id
                    ? 'bg-brand-soft text-foreground'
                    : 'border-border text-foreground-muted border bg-surface/40',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
