'use client';

import React from 'react';
import Image from 'next/image';
import layout from '../shared/sectionLayout.module.css';
import style from './mobileGamingSection.module.css';
import data from '@/src/app/data/dataMobileGaming.json';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
import { ContentItems } from '@/src/app/components/ui/ContentItems';
import ImageLink from '@/src/app/components/images/ImageLink';

const WIDTH_IMG = 503;
const HEIGHT_IMG = 582;
const WIDTH_IMG_MOBILE = 496;
const HEIGHT_IMG_MOBILE = 310;

function StoreButtons({ siteName }: { siteName: string }) {
  return (
    <>
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
    </>
  );
}

function StoreButtonsMobile({ siteName }: { siteName: string }) {
  return (
    <>
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
    </>
  );
}

const MobileGamingSection = () => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? '';
  const section = data as { title: string; content: ContentItem[] };

  return (
    <section className={layout.section} id="mobile">
      <div className={`${layout.wrapper} container`}>
        <h2 className={`title-black ${layout.sectionHeading}`}>
          {section.title}
        </h2>
        <div className={`${layout.mediaRow} ${style.mediaRow}`}>
          <div className={`${layout.mediaImage} ${style.mediaImage}`}>
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
          <div
            className={`${layout.blueWrap} ${layout.mediaBlueWrap} ${style.blueWrap}`}
          >
            <div className={style.textBlock}>
              <ContentItems items={section.content} />
              <div
                className={`${style.downloadBlock} ${style.downloadDesktop}`}
              >
                <StoreButtons siteName={siteName} />
              </div>
            </div>
          </div>
          <div className={`${style.downloadBlock} ${style.downloadMobile}`}>
            <StoreButtonsMobile siteName={siteName} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileGamingSection;
