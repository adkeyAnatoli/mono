import StaticRichPage from '@/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/app/utils/pageMetadata';
import appPage from '@/app/data/pages/app.json';
import { asPageJson } from '@/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('app');
}

export default function AppPage() {
  return <StaticRichPage data={asPageJson(appPage)} />;
}
