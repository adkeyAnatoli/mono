import React from 'react';
import style from './casinoInfoSection.module.css';
import Image from 'next/image';
import data from '@/app/data/dataCasinoInfo.json';
import { ContentItem } from '@/app/interfaces/dataInterface';
const dataNew = data as {
  title: string;
  content: ContentItem[];
  mainSections: {
    heading: string;
    content: ContentItem[];
  }[];
  lastSections: {
    heading: string;
    content: ContentItem[];
  }[];
};

const CasinoInfoSection = () => {
  const WIDTH_IMG = 665;
  const HEIGHT_IMG = 366;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

  return (
    <section className={`${style.section} redSectionSecond`}>
      <div className={`${style.wrapper} container`}>
        <h1 className="title-white">{data.title}</h1>
        <div className={style.firstBlock}>
          <div className={style.firstBlock_text}>
            {dataNew.content.map((item, idx) => {
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

        {dataNew['mainSections'].map((section, index) => (
          <div className={style.middleBlock} key={index}>
            <h3 className="title-white title-small">{section.heading}</h3>
            {section.content.map((item, idx) => {
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
          {dataNew['lastSections'].map((section, index) => (
            <div className={'lastBlockElement'} key={index}>
              <h3 className="title-white title-small">{section.heading}</h3>
              {section.content.map((item, idx) => {
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
