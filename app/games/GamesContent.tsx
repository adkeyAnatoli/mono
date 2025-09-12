'use client';
import { useEffect, useState } from 'react';
import Footer from '@/app/components/layout/Footer';
import Header from '@/app/components/layout/Header';
import BonusSection from '@/app/components/sections/bonusSection/BonusSection';
import TopCasinoSection from '@/app/components/sections/topCasinoSection/TopCasinoSection';
import { IWebsite } from '@/app/interfaces/mainInterfaces';
import dataJson from '@/app/data/dataGamesPage.json';
import CommonSection, {
  IData,
} from '../components/sections/commonSection/CommonSection';
import H1Section from '../components/sections/h1Section/H1Section';
import dataH1 from '@/app/data/dataH1section.json';

export default function GamesPage() {
  const data: IData = dataJson as IData;
  const idSite = process.env.NEXT_PUBLIC_SITE_ID;
  const [website, setWebsite] = useState<IWebsite | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const websiteRes = await fetch(
          `https://api.adkey-seo.com/api/website/get-website/${idSite}`
        );
        const websiteData: IWebsite = await websiteRes.json();
        setWebsite(websiteData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, [idSite]);

  if (!website || !website.offers || website.offers.length === 0) {
    return null;
  }

  const offer = website.offers[0];

  return (
    <>
      <Header link={offer.link} id={offer.id} />
      <main>
        <BonusSection data={offer} />
        <H1Section h1String={dataH1.titleGames} />
        <TopCasinoSection data={website} />
        <CommonSection dataNew={data} />
      </main>
      <Footer />
    </>
  );
}
