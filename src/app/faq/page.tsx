import StaticRichPage from '@/src/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/src/app/utils/pageMetadata';
import faqPage from '@/src/app/data/pages/faq.json';
import { asPageJson } from '@/src/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('faq');
}

export default function FaqPage() {
  const data = asPageJson(faqPage);
  return (
    <StaticRichPage
      variant="footer-faq"
      data={{
        h1: data.h1,
        h2: data.h2,
        intro: data.intro,
        faq: data.faq ?? [],
      }}
    />
  );
}
