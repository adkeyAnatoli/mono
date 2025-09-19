import dataJson from "@/app/data/dataBonusPage.json";
import Hero from "../components/hero/Hero";
import CommonSection from "../components/commonSection/CommonSection";
import TopCasino from "../components/topCasino/TopCasino";
import { IData } from "../utils/interfaces";

export default function BonusContent() {
  const data: IData = dataJson as IData;

  return (
    <>
      <Hero />
      <TopCasino />
      <CommonSection data={data} />
    </>
  );
}
