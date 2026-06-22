import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import type { Locale } from '@/i18n/routing';
import { Section } from '@/components/shared/section';
import { GradientBg } from '@/components/shared/gradient-bg';
import { ProductToc } from '@/components/product/product-toc';
import { AiDeepDive } from '@/components/product/ai-deep-dive';
import { QuotationEngine } from '@/components/product/quotation-engine';
import { ModuleAccordion } from '@/components/product/module-accordion';
import { ReplacesGrid } from '@/components/product/replaces-grid';
import { DeploymentSection } from '@/components/product/deployment-section';
import { WhiteLabelSection } from '@/components/product/whitelabel-section';
import { TechStack } from '@/components/product/tech-stack';
import { CtaBlock } from '@/components/home/cta-block';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'product.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/product`,
      languages: { zh: '/zh/product', en: '/en/product' },
    },
  };
}

function ProductHero() {
  const t = useTranslations('product.hero');
  return (
    <section className="relative isolate overflow-hidden pt-16 pb-10 md:pt-24 md:pb-14">
      <GradientBg variant="hero" />
      <div className="container-page">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="text-eyebrow">{t('eyebrow')}</span>
          <h1 className="text-display gradient-text text-balance">{t('title')}</h1>
          <p className="text-foreground-muted max-w-2xl text-base md:text-lg">{t('sub')}</p>
        </div>
      </div>
    </section>
  );
}

function ModulesSectionHeader() {
  const t = useTranslations('product.sections.modules');
  return (
    <header className="mb-10 flex max-w-3xl flex-col gap-3">
      <span className="text-eyebrow">{t('eyebrow')}</span>
      <h2 className="text-h2 gradient-text">{t('title')}</h2>
      <p className="text-foreground-muted text-base md:text-lg">{t('sub')}</p>
    </header>
  );
}

export default async function ProductPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProductHero />

      <div className="container-page pb-20 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-[200px_1fr] lg:gap-12">
          <ProductToc />

          <div className="flex min-w-0 flex-col gap-16 md:gap-24">
            <Section id="ai" className="!py-0" align="left">
              <AiDeepDive />
            </Section>

            <Section id="quotation" className="!py-0" align="left">
              <QuotationEngine />
            </Section>

            <Section id="modules" className="!py-0" align="left">
              <ModulesSectionHeader />
              <ModuleAccordion />
            </Section>

            <Section id="replaces" className="!py-0" align="left">
              <ReplacesGrid />
            </Section>

            <Section id="deployment" className="!py-0" align="left">
              <DeploymentSection />
            </Section>

            <Section id="whitelabel" className="!py-0" align="left">
              <WhiteLabelSection />
            </Section>

            <Section id="stack" className="!py-0" align="left">
              <TechStack />
            </Section>

            <CtaBlock />
          </div>
        </div>
      </div>
    </>
  );
}
