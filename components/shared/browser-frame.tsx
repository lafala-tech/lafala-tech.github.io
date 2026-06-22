import { cn } from '@/lib/cn';

interface BrowserFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string;
  /** Compact frame for smaller previews */
  compact?: boolean;
}

export function BrowserFrame({
  url = 'app.lafala.tech',
  compact = false,
  className,
  children,
  ...rest
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        'border-border-strong bg-surface ring-elevated relative overflow-hidden rounded-xl border',
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          'border-border flex items-center gap-2 border-b bg-surface-elevated px-3 py-2.5',
          compact && 'py-2',
        )}
      >
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="bg-background/60 text-foreground-subtle mx-auto inline-flex h-6 items-center gap-1.5 rounded-full px-3 text-[11px] tracking-tight">
          <svg viewBox="0 0 16 16" className="text-success size-3" aria-hidden>
            <path
              fill="currentColor"
              d="M8 1a4 4 0 0 0-4 4v2H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-1V5a4 4 0 0 0-4-4Zm0 2a2 2 0 0 1 2 2v2H6V5a2 2 0 0 1 2-2Z"
            />
          </svg>
          {url}
        </div>
        <div className="w-10" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
