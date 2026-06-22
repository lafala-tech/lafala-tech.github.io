import { cn } from '@/lib/cn';

interface GradientBgProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'hero' | 'cta' | 'soft';
}

/**
 * Decorative gradient background. Place inside a `relative` parent;
 * positions absolutely and is `aria-hidden`.
 */
export function GradientBg({ variant = 'hero', className, ...rest }: GradientBgProps) {
  if (variant === 'hero') {
    return (
      <div
        aria-hidden
        className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
        {...rest}
      >
        <div className="absolute -top-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--brand)_28%,transparent)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute -right-32 top-32 size-[420px] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--accent)_18%,transparent)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-[520px] grid-bg opacity-60" />
      </div>
    );
  }
  if (variant === 'cta') {
    return (
      <div
        aria-hidden
        className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
        {...rest}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--brand)_22%,transparent)_0%,transparent_60%)]" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>
    );
  }
  // soft
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
      {...rest}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--brand)_14%,transparent)_0%,transparent_60%)]" />
    </div>
  );
}
