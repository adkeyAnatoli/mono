import StaticRichPage from '@/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/app/utils/pageMetadata';
import privacyPage from '@/app/data/pages/privacy.json';
import { asPageJson } from '@/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('privacy');
}

export default function PrivacyPage() {
  return <StaticRichPage data={asPageJson(privacyPage)} />;
}
