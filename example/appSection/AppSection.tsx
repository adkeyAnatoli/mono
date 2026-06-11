'use client';
import React from 'react';
import style from './appSection.module.css';
import ImageLink from '../../images/ImageLink';
import Image from 'next/image';
import appData from '@/src/app/data/dataApp.json';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
import ContentBlockTable from '@/src/app/components/staticContent/ContentBlockTable';

interface SectionData {
  heading: string;
  content: ContentItem[];
}

function renderContentItems(items: ContentItem[]) {
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

const AppSection: React.FC = () => {
  const WIDTH_IMG = 543;
  const HEIGHT_IMG = 540;
  const WIDTH_IMG_MOBILE = 496;
  const HEIGHT_IMG_MOBILE = 310;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

  const sections = appData.sections as SectionData[];
  const languagesSection = sections[0];
  const currenciesSection = sections[1];

  return (
    <section id="mobile" className={style.section}>
      <div className={`container ${style.columnWrap}`}>
        <h2 className={`title-black  ${style.sectionHeading}`}>
          {appData.title}
        </h2>
        <div className={style.promoRow}>
          <div className={style.imgColumn}>
            <Image
              className={style.hiddenImg}
              src="/sectionImg/slot4-mobile.webp"
              width={WIDTH_IMG_MOBILE}
              height={HEIGHT_IMG_MOBILE}
              alt={`${siteName} Mobile`}
              title={`${siteName} Mobile`}
            />
            <Image
              className={style.desktopImg}
              src="/sectionImg/slot4.webp"
              width={WIDTH_IMG}
              height={HEIGHT_IMG}
              alt={`${siteName} Mobile`}
              title={`${siteName} Mobile`}
            />
          </div>
          <div className={style.blueWrap}>
            <div className={style.textBlock}>
              <div className={style.firstBlock_text}>
                {languagesSection ? (
                  <div className="lastBlockElement">
                    <h3 className="title-black title-small">
                      {languagesSection.heading}
                    </h3>
                    {renderContentItems(languagesSection.content)}
                  </div>
                ) : null}
              </div>

              <div className={`${style.downloadBlock} ${style.desktop}`}>
                <ImageLink
                  src="/googleplay.png"
                  width={175}
                  height={52}
                  alt={`${siteName} in Google Play`}
                  title={`${siteName} in Google Play`}
                />
                <ImageLink
                  src="/appstore2.png"
                  width={156}
                  height={52}
                  alt={`${siteName} in App Store`}
                  title={`${siteName} in App Store`}
                />
              </div>
              <div className={`${style.downloadBlock} ${style.mobile}`}>
                <ImageLink
                  src="/googleplay.png"
                  width={181}
                  height={54}
                  alt={`${siteName} in Google Play`}
                  title={`${siteName} in Google Play`}
                />
                <ImageLink
                  src="/appstore.png"
                  width={181}
                  height={53}
                  alt={`${siteName} in App Store`}
                  title={`${siteName} in App Store`}
                />
              </div>
            </div>
          </div>
        </div>
        {currenciesSection ? (
          <div className={style.blueWrap}>
            <div className={`${style.lastBlock} lastBlock gap-64`}>
              <div className="lastBlockElement">
                <h3 className="title-black title-small">
                  {currenciesSection.heading}
                </h3>
                {renderContentItems(currenciesSection.content)}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default AppSection;
