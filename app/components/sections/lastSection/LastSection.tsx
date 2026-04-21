import React from 'react';
import style from './lastSection.module.css';
import data from '@/app/data/dataLast.json';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { ContentItems } from '@/app/components/ui/ContentItems';
import { plainContentText } from '@/app/utils/plainContentText';

const dataNew = data as {
  title: string;
  content: ContentItem[];
};

const LastSection = () => {
  return (
    <section className={style.section}>
      <div className="wrapper container">
        <h2 className="title-black">{plainContentText(dataNew.title)}</h2>

        <ContentItems
          items={dataNew.content}
          inlineHeadingClassName="title-black title-small"
        />
      </div>
    </section>
  );
};

export default LastSection;
