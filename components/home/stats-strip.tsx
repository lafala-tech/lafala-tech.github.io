'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';

interface StatItem {
  value: string;
  label: string;
}

/**
 * Tries to extract a numeric prefix from a stat value (e.g. "80+" → 80).
 * Returns null if the value isn't really a number (e.g. "100%" → 100, "AI" → null).
 */
function parseValue(value: string): { num: number; suffix: string } | null {
  const m = value.match(/^([\d.,]+)(.*)$/);
  if (!m) return null;
  const n = Number(m[1].replace(/,/g, ''));
  if (Number.isNaN(n)) return null;
  return { num: n, suffix: m[2] };
}

function StatCell({ item }: { item: StatItem }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const parsed = parseValue(item.value);

  useEffect(() => {
    if (!inView || !parsed || reduced || !ref.current) return;
    const node = ref.current;
    const start = 0;
    const end = parsed.num;
    const controls = animate(start, end, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const rounded = end >= 10 ? Math.round(v) : Math.round(v * 10) / 10;
        node.textContent = `${rounded}${parsed.suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, parsed, reduced]);

  return (
    <div className="flex flex-col gap-1.5">
      <span
        ref={ref}
        className="text-display gradient-text tabular-nums leading-none"
        aria-label={item.value}
      >
        {parsed && !reduced ? `0${parsed.suffix}` : item.value}
      </span>
      <span className="text-foreground-muted text-sm leading-snug md:text-base">
        {item.label}
      </span>
    </div>
  );
}

export function StatsStrip({ className }: { className?: string }) {
  const t = useTranslations('home.stats');
  const items = t.raw('items') as StatItem[];

  return (
    <div
      className={cn(
        'border-border bg-surface/40 grid gap-8 rounded-2xl border p-8 md:grid-cols-4 md:gap-4 md:p-10',
        className,
      )}
    >
      {items.map((item, i) => (
        <StatCell key={i} item={item} />
      ))}
    </div>
  );
}
