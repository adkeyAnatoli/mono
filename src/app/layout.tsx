import './globals.css';
import type { Viewport } from 'next';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import siteMeta from '@/src/app/data/siteMeta.json';
import { WebsiteProvider } from './context/WebsiteProvider';

const fontPathwayExtreme = localFont({
  src: '../../public/fonts/pathway-extreme-bold.woff2',
  variable: '--font-pathway-extreme',
  display: 'swap',
  preload: true,
  weight: '700',
  style: 'normal',
  fallback: ['system-ui', 'sans-serif'],
});

const fontRoboto = localFont({
  src: [
    {
      path: '../../public/fonts/roboto-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/roboto-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/roboto-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-roboto',
  display: 'swap',
  preload: true,
  fallback: ['sans-serif'],
});

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

const url = process.env.NEXT_PUBLIC_SITE_URL;
const ogSiteName = process.env.NEXT_PUBLIC_SITE_NAME;
const ogImage = `https://${url}/og-img.webp`;

export async function generateMetadata() {
  const canon = `https://${url}`;

  return {
    title: siteMeta.title,
    description: siteMeta.description,
    openGraph: {
      type: 'website',
      url: canon,
      locale: 'en_GB',
      title: siteMeta.title,
      description: siteMeta.description,
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
      title: siteMeta.title,
      description: siteMeta.description,
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
    },
    icons: { icon: '/svg/icon.svg' },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${fontPathwayExtreme.variable} ${fontRoboto.variable}`}
    >
      <head>
        <meta name="language" content="en-GB" />
        <link
          rel="preload"
          as="image"
          href="/sectionImg/slot1.webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/sectionImg/slot1-mobile.webp"
          fetchPriority="high"
        />
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
      <body>
        <WebsiteProvider>{children}</WebsiteProvider>
      </body>
    </html>
  );
}
