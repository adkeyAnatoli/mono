import Image from "next/image";
import masterCardPic from "../../../../../public/images/footer/payment/masterCard.svg";
import masterCardColorPic from "../../../../../public/images/footer/payment/masterCard--color.svg";
import visaPic from "../../../../../public/images/footer/payment/visa.svg";
import visaColorPic from "../../../../../public/images/footer/payment/visa--color.svg";
import netellerPic from "../../../../../public/images/footer/payment/neteller.svg";
import netellerColorPic from "../../../../../public/images/footer/payment/neteller--color.svg";
import skrillPic from "../../../../../public/images/footer/payment/skrill.svg";
import skrillColorPic from "../../../../../public/images/footer/payment/skrill--color.svg";
import bitcoinPic from "../../../../../public/images/footer/payment/bitcoin.svg";
import bitcoinColorPic from "../../../../../public/images/footer/payment/bitcoin--color.svg";
import litecoinPic from "../../../../../public/images/footer/payment/litecoin.svg";
import litecoinColorPic from "../../../../../public/images/footer/payment/litecoin--color.svg";
import etheriumPic from "../../../../../public/images/footer/payment/ethereum.svg";
import etheriumColorPic from "../../../../../public/images/footer/payment/ethereum--color.svg";
import styles from "../footer.module.css";

export default function Payment() {
  return (
    <div className={styles.footerPay}>
      <div className={styles.payBlock}>
        <Image
          className={styles.payElementGrey}
          src={masterCardPic}
          alt={"MasterCard"}
        />
        <Image
          className={styles.payElementColor}
          src={masterCardColorPic}
          alt={"MasterCard"}
        />
      </div>
      <div className={styles.payBlock}>
        <Image className={styles.payElementGrey} src={visaPic} alt={"Visa"} />
        <Image
          className={styles.payElementColor}
          src={visaColorPic}
          alt={"Visa"}
        />
      </div>
      <div className={styles.payBlock}>
        <Image
          className={styles.payElementGrey}
          src={netellerPic}
          alt={"Neteller"}
        />
        <Image
          className={styles.payElementColor}
          src={netellerColorPic}
          alt={"Neteller"}
        />
      </div>
      <div className={styles.payBlock}>
        <Image
          className={styles.payElementGrey}
          src={skrillPic}
          alt={"Skrill"}
        />
        <Image
          className={styles.payElementColor}
          src={skrillColorPic}
          alt={"Skrill"}
        />
      </div>
      <div className={styles.payBlock}>
        <Image
          className={styles.payElementGrey}
          src={bitcoinPic}
          alt={"Bitcoin"}
        />
        <Image
          className={styles.payElementColor}
          src={bitcoinColorPic}
          alt={"Bitcoin"}
        />
      </div>
      <div className={styles.payBlock}>
        <Image
          className={styles.payElementGrey}
          src={litecoinPic}
          alt={"Litecoin"}
        />
        <Image
          className={styles.payElementColor}
          src={litecoinColorPic}
          alt={"Litecoin"}
        />
      </div>
      <div className={styles.payBlock}>
        <Image
          className={styles.payElementGrey}
          src={etheriumPic}
          alt={"Etherium"}
        />
        <Image
          className={styles.payElementColor}
          src={etheriumColorPic}
          alt={"Etherium"}
        />
      </div>
    </div>
  );
}
