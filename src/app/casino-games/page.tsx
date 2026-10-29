import StaticRichPage from '@/app/components/staticContent/StaticRichPage';
import { buildStaticPageMetadata } from '@/app/utils/pageMetadata';
import casinoGamesPage from '@/app/data/pages/casino-games.json';
import { asPageJson } from '@/app/data/pageTypes';

export async function generateMetadata() {
  return buildStaticPageMetadata('casino-games');
}

export default function CasinoGamesPage() {
  return <StaticRichPage data={asPageJson(casinoGamesPage)} />;
}
