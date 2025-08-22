import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es-ES', 'de-DE', 'it-IT', 'fr-FR'],

  defaultLocale: 'en',
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      // No prefix for default "en"
      'es-ES': '/es',
      'de-DE': '/de',
      'it-IT': '/it',
      'fr-FR': '/fr',
    },
  },
  pathnames: {
    '/': '/',
  },
  localeDetection: false,
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
