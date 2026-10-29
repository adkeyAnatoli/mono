import { preload } from 'react-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import BonusSection from './components/sections/bonusSection/BonusSection';
import FaqSection from './components/sections/faqSection/FaqSection';
import InfoSectionAfterFaq from './components/sections/infoSectionAfterFaq/InfoSectionAfterFaq';
import LastSection from './components/sections/lastSection/LastSection';
import FeaturesSlider from './components/sections/featuresSlider/FeaturesSlider';
import CasinoIntroSection from './components/sections/casinoIntroSection/CasinoIntroSection';
import TopCasinoSection from './components/sections/topCasinoSection/TopCasinoSection';
import TopGamesSection from './components/sections/topGamesSection/TopGamesSection';
import { getGames } from './api/api';

function preloadAboveFoldImages() {
  preload('/sectionImg/bgWelcomeMobile.webp', {
    as: 'image',
    fetchPriority: 'high',
    media: '(max-width: 875px)',
  });
  preload('/sectionImg/slot1.webp', { as: 'image', fetchPriority: 'high' });
  preload('/sectionImg/bg-mobile.webp', {
    as: 'image',
    fetchPriority: 'high',
    media: '(max-width: 768px)',
  });
  preload('/sectionImg/bgWelcome.webp', {
    as: 'image',
    fetchPriority: 'high',
    media: '(min-width: 876px)',
  });
  preload('/sectionImg/bg.webp', {
    as: 'image',
    fetchPriority: 'high',
    media: '(min-width: 769px)',
  });
}

export default async function Home() {
  preloadAboveFoldImages();
  const games = await getGames('gambling');

  return (
    <>
      <Header isHomePage={true} />
      <main>
        <BonusSection />
        <TopCasinoSection />
        <CasinoIntroSection />
        <TopGamesSection data={games} />
        <LastSection />
        <FeaturesSlider />
        <InfoSectionAfterFaq />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
