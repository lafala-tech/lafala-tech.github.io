import { useTranslations } from 'next-intl';

export function TechStack() {
  const t = useTranslations('product.sections.stack');
  const items = t.raw('items') as string[];

  return (
    <div className="flex flex-col gap-10">
      <header className="flex max-w-3xl flex-col gap-3">
        <span className="text-eyebrow">{t('eyebrow')}</span>
        <h2 className="text-h2 gradient-text">{t('title')}</h2>
        <p className="text-foreground-muted text-base md:text-lg">{t('sub')}</p>
      </header>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((name) => (
          <div
            key={name}
            className="border-border bg-surface/40 ring-soft hover:bg-surface-elevated/60 group flex items-center gap-3 rounded-lg border p-4 transition"
          >
            <span className="bg-brand-soft text-accent inline-flex size-7 shrink-0 items-center justify-center rounded-md font-mono text-xs">
              {name.slice(0, 2).toUpperCase()}
            </span>
            <span className="text-foreground text-sm font-medium">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
