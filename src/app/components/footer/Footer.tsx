import Link from "next/link";
import Image from "next/image";
import footerLogo from "../../../../public/images/logo.webp";
import styles from "./footer.module.css";
import Payment from "./payment/Payment";
import Operator from "./operator/Operator";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerTop}`}>
        <div className={styles.footerLogoContainer}>
          <Link href={"/"} aria-label="Main page">
            <Image
              className={styles.footer__logo}
              src={footerLogo}
              alt={"Coral Casino UK Logo"}
              width={150}
              height={18}
            />
          </Link>
        </div>
        <Payment />
      </div>
      <div className={`${styles.footerMiddle}`}>
        <Operator />
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomGroup}>
          <p className={styles.footerBottomAge}>18+</p>
          <p className={styles.footerBottomCopyright}>
            Copyright © {year} Coral Casino
          </p>
        </div>
      </div>
    </footer>
  );
}
