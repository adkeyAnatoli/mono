import styles from "./idioms.module.css";

export default function Idioms() {
  return (
    <section className={styles.idiomas}>
      <div className={`${styles.idiomasBlock} block`}>
        <div className={styles.idiomasGroup}>
          <div className={styles.idiomasColumn}>
            <h2 className={`${styles.idiomasTitle} title`}>
              Coral Casino Live Chat Languages
            </h2>
            <p className={styles.idiomasDescription}>
              The casino website is only available in English.
            </p>
          </div>
          <div className={styles.idiomasColumn}>
            <h2 className={`${styles.idiomasTitle} title`}>
              Coral Casino Mobile Currencies
            </h2>
            <p className={styles.idiomasDescription}>
              Players can conduct transactions in dollars, euros, and pounds
              sterling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
