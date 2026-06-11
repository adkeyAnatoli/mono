'use client';

import React from 'react';
import style from './casinoInfoSection.module.css';
import layout from '../shared/sectionLayout.module.css';
import Image from 'next/image';
import casinoInfo from '@/src/app/data/dataCasinoInfo.json';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
import { ContentItems } from '@/src/app/components/ui/ContentItems';

const CasinoInfoSection = () => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const { title, subtitle, image, intro, aboutParagraphs } = casinoInfo as {
    title: string;
    subtitle: string;
    image: string;
    intro: ContentItem;
    aboutParagraphs: ContentItem[];
  };

  return (
    <section className={`${layout.section} ${style.section}`}>
      <div className={`${layout.wrapper} container`}>
        <h2 className={`title-black ${layout.sectionHeading}`}>{title}</h2>
        <div className={layout.blueWrap}>
          <div className={`${layout.imageTop} ${style.imageInWrap}`}>
            <Image
              src={image}
              width={992}
              height={374}
              alt={`${siteName} Desktop`}
              title={`${siteName} Desktop`}
            />
          </div>
          <div className={layout.intro}>
            <ContentItems items={[intro]} />
            <div className={layout.block}>
              <h3 className="title-black title-small">{subtitle}</h3>
              <ContentItems items={aboutParagraphs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasinoInfoSection;
