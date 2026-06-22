import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

interface ReplaceItem {
  name: string;
  body: string;
}

export function ReplacesGrid() {
  const t = useTranslations('product.sections.replaces');
  const items = t.raw('items') as ReplaceItem[];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex max-w-3xl flex-col gap-3">
        <span className="text-eyebrow">{t('eyebrow')}</span>
        <h2 className="text-h2 gradient-text">{t('title')}</h2>
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="border-border bg-surface/40 ring-soft group relative overflow-hidden rounded-xl border p-5 transition-all hover:bg-surface/60"
          >
            <div className="text-foreground-subtle mb-2 flex items-center gap-2 text-xs">
              <span className="border-danger/50 bg-danger/10 inline-flex size-5 items-center justify-center rounded-full border">
                <X className="text-danger size-3" />
              </span>
              <span className="uppercase tracking-wider">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="text-foreground text-base font-semibold line-through decoration-danger/60">
              {item.name}
            </div>
            <p className="text-foreground-muted mt-2 text-xs leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
