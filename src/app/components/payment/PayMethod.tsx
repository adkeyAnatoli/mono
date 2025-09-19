"use client";

import {
  useGetPaymentsDataQuery,
  useGetRootDataQuery,
} from "@/app/redux/slice/api";
import Image from "next/image";
import { IPayment } from "@/app/utils/interfaces";
import Link from "next/link";
import styles from "./payMethod.module.css";

export default function PayMethod() {
  const { data: siteData } = useGetRootDataQuery("");
  const { data: payments } = useGetPaymentsDataQuery("");

  return (
    <section className={styles.payMethod}>
      <div className={`${styles.payMethodBlock} block`}>
        <h2 className={`${styles.payMethodTitle} title`}>Payment methods</h2>
        <div className={styles.payMethodGroup}>
          <div className={styles.payMethodRow}>
            <div className={styles.payMethodItem}>Method</div>
            <div
              className={`${styles.payMethodItem} ${styles.payMethodTypeHeader}`}
            >
              Type
            </div>
            <div className={styles.payMethodItem}>Country</div>
            <div className={styles.payMethodItem}>Commission</div>
            <div className={styles.payMethodItem}>Processing time</div>
            <div className={styles.payMethodItem}>Minimum deposit</div>
            <div className={styles.payMethodItem}>Deposit</div>
          </div>
          {payments &&
            payments.map((item: IPayment) => (
              <div className={styles.payMethodRow} key={item.payment_id}>
                <div
                  className={`${styles.payMethodItem} ${styles.payMethodItemImage}`}
                >
                  <Image
                    className={styles.PayMethodImage}
                    src={`https://api.adkey-seo.com/storage/images/payments/${item.image}`}
                    alt={item.name}
                    width={120}
                    height={70}
                  />
                </div>
                <div
                  className={`${styles.payMethodItem} ${styles.payMethodType}`}
                >
                  {item.type}
                </div>
                <div className={styles.payMethodItem}>{item.country}</div>
                <div className={styles.payMethodItem}>{item.commission}</div>
                <div className={styles.payMethodItem}>
                  {item.processing_time}
                </div>
                <div className={styles.payMethodItem}>{item.min_dep}</div>
                <div
                  className={`${styles.payMethodItem} ${styles.payMethodItemDeposit}`}
                >
                  <Link
                    href={siteData ? `/casino/${siteData.offers[0].id}` : "/"}
                    aria-label="Play game"
                  >
                    <span className={`${styles.bonusButton} btn btn--small`}>
                      Deposit
                    </span>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className={styles.payMethodGroupTwo}>
          {payments &&
            payments.map((item: IPayment) => (
              <div className={styles.payMethodRow} key={item.payment_id}>
                <div
                  className={`${styles.payMethodItem} ${styles.payMethodItemImage}`}
                >
                  <Image
                    className={styles.PayMethodImage}
                    src={`https://api.adkey-seo.com/storage/images/payments/${item.image}`}
                    alt={item.name}
                    width={120}
                    height={70}
                  />
                </div>
                <div className={styles.payMethodItem}>Type</div>
                <div className={styles.payMethodItem}>{item.type}</div>
                <div className={styles.payMethodItem}>Country</div>
                <div className={styles.payMethodItem}>{item.country}</div>
                <div className={styles.payMethodItem}>Commission</div>
                <div className={styles.payMethodItem}>{item.commission}</div>
                <div className={styles.payMethodItem}>Processing time</div>
                <div className={styles.payMethodItem}>
                  {item.processing_time}
                </div>
                <div className={styles.payMethodItem}>Minimum deposit</div>
                <div className={styles.payMethodItem}>{item.min_dep}</div>
                <div
                  className={`${styles.payMethodItem} ${styles.payMethodItemDeposit}`}
                >
                  <Link
                    href={siteData ? `/casino/${siteData.offers[0].id}` : "/"}
                    aria-label="Play game"
                  >
                    <span className={`${styles.bonusButton} btn btn--small`}>
                      Deposit
                    </span>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
