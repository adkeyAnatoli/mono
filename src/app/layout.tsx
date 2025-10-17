import { Metadata } from 'next';
import type { Viewport } from 'next';
import './globals.css';
import { Roboto, Paytone_One } from 'next/font/google';
import { WebsiteProvider } from './context/WebsiteProvider';
// import { RedirectProvider } from './context/RedirectContext';
// import localFont from 'next/font/local';

// const fontThree = localFont({
//   src: './fonts/r_black.ttf',
// });

// const fontOne = localFont({
//   src: './fonts/helv_b.otf',
// });

export const url = 'ripper-casino-australia.com';
const ogTitle = 'Ripper Casino Online Australia: Explore Thrilling Games';
const ogSiteName = 'Ripper Casino Online Australia';
const metaDescription =
  'The detailed Ripper Casino guide for beginners. Enjoy a variety of Ripper Casino slots, table games, and more.';

const locale = 'en-AU';
// const language = 'German';
const ogImage = `https://${url}/og-img.webp`;

const fontOne = Paytone_One({
  weight: ['400'],
  subsets: ['latin'],
});

const fontTwo = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
});

// const fontThree = Baloo({
//   weight: ['400'],
//   subsets: ['latin'],
// });

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: ogTitle,
  description: metaDescription,
  alternates: {
    canonical: `https://${url}`,
  },
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
        <meta name="language" content={locale} />
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
      <body className={`${fontTwo.className} ${fontOne.className}`}>
        <WebsiteProvider>{children}</WebsiteProvider>
      </body>
    </html>
  );
}
