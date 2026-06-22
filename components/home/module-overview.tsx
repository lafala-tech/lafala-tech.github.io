'use client';

import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BrowserFrame } from '@/components/shared/browser-frame';
import { cn } from '@/lib/cn';

interface ModuleItem {
  key: string;
  name: string;
  summary: string;
  points: string[];
}

function ModuleScreenshot({ module: m }: { module: ModuleItem }) {
  return (
    <BrowserFrame url={`app.lafala.tech/${m.key}`} className="w-full">
      <div className="grid gap-0 sm:grid-cols-[200px_1fr]">
        {/* Sidebar */}
        <aside className="border-border bg-surface/40 hidden border-r p-3 text-xs sm:block">
          <div className="text-foreground-subtle mb-2 px-2 text-[10px] font-medium uppercase tracking-wider">
            Lafala ERP
          </div>
          {['Dashboard', 'CRM', 'Quotation', 'Contract', 'Project', 'Team'].map((label) => {
            const active = label.toLowerCase() === m.key || label.toLowerCase().includes(m.key);
            return (
              <div
                key={label}
                className={cn(
                  'mb-0.5 rounded px-2 py-1.5 text-[11px]',
                  active ? 'bg-brand-soft text-foreground' : 'text-foreground-muted',
                )}
              >
                {label}
              </div>
            );
          })}
        </aside>
        {/* Body */}
        <div className="bg-background/40 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-foreground text-sm font-semibold">{m.name}</div>
              <div className="text-foreground-subtle text-[11px]">{m.summary}</div>
            </div>
            <span className="border-border bg-surface text-foreground-muted inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px]">
              ⌘K
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {m.points.map((_, j) => (
              <div
                key={j}
                className={cn(
                  'border-border ring-soft rounded-md border p-2.5',
                  j === 0 && 'bg-brand-soft border-border-strong',
                )}
              >
                <div className="mb-1.5 flex items-center gap-1.5">
                  <span className="bg-accent-soft text-accent size-4 rounded-sm" />
                  <span className="text-foreground-muted text-[10px]">#{j + 1}</span>
                </div>
                <div className="bg-foreground/10 mb-1 h-1.5 w-3/4 rounded" />
                <div className="bg-foreground/10 h-1.5 w-1/2 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function ModuleOverview() {
  const t = useTranslations('home.modules');
  const items = t.raw('items') as ModuleItem[];

  return (
    <Tabs defaultValue={items[0].key} className="w-full">
      <TabsList className="mx-auto flex w-full max-w-full flex-wrap justify-center overflow-x-auto md:h-12">
        {items.map((m) => (
          <TabsTrigger key={m.key} value={m.key} className="text-xs md:text-sm">
            {m.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((m) => (
        <TabsContent key={m.key} value={m.key}>
          <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-center">
            <div className="flex flex-col gap-4">
              <h3 className="text-h2 text-balance">{m.name}</h3>
              <p className="text-foreground-muted text-base">{m.summary}</p>
              <ul className="flex flex-col gap-2.5">
                {m.points.map((p) => (
                  <li key={p} className="text-foreground flex items-start gap-2.5 text-sm">
                    <span className="bg-brand-soft text-success mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full">
                      <Check className="size-3" />
                    </span>
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ModuleScreenshot module={m} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
