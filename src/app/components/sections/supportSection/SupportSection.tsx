import React from 'react';
import style from './supportSection.module.css';
import data from '@/app/data/dataSupport.json';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { ContentItems } from '@/app/components/ui/ContentItems';
import { plainContentText } from '@/app/utils/plainContentText';

const newData = data as {
  title: string;
  content: ContentItem[];
};

const SupportSection = () => {
  return (
    <section className={style.section}>
      <div className={`${style.wrapper} container`}>
        <h2 className="title-black">{plainContentText(data.title)}</h2>
        <div className={style.textBlock}>
          <ContentItems
            items={newData.content}
            inlineHeadingClassName="title-black title-small"
          />
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
