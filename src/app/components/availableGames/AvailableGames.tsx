import styles from "./availableGames.module.css";

export default function AvailableGames() {
  return (
    <section className={styles.availableGames}>
      <div className={`${styles.availableGamesBlock} block`}>
        <h2 className={`${styles.availableGamesTitle} title`}>
          Games Available to Play at Perth Crown Casino
        </h2>
        <div className={styles.availableGamesGroup}>
          <p className={styles.availableGamesDescription}>
            Crown Casino online offers a broad scope of games that cater to
            different gaming preferences. Whether you prefer classic Crown
            Casino online pokies, modern video slots, table games, or specialty
            games, there is something for everyone at Crown Casino. Here are
            some of the games available on this service:
          </p>
          <div className={`${styles.availableGamesSubtitle} subtitle`}>
            Slots
          </div>
          <p className={styles.availableGamesDescription}>
            The slot machine section at Crown Casino Melbourne is among the
            largest and most diverse, featuring over 2,500 machines. These
            include traditional reel slots, the latest video slots, and
            progressive jackpot machines offering potentially life-changing
            payouts. Each slot machine is equipped with cutting-edge technology
            that delivers rich graphics, engaging themes, and interactive bonus
            rounds. Players can choose from a variety of denominations, allowing
            for both low-stakes enjoyment and high-stakes thrill.
          </p>
          <div className={`${styles.availableGamesSubtitle} subtitle`}>
            Table Games: Crown Casino Poker
          </div>
          <p className={styles.availableGamesDescription}>
            For those who prefer the tactile excitement of table games, Crown
            offers a wide selection. Classic games like blackjack, roulette, and
            craps are available alongside various poker derivatives and exotic
            games such as baccarat, pai gow, and sic bo. The table limits vary,
            accommodating budget players and high rollers alike. Each game is
            conducted by professional dealers who not only ensure that the games
            run smoothly but also add to the excitement and social interaction
            that make table gaming a favorite among casino goers.
          </p>
          <div className={`${styles.availableGamesSubtitle} subtitle`}>
            Live Dealer Games
          </div>
          <p className={styles.availableGamesDescription}>
            Live dealer games represent the pinnacle of online gambling
            technology at Crown Sydney Casino, offering players the opportunity
            to engage in real-time gaming with professional dealers via video
            link. Games available include blackjack, roulette, baccarat, and
            several poker variants. This setup mimics the in-person casino
            experience, providing the excitement of live gameplay without
            leaving one’s home. The interactive aspect, coupled with the ability
            to chat with the dealers and other players, creates an engaging and
            immersive experience that bridges the gap between online and
            physical gaming.
          </p>
          <div className={`${styles.availableGamesSubtitle} subtitle`}>
            Progressives Slots
          </div>
          <p className={styles.availableGamesDescription}>
            Crown Casino Perth also offers a selection of progressive slots,
            which offer the chance to win a massive jackpot with a single spin.
            Some popular titles include Aztec&apos;s Millions, Megasaur, and
            Spirit of the Inca. These games feature a constantly growing
            jackpot, which can be triggered randomly or by hitting a specific
            combination of symbols.
          </p>
        </div>
      </div>
    </section>
  );
}
