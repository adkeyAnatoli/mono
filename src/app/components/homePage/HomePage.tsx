'use client';
import { useEffect, useState } from 'react';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import AdvantagesSection from '../sections/advantagesSection/AdvantagesSection';
import AppSection from '../sections/appSection/AppSection';
import BonusDetailSection from '../sections/bonusDetailsSection/BonusDetailSection';
import BonusSection from '../sections/bonusSection/BonusSection';
import CasinoInfoSection from '../sections/casinoInfoSection/CasinoInfoSection';
import FaqSection from '../sections/faqSection/FaqSection';
import InfoSectionAfterFaq from '../sections/infoSectionAfterFaq/InfoSectionAfterFaq';
import InfoSectionAfterPayments from '../sections/infoSectionAfterPayments/InfoSectionAfterPayments';
import InfoSectionAfterSupport from '../sections/infoSectionAfterSupport/InfoSectionAfterSupport';
import LastSection from '../sections/lastSection/LastSection';
import PaymentsSection from '../sections/paymentsSection/PaymentsSection';
import SoftwareProvidersSection from '../sections/softwareProvidersSection/SoftwareProvidersSection';
import SupportSection from '../sections/supportSection/SupportSection';
import TopCasinoSection from '../sections/topCasinoSection/TopCasinoSection';
import TopGamesSection from '../sections/topGamesSection/TopGamesSection';

import {
  IGame,
  IPayments,
  IProviders,
  IWebsite,
} from '../../interfaces/mainInterfaces';
import Loading from '../loader/loading';

interface IHomePageProps { isHomePage: boolean }

export default function Home({ isHomePage }: IHomePageProps) {
  // const [locale] = useLocale();
  // const withPrefix = (path: string) =>
  //   [locale] === 'ca' ? path : `/${[locale]}${path}`;
  const idSite = process.env.NEXT_PUBLIC_SITE_ID;
  const [website, setWebsite] = useState<IWebsite | null>(null);
  const [games, setGames] = useState<IGame[]>([]);
  const [payments, setPayments] = useState<IPayments[]>([]);
  const [providers, setProviders] = useState<IProviders[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
  }, [idSite]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header isHomePage={isHomePage} link={website!.offers[0].link} id={website!.offers[0].id} />
      <main>
        <BonusSection data={website!.offers[0]} />
        <TopCasinoSection data={website!} />
        <BonusDetailSection data={website!} />
        <AdvantagesSection offer={website!.offers[0]} />
        <TopGamesSection data={games} offer={website!.offers[0]} />
        <CasinoInfoSection />
        <PaymentsSection data={payments} offer={website!.offers[0]} />
        <InfoSectionAfterPayments />
        <SoftwareProvidersSection data={providers} />
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
