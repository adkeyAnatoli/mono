import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: [
    "en-GB",
    "it-IT",
    "en-CA",
    "de-AT",
    "es-ES",
  ],

  defaultLocale: "en-CA",
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      "en-GB": "/uk",
      "it-IT": "/it",
      "en-CA": "/ca",
      "de-AT": "/at",
      "es-ES": "/es",
    },
  },
  pathnames: {
    "/": "/",
  },
  localeDetection: false,
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];


