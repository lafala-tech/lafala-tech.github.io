import { cn } from '@/lib/cn';

export function Eyebrow({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-eyebrow', className)} {...rest}>
      {children}
    </span>
  );
}
