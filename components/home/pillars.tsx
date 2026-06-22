import { useTranslations } from 'next-intl';
import { Calculator, Server, Sparkles, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  calculator: Calculator,
  server: Server,
};

interface PillarItem {
  icon: keyof typeof ICONS;
  title: string;
  body: string;
}

export function Pillars() {
  const t = useTranslations('home.pillars');
  const items = t.raw('items') as PillarItem[];

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((item, i) => {
        const Icon = ICONS[item.icon] ?? Sparkles;
        return (
          <Card
            key={i}
            className="hover:border-border-strong hover:bg-surface-elevated/60 group relative overflow-hidden transition-all"
          >
            <CardHeader className="gap-4">
              <span className="bg-brand-soft text-accent flex size-11 items-center justify-center rounded-lg ring-1 ring-border-strong">
                <Icon className="size-5" aria-hidden />
              </span>
              <CardTitle className="text-balance text-lg md:text-xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-[15px]">{item.body}</CardDescription>
            </CardContent>
            <span
              aria-hidden
              className="absolute -right-12 -top-12 size-32 rounded-full bg-[radial-gradient(circle,var(--brand-soft)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </Card>
        );
      })}
    </div>
  );
}
