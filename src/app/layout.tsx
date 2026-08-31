import { Metadata } from 'next';
import type { Viewport } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { WebsiteProvider } from './context/WebsiteProvider';
import siteMeta from './data/siteMeta.json';
import { normalizeMdText } from './utils/normalizeMdText';
import { getSiteOrigin } from './utils/siteUrl';

const ogTitle = normalizeMdText(siteMeta.title);
const ogSiteName = siteMeta.ogSiteName;
const metaDescription = normalizeMdText(siteMeta.description);

const htmlLang = 'en-GB';
const ogLocale = 'en_GB';

const fontManrope = localFont({
  src: '../../public/fonts/manrope-semibold.woff2',
  variable: '--font-manrope',
  display: 'swap',
  preload: true,
  weight: '600',
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

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: ogTitle,
  description: metaDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    locale: ogLocale,
    type: 'website',
    url: '/',
    siteName: ogSiteName,
    title: ogTitle,
    description: metaDescription,
    images: [
      {
        url: siteMeta.ogImagePath,
        width: 1200,
        height: 630,
        alt: ogSiteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: ogTitle,
    description: metaDescription,
    images: [
      {
        url: siteMeta.ogImagePath,
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: '/svg/icon.svg',
    apple: '/svg/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={htmlLang}
      className={`${fontRoboto.variable} ${fontManrope.variable}`}
    >
      <body className={fontRoboto.className}>
        <WebsiteProvider>{children}</WebsiteProvider>
      </body>
    </html>
  );
}
