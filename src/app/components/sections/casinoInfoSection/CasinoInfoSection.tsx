'use client';
import React from 'react';
import style from './casinoInfoSection.module.css';
import Image from 'next/image';
import casinoInfo from '@/src/app/data/dataCasinoInfo.json';
import siteMeta from '@/src/app/data/siteMeta.json';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
import ContentBlockTable from '@/src/app/components/staticContent/ContentBlockTable';
import { plainContentText } from '@/src/app/utils/plainContentText';

function contentToNodes(items: ContentItem[]) {
  return items.map((item: ContentItem, idx: number) => {
    if (item.type === 'paragraph') {
      return (
        <p className="text" key={idx}>
          {item.text}
        </p>
      );
    }
    if (item.type === 'list-dotted') {
      return (
        <ul key={idx}>
          {item.items!.map((listItem, liIndex) => (
            <li className="text" key={liIndex}>
              {listItem}
            </li>
          ))}
        </ul>
      );
    }
    if (item.type === 'list-number') {
      return (
        <ol key={idx}>
          {item.items!.map((listItem, liIndex) => (
            <li className="text" key={liIndex}>
              {listItem}
            </li>
          ))}
        </ol>
      );
    }
    if (item.type === 'table') {
      return (
        <ContentBlockTable
          key={idx}
          headers={item.headers}
          rows={item.rows}
          variant={item.variant}
          bonusesMobileBg={item.bonusesMobileBg}
        />
      );
    }
    return null;
  });
}

const CasinoInfoSection = () => {
  const WIDTH_IMG = 404;
  const HEIGHT_IMG = 576;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

  const h1 = siteMeta.h1;
  const sectionTitle = plainContentText(h1.split(' - ')[0]?.trim() ?? h1);
  const { subtitle, intro, aboutParagraphs } = casinoInfo;

  return (
    <section className={style.section}>
      <div className={`${style.wrapper} container`}>
        <h2 className={`title-black ${style.sectionHeading}`}>
          {sectionTitle}
        </h2>
        <div className={style.surface}>
          <div className={style.firstBlock}>
            <div className={style.firstBlock_text}>
              {contentToNodes([intro as ContentItem])}
            </div>
            <div className={style.firstBlock_image}>
              <Image
                src="/sectionImg/slot3.webp"
                width={WIDTH_IMG}
                height={HEIGHT_IMG}
                alt={`${siteName} Desktop`}
                title={`${siteName} Desktop`}
              />
            </div>
          </div>
        </div>
        <div className={style.surface}>
          <div className={style.middleBlock}>
            <h3 className="title-black title-small">{subtitle}</h3>
            {contentToNodes(aboutParagraphs as ContentItem[])}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasinoInfoSection;
