import StaticRichPage from '@/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/app/utils/pageMetadata';
import firstDayTipsPage from '@/app/data/pages/first-day-tips.json';
import { asPageJson } from '@/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('first-day-tips');
}

export default function FirstDayTipsPage() {
  const data = asPageJson(firstDayTipsPage);
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
