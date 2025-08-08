import React from 'react';
import style from './supportSection.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ContentItem } from '@/src/app/interfaces/dataInterface';

const SupportSection = () => {
  const WIDTH_IMG = 597;
  const HEIGHT_IMG = 320;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  
  const t = useTranslations('supportSection');
  
  const data = {
    title: t('title'),
    content: t.raw('content')
  };

  return (
    <section className={style.section}>
      <div className={`${style.wrapper} container`}>
        <div className={style.leftBlock}>
          <h2 className="title-black">{data.title}</h2>
          <div className={style.textBlock}>
            {data.content.map((item: ContentItem, idx: number) => {
              if (item.type === 'paragraph') {
                return (
                  <p className="text" key={idx}>
                    {item.text}
                  </p>
                );
              } else if (item.type === 'list-dotted') {
                return (
                  <ul key={idx}>
                    {item.items!.map((listItem, liIndex) => (
                      <li className="text" key={liIndex}>
                        {listItem}
                      </li>
                    ))}
                  </ul>
                );
              } else if (item.type === 'list-number') {
                return (
                  <ol key={idx}>
                    {item.items!.map((listItem, liIndex) => (
                      <li className="text" key={liIndex}>
                        {listItem}
                      </li>
                    ))}
                  </ol>
                );
              } else {
                return null;
              }
            })}
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
    </section>
  );
};

export default SupportSection;
