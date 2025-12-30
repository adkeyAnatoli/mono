import Footer from '../layout/Footer';
import Header from '../layout/Header';
// import AdvantagesSection from '../sections/advantagesSection/AdvantagesSection';
import AppSection from '../sections/appSection/AppSection';
import BonusDetailSection from '../sections/bonusDetailsSection/BonusDetailSection';
import BonusSection from '../sections/bonusSection/BonusSection';
import CasinoInfoSection from '../sections/casinoInfoSection/CasinoInfoSection';
import FaqSection from '../sections/faqSection/FaqSection';
import InfoSectionAfterFaq from '../sections/infoSectionAfterFaq/InfoSectionAfterFaq';
import InfoSectionAfterPayments from '../sections/infoSectionAfterPayments/InfoSectionAfterPayments';
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
  // const payments = await getPayments();
  // const providers = await getProviders();

  return (
    <>
      <Header isHomePage={isHomePage} />
      <main>
        <BonusSection />
        <H1Section />
        <TopCasinoSection />
        <BonusDetailSection />
        <CasinoInfoSection />
        {/* <AdvantagesSection /> */}
        <TopGamesSection data={games} />
        <LastSection />
        {/* <PaymentsSection data={payments} /> */}
        <InfoSectionAfterPayments />
        {/* <SoftwareProvidersSection data={providers} /> */}
        <AppSection />
        <FaqSection />
        <InfoSectionAfterFaq />
        <SupportSection />
        <InfoSectionAfterSupport />
      </main>
      <Footer />
    </>
  );
}
