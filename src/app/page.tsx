// import { useEffect, useState } from 'react';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
// import AdvantagesSection from './components/sections/advantagesSection/AdvantagesSection';
import AppSection from './components/sections/appSection/AppSection';
import BonusDetailSection from './components/sections/bonusDetailsSection/BonusDetailSection';
import BonusSection from './components/sections/bonusSection/BonusSection';
import CasinoInfoSection from './components/sections/casinoInfoSection/CasinoInfoSection';
import FaqSection from './components/sections/faqSection/FaqSection';
import InfoSectionAfterFaq from './components/sections/infoSectionAfterFaq/InfoSectionAfterFaq';
import InfoSectionAfterPayments from './components/sections/infoSectionAfterPayments/InfoSectionAfterPayments';
import InfoSectionAfterSupport from './components/sections/infoSectionAfterSupport/InfoSectionAfterSupport';
import LastSection from './components/sections/lastSection/LastSection';
// import PaymentsSection from './components/sections/paymentsSection/PaymentsSection';
// import SoftwareProvidersSection from './components/sections/softwareProvidersSection/SoftwareProvidersSection';
import SupportSection from './components/sections/supportSection/SupportSection';
import TopCasinoSection from './components/sections/topCasinoSection/TopCasinoSection';
import TopGamesSection from './components/sections/topGamesSection/TopGamesSection';
// import {
//   IGame,
//   IPayments,
//   IProviders,
//   IWebsite,
// } from './interfaces/mainInterfaces';
import H1Section from './components/sections/h1Section/H1Section';
import dataH1 from '@/src/app/data/dataH1section.json';
import { getGames } from './api/api';
// import { getGames, getPayments, getProviders } from './api/api';

export default async function Home() {
  // const idSite = process.env.NEXT_PUBLIC_SITE_ID;
  // const [website, setWebsite] = useState<IWebsite | null>(null);
  // const [games, setGames] = useState<IGame[]>([]);
  // const [payments, setPayments] = useState<IPayments[]>([]);
  // const [providers, setProviders] = useState<IProviders[]>([]);
  const data = dataH1.title;
  const games = await getGames('gambling');
  // const providers = await getProviders();
  // const payments = await getPayments(idSite!);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const websiteRes = await fetch(
  //         `https://api.adkey-seo.com/api/website/get-website/${idSite}`
  //       );
  //       const websiteData: IWebsite = await websiteRes.json();
  //       setWebsite(websiteData);

  //       const gamesRes = await fetch(
  //         `https://api.adkey-seo.com/api/website/get-games/${websiteData.website.type}`
  //       );
  //       const gamesData: IGame[] = await gamesRes.json();
  //       setGames(gamesData);

  //       const paymentsRes = await fetch(
  //         `https://api.adkey-seo.com/api/website/get-payments/${idSite}`
  //       );
  //       const paymentsData: IPayments[] = await paymentsRes.json();
  //       setPayments(paymentsData);

  //       const providersRes = await fetch(
  //         'https://api.adkey-seo.com/api/website/get-providers/'
  //       );
  //       const providersData: IProviders[] = await providersRes.json();
  //       setProviders(providersData);
  //     } catch (error) {
  //       console.error('Ошибка при загрузке данных:', error);
  //     }
  //   };

  //   fetchData();
  // }, [idSite]);

  // if (!website || !website.offers || website.offers.length === 0) {
  //   return null;
  // }

  // const offer = website.offers[0];

  return (
    <>
      <Header isHomePage={true} />
      <main>
        <BonusSection />
        <H1Section h1String={data} />
        <TopCasinoSection />
        <BonusDetailSection />
        {/* <AdvantagesSection /> */}
        <CasinoInfoSection />
        <TopGamesSection data={games} />
        {/* <PaymentsSection data={payments} /> */}
        <LastSection />
        <InfoSectionAfterPayments />
        {/* <SoftwareProvidersSection data={providers} /> */}
        <AppSection />
        <FaqSection />
        <InfoSectionAfterSupport />
        <SupportSection />
        <InfoSectionAfterFaq />
      </main>
      <Footer />
    </>
  );
}
