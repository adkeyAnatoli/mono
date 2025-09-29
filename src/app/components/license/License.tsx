import Image from "next/image";
import licensePic from "../../../../public/images/license.webp";
import styles from "./license.module.css";

export default function License() {
  return (
    <section className={styles.license}>
      <div className={`${styles.licenseBlock} block`}>
        <div className={styles.licenseGroup}>
          <div className={styles.licenseColumn}>
            <h2 className={`${styles.licenseTitle} title`}>
              <span>Licenses at Crown Casino Online Australia</span>
            </h2>
            <p className={styles.licenseDescription}>
              Crown Casino operates under a strict regulatory framework, holding
              a license issued by the authorities in Melbourne. This license is
              a testament to the casino’s compliance with all operational and
              legal standards required in the gambling industry. It ensures that
              the casino conducts its business with integrity, transparency, and
              accountability. Being licensed by local authorities also means
              that Crown Casino is regularly audited and must adhere to specific
              regulations regarding gaming operations, financial transactions,
              and customer interactions. These regulations are designed to
              protect the interests of the players and ensure the fairness and
              security of the gambling environment. Compliance with these
              standards is essential for the casino to maintain its license and
              its reputation as a safe and ethical gaming establishment.
            </p>
          </div>
          <div className={styles.licenseColumn}>
            <Image
              className={styles.licenseImage}
              src={licensePic}
              alt={"Crown Casino Melbourne Online License"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
