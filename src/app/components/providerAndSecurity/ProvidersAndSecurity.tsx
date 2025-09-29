import styles from "./providersAndSecurity.module.css";

export default function ProvidersAndSecurity() {
  return (
    <section className={styles.providers}>
      <div className={`${styles.providersBlock} block`}>
        <div className={styles.providersGroup}>
          <div className={styles.providersColumn}>
            <h2 className={`${styles.providersTitle} title`}>
              Crown Casino Logo and Software Technologies
            </h2>
            <p className={styles.providersDescription}>
              Crown Casino uses Real Time Gaming (RTG) software to power its
              gambling service. RTG is a well-known software developer in the
              online gaming industry, presenting a broad scope of games known
              for their high-quality graphics and sound effects. RTG is also
              known for its security features, ensuring users&apos; private and
              financial data is kept safe. Crown Casino uses Random Number
              Generators (RNGs) to ensure that the outcomes of the games are
              fair and random. RNGs are a critical component of online gaming,
              ensuring that the results of the games are not rigged and that
              users have a fair chance of winning. Moreover, Crown Casino uses
              SSL encryption technology to protect users&apos; private and
              financial data. SSL encryption is a standard security feature used
              by iGaming services, ensuring that users&apos; data is encrypted
              and cannot be accessed by unauthorized parties.
            </p>
          </div>
          <div className={styles.providersColumn}>
            <h2 className={`${styles.providersTitle} title`}>
              Security at Sydney Casino Crown
            </h2>
            <p className={styles.providersDescription}>
              Security is a top priority at Melbourne Crown Casino, and the
              service uses a plethora of measures to ensure that users&apos;
              private and financial data is kept safe. Crown Casino uses SSL
              encryption to protect users&apos; private and financial data. SSL
              encryption is a standard security feature used by iGaming
              services, ensuring that users&apos; data is encrypted and cannot
              be accessed by unauthorized parties. Moreover, Crown Casino has a
              comprehensive privacy policy that outlines how users&apos; private
              and financial data is collected, used, and protected. The privacy
              policy is easily accessible on the service and designed to be
              transparent and easily understood. Crown Casino is committed to
              promoting reliable playing, and the service offers a plethora of
              tools and resources to help users stay in control of their gaming
              habits. These tools include self-exclusion options, deposit
              limits, and reliable playing guides.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
