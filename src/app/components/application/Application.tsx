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
              <span>Crown Casino App</span>
            </h2>
            <p className={styles.applicationDescription}>
              In today’s mobile-driven world, accessibility is key to staying
              competitive. Recognizing this, Crown Casino offers a mobile app
              that allows players to enjoy their favorite games on the go.
              Available for both Android and iOS devices, the Crown Casino
              mobile app can be downloaded directly from the casino’s website,
              ensuring that players always have the most current version. The
              Crown Casino app is designed with functionality and user
              experience in mind. It features a sleek, intuitive interface that
              mirrors the elegance and sophistication of the casino itself. The
              app’s performance is optimized for mobile devices, providing fast
              load times and smooth gameplay, which are crucial for maintaining
              the excitement and flow of casino games.
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
              alt={"Crown Casino Melbourne Online Mobile"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
