import React from 'react';
import style from './casinoInfoSection.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ContentItem } from '@/src/app/interfaces/dataInterface';

interface SectionData {
  heading: string;
  content: ContentItem[];
}

const CasinoInfoSection = () => {
  const WIDTH_IMG = 684;
  const HEIGHT_IMG = 409;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  
  const t = useTranslations('casinoInfo');
  
  const data = {
    title: t('title'),
    content: t.raw('content'),
    mainSections: t.raw('mainSections'),
    lastSections: t.raw('lastSections')
  };

  return (
    <section className={`${style.section} redSectionSecond`}>
      <div className={`${style.wrapper} container`}>
        <h1 className="title-white">{data.title}</h1>
        <div className={style.firstBlock}>
          <div className={style.firstBlock_text}>
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

        {data.mainSections.map((section: SectionData, index: number) => (
          <div className={style.middleBlock} key={index}>
            <h3 className="title-white title-small">{section.heading}</h3>
            {section.content.map((item: ContentItem, idx: number) => {
              if (item.type === 'paragraph') {
                return (
                  <p className="text" key={idx}>
                    {item.text}
                  </p>
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
              } else {
                return null;
              }
            })}
          </div>
        ))}
        <div className={`lastBlock gap-64`}>
          {data.lastSections.map((section: SectionData, index: number) => (
            <div className={'lastBlockElement'} key={index}>
              <h3 className="title-white title-small">{section.heading}</h3>
              {section.content.map((item: ContentItem, idx: number) => {
                if (item.type === 'paragraph') {
                  return (
                    <p className="text" key={idx}>
                      {item.text}
                    </p>
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
                } else {
                  return null;
                }
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasinoInfoSection;
