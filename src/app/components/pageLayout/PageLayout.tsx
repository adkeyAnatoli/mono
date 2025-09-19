import Advantages from "../advantages/Advatages";
import ApplicationGroup from "../applicationGroup/ApplicationGroup";
import AvailableGames from "../availableGames/AvailableGames";
import Bonuses from "../bonuses/Bonuses";
import Deposit from "../deposit/Deposit";
import FAQ from "../faq/FAQ";
import Games from "../games/Games";
import Hero from "../hero/Hero";
import HistoryGroup from "../history-group/HistoryGroup";
import License from "../license/License";
import PayMethod from "../payment/PayMethod";
import ProsAndCons from "../prosAndCons/ProsAndCons";
import ProvidersAndSecurity from "../providerAndSecurity/ProvidersAndSecurity";
import Providers from "../providers/Providers";
import SupportGroup from "../supportGroup/SupportGroup";
import TopCasinoGroupGroup from "../topCasinoGroup/TopCasinoGroup";
import Withdraw from "../withdraw/Withdraw";

export default function PageLayout() {
  return (
    <>
      <Hero />
      <TopCasinoGroupGroup />
      <Advantages />
      <Games />
      <HistoryGroup />
      <Deposit />
      <Withdraw />
      <PayMethod />
      <License />
      <ProvidersAndSecurity />
      <Providers />
      <ApplicationGroup />
      <FAQ />
      <SupportGroup />
      <AvailableGames />
      <Bonuses />
      <ProsAndCons />
    </>
  );
}
