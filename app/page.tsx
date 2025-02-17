'use client'
import { useEffect, useState } from 'react';
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
import Loading from './loading';

export default function Home() {
  const idSite = 698;
  const [website, setWebsite] = useState<IWebsite | null>(null);
  const [games, setGames] = useState<IGame[]>([]);
  const [payments, setPayments] = useState<IPayments[]>([]);
  const [providers, setProviders] = useState<IProviders[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const dataWebsite = await fetch(
  //   `https://api.adkey-seo.com/api/website/get-website/${idSite}`
  // );
  // const website: IWebsite = await dataWebsite.json();

  // const dataGames = await fetch(
  //   `https://api.adkey-seo.com/api/website/get-games/${website.website.type}`
  // );
  // const games: IGame[] = await dataGames.json();

  // const dataPayments = await fetch(
  //   `https://api.adkey-seo.com/api/website/get-payments/${idSite}`
  // );
  // const payments: IPayments[] = await dataPayments.json();

  // const dataProviders = await fetch(
  //   'https://api.adkey-seo.com/api/website/get-providers/'
  // );
  // const providers: IProviders[] = await dataProviders.json();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const websiteRes = await fetch(
          `https://api.adkey-seo.com/api/website/get-website/${idSite}`
        );
        const websiteData: IWebsite = await websiteRes.json();
        setWebsite(websiteData);

        const gamesRes = await fetch(
          `https://api.adkey-seo.com/api/website/get-games/${websiteData.website.type}`
        );
        const gamesData: IGame[] = await gamesRes.json();
        setGames(gamesData);

        const paymentsRes = await fetch(
          `https://api.adkey-seo.com/api/website/get-payments/${idSite}`
        );
        const paymentsData: IPayments[] = await paymentsRes.json();
        setPayments(paymentsData);

        const providersRes = await fetch(
          'https://api.adkey-seo.com/api/website/get-providers/'
        );
        const providersData: IProviders[] = await providersRes.json();
        setProviders(providersData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <>
      <Header link={website!.offers[0].link} id={website!.offers[0].id} />
      <main>
        <BonusSection data={website!.offers[0]} />
        <TopCasinoSection data={website!} />
        <BonusDetailSection data={website!} />
        <AdvantagesSection offer={website!.offers[0]} />
        <TopGamesSection data={games} offer={website!.offers[0]} />
        <CasinoInfoSection />
        <PaymentsSection data={payments} offer={website!.offers[0]} />
        <InfoSectionAfterPayments />
        <SoftwareProvidersSection data={providers} offer={website!.offers[0]} />
        <AppSection offer={website!.offers[0]} />
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
