export const SITE = {
  name: 'Lafala',
  product: 'Lafala ERP',
  domain: 'lafala.tech',
  url: 'https://lafala.tech',
  email: 'hi@lafala.tech',
  wechat: 'lafala-tech', // 占位，正式以二维码为准
  // GitHub / external
  github: 'https://github.com/michael-lafala',
  // Footer copyright start year
  founded: 2024,
} as const;

export type SiteConfig = typeof SITE;
