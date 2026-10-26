import StaticRichPage from '@/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/app/utils/pageMetadata';
import appPage from '@/app/data/pages/app.json';
import { asPageJson } from '@/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('app');
}

export default function AppPage() {
  const data = asPageJson(appPage);
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
