import Image from "next/image";
import notePic from "../../../../public/images/MacBook-Pro.webp";
import styles from "./history.module.css";

export default function History() {
  return (
    <section className={styles.history}>
      <div className={`${styles.historyBlock} block`}>
        <h1 className={`${styles.historyTitle} title`}>Crown Casino Online</h1>
        <div className={styles.historyGroup}>
          <div className={styles.historyColumn}>
            <ul className={styles.historyList}>
              <li className={styles.historyItem}>
                Crown Casino mobile version
              </li>
              <li className={styles.historyItem}>fast payouts</li>
              <li className={styles.historyItem}>24/7 support</li>
            </ul>
          </div>
          <div className={styles.historyColumn}>
            <Image
              className={styles.historyImage}
              src={notePic}
              alt={"Crown Casino Melbourne Online Desktop"}
            />
          </div>
        </div>
        <p className={styles.historyDescription}>
          Established in 1994, Crown Casino online has cemented its position as
          one of the premier gambling and entertainment destinations in
          Melbourne, Australia. Sprawling over a large area, the casino boasts
          an exceptional array of gaming options, luxury accommodations, and
          diverse Crown Casino restaurants. Also, one of the most impressive
          things about Crown Casino is its user-friendly interface. The casino
          is easy to navigate, and users can quickly find the games they want.
          Additionally, the website is upgraded for mobile devices, making it
          easy for users to access the casino from their smartphones or tablets.
          One of the most attractive features of Crown Casino is its bonuses and
          promotions. New users can take advantage of generous bonuses on their
          first deposit up to a certain amount.
        </p>
      </div>
    </section>
  );
}
