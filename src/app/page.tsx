import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import BonusSection from './components/sections/bonusSection/BonusSection';
import CasinoInfoSection from './components/sections/casinoInfoSection/CasinoInfoSection';
import FaqSection from './components/sections/faqSection/FaqSection';
import InfoSectionAfterFaq from './components/sections/infoSectionAfterFaq/InfoSectionAfterFaq';
import LastSection from './components/sections/lastSection/LastSection';
import SupportSection from './components/sections/supportSection/SupportSection';
import CasinoIntroSection from './components/sections/casinoIntroSection/CasinoIntroSection';
import TopCasinoSection from './components/sections/topCasinoSection/TopCasinoSection';
import TopGamesSection from './components/sections/topGamesSection/TopGamesSection';
import { getGames } from './api/api';

export default async function Home() {
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
        <SupportSection />
        <CasinoInfoSection />
        <InfoSectionAfterFaq />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
