import styles from "./prosAndCons.module.css";

export default function ProsAndCons() {
  return (
    <section className={styles.prosAndCons}>
      <div className={`${styles.prosAndConsBlock} block`}>
        <h2 className={`${styles.prosAndConsTitle} title`}>
          Coral Casino Sign In Advantages
        </h2>
        <div className={styles.prosAndConsGroup}>
          <p className={styles.prosAndConsDescription}>
            Each casino has a number of advantages and disadvantages that set it
            apart from its competitors. The administration of the gambling
            platform strives to constantly improve the quality of services
            provided to you. Below, you can see the main strengths and
            weaknesses of the casino.
          </p>
          <div className={`${styles.prosAndConsSubtitle} subtitle`}>
            Coral Casino Tournaments Advantages:
          </div>
          <ul className={styles.prosAndConsList}>
            <li className={styles.prosAndConsItem}>Sports betting available</li>
            <li className={styles.prosAndConsItem}>Wide selection of games</li>
            <li className={styles.prosAndConsItem}>Profitable bonus offers</li>
            <li className={styles.prosAndConsItem}>Two licenses to operate</li>
          </ul>
          <div className={`${styles.prosAndConsSubtitle} subtitle`}>
            Coral Casino Review Disadvantages:
          </div>
          <ul className={styles.prosAndConsList}>
            <li className={styles.prosAndConsItem}>
              Available in English only
            </li>
            <li className={styles.prosAndConsItem}>
              Not all payment systems are available under the bonus program
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
