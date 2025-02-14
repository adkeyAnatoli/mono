import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import AdvantagesSection from './components/sections/advantagesSection/AdvantagesSection';
import AppSection from './components/sections/appSection/AppSection';
import BonusDetailSection from './components/sections/bonusDetailsSection/BonusDetailSection';
import BonusSection from './components/sections/bonusSection/BonusSection';
import CasinoInfoSection from './components/sections/casinoInfoSection/CasinoInfoSection';
import FaqSection from './components/sections/faqSection/FaqSection';
import InfoSectionAfterFaq from './components/sections/infoSectionAfterFaq/InfoSectionAfterFaq';
import InfoSectionAfterPayments from './components/sections/infoSectionAfterPayments/InfoSectionAfterPayments';
import InfoSectionAfterSupport from './components/sections/infoSectionAfterSupport/InfoSectionAfterSupport';
import LastSection from './components/sections/lastSection/LastSection';
import PaymentsSection from './components/sections/paymentsSection/PaymentsSection';
import SoftwareProvidersSection from './components/sections/softwareProvidersSection/SoftwareProvidersSection';
import SupportSection from './components/sections/supportSection/SupportSection';
import TopCasinoSection from './components/sections/topCasinoSection/TopCasinoSection';
import TopGamesSection from './components/sections/topGamesSection/TopGamesSection';
import {
  IGame,
  IPayments,
  IProviders,
  IWebsite,
} from './interfaces/mainInterfaces';

export default async function Home() {
  const idSite = 698;
  const dataWebsite = await fetch(
    `https://api.adkey-seo.com/api/website/get-website/${idSite}`
  );
  const website: IWebsite = await dataWebsite.json();

  const dataGames = await fetch(
    `https://api.adkey-seo.com/api/website/get-games/${website.website.type}`
  );
  const games: IGame[] = await dataGames.json();

  const dataPayments = await fetch(
    `https://api.adkey-seo.com/api/website/get-payments/${idSite}`
  );
  const payments: IPayments[] = await dataPayments.json();

  const dataProviders = await fetch(
    'https://api.adkey-seo.com/api/website/get-providers/'
  );
  const providers: IProviders[] = await dataProviders.json();

  return (
    <>
      <Header link={website.offers[0].link} id={website.offers[0].id} />
      <main>
        <BonusSection data={website.offers[0]} />
        <TopCasinoSection data={website} />
        <BonusDetailSection data={website} />
        <AdvantagesSection offer={website.offers[0]} />
        <TopGamesSection data={games} offer={website.offers[0]} />
        <CasinoInfoSection />
        <PaymentsSection data={payments} offer={website.offers[0]} />
        <InfoSectionAfterPayments />
        <SoftwareProvidersSection data={providers} offer={website.offers[0]} />
        <AppSection offer={website.offers[0]} />
        <FaqSection />
        <InfoSectionAfterFaq />
        <SupportSection />
        <InfoSectionAfterSupport />
        <LastSection />
      </main>
      <Footer />
    </>
  );
}
