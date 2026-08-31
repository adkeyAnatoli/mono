import type { Metadata } from 'next';
import privacyPage from '@/app/data/pages/privacy.json';
import termsPage from '@/app/data/pages/terms.json';
import faqPage from '@/app/data/pages/faq.json';
import gamesPage from '@/app/data/pages/games.json';
import rewardsPage from '@/app/data/pages/rewards.json';
import resortsPage from '@/app/data/pages/resorts.json';
import firstDayTipsPage from '@/app/data/pages/first-day-tips.json';
import siteMeta from '@/app/data/siteMeta.json';
import { getSiteHost } from '@/app/utils/siteUrl';

export type StaticPageSlug =
  | 'privacy'
  | 'terms'
  | 'faq'
  | 'games'
  | 'rewards'
  | 'resorts'
  | 'first-day-tips';

export type StaticPagePathname =
  | '/privacy'
  | '/terms'
  | '/faq'
  | '/games'
  | '/rewards'
  | '/resorts'
  | '/first-day-tips';

const PAGE_META: Record<
  StaticPageSlug,
  { meta: { title: string; description: string }; pathname: StaticPagePathname }
> = {
  privacy: { meta: privacyPage.meta, pathname: '/privacy' },
  terms: { meta: termsPage.meta, pathname: '/terms' },
  faq: { meta: faqPage.meta, pathname: '/faq' },
  games: { meta: gamesPage.meta, pathname: '/games' },
  rewards: { meta: rewardsPage.meta, pathname: '/rewards' },
  resorts: { meta: resortsPage.meta, pathname: '/resorts' },
  'first-day-tips': {
    meta: firstDayTipsPage.meta,
    pathname: '/first-day-tips',
  },
};

export async function buildStaticPageMetadata(
  slug: StaticPageSlug
): Promise<Metadata> {
  const { meta, pathname } = PAGE_META[slug];
  const { title, description } = meta;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: pathname,
      locale: 'en_GB',
      title,
      description,
      images: [
        {
          url: siteMeta.ogImagePath,
          width: 1200,
          height: 630,
          alt: siteMeta.ogSiteName,
        },
      ],
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      site: getSiteHost(),
      images: [
        {
          url: siteMeta.ogImagePath,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: pathname,
    },
  };
}
