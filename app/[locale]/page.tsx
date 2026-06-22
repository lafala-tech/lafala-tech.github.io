import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/home/hero';
import { Section } from '@/components/shared/section';
import { StatsStrip } from '@/components/home/stats-strip';
import { Pillars } from '@/components/home/pillars';
import { ModuleOverview } from '@/components/home/module-overview';
import { AiQuote } from '@/components/home/ai-quote';
import { TestimonialQuote } from '@/components/home/testimonial';
import { CtaBlock } from '@/components/home/cta-block';
import type { Locale } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'zh' ? '/' : `/${locale}`,
      languages: { zh: '/', en: '/en' },
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <>
      <Hero />

      <Section compact>
        <StatsStrip />
      </Section>

      <Section title={t('pillars.title')}>
        <Pillars />
      </Section>

      <Section title={t('modules.title')} bg="surface">
        <ModuleOverview />
      </Section>

      <Section compact>
        <AiQuote />
      </Section>

      <Section>
        <TestimonialQuote />
      </Section>

      <Section compact>
        <CtaBlock />
      </Section>
    </>
  );
}
