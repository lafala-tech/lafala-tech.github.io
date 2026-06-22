import type { Locale } from '@/i18n/routing';

export type NavItem = {
  /** Path within the locale (next-intl will prepend /en for English) */
  href: string;
  /** i18n key under the `nav` namespace */
  key: 'product' | 'contact';
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/product', key: 'product' },
  { href: '/contact', key: 'contact' },
] as const;

export const LOCALE_LABELS: Record<Locale, { short: string; long: string }> = {
  zh: { short: '中', long: '中文' },
  en: { short: 'EN', long: 'English' },
};
