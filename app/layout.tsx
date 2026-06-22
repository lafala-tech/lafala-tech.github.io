import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://lafala.tech'),
  title: {
    default: 'Lafala — AI-first ERP for whole-house custom furniture',
    template: '%s · Lafala',
  },
  description:
    'Lafala ERP — an AI-first SaaS ERP purpose-built for Chinese whole-house custom furniture SMBs. Press ⌘K and let AI run your CRM, quotes, contracts, and projects.',
  applicationName: 'Lafala',
  authors: [{ name: 'Lafala' }],
  creator: 'Lafala',
  publisher: 'Lafala',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
  },
  openGraph: {
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Lafala' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0e1216' },
    { media: '(prefers-color-scheme: light)', color: '#0e1216' },
  ],
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
