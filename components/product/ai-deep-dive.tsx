import { useTranslations } from 'next-intl';
import {
  Share2,
  Sparkles,
  Wand2,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CmdKDemo } from '@/components/home/cmdk-demo';

const ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  wrench: Wrench,
  wand: Wand2,
  share: Share2,
};

interface Feature {
  icon: keyof typeof ICONS;
  title: string;
  body: string;
}

export function AiDeepDive() {
  const t = useTranslations('product.sections.ai');
  const features = t.raw('features') as Feature[];

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
      <div className="flex flex-1 flex-col gap-6">
        <header className="flex flex-col gap-3">
          <span className="text-eyebrow">{t('eyebrow')}</span>
          <h2 className="text-h2">{t('title')}</h2>
          <p className="text-foreground-muted text-base md:text-lg">{t('sub')}</p>
        </header>
        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((f, i) => {
            const Icon = ICONS[f.icon] ?? Sparkles;
            return (
              <Card key={i} className="bg-surface/50">
                <CardHeader className="gap-2 p-5">
                  <span className="bg-brand-soft text-accent inline-flex size-9 items-center justify-center rounded-md">
                    <Icon className="size-4" />
                  </span>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <CardDescription>{f.body}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="w-full max-w-xl lg:w-[480px] lg:shrink-0">
        <CmdKDemo />
      </div>
    </div>
  );
}
