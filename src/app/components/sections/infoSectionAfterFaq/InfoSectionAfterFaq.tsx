'use client';

import React from 'react';
import style from './infoSectionAfterFaq.module.css';
import data from '@/app/data/dataAfterFaq.json';
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

const InfoSectionAfterFaq = () => {
  const title = plainContentText(dataNew.title);

  const tabItems = dataNew.sections.map((section, index) => ({
    value: `tab-${index}`,
    label: plainContentText(section.heading),
    content: <ContentItems items={section.content} />,
  }));

  return (
    <section className={`${style.section} redSection`}>
      <div className="wrapper container">
        <h2 className="title-white">{title}</h2>
        {dataNew.content.length > 0 && (
          <div className={style.block}>
            <ContentItems items={dataNew.content} />
          </div>
        )}
        {dataNew.sections.length > 0 && (
          <div className={style.tabsCard}>
            <ContentTabs defaultValue="tab-0" items={tabItems} />
          </div>
        )}
      </div>
    </section>
  );
};

export default InfoSectionAfterFaq;
