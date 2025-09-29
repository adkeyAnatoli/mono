"use client";

import {
  useGetRootDataQuery,
  useGetGamesDataQuery,
} from "@/app/redux/slice/api";
import Image from "next/image";
import Link from "next/link";
import playPic from "../../../../public/images/games/playButton.svg";
import { IGame } from "@/app/utils/interfaces";
import styles from "./games.module.css";

export default function Games() {
  const { data: siteData } = useGetRootDataQuery("");
  const { data: gamesTop } = useGetGamesDataQuery("");

  return (
    <section className={styles.games} id="games">
      <div className={`${styles.gamesBlock} block`}>
        <h2 className={`${styles.gamesTitle} title`}>
          <span>Top Games</span>
        </h2>
        <div className={styles.gamesGroup}>
          {gamesTop &&
            gamesTop.map((game: IGame) => (
              <div className={styles.gameContainer} key={game.id}>
                <Link
                  href={siteData ? `/casino/${siteData.offers[0].id}` : "/"}
                  className={styles.gameLink}
                  aria-label="Game image"
                  target="_blank"
                >
                  <Image
                    className={styles.gameImage}
                    width={210}
                    height={117}
                    src={`https://api.adkey-seo.com/storage/images/games/${game.image}`}
                    alt={game.name}
                  />
                </Link>
                <Link
                  href={siteData ? `/casino/${siteData.offers[0].id}` : "/"}
                  aria-label="Play game"
                  target="_blank"
                >
                  <span className={styles.gameDescription}>
                    <span className={styles.gameTitle}>{game.name}</span>
                    <span className={styles.playBlock}>
                      <Image
                        className={styles.gamePlayButton}
                        width={33}
                        height={33}
                        src={playPic}
                        alt={"Play game button"}
                      />
                      <span className={styles.gamePlayText}>Play now</span>
                    </span>
                  </span>
                </Link>
              </div>
            ))}
        </div>
        <Link
          className={styles.gamesLink}
          href={siteData ? `/casino/${siteData.offers[0].id}` : "/"}
          aria-label="Play game"
        >
          <span className={`${styles.gamesButton} btn btn--large`}>
            All Games
          </span>
        </Link>
      </div>
    </section>
  );
}
