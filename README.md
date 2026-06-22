# lafala.tech

Marketing site for **Lafala** — an AI-first SaaS ERP for Chinese whole-house custom furniture SMBs.

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 · shadcn/ui · Motion (Motion One)
- i18n via `next-intl` — Chinese at `/`, English at `/en/...`
- Deployed on Vercel · custom domain `lafala.tech`

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build (all routes prerender)
pnpm typecheck
pnpm lint
```

## Project layout

```
app/                  Next.js App Router (root layout + [locale] segment)
components/           ui · site · home · product · contact · shared
i18n/                 routing / request / navigation (next-intl)
messages/             zh.json · en.json (single source of copy)
lib/                  cn · site constants · nav definition
public/               logo, screenshots, wechat QR placeholder
middleware.ts         next-intl middleware (localePrefix: 'as-needed')
```

## Deploy

Vercel auto-deploys from `main`. PRs get preview URLs.

DNS:

- `A     @     76.76.21.21`
- `CNAME www   cname.vercel-dns.com`

## Static-export fallback

If we ever need to leave Vercel:

```ts
// next.config.ts
const nextConfig: NextConfig = { output: 'export' };
```

Then change `i18n/routing.ts` `localePrefix` from `'as-needed'` to `'always'` (middleware does not run on static exports). All routes still prerender.
