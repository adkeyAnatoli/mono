"use client";

import Image from "next/image";
import moreInfoPic from "../../../../public/images/bonuses/information-outline.svg";
import { IOffer } from "@/app/utils/interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./bonusDetail.module.css";
import Link from "next/link";

export default function BonusDetail() {
  const [siteData, setSiteData] = useState<IOffer[]>();

  useEffect(() => {
    fetch("https://api.adkey-seo.com/api/website/get-website/334", {
      cache: "force-cache",
    })
      .then((res) => res.json())
      .then((data) => {
        setSiteData(data.offers);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const shuffleArray = (array: IOffer[]) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const handleReset = () => {
    let shuffledData: IOffer[];
    if (siteData) {
      shuffledData = shuffleArray(siteData);
      setSiteData([...shuffledData]);
    }
  };

  return (
    <section className={styles.bonusDetails} id="bonuses">
      <div className={`${styles.bonusDetailsBlock} block`}>
        <div className={`${styles.bonusDetailsTitle} title`}>
          <span>Bonus details</span>
        </div>
        <div className={styles.bonusDetailsGroup}>
          <div className={styles.bonusTable}>
            <div
              className={`${styles.bonusTableRow} ${styles.bonusTableHeader}`}
            >
              <div className={styles.bonusTableHead}>Casino</div>
              <div className={styles.bonusTableHead}>Bonuses</div>
              <div className={styles.bonusTableHead}>Rate</div>
              <div className={styles.bonusTableHead}>Free spins</div>
              <div className={styles.bonusTableHead}>More info</div>
              <div className={styles.bonusTableHead}>Get</div>
            </div>
            {siteData &&
              siteData.slice(0, 6).map((item) => (
                <div className={styles.bonusTableRow} key={item.id}>
                  <div>
                    <Image
                      className={styles.bonusDetailsImage}
                      width={162}
                      height={65}
                      src={`https://api.adkey-seo.com/storage/images/offers/${item.logo}`}
                      alt={item.name}
                    />
                  </div>
                  <div>
                    <p
                      className={`${styles.bonusDetailsText} ${styles.bonusDetailsWelcome}`}
                    >
                      Welcome bonus
                    </p>
                  </div>
                  <div>
                    <p className={styles.bonusDetailsText}>
                      {item.bonuses.rate}
                    </p>
                  </div>
                  <div>
                    <p className={styles.bonusDetailsText}>
                      {item.bonuses.free_spins
                        ? `${item.bonuses.free_spins} FS`
                        : ""}
                    </p>
                  </div>
                  <div>
                    <input
                      className={styles.moreInfoInput}
                      type="checkbox"
                      id={item.id.toString()}
                    />
                    <label
                      className={styles.moreInfoLabel}
                      htmlFor={item.id.toString()}
                    >
                      <Image
                        className={styles.bonusDetailImage}
                        src={moreInfoPic}
                        alt={"Show more info"}
                      />
                    </label>
                  </div>
                  <div className={styles.claimBonus}>
                    <Link href={`/casino/${item.id}`} aria-label="Play game">
                      <span className={`${styles.bonusButton} btn btn--medium`}>
                        Get The Bonus
                      </span>
                    </Link>
                  </div>
                  <div className={`${styles.bonusDetailsInfo}`}>
                    <div className={`${styles.bonusDetailBlock}`}>
                      <p className={styles.bonusDetailsText}>Maximum amount</p>
                      <p className={styles.bonusDetailsContent}>
                        {item.bonuses.amount}
                      </p>
                    </div>
                    <div className={styles.bonusDetailBlock}>
                      <p className={styles.bonusDetailsText}>Wager</p>
                      <p className={styles.bonusDetailsContent}>{item.wager}</p>
                    </div>
                    <div className={styles.bonusDetailBlock}>
                      <p className={styles.bonusDetailsText}>Bonus Code</p>
                      <p className={styles.bonusDetailsContent}>
                        {item.bonus_code}
                      </p>
                    </div>
                    <div
                      className={`${styles.bonusDetailBlock} ${styles.bonusDetailBlockAdd}`}
                    >
                      <div className={styles.claimBonus}>
                        <Link
                          href={`/casino/${item.id}`}
                          aria-label="Play game"
                        >
                          <span
                            className={`${styles.bonusButton} btn btn--medium`}
                          >
                            Get The Bonus
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <button
          className={`${styles.bonusDetailsButton} btn btn--large`}
          onClick={handleReset}
        >
          Refresh
        </button>
      </div>
    </section>
  );
}
