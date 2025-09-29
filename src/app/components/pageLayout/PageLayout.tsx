import Advantages from "../advantages/Advatages";
import Application from "../application/Application";
import ApplicationGroup from "../applicationGroup/ApplicationGroup";
import AvailableGames from "../availableGames/AvailableGames";
import Bonuses from "../bonuses/Bonuses";
import Connect from "../connect/Connect";
import Deposit from "../deposit/Deposit";
import FAQ from "../faq/FAQ";
import Games from "../games/Games";
import Hero from "../hero/Hero";
import HistoryGroup from "../history-group/HistoryGroup";
import Idioms from "../idiomas/Idioms";
import License from "../license/License";
import PayMethod from "../payment/PayMethod";
import ProsAndCons from "../prosAndCons/ProsAndCons";
import ProvidersAndSecurity from "../providerAndSecurity/ProvidersAndSecurity";
import Providers from "../providers/Providers";
import SupportGroup from "../supportGroup/SupportGroup";
import TopCasino from "../topCasino/TopCasino";
import TopCasinoGroupGroup from "../topCasinoGroup/TopCasinoGroup";
import Withdraw from "../withdraw/Withdraw";

export default function PageLayout() {
  return (
    <>
      <Hero />
      <TopCasino />
      <TopCasinoGroupGroup />
      <Advantages />
      <Games />
      <HistoryGroup />
      <Idioms />
      <Connect />
      <Deposit />
      <Withdraw />
      <PayMethod />
      <ApplicationGroup />
      <ProvidersAndSecurity />
      <Providers />
      <Application />
      <FAQ />
      <SupportGroup />
      <AvailableGames />
      <Bonuses />
      <ProsAndCons />
    </>
  );
}
