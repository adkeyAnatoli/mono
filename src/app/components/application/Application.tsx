"use client";

import { useGetRootDataQuery } from "@/app/redux/slice/api";
import Image from "next/image";
import appStorePic from "../../../../public/images/advantages/app-store.webp";
import googlePlayPic from "../../../../public/images/advantages/google-play.webp";
import mobilePic from "../../../../public/images/mobile-app.webp";
import Link from "next/link";
import styles from "./application.module.css";

export default function Application() {
  const { data: siteData } = useGetRootDataQuery("");

  return (
    <section className={styles.application} id="mobile">
      <div className={`${styles.applicationBlock} block`}>
        <div className={styles.applicationGroup}>
          <div className={styles.applicationColumn}>
            <h2 className={`${styles.applicationTitle} title`}>
              <span>Coral Casino Sister Sites Apps</span>
            </h2>
            <p className={styles.applicationDescription}>
              A special version has been developed for owners of portable
              devices who want to play without being tied to a stationary place.
              To open the mobile version, you need to log into the browser of
              your smartphone, iPhone, tablet or iPad and enter the name or
              address of the site, and then log in to it. The mobile application
              is also available for Android users. You need to download and
              install it, but later you can play regardless of network speed. On
              the Internet you can find many offers for downloading and
              installing software, but you should only follow links from trusted
              sources, because scammers may work on other sites. The mobile
              version is not inferior in functionality to the computer version
              and also allows players to have access to entertainment anywhere
              and at any time. It&apos;s incredibly convenient.
            </p>
            <div className={styles.applicationStoreGroup}>
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
                  className={styles.applicationStore}
                  width={181}
                  height={54}
                  src={googlePlayPic}
                  alt={"android App"}
                />
              </Link>
            </div>
          </div>
          <div className={styles.applicationColumn}>
            <Image
              className={styles.applicationMobilePhone}
              src={mobilePic}
              alt={"Coral Casino UK Mobile"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
