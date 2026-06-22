import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ModuleItem {
  key: string;
  name: string;
  summary: string;
  points: string[];
}

export function ModuleAccordion() {
  // Reuse home module data — keeps copy in one place.
  const t = useTranslations('home.modules');
  const items = t.raw('items') as ModuleItem[];

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={items[0]?.key}
      className="border-border bg-surface/40 ring-soft w-full rounded-xl border px-4 md:px-6"
    >
      {items.map((m) => (
        <AccordionItem key={m.key} value={m.key}>
          <AccordionTrigger>
            <span className="flex items-baseline gap-3">
              <span className="text-foreground text-base font-semibold md:text-lg">
                {m.name}
              </span>
              <span className="text-foreground-muted hidden text-xs font-normal md:inline">
                {m.summary}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-2.5 pt-2">
              {m.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="bg-brand-soft text-success mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-3" />
                  </span>
                  <span className="text-foreground-muted text-sm leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
