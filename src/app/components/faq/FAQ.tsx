import styles from "./faq.module.css";

export default function FAQ() {
  return (
    <section className={styles.faq}>
      <div className={`${styles.faqBlock} block`}>
        <h2 className={`${styles.faqTitle} title`}>
          <span>CASINO FAQ</span>
        </h2>
        <div className={styles.faqGroup}>
          <input className={styles.faqInput} type="checkbox" id="title1" />
          <label className={styles.faqLabel} htmlFor="title1">
            What license does Coral Casino have?
          </label>
          <div className={styles.faqContent}>
            <p>
              The site has two license permits from the best jurisdictions in
              the world. These are Great Britain and Gibraltar.{" "}
            </p>
          </div>

          <input className={styles.faqInput} type="checkbox" id="title2" />
          <label className={styles.faqLabel} htmlFor="title2">
            Can I get a Coral 50 casino bonus?
          </label>
          <div className={styles.faqContent}>
            <p>
              Yes, £50 is available to every registered player. It is impossible
              to withdraw them and spend them on your own needs; wagering is
              required.{" "}
            </p>
          </div>

          <input className={styles.faqInput} type="checkbox" id="title3" />
          <label className={styles.faqLabel} htmlFor="title3">
            How to verify your account?
          </label>
          <div className={styles.faqContent}>
            <p>
              You must send the moderator a photo or scan of your ID, bank card
              and receipt for payment of housing and communal services.{" "}
            </p>
          </div>

          <input className={styles.faqInput} type="checkbox" id="title4" />
          <label className={styles.faqLabel} htmlFor="title4">
            What applications are there at Coral Casino?
          </label>
          <div className={styles.faqContent}>
            <p>
              Android owners can count on the ability to download and install a
              mobile application. The process takes no more than 2 minutes of
              time and allows you to play regardless of your fixed location and
              network speed.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
