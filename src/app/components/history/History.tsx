import Image from "next/image";
import notePic from "../../../../public/images/MacBook-Pro.webp";
import styles from "./history.module.css";

export default function History() {
  return (
    <section className={styles.history}>
      <div className={`${styles.historyBlock} block`}>
        <h1 className={`${styles.historyTitle} title`}>Coral Casino</h1>
        <div className={styles.historyGroup}>
          <div className={styles.historyColumn}>
            <ul className={styles.historyList}>
              <li className={styles.historyItem}>A £50 welcome bonus</li>
              <li className={styles.historyItem}>24/7 support</li>
              <li className={styles.historyItem}>A huge collection of slots</li>
            </ul>
          </div>
          <div className={styles.historyColumn}>
            <Image
              className={styles.historyImage}
              src={notePic}
              alt={"Coral Casino UK Desktop"}
            />
          </div>
        </div>
        <p className={styles.historyDescription}>
          The Coral Casino platform has been operating since 2002 and is managed
          by LC International Limited. The operator has gained worldwide fame
          and operates 100% legally, allowing players to earn real money and
          have fun at the same time. The company&apos;s reputation among users
          is ambiguous, since both positive and negative reviews about its work
          can be found on the Internet. However, many players choose this
          company because of the generous payouts, variety of entertainment and
          availability of different versions. This review examines the pros,
          cons, and opportunities for users who decide to test the site.
        </p>
        <h2 className={`${styles.historyTitle} title`}>
          About Coral Island Casino
        </h2>
        <p className={styles.historyDescription}>
          Few operators have as long a history as Coral Casino UK. The company
          was originally founded in 1926. Over the years of its existence, the
          brand has gone through a number of mergers and expansions. It was
          originally the bookmaker Ladbrokes, which was later acquired by GVC
          Holdings. In 2002, the company first launched a website and an online
          version of the already popular online casino. Additionally, in 2020,
          GVC Holdings rebranded as Entine Group, of which Coral Online Casino
          is a part. The casino is operated by ElectraWorks Limited and is
          licensed by the Gibraltar Gambling Commission and the UK Gambling
          Commission. In addition to the gambling business, Coral Casino also
          deals in sports betting and online poker. The casino caters to players
          from the UK and Ireland and has a mobile version of its website and
          app.
        </p>
        <p className={styles.historyDescription}>
          When you open the Casino Coral website, the first thing that catches
          your eye is its elegant, user-friendly design. The site is designed in
          such a way that it is surprisingly easy to navigate, even for those
          who are new to online gambling platforms. There are no annoying
          pop-ups or flashy banners, just a clean design that lets the games
          speak for themselves. The design of the site is familiar. Blue
          background, white text, bright buttons and images. On the right are
          the login and registration buttons. Below is the main page and games,
          divided into categories by novelty, popularity, etc. Further below is
          a huge banner with regularly updated special offers.
        </p>
        <p className={styles.historyDescription}>
          Next are the types of games. To make it easier to find, the games are
          divided into different categories. First, there is a description of
          the TOP entertainment according to the players, followed by new games.
          Below are the largest jackpots and their exact amounts. What follows
          is a gradient of games that allows for simple and quick searches. In
          the “basement” of the site there is standard information about the
          Coral Casino Online, contact information, settings, membership and
          work program. There is also information about the privacy policy,
          methods of depositing and withdrawing funds and providers. Overall,
          these resources are clear and easy to access for beginners. However,
          it takes some time to get used to the interface and features.
        </p>
      </div>
    </section>
  );
}
