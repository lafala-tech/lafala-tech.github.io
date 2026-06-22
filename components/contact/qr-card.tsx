import { useTranslations } from 'next-intl';
import { QrCode } from 'lucide-react';

export function QrCard() {
  const t = useTranslations('contact.qr');
  return (
    <div className="border-border bg-surface/40 flex flex-col gap-5 rounded-2xl border p-6 md:p-8">
      <div className="flex items-center gap-3">
        <span className="bg-accent-soft text-accent inline-flex size-10 items-center justify-center rounded-lg">
          <QrCode className="size-5" />
        </span>
        <div>
          <div className="text-foreground text-sm font-semibold">{t('title')}</div>
          <div className="text-foreground-muted text-xs">{t('subtitle')}</div>
        </div>
      </div>
      <div className="border-border-strong bg-surface flex aspect-square w-full max-w-[260px] items-center justify-center self-center rounded-xl border">
        <div className="flex flex-col items-center gap-3 p-6 text-center">
          <div className="grid grid-cols-6 gap-1.5">
            {Array.from({ length: 36 }, (_, i) => (
              <span
                key={i}
                className={
                  // Pseudo-QR pattern. Same on every render — Math.random can't run here.
                  (i * 7919 + 31) % 3 === 0
                    ? 'bg-foreground/60 size-2 rounded-[2px]'
                    : 'bg-foreground/10 size-2 rounded-[2px]'
                }
              />
            ))}
          </div>
          <p className="text-foreground-subtle text-xs">{t('placeholderLabel')}</p>
        </div>
      </div>
    </div>
  );
}
