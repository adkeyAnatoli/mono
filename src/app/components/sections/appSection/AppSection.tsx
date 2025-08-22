import React from 'react';
import style from './appSection.module.css';
import ImageLink from '../../images/ImageLink';
import Image from 'next/image';
import { IOffer } from '@/src/app/interfaces/mainInterfaces';
import { useTranslations } from 'next-intl';
import { ContentItem } from '@/src/app/interfaces/dataInterface';

interface SectionData {
  heading: string;
  content: ContentItem[];
}

const AppSection: React.FC<{ offer: IOffer }> = ({ offer }) => {
  const WIDTH_IMG = 436;
  const HEIGHT_IMG = 505;
  const WIDTH_IMG_MOBILE = 496;
  const HEIGHT_IMG_MOBILE = 310;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const t = useTranslations('appSection');

  const data = {
    title: t('title'),
    content: t.raw('content'),
    lastSections: t.raw('lastSections'),
  };

  return (
    <section id="mobile" className={`${style.section} redSectionSecond`}>
      <div className="container">
        <div className={style.firstBlock}>
          <div className={style.textBlock}>
            <h2 className="title-white title-small">{data.title}</h2>
            <Image
              className={style.hiddenImg}
              src="/sectionImg/slot4-mobile.webp"
              width={WIDTH_IMG_MOBILE}
              height={HEIGHT_IMG_MOBILE}
              alt={`${siteName} Mobile`}
              title={`${siteName} Mobile`}
            />
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

export default AppSection;
