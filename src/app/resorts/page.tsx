import StaticRichPage from '@/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/app/utils/pageMetadata';
import resortsPage from '@/app/data/pages/resorts.json';
import { asPageJson } from '@/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('resorts');
}

export default function ResortsPage() {
  return <StaticRichPage data={asPageJson(resortsPage)} />;
}
