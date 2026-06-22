import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

const PATHS = ['', '/product', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PATHS.map((path) => ({
    url: `${SITE.url}${path === '' ? '/' : path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
    alternates: {
      languages: {
        zh: `${SITE.url}${path === '' ? '/' : path}`,
        en: `${SITE.url}/en${path}`,
      },
    },
  }));
}
