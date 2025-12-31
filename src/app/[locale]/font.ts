import localFont from "next/font/local";
export const inter = localFont({
  src: [
    { path: "../../../public/fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../../public/fonts/Inter-ExtraBold.woff2", weight: "800", style: "normal" }
  ],
  variable: "--font-family-main",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

export const roboto = localFont({
  src: [
    { path: "../../../public/fonts/Roboto.woff2", weight: "500", style: "normal" }
  ],
  variable: "--font-family-second",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});
