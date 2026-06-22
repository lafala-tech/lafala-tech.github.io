import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function TestimonialQuote() {
  const t = useTranslations('home.testimonial');
  const tLabel = useTranslations('common.labels');

  return (
    <Card className="bg-surface/40 relative mx-auto max-w-3xl overflow-hidden p-8 md:p-12">
      <Quote className="text-accent/30 absolute -top-2 -left-2 size-20" aria-hidden />
      <blockquote className="relative">
        <p className="text-foreground text-pretty text-xl leading-relaxed md:text-2xl">
          “{t('quote')}”
        </p>
        <footer className="text-foreground-muted mt-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="text-foreground font-semibold">{t('author')}</span>
          <span className="text-foreground-subtle">·</span>
          <span>{t('role')}</span>
          <span className="text-foreground-subtle">·</span>
          <span>{t('company')}</span>
          <Badge variant="accent" className="ml-auto">
            {tLabel('internalBeta')}
          </Badge>
        </footer>
      </blockquote>
    </Card>
  );
}
