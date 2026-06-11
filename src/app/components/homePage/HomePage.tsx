import Footer from '../layout/Footer';
import Header from '../layout/Header';
import BonusSection from '../sections/bonusSection/BonusSection';
import CasinoInfoSection from '../sections/casinoInfoSection/CasinoInfoSection';
import FaqSection from '../sections/faqSection/FaqSection';
import InfoSectionAfterSupport from '../sections/infoSectionAfterSupport/InfoSectionAfterSupport';
import TopCasinoSection from '../sections/topCasinoSection/TopCasinoSection';
import TopGamesSection from '../sections/topGamesSection/TopGamesSection';
import RegistrationSection from '../sections/registrationSection/RegistrationSection';
import TransactionsSection from '../sections/transactionsSection/TransactionsSection';
import MobileGamingSection from '../sections/mobileGamingSection/MobileGamingSection';
import GamesSection from '../sections/gamesSection/GamesSection';
import LanguageCurrencySection from '../sections/languageCurrencySection/LanguageCurrencySection';
import BonusesSection from '../sections/bonusesSection/BonusesSection';
import { getGames } from '../../api/api';

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
        <TopCasinoSection />
        <CasinoInfoSection />
        <TopGamesSection data={games} />
        <RegistrationSection />
        <TransactionsSection />
        <MobileGamingSection />
        <GamesSection />
        <LanguageCurrencySection />
        <BonusesSection />
        <InfoSectionAfterSupport />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
