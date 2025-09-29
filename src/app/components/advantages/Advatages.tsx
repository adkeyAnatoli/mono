"use client";

import { useGetRootDataQuery } from "@/app/redux/slice/api";
import Image from "next/image";
import starPic from "../../../../public/images/advantages/star.svg";
import appStorePic from "../../../../public/images/advantages/app-store.webp";
import googlePlayPic from "../../../../public/images/advantages/google-play.webp";
import mobilePic from "../../../../public/images/advantages/mobile.webp";
import styles from "./advantages.module.css";
import Link from "next/link";

export default function Advantages() {
  const { data: siteData } = useGetRootDataQuery("");

  return (
    <section className={styles.advantages}>
      <div className={`${styles.advantagesBlock} block`}>
        <div className={styles.advantagesDescription}>
          <div className={`${styles.advantagesTitle} title`}>Advantages:</div>
          <ul className={styles.advantagesList}>
            <li className={styles.advantagesItem}>
              <Image
                className={styles.advantagesStar}
                width={30}
                height={29}
                src={starPic}
                alt={"Casino advantages item"}
              />
              <p className={styles.advantagesText}>Extensive Game Selection</p>
            </li>
            <li className={styles.advantagesItem}>
              <Image
                className={styles.advantagesStar}
                width={30}
                height={29}
                src={starPic}
                alt={"Casino advantages item"}
              />
              <p className={styles.advantagesText}>
                Luxury Crown Casino accommodation
              </p>
            </li>
            <li className={styles.advantagesItem}>
              <Image
                className={styles.advantagesStar}
                width={30}
                height={29}
                src={starPic}
                alt={"Casino advantages item"}
              />
              <p className={styles.advantagesText}>Advanced Security</p>
            </li>
            <li className={styles.advantagesItem}>
              <Image
                className={styles.advantagesStar}
                width={30}
                height={29}
                src={starPic}
                alt={"Casino advantages item"}
              />
              <p className={styles.advantagesText}>
                Richness Crown Casino restaurants Sydney
              </p>
            </li>
            <li className={styles.advantagesItem}>
              <Image
                className={styles.advantagesStar}
                width={30}
                height={29}
                src={starPic}
                alt={"Casino advantages item"}
              />
              <p className={styles.advantagesText}>Promotional Offers</p>
            </li>
            <li className={styles.advantagesItem}>
              <Image
                className={styles.advantagesStar}
                width={30}
                height={29}
                src={starPic}
                alt={"Casino advantages item"}
              />
              <p className={styles.advantagesText}>Mobile Compatibility</p>
            </li>
            <li className={styles.advantagesItem}>
              <Image
                className={styles.advantagesStar}
                width={30}
                height={29}
                src={starPic}
                alt={"Casino advantages item"}
              />
              <p className={styles.advantagesText}>
                Reputation and Reliability
              </p>
            </li>
            <li className={styles.advantagesItem}>
              <Image
                className={styles.advantagesStar}
                width={30}
                height={29}
                src={starPic}
                alt={"Casino advantages item"}
              />
              <p className={styles.advantagesText}>
                Excellent customer service
              </p>
            </li>
          </ul>
          <Link
            className={styles.advantagesLink}
            href={siteData ? `/casino/${siteData.offers[0].id}` : "/"}
            aria-label="Play game"
          >
            <span className={`${styles.advantagesButton} btn btn--large`}>
              Know more
            </span>
          </Link>
        </div>
        <div className={styles.advantagesMobile}>
          <div className={`${styles.advantagesTitle} title`}>
            Crown Casino APP
          </div>
          <Image
            className={styles.advantagesMobilePhone}
            src={mobilePic}
            alt={"Crown Casino Melbourne Online Mobile"}
          />
          <div className={styles.advantagesStoreGroup}>
            <Link
              href={siteData ? `/casino/${siteData.offers[0].id}` : "/"}
              aria-label="Play game"
              target="_blank"
            >
              <Image
                className={styles.advantagesStore}
                width={181}
                height={53}
                src={appStorePic}
                alt={"iOs App"}
              />
            </Link>
            <Link
              href={siteData ? `/casino/${siteData.offers[0].id}` : "/"}
              aria-label="Play game"
              target="_blank"
            >
              <Image
                className={styles.advantagesStore}
                width={181}
                height={54}
                src={googlePlayPic}
                alt={"android App"}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
