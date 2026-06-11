import StaticRichPage from '@/src/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/src/app/utils/pageMetadata';
import privacyPage from '@/src/app/data/pages/privacy.json';
import { asPageJson } from '@/src/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('privacy');
}

export default function PrivacyPage() {
  const data = asPageJson(privacyPage);
  return (
    <StaticRichPage
      variant="footer-legal"
      data={{
        h1: data.h1,
        h2: data.h2,
        intro: data.intro,
        sections: data.sections,
      }}
    />
  );
}
