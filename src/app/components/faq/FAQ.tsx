import styles from "./faq.module.css";

export default function FAQ() {
  return (
    <section className={styles.faq}>
      <div className={`${styles.faqBlock} block`}>
        <h2 className={`${styles.faqTitle} title`}>
          <span>FAQ</span>
        </h2>
        <div className={styles.faqGroup}>
          <input className={styles.faqInput} type="checkbox" id="title1" />
          <label className={styles.faqLabel} htmlFor="title1">
            Is Crown Casino Sydney open?
          </label>
          <div className={styles.faqContent}>
            <p>
              Yes, Crown Casino Sydney is currently open. This modern addition
              to the Crown Casino family offers a luxurious blend of
              entertainment, dining, and gaming experiences tailored to fit its
              Sydney setting.{" "}
            </p>
          </div>

          <input className={styles.faqInput} type="checkbox" id="title2" />
          <label className={styles.faqLabel} htmlFor="title2">
            How can someone sign up and log in to the Crown Casino online
            platform?
          </label>
          <div className={styles.faqContent}>
            <p>
              Signing up for Crown Casino’s online platform is a simple process
              that involves visiting the casino&apos;s website and filling out a
              registration form with personal details such as name, email, and
              proof of age to ensure compliance with legal age requirements.{" "}
            </p>
          </div>

          <input className={styles.faqInput} type="checkbox" id="title3" />
          <label className={styles.faqLabel} htmlFor="title3">
            What are some of the advantages and disadvantages of playing at
            Crown Casino?
          </label>
          <div className={styles.faqContent}>
            <p>
              Crown Casino offers a luxurious gaming experience with a wide
              variety of games and high-quality Crown Casino restaurants
              Melbourne, which are its major advantages. The casino provides
              state-of-the-art security measures and a user-friendly website,
              enhancing the overall user experience.{" "}
            </p>
          </div>

          <input className={styles.faqInput} type="checkbox" id="title4" />
          <label className={styles.faqLabel} htmlFor="title4">
            What types of games are available at Crown Casino Online App?
          </label>
          <div className={styles.faqContent}>
            <p>
              At Crown Casino online app, users have access to a wide array of
              gaming options, including a vast selection of slot machines, a
              variety of table games like blackjack and roulette, specialty
              games such as bingo, and live dealer games.{" "}
            </p>
          </div>

          <input className={styles.faqInput} type="checkbox" id="title5" />
          <label className={styles.faqLabel} htmlFor="title5">
            What is Crown Casino opening hours?
          </label>
          <div className={styles.faqContent}>
            <p>
              Crown Casino is open 24 hours a day, seven days a week, including
              public holidays.{" "}
            </p>
          </div>

          <input className={styles.faqInput} type="checkbox" id="title6" />
          <label className={styles.faqLabel} htmlFor="title6">
            How can I join Crown Casino Membership?
          </label>
          <div className={styles.faqContent}>
            <p>
              To join, visitors can sign up at the Crown Rewards desk located
              within the casino. The process requires providing some personal
              information to verify identity and age, as membership is only
              available to those who meet the legal gambling age requirement.{" "}
            </p>
          </div>

          <input className={styles.faqInput} type="checkbox" id="title7" />
          <label className={styles.faqLabel} htmlFor="title7">
            What are the Crown Casino Parking Rates?
          </label>
          <div className={styles.faqContent}>
            <p>
              Crown Casino provides ample parking for visitors and members, with
              different rates applied depending on the day and duration of the
              stay.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
