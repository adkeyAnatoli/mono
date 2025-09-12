import React from 'react';
import style from './appSection.module.css';
import ImageLink from '../../images/ImageLink';
import Image from 'next/image';
import { IOffer } from '@/app/interfaces/mainInterfaces';
import data from '@/app/data/dataApp.json';
import { ContentItem } from '@/app/interfaces/dataInterface';

const dataNew = data as {
  title: string;
  content: ContentItem[];
  lastSections: {
    heading: string;
    content: ContentItem[];
  }[];
};

const AppSection: React.FC<{ offer: IOffer }> = ({ offer }) => {
  const WIDTH_IMG = 422;
  const HEIGHT_IMG = 533;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  return (
    <section id="mobile" className={`${style.section} redSectionSecond`}>
      <div className="container">
        <div className={style.firstBlock}>
          <div className={style.textBlock}>
            <h2 className="title-white title-small">{dataNew.title}</h2>
            <Image
              className={style.hiddenImg}
              src="/sectionImg/slot4-mobile.webp"
              width={496}
              height={310}
              alt={`${siteName} Mobile`}
              title={`${siteName} Mobile`}
            />
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

            <div className={`${style.downloadBlock} ${style.desktop}`}>
              <ImageLink
                id={offer.id}
                link={offer.link}
                src="/googleplay.png"
                width={175}
                height={52}
                alt={`${siteName} in Google Play`}
                title={`${siteName} in Google Play`}
              />
              <ImageLink
                id={offer.id}
                link={offer.link}
                src="/appstore2.png"
                width={156}
                height={52}
                alt={`${siteName} in App Store`}
                title={`${siteName} in App Store`}
              />
            </div>
            <div className={`${style.downloadBlock} ${style.mobile}`}>
              <ImageLink
                id={offer.id}
                link={offer.link}
                src="/googleplay.png"
                width={181}
                height={54}
                alt={`${siteName} in Google Play`}
                title={`${siteName} in Google Play`}
              />
              <ImageLink
                id={offer.id}
                link={offer.link}
                src="/appstore.png"
                width={181}
                height={53}
                alt={`${siteName} in App Store`}
                title={`${siteName} in App Store`}
              />
            </div>
          </div>
          <div className={style.imgBlock}>
            <Image
              src="/sectionImg/slot4.webp"
              width={WIDTH_IMG}
              height={HEIGHT_IMG}
              alt={`${siteName} Mobile`}
              title={`${siteName} Mobile`}
            />
          </div>
        </div>
        <div className={`${style.lastBlock} listBlock lastBlock gap-64`}>
          {dataNew.lastSections.map((section, index) => (
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

export default AppSection;
