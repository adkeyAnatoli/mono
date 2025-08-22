import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override: Partial<T>
): T {
  const result = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(override)) {
    const baseVal = base[key];
    const overVal = override[key as keyof typeof override];
    if (isPlainObject(baseVal) && isPlainObject(overVal)) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overVal as Record<string, unknown>
      );
    } else if (overVal !== undefined) {
      result[key] = overVal as unknown;
    }
  }
  return result as T;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const enMessages = (await import(`../../messages/en.json`)).default as Record<
    string,
    unknown
  >;
  let messages: Record<string, unknown> = enMessages;
  if (locale !== 'en') {
    try {
      const localeMessages = (await import(`../../messages/${locale}.json`))
        .default as Record<string, unknown>;
      messages = deepMerge(enMessages, localeMessages);
    } catch {
      messages = enMessages;
    }
  }

  return {
    locale,
    messages,
  };
});
