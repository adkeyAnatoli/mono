import siteMeta from '@/app/data/siteMeta.json';

export function getSiteHost(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? siteMeta.url;
  return raw.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

export function getSiteOrigin(): string {
  return `https://${getSiteHost()}`;
}
