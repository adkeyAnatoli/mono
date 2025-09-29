import type { Viewport } from "next";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ReduxProvider } from "./redux/Provider/ReduxProvider";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 2,
};

export const url = "crowncasino-australia.com";
const ogTitle = "Crown Casino - Enjoy Exciting Bonuses, and Big Wins Today!";
const metaDescription =
  "Get ready to experience the collection of bonuses and games of Crown Casino! Play hundreds of top-rated games and win big.";

export const metadata = {
  title: ogTitle,
  description: metaDescription,
  alternates: {
    canonical: `https://${url}/`,
  },
  openGraph: {
    type: "website",
    url: `https://${url}`,
    title: ogTitle,
    description: metaDescription,
  },
  twitter: {
    title: ogTitle,
    description: metaDescription,
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        <meta property="og:locale" content="en-AU" />
        <meta
          property="og:image"
          content="https://crowncasino-australia.com/images/og_image.webp"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Crown Casino Melbourne Online" />
        <meta
          name="twitter:image"
          content="https://crowncasino-australia.com/images/og_image.webp"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon-57x57.webp"
          sizes="57x57"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon-60x60.webp"
          sizes="60x60"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon-72x72.webp"
          sizes="72x72"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon-76x76.webp"
          sizes="76x76"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon-114x114.webp"
          sizes="114x114"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon-120x120.webp"
          sizes="120x120"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon-144x144.webp"
          sizes="144x144"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon-152x152.webp"
          sizes="152x152"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon-180x180.webp"
          sizes="180x180"
        />
        <link
          rel="icon"
          href="/icons/icon-192x192.webp"
          type="image/webp"
          sizes="192x192"
        />
        <link
          rel="icon"
          href="/icons/icon-32x32.webp"
          type="image/webp"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/icons/icon-96x96.webp"
          type="image/webp"
          sizes="96x96"
        />
        <link
          rel="icon"
          href="/icons/icon-16x16.webp"
          type="image/webp"
          sizes="16x16"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="preload"
          href="/images/hero-group-mobile-back.webp"
          as="image"
          fetchPriority="high"
        ></link>
        <link
          rel="preload"
          href="/images/hero-group-mobile.webp"
          as="image"
          fetchPriority="high"
        ></link>
        <meta name="next-head-count" content="40" />
      </head>
      <ReduxProvider>
        <body>
          <div className="wrapper">
            <Header />
            <main className="main">{children}</main>
            <Footer />
          </div>
        </body>
      </ReduxProvider>
    </html>
  );
}
