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
              <span>Coral Casino Near Me Licenses</span>
            </h2>
            <p className={styles.licenseDescription}>
              The gambling platform operates on the basis of two licenses
              simultaneously, which indicates its increased reliability. Permits
              were issued by proven and prestigious jurisdictions - Gibraltar
              and the UK. Find the details of the license and their validity
              period on the official website of the casino.
            </p>
          </div>
          <div className={styles.licenseColumn}>
            <Image
              className={styles.licenseImage}
              src={licensePic}
              alt={"Coral Casino UK License"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
