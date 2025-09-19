"use client";

import {
  useGetRootDataQuery,
  useGetProvidersDataQuery,
} from "@/app/redux/slice/api";
import { IProvider } from "@/app/utils/interfaces";
import Image from "next/image";
import Link from "next/link";
import styles from "./providers.module.css";

export default function Providers() {
  const { data: siteData } = useGetRootDataQuery("");
  const { data: providerImages } = useGetProvidersDataQuery("");

  return (
    <section className={styles.providers}>
      <div className={`${styles.providersBlock} block`}>
        <h2 className={`${styles.providersTitle} title`}>
          <span>Software providers</span>
        </h2>
        <div className={styles.providersGroup}>
          {providerImages &&
            providerImages.map((item: IProvider) => (
              <Link
                className={styles.providersLink}
                href={siteData ? `/casino/${siteData.offers[0].id}` : "/"}
                key={item.id}
                aria-label="Play game"
                target="_blank"
              >
                <span className={styles.providersContainer} key={item.id}>
                  <Image
                    className={styles.providersImage}
                    src={`https://api.adkey-seo.com/storage/images/providers/${item.image}`}
                    alt={item.name}
                    width={106}
                    height={47}
                  />
                </span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
