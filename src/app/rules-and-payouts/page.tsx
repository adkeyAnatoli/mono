import StaticRichPage from '@/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/app/utils/pageMetadata';
import rulesAndPayoutsPage from '@/app/data/pages/rules-and-payouts.json';
import { asPageJson } from '@/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('rules-and-payouts');
}

export default function RulesAndPayoutsPage() {
  return <StaticRichPage data={asPageJson(rulesAndPayoutsPage)} />;
}
