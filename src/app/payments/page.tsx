import StaticRichPage from '@/src/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/src/app/utils/pageMetadata';
import paymentsPage from '@/src/app/data/pages/payments.json';
import { asPageJson } from '@/src/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('payments');
}

export default function PaymentsPage() {
  const data = asPageJson(paymentsPage);
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
