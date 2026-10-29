'use client';

import React from 'react';
import styles from './casinoIntroSection.module.css';
import data from '@/app/data/dataCasinoIntro.json';
import { ContentItem, ContentSection } from '@/app/interfaces/dataInterface';
import { ContentItems } from '@/app/components/ui/ContentItems';
import { plainContentText } from '@/app/utils/plainContentText';

const dataNew = data as {
  title: string;
  image: { src: string; alt: string };
  highlights: string[];
  content: ContentItem[];
  whoWeAre: ContentSection;
};

const CasinoIntroSection = () => {
  const title = plainContentText(dataNew.title);

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>{title}</h2>

        {dataNew.highlights.length > 0 ? (
          <ul className={styles.highlights}>
            {dataNew.highlights.map((t) => (
              <li key={t} className="text">
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        {dataNew.content.length > 0 ? (
          <div className={styles.content}>
            <ContentItems items={dataNew.content} />
          </div>
        ) : null}

        {dataNew.whoWeAre.content.length > 0 ? (
          <div className={styles.whoWeAre}>
            <h3 className={styles.whoWeAreTitle}>
              {plainContentText(dataNew.whoWeAre.heading)}
            </h3>
            <div className={styles.content}>
              <ContentItems items={dataNew.whoWeAre.content} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CasinoIntroSection;
