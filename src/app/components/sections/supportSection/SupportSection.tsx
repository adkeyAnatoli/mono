import React from 'react';
import style from './supportSection.module.css';
import Image from 'next/image';
import data from '@/app/data/dataSupport.json';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { ContentItems } from '@/app/components/ui/ContentItems';
import { plainContentText } from '@/app/utils/plainContentText';

const newData = data as {
  title: string;
  content: ContentItem[];
};

const SupportSection = () => {
  const WIDTH_IMG = 509;
  const HEIGHT_IMG = 426;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

  const splitIdx = newData.content.findIndex((item) => item.type === 'heading');
  const beforeHeading =
    splitIdx >= 0 ? newData.content.slice(0, splitIdx) : newData.content;
  const fromHeading = splitIdx >= 0 ? newData.content.slice(splitIdx) : [];

  return (
    <section className={style.section}>
      <div className={`${style.wrapper} container`}>
        <div className={style.leftBlock}>
          <h2 className="title-black">{plainContentText(data.title)}</h2>
          <div className={style.textBlock}>
            <ContentItems
              items={beforeHeading}
              inlineHeadingClassName="title-black title-small"
            />
          </div>
        </div>
        <div className={style.rightBlock}>
          <Image
            src="/sectionImg/slot5.webp"
            width={WIDTH_IMG}
            height={HEIGHT_IMG}
            alt={`${siteName} Support`}
            title={`${siteName} Support`}
          />
        </div>
      </div>
      {fromHeading.length > 0 && (
        <div className={`${style.fullBlock} container`}>
          <div className={style.textBlock}>
            <ContentItems
              items={fromHeading}
              inlineHeadingClassName="title-black title-small"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SupportSection;
