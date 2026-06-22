'use client';

import { useTransition } from 'react';
import { useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { LOCALE_LABELS } from '@/lib/nav';
import { cn } from '@/lib/cn';

interface LocaleSwitcherProps {
  currentLocale: Locale;
}

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={t('languageSwitcher')}
      className="border-border bg-surface inline-flex h-9 items-center rounded-full border p-0.5 text-xs"
    >
      {routing.locales.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <button
            key={locale}
            type="button"
            disabled={pending || isActive}
            aria-pressed={isActive}
            aria-label={LOCALE_LABELS[locale].long}
            onClick={() =>
              startTransition(() => {
                router.replace(pathname, { locale });
              })
            }
            className={cn(
              'inline-flex h-8 min-w-[40px] items-center justify-center rounded-full px-3 font-medium transition-colors',
              isActive
                ? 'bg-surface-elevated text-foreground shadow-sm'
                : 'text-foreground-muted hover:text-foreground disabled:opacity-50',
            )}
          >
            {LOCALE_LABELS[locale].short}
          </button>
        );
      })}
    </div>
  );
}
