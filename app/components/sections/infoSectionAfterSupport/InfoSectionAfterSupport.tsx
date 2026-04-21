'use client';

import React from 'react';
import data from '@/app/data/dataAfterSupport.json';
import style from './infoSectionAfterSupport.module.css';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { ContentTabs } from '@/app/components/ui/ContentTabs';
import { ContentItems } from '@/app/components/ui/ContentItems';
import { plainContentText } from '@/app/utils/plainContentText';

const dataNew = data as {
  title: string;
  content: ContentItem[];
  sections: {
    heading: string;
    content: ContentItem[];
  }[];
};

const InfoSectionAfterSupport = () => {
  const title = plainContentText(dataNew.title);

  const tabItems = dataNew.sections.map((section, index) => ({
    value: `tab-${index}`,
    label: plainContentText(section.heading),
    content: <ContentItems items={section.content} />,
  }));

  return (
    <section className={`${style.section} redSectionSecond`}>
      <div className={`${style.wrapper} container`}>
        <h2 className={style.sectionTitle}>{title}</h2>
        {dataNew.content.length > 0 && (
          <div className={style.block}>
            <ContentItems items={dataNew.content} />
          </div>
        )}
        <div className={style.tabsCard}>
          <ContentTabs defaultValue="tab-0" items={tabItems} />
        </div>
      </div>
    </section>
  );
};

export default InfoSectionAfterSupport;
