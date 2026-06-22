import Image from 'next/image';
import { cn } from '@/lib/cn';

interface LogoMarkProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  showWordmark?: boolean;
}

/**
 * Brand mark. Uses the legacy logo.jpeg as the icon (until a proper SVG is produced).
 * Wordmark is type-set in Inter 700.
 */
export function LogoMark({
  size = 28,
  showWordmark = true,
  className,
  ...rest
}: LogoMarkProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)} {...rest}>
      <span
        className="relative overflow-hidden rounded-md ring-1 ring-border-strong"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.jpeg"
          alt="Lafala"
          fill
          sizes={`${size}px`}
          className="object-cover"
          priority
        />
      </span>
      {showWordmark ? (
        <span className="text-foreground text-base font-semibold tracking-tight">Lafala</span>
      ) : null}
    </div>
  );
}
