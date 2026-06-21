import type { Metadata } from 'next';
import privacyPage from '@/app/data/pages/privacy.json';
import termsPage from '@/app/data/pages/terms.json';
import faqPage from '@/app/data/pages/faq.json';
import siteMeta from '@/app/data/siteMeta.json';

export type StaticPageSlug = 'privacy' | 'terms' | 'faq';

export type StaticPagePathname = '/privacy' | '/terms' | '/faq';

const PAGE_META: Record<
  StaticPageSlug,
  { meta: { title: string; description: string }; pathname: StaticPagePathname }
> = {
  privacy: { meta: privacyPage.meta, pathname: '/privacy' },
  terms: { meta: termsPage.meta, pathname: '/terms' },
  faq: { meta: faqPage.meta, pathname: '/faq' },
};

function getCanonicalUrl(pathname: StaticPagePathname): string {
  return `https://${siteMeta.url}${pathname}`;
}

export async function buildStaticPageMetadata(
  slug: StaticPageSlug
): Promise<Metadata> {
  const { meta, pathname } = PAGE_META[slug];
  const { title, description } = meta;
  const canonical = getCanonicalUrl(pathname);
  const ogImage = `https://${siteMeta.url}${siteMeta.ogImagePath}`;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: canonical,
      locale: 'en_GB',
      title,
      description,
      images: [
        {
          url: ogImage,
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
      site: siteMeta.url,
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
