import { Metadata } from 'next';
import type { Viewport } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { WebsiteProvider } from './context/WebsiteProvider';
import siteMeta from './data/siteMeta.json';
import { normalizeMdText } from './utils/normalizeMdText';

const url = siteMeta.url;
const ogTitle = normalizeMdText(siteMeta.title);
const ogSiteName = siteMeta.ogSiteName;
const metaDescription = normalizeMdText(siteMeta.description);

const locale = 'en-GB';
const ogImage = `https://${url}${siteMeta.ogImagePath}`;

const fontNotoSans = localFont({
  src: '../../public/fonts/noto-sans-bold.woff2',
  variable: '--font-noto-sans',
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

export const metadata: Metadata = {
  title: ogTitle,
  description: metaDescription,
  openGraph: {
    locale: locale,
    type: 'website',
    url: `https://${url}`,
    title: ogTitle,
    description: metaDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: ogSiteName,
      },
    ],
  },
  icons: { icon: '/svg/icon.svg' },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={locale}
      className={`${fontRoboto.variable} ${fontNotoSans.variable}`}
    >
      <head>
        <meta name="language" content={'English'} />
        <link rel="icon" href="/icons/icon.png" />
        <link rel="canonical" href={`https://${url}`} />
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
      <body className={fontRoboto.className}>
        <WebsiteProvider>{children}</WebsiteProvider>
      </body>
    </html>
  );
}
