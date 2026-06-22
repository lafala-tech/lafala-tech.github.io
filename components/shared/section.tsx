import * as React from 'react';
import { cn } from '@/lib/cn';

type SectionBg = 'default' | 'surface' | 'gradient';

interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  sub?: React.ReactNode;
  bg?: SectionBg;
  /** Smaller vertical padding for compact sections (e.g. CTA strips) */
  compact?: boolean;
  /** Align section header center (default) or left */
  align?: 'center' | 'left';
}

export function Section({
  id,
  eyebrow,
  title,
  sub,
  bg = 'default',
  compact = false,
  align = 'center',
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      data-bg={bg}
      className={cn(
        'relative isolate scroll-mt-24',
        compact ? 'py-14 md:py-20' : 'py-20 md:py-28 lg:py-32',
        bg === 'surface' && 'bg-surface/40',
        className,
      )}
      {...rest}
    >
      <div className="container-page relative">
        {(eyebrow || title || sub) && (
          <header
            className={cn(
              'mb-12 flex max-w-3xl flex-col gap-4 md:mb-16',
              align === 'center' && 'mx-auto items-center text-center',
            )}
          >
            {eyebrow ? <span className="text-eyebrow">{eyebrow}</span> : null}
            {title ? <h2 className="text-h2 gradient-text">{title}</h2> : null}
            {sub ? <p className="text-foreground-muted text-base md:text-lg">{sub}</p> : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
