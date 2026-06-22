import { Inter, JetBrains_Mono, Noto_Sans_SC } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { routing, type Locale } from '@/i18n/routing';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { cn } from '@/lib/cn';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sc',
  display: 'swap',
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const htmlLangMap: Record<Locale, string> = {
  zh: 'zh-CN',
  en: 'en',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={htmlLangMap[locale]}
      data-theme="dark"
      suppressHydrationWarning
      className={cn(inter.variable, notoSansSC.variable, jetbrainsMono.variable)}
    >
      <body className="font-sans antialiased">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-brand focus:px-3 focus:py-2 focus:text-brand-foreground"
          >
            Skip to content
          </a>
          <Header locale={locale} />
          <main id="main">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
