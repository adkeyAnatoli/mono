import styles from "./idioms.module.css";

export default function Idioms() {
  return (
    <section className={styles.idiomas}>
      <div className={`${styles.idiomasBlock} block`}>
        <div className={styles.idiomasGroup}>
          <div className={styles.idiomasColumn}>
            <h2 className={`${styles.idiomasTitle} title`}>Languages</h2>
            <p className={styles.idiomasDescription}>
              Crown Casino primarily operates in English, and the service
              presents games and client support in English. However, the website
              and mobile service may support other languages in terms of the
              website and mobile optimization, depending on the user&apos;s
              location and device settings. It&apos;s important to note that
              game titles and client support may not be available in all
              languages, and users are advised to check the website or contact
              client support to see if the service keeps their preferred
              language.
            </p>
          </div>
          <div className={styles.idiomasColumn}>
            <h2 className={`${styles.idiomasTitle} title`}>Currencies</h2>
            <p className={styles.idiomasDescription}>
              Crown Casino accepts a variety of currencies to accommodate its
              international clientele, including EUR, USD, and CAD. This
              flexibility allows players from different regions to transact in
              their local or preferred currency, simplifying the deposit and
              withdrawal process. It also helps in avoiding exchange rate fees,
              which can be costly and inconvenient for players. The ability to
              transact in multiple currencies is a significant advantage for an
              international casino like Crown. It not only facilitates easier
              and more efficient financial transactions but also enhances the
              overall customer experience. Players appreciate the convenience of
              using their currency, as it makes budgeting and tracking their
              spending easier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
