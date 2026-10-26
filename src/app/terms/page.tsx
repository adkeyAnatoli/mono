import StaticRichPage from '@/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/app/utils/pageMetadata';
import termsPage from '@/app/data/pages/terms.json';
import { asPageJson } from '@/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('terms');
}

export default function TermsPage() {
  const data = asPageJson(termsPage);
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
