import styles from "./withdraw.module.css";

export default function Withdraw() {
  return (
    <section className={styles.withdraw}>
      <div className={`${styles.withdrawBlock} block`}>
        <h2 className={`${styles.withdrawTitle} title`}>
          Coral Casino Voucher Codes Withdrawal Methods
        </h2>
        <div className={styles.withdrawGroup}>
          <p className={styles.withdrawDescription}>
            The Coral login casino also offers a wide selection of payment
            systems for withdrawing money. Withdrawals can take anywhere from
            instant to 5 business days, depending on your payment method. The
            minimum withdrawal amount is also £5. Maximum withdrawal limits will
            be set for each player separately.
          </p>
        </div>
      </div>
    </section>
  );
}
