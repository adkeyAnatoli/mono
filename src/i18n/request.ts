import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { fillMissingMessages } from '@/src/app/utils/fillMessages';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const enMessages = (await import(`../../messages/en-CA.json`))
    .default as Record<string, unknown>;

  if (locale === 'en-CA') {
    return {
      locale,
      messages: enMessages,
    };
  }

  const localeMessages = (await import(`../../messages/${locale}.json`))
    .default as Record<string, unknown>;

  return {
    locale,
    messages: fillMissingMessages(localeMessages, enMessages),
  };
});
