import styles from "./deposit.module.css";

export default function Deposit() {
  return (
    <section className={styles.deposit}>
      <div className={`${styles.depositBlock} block`}>
        <h2 className={`${styles.depositTitle} title`}>
          Coral Casino Offer Deposit Methods
        </h2>
        <div className={styles.depositGroup}>
          <p className={styles.depositDescription}>
            Coral Casino offers its players a wide range of deposit and
            withdrawal options, making it easy to manage your wallet with a wide
            variety of banking options. As with many other major online casinos,
            standard deposit and withdrawal methods at Coral Casino games
            include VISA, Maestro, MasterCard, Apple Pay, Google Pay, PayPal and
            Paysafecard. For debit cards, the most popular transaction method on
            the Coral Casino website, deposits occur immediately. There are no
            commissions for deposits at the casino. The minimum deposit is £5.
          </p>
        </div>
      </div>
    </section>
  );
}
