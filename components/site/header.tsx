'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { NAV_ITEMS } from '@/lib/nav';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { LogoMark } from '@/components/shared/logo-mark';
import { LocaleSwitcher } from '@/components/site/locale-switcher';
import { MobileNav } from '@/components/site/mobile-nav';

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const tNav = useTranslations('nav');
  const tCta = useTranslations('common.cta');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'glass border-border border-b'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={tNav('home')} className="flex items-center">
          <LogoMark />
        </Link>

        <nav aria-label="Primary" className="hidden md:flex">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-foreground-muted hover:text-foreground inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher currentLocale={locale} />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/contact">
              {tCta('bookDemo')}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}
