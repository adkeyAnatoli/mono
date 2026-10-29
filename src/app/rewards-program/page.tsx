import StaticRichPage from '@/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/app/utils/pageMetadata';
import rewardsProgramPage from '@/app/data/pages/rewards-program.json';
import { asPageJson } from '@/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('rewards-program');
}

export default function RewardsProgramPage() {
  return <StaticRichPage data={asPageJson(rewardsProgramPage)} />;
}
