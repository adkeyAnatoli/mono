import styles from "./prosAndCons.module.css";

export default function ProsAndCons() {
  return (
    <section className={styles.prosAndCons}>
      <div className={`${styles.prosAndConsBlock} block`}>
        <h2 className={`${styles.prosAndConsTitle} title`}>
          Crown Сasino Advantages
        </h2>
        <div className={styles.prosAndConsGroup}>
          <p className={styles.prosAndConsDescription}>
            Crown Casino Sydney is an online casino service that offers a broad
            scope of games and promos to users worldwide. Established in 1994,
            Crown Casino has quickly gained popularity among users thanks to its
            easy-to-use platform, fast payouts, and excellent customer service.
          </p>
          <div className={`${styles.prosAndConsSubtitle} subtitle`}>
            Advantages
          </div>
          <ol className={styles.prosAndConsList}>
            <li className={styles.prosAndConsItem}>Extensive Game Selection</li>
            <li className={styles.prosAndConsItem}>
              Luxury Crown Casino accommodation
            </li>
            <li className={styles.prosAndConsItem}>Advanced Security</li>
            <li className={styles.prosAndConsItem}>
              Richness Crown Casino restaurants Sydney
            </li>
            <li className={styles.prosAndConsItem}>Promotional Offers</li>
            <li className={styles.prosAndConsItem}>Mobile Compatibility</li>
            <li className={styles.prosAndConsItem}>
              Reputation and Reliability
            </li>
            <li className={styles.prosAndConsItem}>
              Excellent customer service
            </li>
          </ol>
          <div className={`${styles.prosAndConsSubtitle} subtitle`}>
            Disadvantages:
          </div>
          <ol className={styles.prosAndConsList}>
            <li className={styles.prosAndConsItem}>Country Restrictions</li>
            <li className={styles.prosAndConsItem}>Limited Banking Options</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
