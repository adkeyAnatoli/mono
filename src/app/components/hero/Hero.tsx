"use client";

import { useGetRootDataQuery } from "@/app/redux/slice/api";
import Link from "next/link";
import styles from "./hero.module.css";

export default function Hero() {
  const { data: siteData } = useGetRootDataQuery("");

  return (
    <section className={styles.hero}>
      <div className={`${styles.heroBlock} block`}>
        <div className={styles.heroGroup}>
          <div className={styles.heroTitle}>
            <span>Welcome</span> Bonus
          </div>
          <p className={styles.heroText}>Exclusive welcome offer of</p>
          <p className={styles.heroText}>
            {siteData ? siteData.offers[0].bonuses.welcome_bonus : ""}
          </p>
        </div>
        <Link
          href={siteData ? `/casino/${siteData.offers[0].id}` : "/"}
          aria-label="Play game"
        >
          <span className={`${styles.heroButton} btn btn--large`}>
            Claim Bonus
          </span>
        </Link>
      </div>
    </section>
  );
}
