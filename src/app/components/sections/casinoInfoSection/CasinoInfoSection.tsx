'use client';

import React from 'react';
import style from './casinoInfoSection.module.css';
import data from '@/app/data/dataCasinoInfo.json';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { ContentTabs } from '@/app/components/ui/ContentTabs';
import { ContentItems } from '@/app/components/ui/ContentItems';
import { plainContentText } from '@/app/utils/plainContentText';

const dataNew = data as {
  title: string;
  sections: {
    heading: string;
    content: ContentItem[];
  }[];
};

const CasinoInfoSection = () => {
  const title = plainContentText(dataNew.title);

  const tabItems = dataNew.sections.map((section, index) => ({
    value: `tab-${index}`,
    label: section.heading,
    content: <ContentItems items={section.content} />,
  }));

  return (
    <section className={`${style.section} redSectionSecond`}>
      <div className={`${style.wrapper} container`}>
        <h2 className={style.tabsTitle}>{title}</h2>
        <ContentTabs defaultValue="tab-0" items={tabItems} />
      </div>
    </section>
  );
};

export default CasinoInfoSection;
