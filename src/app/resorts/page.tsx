import StaticRichPage from '@/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/app/utils/pageMetadata';
import resortsPage from '@/app/data/pages/resorts.json';
import { asPageJson } from '@/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('resorts');
}

export default function ResortsPage() {
  const data = asPageJson(resortsPage);
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
