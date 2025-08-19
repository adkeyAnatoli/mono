import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: [
    "en",
    "pt-BR",
    "es-MX",
    "de-DE",
    "pl-PL",
    "fr-FR",
    "nl-NL",
  ],

  defaultLocale: "en",
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      // No prefix for default "en"
      "pt-BR": "/br",
      "es-MX": "/mx",
      "de-DE": "/de",
      "pl-PL": "/pl",
      "fr-FR": "/fr",
      "nl-NL": "/nl",
    },
  },
  pathnames: {
    "/": "/",
  },
  localeDetection: false,
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];


