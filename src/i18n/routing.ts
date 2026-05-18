import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en-CA', 'en-GB', 'fr-FR', 'de-DE'],

  defaultLocale: 'en-CA',
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      'en-GB': '/uk',
      'fr-FR': '/fr',
      'de-DE': '/de',
    },
  },
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/terms': '/terms',
    '/privacy': '/privacy',
    '/faq': '/faq',
    '/casino/[...id]': '/casino/[...id]',
  },
  localeDetection: false,
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
