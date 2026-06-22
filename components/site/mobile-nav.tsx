'use client';

import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { useState } from 'react';

import { Link } from '@/i18n/navigation';
import { NAV_ITEMS } from '@/lib/nav';
import type { Locale } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetDescription,
} from '@/components/ui/sheet';
import { LogoMark } from '@/components/shared/logo-mark';
import { SITE } from '@/lib/site';

interface MobileNavProps {
  locale: Locale;
}

export function MobileNav({ locale }: MobileNavProps) {
  const tNav = useTranslations('nav');
  const tCta = useTranslations('common.cta');
  const tFooter = useTranslations('footer');
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={tNav('openMenu')}
          className="md:hidden"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 max-w-[85vw]">
        <SheetTitle className="flex items-center">
          <LogoMark />
        </SheetTitle>
        <SheetDescription className="sr-only">{tNav('drawerDescription')}</SheetDescription>

        <nav className="-mx-2 flex flex-col">
          {NAV_ITEMS.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className="hover:bg-surface rounded-md px-3 py-3 text-base font-medium text-foreground transition"
              >
                {tNav(item.key)}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="border-border mt-auto flex flex-col gap-3 border-t pt-6">
          <SheetClose asChild>
            <Button asChild size="lg" className="w-full">
              <Link href="/contact">{tCta('bookDemo')}</Link>
            </Button>
          </SheetClose>
          <a
            href={`mailto:${SITE.email}`}
            className="text-foreground-muted hover:text-foreground text-center text-sm transition"
          >
            {SITE.email}
          </a>
          <p className="text-foreground-subtle text-center text-xs">
            {tFooter('copy', { year: new Date().getFullYear() })}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
