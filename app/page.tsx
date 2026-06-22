import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

const DEFAULT_PATH = `/${routing.defaultLocale}`;

// Root "/" — under `output: 'export'` this bakes into `out/index.html`.
// We use a meta-refresh + JS hop so the apex always lands users on the
// default-locale page on plain static hosting (no server-side redirects).
export const metadata: Metadata = {
  title: 'Lafala',
  robots: { index: false, follow: false },
  other: { refresh: `0;url=${DEFAULT_PATH}` },
};

export default function RootRedirect() {
  return (
    <html lang="zh-CN">
      <head>
        <meta httpEquiv="refresh" content={`0;url=${DEFAULT_PATH}`} />
        <link rel="canonical" href={DEFAULT_PATH} />
        <script
          dangerouslySetInnerHTML={{
            __html: `location.replace(${JSON.stringify(DEFAULT_PATH)})`,
          }}
        />
      </head>
      <body>
        <a href={DEFAULT_PATH}>Continue to Lafala →</a>
      </body>
    </html>
  );
}
