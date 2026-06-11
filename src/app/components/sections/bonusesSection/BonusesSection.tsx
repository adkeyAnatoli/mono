'use client';

import React from 'react';
import layout from '../shared/sectionLayout.module.css';
import style from './bonusesSection.module.css';
import data from '@/src/app/data/dataBonuses.json';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
import { ContentItems } from '@/src/app/components/ui/ContentItems';

type Block = { heading: string; content: ContentItem[] };

const BonusesSection = () => {
  const section = data as {
    title: string;
    intro: ContentItem[];
    sections: Block[];
  };

  return (
    <section id="bonuses" className={`${layout.section} ${style.root}`}>
      <div className={`${layout.wrapper} container`}>
        <h2 className={`title-black ${layout.sectionHeading}`}>
          {section.title}
        </h2>
        <div className={`${layout.blueWrap} ${layout.stack}`}>
          {section.intro.length > 0 ? (
            <ContentItems items={section.intro} />
          ) : null}
          {section.sections.map((block) => (
            <div
              className={`${layout.card}${
                block.heading === 'Welcome Offer'
                  ? ` ${style.welcomeOfferCard}`
                  : ''
              }`}
              key={block.heading}
            >
              <h3 className="title-black title-small">{block.heading}</h3>
              <ContentItems items={block.content} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BonusesSection;
