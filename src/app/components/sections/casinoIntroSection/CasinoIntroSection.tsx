'use client';

import React from 'react';
import Image from 'next/image';
import styles from './casinoIntroSection.module.css';
import data from '@/app/data/dataCasinoIntro.json';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { ContentItems } from '@/app/components/ui/ContentItems';
import { plainContentText } from '@/app/utils/plainContentText';

const dataNew = data as {
  title: string;
  image: { src: string; alt: string };
  highlights: string[];
  content: ContentItem[];
  whoWeAre: {
    heading: string;
    content: ContentItem[];
  };
};

const CasinoIntroSection = () => {
  const title = plainContentText(dataNew.title);

  return (
    <section className={`${styles.section} container`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        <div className={styles.imageWrap}>
          <Image
            className={styles.image}
            src={dataNew.image.src}
            width={559}
            height={606}
            alt={`${title} Desktop`}
            title={`${title} Desktop`}
            priority={false}
          />
        </div>

        <div className={styles.card}>
          {dataNew.highlights.length > 0 ? (
            <ul className={styles.highlights}>
              {dataNew.highlights.map((t) => (
                <li key={t} className="text">
                  {t}
                </li>
              ))}
            </ul>
          ) : null}

          <div className={styles.content}>
            <ContentItems items={dataNew.content} />
          </div>
        </div>
      </div>

      {dataNew.whoWeAre.content.length > 0 && (
        <div className={styles.fullCard}>
          <h3 className={styles.fullCardTitle}>
            {plainContentText(dataNew.whoWeAre.heading)}
          </h3>
          <div className={styles.content}>
            <ContentItems items={dataNew.whoWeAre.content} />
          </div>
        </div>
      )}
    </section>
  );
};

export default CasinoIntroSection;
