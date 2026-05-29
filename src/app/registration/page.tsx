import StaticRichPage from '@/src/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/src/app/utils/pageMetadata';
import registrationPage from '@/src/app/data/pages/registration.json';
import { asPageJson } from '@/src/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('registration');
}

export default function RegistrationPage() {
  const data = asPageJson(registrationPage);
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
