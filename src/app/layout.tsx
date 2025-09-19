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

export const url = "coralcasino-uk.com";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <title>Coral Casino UK Review: Top Games and Promotions</title>
        <meta
          name="description"
          content="Games from top developers are available at Coral Casino. Register to become a member of the loyalty program."
        />
        <meta name="language" content="English" />
        <meta property="og:locale" content="en-GB" />
        <meta property="og:url" content="https://coralcasino-uk.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Coral Casino UK Review: Top Games and Promotions"
        />
        <meta
          property="og:image"
          content="https://coralcasino-uk.com/images/og_image.webp"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:description"
          content="Games from top developers are available at Coral Casino. Register to become a member of the loyalty program."
        />
        <meta property="og:site_name" content="Coral Casino UK" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="coralcasino-uk.com" />
        <meta
          name="twitter:title"
          content="Coral Casino UK Review: Top Games and Promotions"
        />
        <meta
          name="twitter:description"
          content="Games from top developers are available at Coral Casino. Register to become a member of the loyalty program."
        />
        <meta property="twitter:url" content="https://coralcasino-uk.com/" />
        <meta
          property="twitter:image"
          content="https://coralcasino-uk.com/images/og_image.webp"
        />
        <meta property="twitter:image:width" content="1200" />
        <meta property="twitter:image:height" content="630" />
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
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="keywords" content="Keywords" />
        <link rel="icon" type="image/x-con" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
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
