import StaticRichPage from '@/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/app/utils/pageMetadata';
import termsPage from '@/app/data/pages/terms.json';
import { asPageJson } from '@/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('terms');
}

export default function TermsPage() {
  return <StaticRichPage data={asPageJson(termsPage)} />;
}
