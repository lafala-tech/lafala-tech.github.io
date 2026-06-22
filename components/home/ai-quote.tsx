import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export function AiQuote() {
  const t = useTranslations('home.aiQuote');
  return (
    <div className="border-border-strong bg-surface/40 relative isolate overflow-hidden rounded-3xl p-8 md:p-14">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--accent)_10%,transparent)_0%,transparent_70%)]"
      />
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <span className="text-eyebrow">{t('eyebrow')}</span>
        <p className="gradient-text text-balance text-2xl font-semibold leading-snug md:text-4xl">
          {t('title')}
        </p>
        <p className="text-foreground-muted max-w-xl text-base md:text-lg">{t('body')}</p>
        <Link
          href="/product#ai"
          className="text-accent inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
        >
          {t('linkLabel')} <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
