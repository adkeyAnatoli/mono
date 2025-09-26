'use client';
import { useEffect, useState } from 'react';
import Footer from '@/src/app/components/layout/Footer';
import Header from '@/src/app/components/layout/Header';
import BonusSection from '@/src/app/components/sections/bonusSection/BonusSection';
import TopCasinoSection from '@/src/app/components/sections/topCasinoSection/TopCasinoSection';
import { IWebsite } from '@/src/app/interfaces/mainInterfaces';
import CommonSection, {
  IData,
} from '../components/sections/commonSection/CommonSection';
import dataJson from '@/src/app/data/dataAppPage.json';
import H1Section from '../components/sections/h1Section/H1Section';
import dataH1 from '@/src/app/data/dataH1section.json';

export default function AppPage() {
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

  return (
    <>
      <Header link={website.offers[0].link} id={website.offers[0].id} />
      <main>
        <BonusSection data={website.offers[0]} />
        <H1Section h1String={dataH1.titleApp} />
        <TopCasinoSection data={website} />
        <CommonSection dataNew={data} />
      </main>
      <Footer />
    </>
  );
}
