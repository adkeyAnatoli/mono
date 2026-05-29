import Footer from '../layout/Footer';
import Header from '../layout/Header';
import AppSection from '../sections/appSection/AppSection';
import BonusSection from '../sections/bonusSection/BonusSection';
import CasinoInfoSection from '../sections/casinoInfoSection/CasinoInfoSection';
import FaqSection from '../sections/faqSection/FaqSection';
import InfoSectionAfterSupport from '../sections/infoSectionAfterSupport/InfoSectionAfterSupport';
import LastSection from '../sections/lastSection/LastSection';
import SupportSection from '../sections/supportSection/SupportSection';
import TopCasinoSection from '../sections/topCasinoSection/TopCasinoSection';
import TopGamesSection from '../sections/topGamesSection/TopGamesSection';
import { getGames } from '../../api/api';
import H1Section from '../sections/h1Section/H1Section';

interface IHomePageProps {
  isHomePage: boolean;
}

export default async function Home({ isHomePage }: IHomePageProps) {
  const games = await getGames('gambling');

  return (
    <>
      <Header isHomePage={isHomePage} />
      <main>
        <BonusSection />
        <H1Section />
        <TopCasinoSection />
        <CasinoInfoSection />
        <TopGamesSection data={games} />
        <LastSection />
        <AppSection />
        <SupportSection />
        <InfoSectionAfterSupport />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
