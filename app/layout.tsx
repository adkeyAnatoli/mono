import { Metadata } from 'next';
import type { Viewport } from 'next';
import './globals.css';
import { Roboto, Montserrat } from 'next/font/google';
import { RedirectProvider } from './context/RedirectContext';

const url = 'cazeus-online.com';
const ogTitle =
  'Cazeus Casino UK: A Detailed Review of Gaming and Bonus Features';
const ogSiteName = 'BassBet Casino';
const metaDescription =
  'Cazeus Casino UK: welcome bonus, promotions, gaming features, sports betting, payment systems. Everything you need to know for beginners and experienced gamblers';

const locale = 'en-UK';
const language = 'English';
const ogImage = `https://${url}/og-image.webp`;

const fontOne = Montserrat({
  weight: ['700', '800', '900'],
  subsets: ['latin'],
});

const fontTwo = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
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
    <html lang={locale}>
      <head>
        <meta name="language" content={language} />
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
      <body className={`${fontOne.className} ${fontTwo.className} `}>
        <RedirectProvider>{children}</RedirectProvider>
      </body>
    </html>
  );
}
