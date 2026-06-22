import { useTranslations } from 'next-intl';
import { ArrowRight, Play } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { GradientBg } from '@/components/shared/gradient-bg';
import { CmdKDemo } from '@/components/home/cmdk-demo';

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative isolate overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
      <GradientBg variant="hero" />
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <p className="text-eyebrow mx-auto inline-flex w-fit items-center gap-2 lg:mx-0">
              <span className="bg-accent size-1.5 rounded-full" />
              {t('eyebrow')}
            </p>
            <h1 className="text-display gradient-text mx-auto max-w-xl text-balance lg:mx-0 lg:max-w-none">
              {t('title')}
            </h1>
            <p className="text-foreground-muted mx-auto max-w-xl text-base text-pretty md:text-lg lg:mx-0">
              {t('sub')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Button asChild size="lg">
                <Link href="/product">
                  {t('ctaPrimary')}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/contact">
                  <Play aria-hidden className="size-3.5" />
                  {t('ctaSecondary')}
                </Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-xl lg:max-w-none lg:justify-self-end">
            <CmdKDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
