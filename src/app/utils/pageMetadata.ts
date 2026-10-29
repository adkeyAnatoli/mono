import type { Metadata } from 'next';
import privacyPage from '@/app/data/pages/privacy.json';
import termsPage from '@/app/data/pages/terms.json';
import faqPage from '@/app/data/pages/faq.json';
import casinoGamesPage from '@/app/data/pages/casino-games.json';
import rewardsProgramPage from '@/app/data/pages/rewards-program.json';
import resortsPage from '@/app/data/pages/resorts.json';
import appPage from '@/app/data/pages/app.json';
import rulesAndPayoutsPage from '@/app/data/pages/rules-and-payouts.json';
import siteMeta from '@/app/data/siteMeta.json';
import { getSiteHost } from '@/app/utils/siteUrl';

export type StaticPageSlug =
  | 'privacy'
  | 'terms'
  | 'faq'
  | 'casino-games'
  | 'rewards-program'
  | 'resorts'
  | 'app'
  | 'rules-and-payouts';

const PAGE_META: Record<
  StaticPageSlug,
  { title: string; description: string }
> = {
  privacy: privacyPage.meta,
  terms: termsPage.meta,
  faq: faqPage.meta,
  'casino-games': casinoGamesPage.meta,
  'rewards-program': rewardsProgramPage.meta,
  resorts: resortsPage.meta,
  app: appPage.meta,
  'rules-and-payouts': rulesAndPayoutsPage.meta,
};

export async function buildStaticPageMetadata(
  slug: StaticPageSlug
): Promise<Metadata> {
  const { title, description } = PAGE_META[slug];
  const pathname = `/${slug}`;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: pathname,
      locale: 'en_AU',
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
