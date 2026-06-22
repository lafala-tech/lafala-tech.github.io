import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

// Pages under each locale. The root "/" is just a redirect, so we don't
// list it (search engines should index the locale paths directly).
const PATHS = ['', '/product', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PATHS.flatMap((path) => [
    {
      url: `${SITE.url}/zh${path}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: {
          zh: `${SITE.url}/zh${path}/`,
          en: `${SITE.url}/en${path}/`,
        },
      },
    },
  ]);
}
