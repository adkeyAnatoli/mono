import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/src/i18n/routing';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
const ogImage = `https://${siteUrl}/og-img.webp`;

export type StaticPagePathname = '/about' | '/privacy' | '/terms' | '/faq';

const localePrefixes: Record<string, string> = {
  'en-GB': '/uk',
  'fr-FR': '/fr',
  'de-DE': '/de',
};

function getLocalePrefix(locale: string): string {
  if (locale === routing.defaultLocale) {
    return '';
  }
  return localePrefixes[locale] ?? '';
}

export function getLocalizedPath(
  pathname: StaticPagePathname,
  locale: string
): string {
  return `${getLocalePrefix(locale)}${pathname}`;
}

function getCanonicalUrl(pathname: StaticPagePathname, locale: string): string {
  return `https://${siteUrl}${getLocalizedPath(pathname, locale)}`;
}

function getOgLocale(locale: string): string {
  switch (locale) {
    case 'en-GB':
      return 'en_GB';
    case 'fr-FR':
      return 'fr_FR';
    case 'de-DE':
      return 'de_DE';
    default:
      return '';
  }
}

export async function buildStaticPageMetadata({
  locale,
  namespace,
  pathname,
}: {
  locale: string;
  namespace: string;
  pathname: StaticPagePathname;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const title = t('title');
  const description = t('description');
  const canonical = getCanonicalUrl(pathname, locale);

  const languages: Record<string, string> = {
    'x-default': pathname,
  };
  for (const loc of routing.locales) {
    languages[loc] = getLocalizedPath(pathname, loc);
  }

  return {
    title,
    description,
    openGraph: {
      locale: getOgLocale(locale),
      alternateLocale: ['en_GB', 'fr_FR', 'de_DE'],
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
      languages,
    },
  };
}
