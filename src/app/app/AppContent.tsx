// import { useEffect, useState } from 'react';
import Footer from '@/src/app/components/layout/Footer';
import Header from '@/src/app/components/layout/Header';
import BonusSection from '@/src/app/components/sections/bonusSection/BonusSection';
import TopCasinoSection from '@/src/app/components/sections/topCasinoSection/TopCasinoSection';
// import { IWebsite } from '@/src/app/interfaces/mainInterfaces';
import CommonSection, {
  IData,
} from '../components/sections/commonSection/CommonSection';
import dataJson from '@/src/app/data/dataAppPage.js';
import H1Section from '../components/sections/h1Section/H1Section';
import dataH1 from '@/src/app/data/dataH1section.json';

export default function AppPage() {
  const data: IData = dataJson as IData;

  return (
    <>
      <Header />
      <main>
        <BonusSection />
        <H1Section h1String={dataH1.titleApp} />
        <TopCasinoSection />
        <CommonSection dataNew={data} />
      </main>
      <Footer />
    </>
  );
}
