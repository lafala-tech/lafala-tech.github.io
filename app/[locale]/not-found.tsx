import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-eyebrow">404</p>
      <h1 className="text-h1 mt-4">{t('title')}</h1>
      <p className="text-foreground-muted mt-3 max-w-prose">{t('description')}</p>
      <Link
        href="/"
        className="bg-brand text-brand-foreground hover:bg-brand-hover mt-8 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition"
      >
        {t('backHome')}
      </Link>
    </section>
  );
}
