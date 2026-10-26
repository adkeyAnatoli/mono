import React from 'react';
import style from './casinoInfoSection.module.css';
import data from '@/app/data/dataCasinoInfo.json';
import { ContentItem } from '@/app/interfaces/dataInterface';
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

const CasinoInfoSection = () => {
  const title = plainContentText(dataNew.title);

  return (
    <section className={`${style.section}`}>
      <div className={`${style.wrapper} container`}>
        <h2 className={style.tabsTitle}>{title}</h2>
        {dataNew.content.length > 0 && (
          <div className={style.about}>
            <ContentItems items={dataNew.content} />
          </div>
        )}
        {dataNew.sections.map((section, index) => (
          <div className={style.sectionBlock} key={index}>
            <h3 className="title-black title-small">
              {plainContentText(section.heading)}
            </h3>
            <ContentItems items={section.content} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CasinoInfoSection;
