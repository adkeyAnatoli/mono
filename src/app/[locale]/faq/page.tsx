import StaticRichPage from '@/src/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/src/app/utils/pageMetadata';
import { routing } from '@/src/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildStaticPageMetadata({
    locale,
    namespace: 'faqPageMeta',
    pathname: '/faq',
  });
}

export default async function FaqStandalonePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StaticRichPage locale={locale} namespace="faqPage" />;
}
