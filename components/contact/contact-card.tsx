import { useTranslations } from 'next-intl';
import { Mail, ArrowRight, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/site';

export function ContactCard() {
  const t = useTranslations('contact.card');
  return (
    <div className="border-border-strong bg-surface/50 ring-elevated flex flex-col gap-6 rounded-2xl border p-6 md:p-8">
      <div className="flex flex-col gap-3">
        <span className="bg-brand-soft text-accent inline-flex size-10 items-center justify-center rounded-lg">
          <Mail className="size-5" />
        </span>
        <div className="text-foreground text-sm font-semibold">{t('primaryLabel')}</div>
        <a
          href={`mailto:${SITE.email}`}
          className="text-foreground gradient-text text-2xl font-semibold md:text-3xl"
        >
          {SITE.email}
        </a>
        <p className="text-foreground-muted text-sm">{t('primaryNote')}</p>
      </div>
      <div>
        <Button asChild size="lg" className="w-full md:w-auto">
          <a href={`mailto:${SITE.email}?subject=Lafala%20ERP`}>
            {t('primaryButton')}
            <ArrowRight aria-hidden />
          </a>
        </Button>
      </div>
      <div className="border-border text-foreground-muted border-t pt-5 text-sm">
        <div className="text-foreground mb-1 flex items-center gap-2 font-medium">
          <MessageSquareText className="text-foreground-muted size-4" />
          {t('secondaryLabel')}
        </div>
        <p className="text-xs">{t('secondaryNote')}</p>
      </div>
    </div>
  );
}
