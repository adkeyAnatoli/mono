import type { Metadata } from 'next';
import privacyPage from '@/src/app/data/pages/privacy.json';
import termsPage from '@/src/app/data/pages/terms.json';
import faqPage from '@/src/app/data/pages/faq.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
const ogImage = `https://${siteUrl}/og-img.webp`;

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
      locale: 'en_GB',
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
