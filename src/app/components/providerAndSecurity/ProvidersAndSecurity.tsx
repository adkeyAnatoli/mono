import styles from "./providersAndSecurity.module.css";

export default function ProvidersAndSecurity() {
  return (
    <section className={styles.providers}>
      <div className={`${styles.providersBlock} block`}>
        <div className={styles.providersGroup}>
          <div className={styles.providersColumn}>
            <h2 className={`${styles.providersTitle} title`}>
              Coral Casino Software Technologies
            </h2>
            <p className={styles.providersDescription}>
              The site cooperates exclusively with trusted providers. The game
              lobby features entertainment from Playtech, NetEnt, OpenBet,
              VirtueFusion, etc. The catalog is regularly updated and updated
              with interesting new products. The casino’s collaboration with
              leading developers adds credibility to the casino and makes it
              even more popular.
            </p>
          </div>
          <div className={styles.providersColumn}>
            <h2 className={`${styles.providersTitle} title`}>
              Coral Casino Promotions Security
            </h2>
            <p className={styles.providersDescription}>
              Security is one of the key factors in choosing a casino. One might
              even say that it is the most important. Users&apos; personal and
              payment information is protected using a 128-bit SSL encryption
              protocol. The casino is regularly accredited by independent
              auditors. In addition, the casino has some restrictions. The
              platform accepts players from a limited list of countries. These
              include Argentina, Croatia, Gibraltar, as well as Belarus, Great
              Britain, San Marino, Slovenia, etc. The site is available
              exclusively in English.
            </p>
            <p className={styles.providersDescription}>
              The choice of currencies is insignificant, there is only the euro,
              pound sterling, and US dollar. You can contact the technical
              support service via live chat, phone number and email address. In
              addition, the casino follows a responsible gaming policy. There
              are restrictions on withdrawals from the casino. The maximum limit
              is $50,000 or $100,000, depending on the specific method.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
