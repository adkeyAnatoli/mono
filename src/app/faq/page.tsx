import StaticRichPage from '@/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/app/utils/pageMetadata';
import faqPage from '@/app/data/pages/faq.json';
import { asPageJson } from '@/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('faq');
}

export default function FaqPage() {
  return <StaticRichPage data={asPageJson(faqPage)} />;
}
