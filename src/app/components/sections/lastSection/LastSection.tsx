import React from 'react';
import style from './lastSection.module.css';
import data from '@/app/data/dataLast.json';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { LastSectionContent } from './LastSectionContent';

const dataNew = data as {
  title: string;
  content: ContentItem[];
};

const LastSection = () => {
  return (
    <section className={style.section}>
      <div className="wrapper container">
        <LastSectionContent title={dataNew.title} content={dataNew.content} />
      </div>
    </section>
  );
};

export default LastSection;
