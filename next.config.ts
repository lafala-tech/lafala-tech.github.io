import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Static export for GitHub Pages — no server-side runtime.
  output: 'export',
  // GH Pages can't run next/image's optimizer.
  images: { unoptimized: true },
  // Emit /foo/index.html instead of /foo.html so paths line up with GH Pages.
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
};

export default withNextIntl(nextConfig);
