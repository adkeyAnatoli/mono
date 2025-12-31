import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import './globals.css';
import type { Viewport } from 'next';
import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { WebsiteProvider } from '../context/WebsiteProvider';

// const fontOne = localFont({
//   src: '../fonts/Inter-Bold.woff2',
// });

// const fontThree = localFont({
//   src: '../fonts/Inter-ExtraBold.woff2',
// });

const fontOne = localFont({
  src: [
    {
      path: '../../../public/fonts/Inter-Bold.woff2',
      weight: '700',
    },
    {
      path: '../../../public/fonts/Inter-ExtraBold.woff2',
      weight: '800',
    },
  ],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Arial'],
  adjustFontFallback: false,
});

const fontTwo = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
});

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const url = process.env.NEXT_PUBLIC_SITE_URL;
const ogSiteName = process.env.NEXT_PUBLIC_SITE_NAME;
const ogImage = `https://${url}/og-img.webp`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, 'children'>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  let canon;
  let og_locale;
  switch (locale) {
    case 'en':
      canon = `https://${url}`;
      og_locale = '';
      break;
    case 'fr-FR':
      canon = `https://${url}/fr`;
      og_locale = 'fr_FR';
      break;
    case 'de-DE':
      canon = `https://${url}/de`;
      og_locale = 'de_DE';
      break;
    case 'es-ES':
      canon = `https://${url}/es`;
      og_locale = 'es_ES';
      break;
    default:
      canon = `https://${url}`;
  }
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      locale: og_locale,
      alternateLocale: ['fr_FR', 'de_DE', 'es_ES'],
      type: 'website',
      url: `https://${url}`,
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogSiteName,
        },
      ],
    },
    twitter: {
      title: t('title'),
      description: t('description'),
      card: 'summary_large_image',
      site: url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    metadataBase: new URL(`https://${url}`),
    alternates: {
      canonical: canon,
      languages: {
        'x-default': '/',
        en: '/',
        'fr-FR': '/fr',
        'de-DE': '/de',
        'es-ES': '/es',
      },
    },
    icons: { icon: '/svg/icon.svg' },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        <meta name="language" content={locale} />
        <link
          rel="preconnect"
          href="https://api.adkey-seo.com"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://api.adkey-seo.com" />
        <link rel="preload" as="image" href="/sectionImg/slot1.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/sectionImg/slot1-mobile.webp" fetchPriority="high" />
        <link rel="icon" href="/icons/icon.png" />
        <link rel="apple-touch-icon" href="/icons/icon57.png" sizes="57x57" />
        <link rel="apple-touch-icon" href="/icons/icon60.png" sizes="60x60" />
        <link rel="apple-touch-icon" href="/icons/icon72.png" sizes="72x72" />
        <link rel="apple-touch-icon" href="/icons/icon76.png" sizes="76x76" />
        <link
          rel="apple-touch-icon"
          href="/icons/icon114.png"
          sizes="114x114"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon120.png"
          sizes="120x120"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon144.png"
          sizes="144x144"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon152.png"
          sizes="152x152"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon180.png"
          sizes="180x180"
        />
        <link
          rel="icon"
          href="/icons/icon192.png"
          type="image/png"
          sizes="192x192"
        />
      </head>
      <body
        className={`${fontTwo.className} ${fontOne.className}`}
      >
        <NextIntlClientProvider>
          <WebsiteProvider>{children}</WebsiteProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
