import { useTranslations } from 'next-intl';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { GradientBg } from '@/components/shared/gradient-bg';
import { SITE } from '@/lib/site';

export function CtaBlock() {
  const t = useTranslations('home.cta');

  return (
    <div className="border-border-strong bg-surface/60 relative isolate overflow-hidden rounded-3xl px-6 py-14 md:px-12 md:py-20">
      <GradientBg variant="cta" />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="text-h2 gradient-text">{t('title')}</h2>
        <p className="text-foreground-muted max-w-md text-base md:text-lg">{t('sub')}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <a href={`mailto:${SITE.email}`}>
              <Mail aria-hidden />
              {t('primary')}
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/product">
              {t('secondary')}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
