'use client';

import React from 'react';
import layout from '../shared/sectionLayout.module.css';
import data from '@/src/app/data/dataTransactions.json';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
import { ContentItems } from '@/src/app/components/ui/ContentItems';

const TransactionsSection = () => {
  const section = data as { title: string; content: ContentItem[] };

  return (
    <section id="transaction" className={layout.section}>
      <div className={`${layout.wrapper} container`}>
        <h2 className={`title-black ${layout.sectionHeading}`}>
          {section.title}
        </h2>
        <div className={layout.block}>
          <ContentItems items={section.content} />
        </div>
      </div>
    </section>
  );
};

export default TransactionsSection;
