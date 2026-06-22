import { useTranslations } from 'next-intl';
import { Check, Palette } from 'lucide-react';

export function WhiteLabelSection() {
  const t = useTranslations('product.sections.whitelabel');
  const features = t.raw('features') as string[];

  // Three illustrative brand chips
  const brands = [
    { name: 'Lafala', primary: '#1F6F4A', accent: '#b89968' },
    { name: 'Mileoo', primary: '#7c3aed', accent: '#facc15' },
    { name: 'Studio Yi', primary: '#0ea5e9', accent: '#f43f5e' },
  ];

  return (
    <div className="flex flex-col gap-10">
      <header className="flex max-w-3xl flex-col gap-3">
        <span className="text-eyebrow">{t('eyebrow')}</span>
        <h2 className="text-h2 gradient-text">{t('title')}</h2>
        <p className="text-foreground-muted text-base md:text-lg">{t('sub')}</p>
      </header>

      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <ul className="flex flex-col gap-3">
          {features.map((f) => (
            <li
              key={f}
              className="border-border bg-surface/40 flex items-center gap-3 rounded-lg border p-3 text-sm"
            >
              <span className="bg-brand-soft text-success inline-flex size-7 shrink-0 items-center justify-center rounded-full">
                <Check className="size-3.5" />
              </span>
              <span className="text-foreground">{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3">
          {brands.map((b) => (
            <div
              key={b.name}
              className="border-border-strong ring-soft flex items-center gap-4 rounded-xl border p-4"
              style={{
                background: `linear-gradient(135deg, color-mix(in oklch, ${b.primary} 18%, var(--surface)) 0%, var(--surface) 100%)`,
              }}
            >
              <span
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-md text-white"
                style={{ background: b.primary }}
              >
                <Palette className="size-4" />
              </span>
              <div className="flex-1">
                <div className="text-foreground text-sm font-semibold">{b.name}</div>
                <div className="text-foreground-muted text-xs">
                  {b.primary} · {b.accent}
                </div>
              </div>
              <div className="flex gap-1">
                <span
                  className="size-5 rounded-full ring-1 ring-border-strong"
                  style={{ background: b.primary }}
                />
                <span
                  className="size-5 rounded-full ring-1 ring-border-strong"
                  style={{ background: b.accent }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
