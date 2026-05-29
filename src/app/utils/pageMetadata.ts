import type { Metadata } from 'next';
import bonusesPage from '@/src/app/data/pages/bonuses.json';
import registrationPage from '@/src/app/data/pages/registration.json';
import gamesPage from '@/src/app/data/pages/games.json';
import paymentsPage from '@/src/app/data/pages/payments.json';
import privacyPage from '@/src/app/data/pages/privacy.json';
import termsPage from '@/src/app/data/pages/terms.json';
import faqPage from '@/src/app/data/pages/faq.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
const ogImage = `https://${siteUrl}/og-img.webp`;

export type StaticPageSlug =
  | 'bonuses'
  | 'registration'
  | 'games'
  | 'payments'
  | 'privacy'
  | 'terms'
  | 'faq';

export type StaticPagePathname =
  | '/bonuses'
  | '/registration'
  | '/games'
  | '/payments'
  | '/privacy'
  | '/terms'
  | '/faq';

const PAGE_META: Record<
  StaticPageSlug,
  { meta: { title: string; description: string }; pathname: StaticPagePathname }
> = {
  bonuses: { meta: bonusesPage.meta, pathname: '/bonuses' },
  registration: { meta: registrationPage.meta, pathname: '/registration' },
  games: { meta: gamesPage.meta, pathname: '/games' },
  payments: { meta: paymentsPage.meta, pathname: '/payments' },
  privacy: { meta: privacyPage.meta, pathname: '/privacy' },
  terms: { meta: termsPage.meta, pathname: '/terms' },
  faq: { meta: faqPage.meta, pathname: '/faq' },
};

function getCanonicalUrl(pathname: StaticPagePathname): string {
  return `https://${siteUrl}${pathname}`;
}

export async function buildStaticPageMetadata(
  slug: StaticPageSlug
): Promise<Metadata> {
  const { meta, pathname } = PAGE_META[slug];
  const { title, description } = meta;
  const canonical = getCanonicalUrl(pathname);

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      site: siteUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical,
    },
  };
}
