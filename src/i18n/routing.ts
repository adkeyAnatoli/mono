import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr-FR', 'de-DE', 'es-ES'],

  defaultLocale: 'en',
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      en: '/en',
      'fr-FR': '/fr',
      'de-DE': '/de',
      'es-ES': '/es',
    },
  },
  pathnames: {
    '/': '/',
  },
  localeDetection: false,
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
