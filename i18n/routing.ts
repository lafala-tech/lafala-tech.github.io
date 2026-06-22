import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
  localePrefix: 'as-needed',
  // Always serve Chinese at /. English visitors flip with the locale switcher.
  // (next-intl would otherwise inspect Accept-Language and redirect.)
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
