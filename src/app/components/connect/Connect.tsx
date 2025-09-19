import styles from "./connect.module.css";

export default function Connect() {
  return (
    <section className={styles.connect} id="signin">
      <div className={`${styles.connectBlock} block`}>
        <h2 className={`${styles.connectTitle} title`}>Coral Casino Log In</h2>
        <div className={styles.connectGroup}>
          <p className={styles.connectDescription}>
            Getting started with Coral Live Casino couldn&apos;t be easier. But
            before you dive in, remember that playing responsibly is key. Set
            your limits and stick to them. Ready to get started? Great! Just go
            to the site, create your account, make a deposit, and you&apos;re
            good to go. Registering and verifying your account on Coral is as
            easy as shelling pears! All you need to do is follow the
            instructions below:
          </p>
          <ol className={styles.connectList}>
            <li className={styles.connectItem}>
              Click on the &ldquo;Registration&ldquo; button located in the
              upper-right corner of the main page.
            </li>
            <li className={styles.connectItem}>
              Then simply fill out basic information such as your name, email,
              and date of birth.
            </li>
            <li className={styles.connectItem}>
              Coral will then send you a verification link by email, which you
              just need to click on.
            </li>
          </ol>
          <p className={styles.connectDescription}>
            During the registration process, players also need to read the user
            agreement and accept all the rules of the gambling platform. Once
            you already have an account, you can log in. Logging into your
            account is a simple process. Simply click the Coral Casino login
            button in the upper-right corner of the home page. Enter your
            username and password and you&apos;re done. Forgot your password?
            Don&apos;t worry. There is a &ldquo;Forgot Password&ldquo; link that
            will help you.
          </p>
        </div>
      </div>
    </section>
  );
}
