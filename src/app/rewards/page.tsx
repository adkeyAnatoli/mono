import StaticRichPage from '@/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/app/utils/pageMetadata';
import rewardsPage from '@/app/data/pages/rewards.json';
import { asPageJson } from '@/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('rewards');
}

export default function RewardsPage() {
  const data = asPageJson(rewardsPage);
  return (
    <StaticRichPage
      variant="header"
      data={{
        h1: data.h1,
        h2: data.h2,
        intro: data.intro,
        sections: data.sections,
        faq: data.faq,
      }}
    />
  );
}
