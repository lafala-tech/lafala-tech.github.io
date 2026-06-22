import { useTranslations } from 'next-intl';
import { FileSpreadsheet, FileText, Layers, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface NestingLevel {
  name: string;
  detail: string;
}

interface ExportItem {
  name: string;
  body: string;
}

const EXPORT_ICONS: LucideIcon[] = [FileSpreadsheet, FileText];

export function QuotationEngine() {
  const t = useTranslations('product.sections.quotation');
  const levels = t.raw('nesting.levels') as NestingLevel[];
  const formulas = t.raw('formulas.items') as string[];
  const exports = t.raw('exports.items') as ExportItem[];

  return (
    <div className="flex flex-col gap-10">
      <header className="flex max-w-3xl flex-col gap-3">
        <span className="text-eyebrow">{t('eyebrow')}</span>
        <h2 className="text-h2 gradient-text">{t('title')}</h2>
        <p className="text-foreground-muted text-base md:text-lg">{t('sub')}</p>
      </header>

      <div className="grid gap-5 md:grid-cols-[1.2fr_1fr_1fr]">
        {/* Nesting */}
        <Card className="bg-surface/40">
          <CardHeader>
            <span className="bg-brand-soft text-accent inline-flex size-9 items-center justify-center rounded-md">
              <Layers className="size-4" />
            </span>
            <CardTitle className="text-base">{t('nesting.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="border-border relative ml-3 flex flex-col gap-3 border-l pl-5">
              {levels.map((lv, i) => (
                <li key={i} className="relative">
                  <span className="bg-brand absolute -left-[1.65rem] top-1 size-2 rounded-full ring-4 ring-background" />
                  <div className="text-foreground text-sm font-semibold">{lv.name}</div>
                  <div className="text-foreground-muted text-xs">{lv.detail}</div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Formulas */}
        <Card className="bg-surface/40">
          <CardHeader>
            <span className="bg-accent-soft text-accent inline-flex size-9 items-center justify-center rounded-md font-mono text-sm font-bold">
              ƒ
            </span>
            <CardTitle className="text-base">{t('formulas.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap gap-1.5">
              {formulas.map((f) => (
                <li key={f}>
                  <Badge variant="outline" className="font-mono">
                    {f}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Exports */}
        <Card className="bg-surface/40">
          <CardHeader>
            <span className="bg-success/15 text-success inline-flex size-9 items-center justify-center rounded-md">
              <FileText className="size-4" />
            </span>
            <CardTitle className="text-base">{t('exports.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2.5">
              {exports.map((e, i) => {
                const Icon = EXPORT_ICONS[i] ?? FileText;
                return (
                  <li key={i} className="flex items-start gap-2.5">
                    <Icon className="text-foreground-muted mt-0.5 size-4 shrink-0" />
                    <div>
                      <div className="text-foreground text-sm font-medium">{e.name}</div>
                      <div className="text-foreground-muted text-xs">{e.body}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
