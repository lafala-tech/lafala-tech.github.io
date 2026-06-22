import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { NAV_ITEMS } from '@/lib/nav';
import type { Locale } from '@/i18n/routing';
import { SITE } from '@/lib/site';
import { LogoMark } from '@/components/shared/logo-mark';

interface FooterProps {
  locale: Locale;
}

// `locale` is intentionally unused for now but kept on the props for future per-locale tweaks.
export function Footer({ locale: _locale }: FooterProps) {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface/30 mt-12 border-t">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <LogoMark />
            <p className="text-foreground-muted max-w-sm text-sm leading-relaxed">
              {t('tagline')}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="text-foreground-muted hover:text-foreground inline-flex items-center gap-2 text-sm transition"
            >
              <Mail className="size-4" />
              {SITE.email}
            </a>
          </div>

          <nav aria-label={t('navHeading')}>
            <h4 className="text-foreground mb-3 text-sm font-semibold">{t('navHeading')}</h4>
            <ul className="flex flex-col gap-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground-muted hover:text-foreground transition"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/"
                  className="text-foreground-muted hover:text-foreground transition"
                >
                  {tNav('home')}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h4 className="text-foreground mb-3 text-sm font-semibold">
              {t('contactHeading')}
            </h4>
            <ul className="text-foreground-muted flex flex-col gap-2 text-sm">
              <li>{t('contactLocation')}</li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-foreground transition"
                >
                  {SITE.email}
                </a>
              </li>
              <li>{t('replySla')}</li>
            </ul>
          </div>
        </div>

        <div className="border-border text-foreground-subtle mt-10 flex flex-col gap-3 border-t pt-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>{t('copy', { year })}</p>
          <p>{t('builtWith')}</p>
        </div>
      </div>
    </footer>
  );
}
