"use client";

import { useGetRootDataQuery } from "@/app/redux/slice/api";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./topCasino.module.css";

export default function TopCasino() {
  const { data: siteData } = useGetRootDataQuery("");
  const [showAllCards, setShowAllCards] = useState(false);

  const handleShowCards = () => {
    setShowAllCards(true);
  };

  return (
    <section className={styles.topCasino}>
      <div className={`${styles.topCasinoBlock} block`}>
        <div className={`${styles.topCasinoTitle} title`}>
          <span>Top Casinos {siteData && siteData.website.country_name}</span>
        </div>
        <div className={styles.topCasinoGroup}>
          {siteData &&
            siteData.offers.slice(0, 8).map((card) => (
              <div className={styles.casinoCard} key={card.id}>
                <Image
                  className={styles.cardImage}
                  width={180}
                  height={72}
                  src={`https://api.adkey-seo.com/storage/images/offers/${card.logo}`}
                  alt={card.name}
                />
                <p className={styles.cardName}>{card.name}</p>
                <p className={styles.cardWelcome}>Welcome bonus</p>
                <p className={styles.cardBonus}>{card.bonuses.welcome_bonus}</p>
                <Link
                  className={`${styles.cardButton}`}
                  href={`/casino/${card.id}`}
                  aria-label="Play game"
                >
                  <span className={`btn btn--medium`}>Claim Bonus</span>
                </Link>
              </div>
            ))}
          {siteData &&
            showAllCards &&
            siteData.offers.slice(8).map((card) => (
              <div className={styles.casinoCard} key={card.id}>
                <Image
                  className={styles.cardImage}
                  width={191}
                  height={63}
                  src={`https://api.adkey-seo.com/storage/images/offers/${card.logo}`}
                  alt={card.name}
                />
                <p className={styles.cardName}>{card.name}</p>
                <p className={styles.cardWelcome}>Welcome bonus</p>
                <p className={styles.cardBonus}>{card.bonuses.welcome_bonus}</p>

                <Link
                  className={`${styles.cardButton}`}
                  href={`/casino/${card.id}`}
                  aria-label="Play game"
                >
                  <span className={`btn btn--medium`}>Claim Bonus</span>
                </Link>
              </div>
            ))}
        </div>
        {!showAllCards && (
          <button
            className={`${styles.topCasinoButton} btn btn--large`}
            onClick={handleShowCards}
          >
            All casino
          </button>
        )}
      </div>
    </section>
  );
}
