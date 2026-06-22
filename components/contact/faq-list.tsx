import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FaqItem {
  q: string;
  a: string;
}

export function FaqList() {
  const t = useTranslations('contact.faq');
  const items = t.raw('items') as FaqItem[];

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h2 className="text-h2 gradient-text mb-8 text-center">{t('title')}</h2>
      <Accordion
        type="single"
        collapsible
        className="border-border bg-surface/40 rounded-xl border px-4 md:px-6"
      >
        {items.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>
              <p className="text-foreground-muted text-base leading-relaxed">{item.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
