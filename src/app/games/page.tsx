import StaticRichPage from '@/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/app/utils/pageMetadata';
import gamesPage from '@/app/data/pages/games.json';
import { asPageJson } from '@/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('games');
}

export default function GamesPage() {
  const data = asPageJson(gamesPage);
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
