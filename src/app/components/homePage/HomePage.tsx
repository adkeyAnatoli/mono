import Footer from '../layout/Footer';
import Header from '../layout/Header';
// import AdvantagesSection from '../sections/advantagesSection/AdvantagesSection';
import AppSection from '../sections/appSection/AppSection';
// import BonusDetailSection from '../sections/bonusDetailsSection/BonusDetailSection';
import BonusSection from '../sections/bonusSection/BonusSection';
import CasinoInfoSection from '../sections/casinoInfoSection/CasinoInfoSection';
import FaqSection from '../sections/faqSection/FaqSection';
import InfoSectionAfterFaq from '../sections/infoSectionAfterFaq/InfoSectionAfterFaq';
import InfoSectionAfterSupport from '../sections/infoSectionAfterSupport/InfoSectionAfterSupport';
import JoiningSection from '../sections/joiningSection/JoiningSection';
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
  // const payments = await getPayments();
  // const providers = await getProviders();

  return (
    <>
      <Header isHomePage={isHomePage} />
      <main>
        <BonusSection />
        <H1Section />
        <TopCasinoSection />
        {/* <BonusDetailSection /> */}
        <CasinoInfoSection />
        {/* <AdvantagesSection /> */}
        <TopGamesSection data={games} />
        <LastSection />
        <JoiningSection />
        <AppSection />
        <InfoSectionAfterFaq />
        <SupportSection />
        <InfoSectionAfterSupport />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
