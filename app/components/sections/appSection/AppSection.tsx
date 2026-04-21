'use client';

import React from 'react';
import style from './appSection.module.css';
import ImageLink from '../../images/ImageLink';
import Image from 'next/image';
import data from '@/app/data/dataApp.json';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { ContentTabItem, ContentTabs } from '@/app/components/ui/ContentTabs';
import { ContentItems } from '@/app/components/ui/ContentItems';
import { plainContentText } from '@/app/utils/plainContentText';

const dataNew = data as {
  title: string;
  sections: {
    heading: string;
    content: ContentItem[];
  }[];
};

const AppSection: React.FC = () => {
  const WIDTH_IMG = 485;
  const HEIGHT_IMG = 563;
  const WIDTH_IMG_MOBILE = 496;
  const HEIGHT_IMG_MOBILE = 310;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const title = plainContentText(dataNew.title);

  const firstSection = dataNew.sections[0];

  const appFeaturesBlock: React.ReactNode = (
    <div className={style.firstBlock}>
      <div className={style.textBlock}>
        <Image
          className={style.hiddenImg}
          src="/sectionImg/slot4-mobile.webp"
          width={WIDTH_IMG_MOBILE}
          height={HEIGHT_IMG_MOBILE}
          alt={`${siteName} Mobile`}
          title={`${siteName} Mobile`}
        />
        <div className={style.firstBlock_text}>
          {firstSection && <ContentItems items={firstSection.content} />}
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
  );

  const tabItems: ContentTabItem[] = [
    {
      value: 'app',
      label: firstSection?.heading ?? 'App',
      content: appFeaturesBlock,
    },
    ...dataNew.sections.slice(1).map((section, index) => ({
      value: `tab-${index + 1}`,
      label: section.heading,
      content: <ContentItems items={section.content} />,
    })),
  ];

  return (
    <section id="mobile" className={style.section}>
      <div className={`${style.wrapper} container`}>
        <h2 className={style.sectionTitle}>{title}</h2>
        <div className={style.mobileImgAboveTabs}>
          <Image
            src="/sectionImg/slot4-mobile.webp"
            width={WIDTH_IMG_MOBILE}
            height={HEIGHT_IMG_MOBILE}
            alt={`${siteName} Mobile`}
            title={`${siteName} Mobile`}
          />
        </div>
        <div className={style.tabsCard}>
          <ContentTabs defaultValue="app" items={tabItems} />
        </div>
      </div>
    </section>
  );
};

export default AppSection;
