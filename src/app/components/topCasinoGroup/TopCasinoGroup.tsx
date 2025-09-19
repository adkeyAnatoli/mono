import Advantages from "../advantages/Advatages";
import BonusDetail from "../bonusDetails/BonusDetail";
import TopCasino from "../topCasino/TopCasino";
import styles from "./top-casino-group.module.css";

export default function TopCasinoGroupGroup() {
  return (
    <div className={styles.topCasinoCircleContainer}>
      <TopCasino />
      <BonusDetail />
    </div>
  );
}
