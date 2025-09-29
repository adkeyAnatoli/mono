import Image from "next/image";
import gpwaPic from "../../../../../public/images/footer/operator/gpwa.svg";
import gpwaColorPic from "../../../../../public/images/footer/operator/gpwa--color.svg";
import gambleawarePic from "../../../../../public/images/footer/operator/gambleaware.svg";
import gambleawareColorPic from "../../../../../public/images/footer/operator/gambleaware--color.svg";
import gameCarePic from "../../../../../public/images/footer/operator/gamcare.svg";
import gameCareColorPic from "../../../../../public/images/footer/operator/gamcare--color.svg";
import gamblingTherapyPic from "../../../../../public/images/footer/operator/gambling-therapy.svg";
import gamblingTherapyColorPic from "../../../../../public/images/footer/operator/gambling-therapy--color.svg";
import gambanPic from "../../../../../public/images/footer/operator/gamban.svg";
import gambanColorPic from "../../../../../public/images/footer/operator/gamban--color.svg";
import betBlockerPic from "../../../../../public/images/footer/operator/betblocker.svg";
import betBlockerColorPic from "../../../../../public/images/footer/operator/betblocker--color.svg";
import iTechLabsPic from "../../../../../public/images/footer/operator/itech_labs.svg";
import iTechLabsColorPic from "../../../../../public/images/footer/operator/itech_labs--color.svg";
import ecograPic from "../../../../../public/images/footer/operator/ecogra.svg";
import ecograColorPic from "../../../../../public/images/footer/operator/ecogra--color.svg";
import styles from "../footer.module.css";

export default function Operator() {
  return (
    <div className={styles.footerOperator}>
      <div className={styles.operatorBlock}>
        <Image
          className={styles.operatorElementGrey}
          src={gpwaPic}
          alt={"GPWA"}
        />
        <Image
          className={styles.operatorElementColor}
          src={gpwaColorPic}
          alt={"GPWA"}
        />
      </div>
      <div className={styles.operatorBlock}>
        <Image
          className={styles.operatorElementGrey}
          src={gambleawarePic}
          alt={"Gamble Aware"}
        />
        <Image
          className={styles.operatorElementColor}
          src={gambleawareColorPic}
          alt={"Gamble Aware"}
        />
      </div>
      <div className={styles.operatorBlock}>
        <Image
          className={styles.operatorElementGrey}
          src={gameCarePic}
          alt={"Game care"}
        />
        <Image
          className={styles.operatorElementColor}
          src={gameCareColorPic}
          alt={"Game care"}
        />
      </div>
      <div className={styles.operatorBlock}>
        <Image
          className={styles.operatorElementGrey}
          src={gamblingTherapyPic}
          alt={"Gambling Therapy"}
        />
        <Image
          className={styles.operatorElementColor}
          src={gamblingTherapyColorPic}
          alt={"gambling Therapy"}
        />
      </div>
      <div className={styles.operatorBlock}>
        <Image
          className={styles.operatorElementGrey}
          src={gambanPic}
          alt={"Gamban"}
        />
        <Image
          className={styles.operatorElementColor}
          src={gambanColorPic}
          alt={"Gamban"}
        />
      </div>
      <div className={styles.operatorBlock}>
        <Image
          className={styles.operatorElementGrey}
          src={betBlockerPic}
          alt={"BetBlocker"}
        />
        <Image
          className={styles.operatorElementColor}
          src={betBlockerColorPic}
          alt={"BetBlocker"}
        />
      </div>
      <div className={styles.operatorBlock}>
        <Image
          className={styles.operatorElementGrey}
          src={iTechLabsPic}
          alt={"ITech Labs"}
        />
        <Image
          className={styles.operatorElementColor}
          src={iTechLabsColorPic}
          alt={"ITech Labs"}
        />
      </div>
      <div className={styles.operatorBlock}>
        <Image
          className={styles.operatorElementGrey}
          src={ecograPic}
          alt={"Ecogra"}
        />
        <Image
          className={styles.operatorElementColor}
          src={ecograColorPic}
          alt={"Ecogra"}
        />
      </div>
    </div>
  );
}
