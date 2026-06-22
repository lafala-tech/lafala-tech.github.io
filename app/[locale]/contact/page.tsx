import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import type { Locale } from '@/i18n/routing';
import { GradientBg } from '@/components/shared/gradient-bg';
import { ContactCard } from '@/components/contact/contact-card';
import { QrCard } from '@/components/contact/qr-card';
import { FaqList } from '@/components/contact/faq-list';
import { Section } from '@/components/shared/section';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { zh: '/zh/contact', en: '/en/contact' },
    },
  };
}

function ContactHero() {
  const t = useTranslations('contact.hero');
  return (
    <section className="relative isolate overflow-hidden pt-16 pb-10 md:pt-24 md:pb-14">
      <GradientBg variant="hero" />
      <div className="container-page">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="text-eyebrow">{t('eyebrow')}</span>
          <h1 className="text-display gradient-text text-balance">{t('title')}</h1>
          <p className="text-foreground-muted max-w-xl text-base md:text-lg">{t('sub')}</p>
        </div>
      </div>
    </section>
  );
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHero />

      <Section className="!pt-4 md:!pt-8">
        <div className="mx-auto grid w-full max-w-5xl gap-5 md:grid-cols-[1.2fr_1fr]">
          <ContactCard />
          <QrCard />
        </div>
      </Section>

      <Section>
        <FaqList />
      </Section>
    </>
  );
}
