import { useTranslations } from 'next-intl';
import { Server, Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DeploymentOption {
  name: string;
  body: string;
  tag: string;
}

export function DeploymentSection() {
  const t = useTranslations('product.sections.deployment');
  const options = t.raw('options') as DeploymentOption[];
  const command = t('command');

  return (
    <div className="flex flex-col gap-10">
      <header className="flex max-w-3xl flex-col gap-3">
        <span className="text-eyebrow">{t('eyebrow')}</span>
        <h2 className="text-h2 gradient-text">{t('title')}</h2>
        <p className="text-foreground-muted text-base md:text-lg">{t('sub')}</p>
      </header>

      <div className="border-border-strong bg-surface ring-elevated overflow-hidden rounded-xl">
        <div className="border-border bg-surface-elevated flex items-center gap-2 border-b px-4 py-2.5 text-xs">
          <Terminal className="text-accent size-3.5" />
          <span className="text-foreground-muted font-mono">~/lafala-erp</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-foreground">
          <code>
            <span className="text-foreground-subtle">$ </span>
            <span className="text-success">{command}</span>
            {'\n'}
            <span className="text-foreground-subtle">
              {'  '}✓ traefik │ certs auto-renewed
              {'\n'}
              {'  '}✓ api │ FastAPI listening on :8800
              {'\n'}
              {'  '}✓ web │ Next.js ready on :3000
              {'\n'}
              {'  '}✓ db │ postgres healthy
              {'\n'}
              {'  '}✓ langfuse │ trace dashboard at :3010
            </span>
          </code>
        </pre>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {options.map((opt) => (
          <Card key={opt.name} className="bg-surface/40">
            <CardHeader className="gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="bg-brand-soft text-accent inline-flex size-9 items-center justify-center rounded-md">
                  <Server className="size-4" />
                </span>
                {opt.tag ? <Badge variant="accent">{opt.tag}</Badge> : null}
              </div>
              <CardTitle className="text-base">{opt.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground-muted text-sm leading-relaxed">{opt.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
