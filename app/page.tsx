import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import AppSection from './components/sections/appSection/AppSection';
import BonusSection from './components/sections/bonusSection/BonusSection';
import CasinoInfoSection from './components/sections/casinoInfoSection/CasinoInfoSection';
import FaqSection from './components/sections/faqSection/FaqSection';
import InfoSectionAfterFaq from './components/sections/infoSectionAfterFaq/InfoSectionAfterFaq';
// import InfoSectionAfterPayments from './components/sections/infoSectionAfterPayments/InfoSectionAfterPayments';
import InfoSectionAfterSupport from './components/sections/infoSectionAfterSupport/InfoSectionAfterSupport';
import LastSection from './components/sections/lastSection/LastSection';
// import PaymentsSection from './components/sections/paymentsSection/PaymentsSection';
// import SoftwareProvidersSection from './components/sections/softwareProvidersSection/SoftwareProvidersSection';
import SupportSection from './components/sections/supportSection/SupportSection';
import CasinoIntroSection from './components/sections/casinoIntroSection/CasinoIntroSection';
import TopCasinoSection from './components/sections/topCasinoSection/TopCasinoSection';
import TopGamesSection from './components/sections/topGamesSection/TopGamesSection';
import { getGames } from './api/api';
// import AdvantagesSection from './components/sections/advantagesSection/AdvantagesSection';

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
        <CasinoInfoSection />
        <AppSection />
        <InfoSectionAfterSupport />
        <SupportSection />
        <InfoSectionAfterFaq />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
