import styles from "./deposit.module.css";

export default function Deposit() {
  return (
    <section className={styles.deposit}>
      <div className={`${styles.depositBlock} block`}>
        <h2 className={`${styles.depositTitle} title`}>
          Deposit Methods at Crown Casino Lobby
        </h2>
        <div className={styles.depositGroup}>
          <p className={styles.depositDescription}>
            Crown Casino offers a comprehensive array of deposit methods to
            accommodate the varied preferences and needs of its players. From
            traditional means Visa and MasterCard to modern e-wallets like
            Neteller or PayPal and bank transfers, each option is designed to
            provide convenience and security. The casino understands the
            importance of having accessible, efficient, and secure deposit
            methods, as this directly affects the player’s experience and trust
            in the establishment. Deposits at Crown Casino are processed through
            secure channels that ensure the safety of transactional data. The
            casino employs advanced encryption technologies to safeguard all
            financial transactions, protecting players from potential fraud and
            identity theft. This level of security is vital in maintaining the
            confidence of players and is a cornerstone of Crown Casino’s
            financial dealings.
          </p>
        </div>
      </div>
    </section>
  );
}
